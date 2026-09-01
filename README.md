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

Single-product "Buy Now" checkout is wired to PayU's classic hosted checkout.

**Environment variables** (Vercel → Project → Settings → Environment Variables, and
`.env.local` for local dev — see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `PAYU_KEY` | Merchant key (public — sent to the browser in the checkout form) |
| `PAYU_SALT` | Merchant salt — **secret. Never returned to the client.** |
| `PAYU_ENV` | `test` → `https://test.payu.in/_payment`, `production` → `https://secure.payu.in/_payment` |

**Flow**

1. "Buy Now" opens a checkout modal (name, email, phone, delivery address).
2. On submit the browser generates a unique `txnid` and POSTs
   `{ txnid, amount, productinfo, firstname, email }` to **`/api/payu-hash`**, which
   returns `{ key, hash, action }` (SHA-512 request hash, computed server-side with
   the salt).
3. A hidden form is POSTed to `action` (PayU hosted checkout).
4. PayU calls back to **`/api/payu-response`** (set as both `surl` and `furl`). It
   recomputes the reverse hash and only then 302-redirects to `/checkout/success`
   or `/checkout/failure` with a small set of display fields.
5. `/checkout/*` renders the result page (`vercel.json` rewrites it to the SPA).

Any real order fulfilment must be triggered **server-side inside `/api/payu-response`**,
gated on `verified && status === "success"` — never trusted from the redirect query
on the client.
