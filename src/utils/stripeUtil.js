export async function payWithStripe({ price="10.00", tradeId, userId, paymentType }) {
  try {
      const res = await fetch(import.meta.env.VITE_STRIPE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price,
          metadata: { tradeId: tradeId || "demo-trade", userId: userId || "demo-user", paymentType: paymentType || "trade"},
        })
      });

      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url; // go to Stripe Checkout
      } else {
        alert("Could not start checkout");
        console.error("Checkout error:", data);
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
}