/**
 * Start a one-time trade payment.
 * Backend endpoint expected: POST /api/create-checkout-session
 * Body: { price, metadata: { tradeId, userId } }
 */
export async function payForTrade({ price = "10.00", tradeId = "", userId = "" }) {
  try {
    const res = await fetch(import.meta.env.VITE_STRIPE_PAY_TRADE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price,
        metadata: { tradeId, userId },
      }),
    });

    const data = await res.json();

    if (!data?.url) {
      console.error("Checkout create failed:", data);
      throw new Error(data?.error || "Failed to start checkout");
    }

    // redirect user to Stripe Checkout (hosted page)
    window.location.href = data.url;
  } catch (err) {
    console.error("payForTrade error:", err);
    // surface friendly message
    alert("Could not start payment. Check console.");
  }
}

/**
 * Start a Pro subscribtion checkout (recurring).
 * Backend endpoint expected: POST /api/create-pro-checkout
 * Body: { userId, email?, customerId? }
 */
export async function subscribeToPro({ userId, email, customerId } = {}) {
  try {
    if (!userId) {
      throw new Error("Missing userId for subscribeToPro");
    }

    const res = await fetch(import.meta.env.VITE_STRIPE_PAY_PRO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, email, customerId }),
    });

    const data = await res.json();

    if (!data?.url) {
      console.error("create-pro-checkout failed", data);
      throw new Error(data?.error || "Failed to start Pro checkout");
    }

    window.location.href = data.url;
  } catch (err) {
    console.error("subscribeToPro error:", err);
    alert("Could not start Pro subscribtion. Check console.");
  }
}

/**
 * Verify a checkout session quickly from the frontend after redirect.
 * Calls backend GET /api/verify-session?session_id=...
 * Returns the parsed JSON response or throws.
 */
export async function verifySession(sessionId) {
  try {
    if (!sessionId) throw new Error("Missing sessionId");

    const res = await fetch(`${import.meta.env.VITE_STRIPE_VERIFY_SESSION}?session_id=${encodeURIComponent(sessionId)}`);
    const data = await res.json();

    if (!res.ok) {
      console.error("verifySession backend error:", data);
      throw new Error(data?.error || "Failed to verify session");
    }

    return data; // { sessionId, payment_status, amount_total, currency, metadata }
  } catch (err) {
    console.error("verifySession error:", err);
    throw err;
  }
}

/**
 * Open Stripe Billing Portal for a given customer (server returns portal URL).
 * Backend endpoint expected: POST /api/billing-portal with { customerId }
 */
export async function openBillingPortal(customerId) {
  try {
    if (!customerId) throw new Error("Missing customerId");

    const res = await fetch(import.meta.env.VITE_STRIPE_BILLING_PORTAL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId }),
    });

    const data = await res.json();
    if (!data?.url) {
      console.error("openBillingPortal failed", data);
      throw new Error(data?.error || "Failed to open billing portal");
    }

    window.location.href = data.url;
  } catch (err) {
    console.error("openBillingPortal error:", err);
    alert("Could not open billing portal. Check console.");
  }
}
