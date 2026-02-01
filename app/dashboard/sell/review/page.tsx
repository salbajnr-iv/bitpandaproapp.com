"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/DashboardHeader";

export default function SellReviewPage() {
  const router = useRouter();
  const [asset, setAsset] = React.useState("-");
  const [amount, setAmount] = React.useState("0");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAsset(params.get("asset") || "-");
    setAmount(params.get("amount") || "0");
  }, []);

  function confirm() {
    setTimeout(() => {
      router.push(`/dashboard/sell/success?asset=${encodeURIComponent(asset)}&amount=${amount}&id=ORD-${Date.now()}`);
    }, 700);
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-app">
        <DashboardHeader userName={"User"} />

        <main className="page-card">
          <h2>Bestätigen Verkauf</h2>
          <p><strong>Asset:</strong> {asset}</p>
          <p><strong>Menge:</strong> {amount}</p>
          <p><strong>Geschätzte Gebühren:</strong> 0,50 €</p>

          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button className="btn" onClick={() => router.back()}>Zurück</button>
            <button className="btn btn-primary" onClick={confirm}>Verkaufen</button>
          </div>
        </main>
      </div>
    </div>
  );
}
