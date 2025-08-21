// src/pages/PaymentSuccess.jsx
import React, { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const [loading, setLoading] = useState(true);
  const [sessionInfo, setSessionInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function verify() {
      try {
        const params = new URLSearchParams(window.location.search);
        const session_id = params.get("session_id");

        if (!session_id) {
          setError("Missing session_id in URL");
          setLoading(false);
          return;
        }

        // Call our server to retrieve the session
        const res = await fetch(`http://localhost:4242/api/verify-session?session_id=${encodeURIComponent(session_id)}`);
        const data = await res.json();

        if (res.ok) {
          setSessionInfo(data);
        } else {
          setError(data.error || "Failed to verify session");
        }
      } catch (err) {
        console.error("Verify session error:", err);
        setError("Network error verifying payment.");
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, []);

  if (loading) return <div className="p-6 text-white">Checking payment status...</div>;
  if (error) return <div className="p-6 text-white">Error: {error}</div>;

  // sessionInfo.payment_status will be 'paid' if the payment went through
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-2">Payment Result</h1>

      {sessionInfo.payment_status === "paid" ? (
        <>
          <p>Payment confirmed ✅</p>
          <p className="mt-2">Amount: {(sessionInfo.amount_total / 100).toFixed(2)} {sessionInfo.currency?.toUpperCase()}</p>
          <p className="mt-2">Trade ID: {sessionInfo.metadata?.tradeId || "N/A"}</p>
          <p className="mt-2">Session ID: {sessionInfo.sessionId}</p>
          <p className="mt-4 text-sm opacity-80">We also update the server (webhook) and Firestore; this page is just a quick confirmation.</p>
        </>
      ) : (
        <>
          <p>Payment not completed. Status: {sessionInfo.payment_status}</p>
          <p>If you were charged, give it a minute — the server webhook will process it.</p>
        </>
      )}
    </div>
  );
}
