# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## PayU payment gateway

The `/checkout` cart flow is wired to PayU's classic hosted checkout, **test mode**.

**Environment variables** (Vercel → Project → Settings → Environment Variables, for
both Preview and Production; and `.env.local` for local `vercel dev` — see
`.env.example`):

| Variable | Purpose |
| --- | --- |
| `PAYU_KEY` | Merchant key (public — goes in the PayU form). Read only from `process.env`. |
| `PAYU_SALT` | Merchant salt — **server secret. Never in a response, never imported into `src/`.** |
| `PAYU_ENV` | Optional. `test` (default) → `https://test.payu.in/_payment`; `production` → `https://secure.payu.in/_payment` |

**Flow**

1. `/checkout` collects name, phone, email, address, pincode and validates them
   (10-digit Indian mobile, 6-digit pincode).
2. "Proceed to payment" POSTs **only the cart lines**
   (`{ items: [{ productId, variantSlug, carat, quantity }], firstname, email, phone }`)
   to **`/api/payu-hash`**.
3. `/api/payu-hash` **recomputes the amount server-side** from `src/data/stonesData.js`
   (`api/_order.js`) — any `amount`/`price`/`total` in the body is ignored. Unknown
   `productId`/`variantSlug`, or a `carat` not in that variant's `caratOptions`,
   fail the request (no fallback). It generates the `txnid`, builds the SHA-512
   request hash with the salt, and returns `{ action, fields }` — the exact hidden
   inputs to POST. The client builds nothing.
4. A hidden form is POSTed to `action` (PayU hosted checkout).
5. PayU calls back to **`/api/payu-response`** (both `surl` and `furl`). It recomputes
   the reverse hash, compares with `timingSafeEqual`, and only on
   `verified && status === "success"` 302-redirects to `/checkout/success`
   (otherwise `/checkout/failure`) with a few non-sensitive display fields.
6. `/checkout/*` renders the result page (`vercel.json` rewrites non-`/api` paths to
   the SPA). `/checkout/success` clears the cart.

Any real order fulfilment must be triggered **server-side inside `/api/payu-response`**,
gated on `verified && status === "success"` — never trusted from the redirect query
on the client.
