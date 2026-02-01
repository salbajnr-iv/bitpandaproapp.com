"use client";

export const dynamic = "force-dynamic";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DashboardHeader from "@/components/DashboardHeader";

export default function BuyReviewPage() {
  const router = useRouter();
  const [asset, setAsset] = React.useState("-");
  const [amount, setAmount] = React.useState("0");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAsset(params.get("asset") || "-");
    setAmount(params.get("amount") || "0");
  }, []);

  function confirm() {
    // simulate an API call and then redirect to success with an id
    setTimeout(() => {
      router.push(`/dashboard/buy/success?asset=${encodeURIComponent(asset)}&amount=${amount}&id=ORD-${Date.now()}`);
    }, 700);
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-app">
        <DashboardHeader userName={"User"} />

        <main className="page-card">
          <h2>Bestätigen</h2>
          <p><strong>Asset:</strong> {asset}</p>
          <p><strong>Betrag (EUR):</strong> {amount} €</p>
          <p><strong>Geschätzte Gebühren:</strong> 0,50 €</p>

          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button className="btn" onClick={() => router.back()}>Zurück</button>
            <button className="btn btn-primary" onClick={confirm}>Kaufen</button>
          </div>
        </main>
      </div>
    </div>
  );
}
