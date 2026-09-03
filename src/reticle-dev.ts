// Dev-only. Imported automatically by @reticlehq/vite-plugin, so you do not need to import it.
// Self-guards on import.meta.env.DEV, so it is a no-op in a production build.
import { registerCapabilities } from '@reticlehq/react';

if (import.meta.env.DEV) {
  // ── Start with ONE flow. ─────────────────────────────────────────────────────────────────────
  // You do not need to describe the whole app to get value, and trying to is the slow path. Register
  // the store your most important flow reads, and list the testids that flow touches. Add more later,
  // when a flow you actually replay needs them.
  //
  // Registering a store is the highest-value line in this file: it lets the agent check what the app
  // BELIEVES, not just what it rendered — the class of bug a screenshot cannot see. Pass the STORE,
  // not `() => store.getState()`: the store form wires `subscribe` too, so every mutation emits a
  // state diff; the getter form is read-only and silently produces empty diffs.
  // No state library detected. Cart lives in a React Context + useState pair
  // (src/cart/CartProvider.jsx) with no external store object to register; the
  // gemstone discount-pricing flow it's here to verify is pure derived render —
  // priceOf(size) / discountPercent(size) / hasDiscount(size) from
  // src/data/stonesData.js — so it is checked against the DOM, and per-component
  // hook state is still reachable ad hoc via reticle_state({ ref }).

  registerCapabilities({
    // The stone PDP markup carries no data-testid; the discount flow is driven
    // by role/name/text instead:
    //   - Carat pills:      role "button", pressed state, label e.g. "10-11 ct"
    //   - Now price:        .stone-price-now  (e.g. "₹15,000")
    //   - Was price:        s.price-was       (e.g. "₹30,000")
    //   - Discount badge:   .price-off        (e.g. "50% OFF")
    //   - Savings line:     .stone-total-save ("You save ₹15,000")
    testids: [],
    signals: [], // app calls no reticle.signal()
    stores: [], // no registrable store; see note above
  });
}
