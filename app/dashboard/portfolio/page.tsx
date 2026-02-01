"use client";

import React from "react";
import DashboardHeader from "@/components/DashboardHeader";
import ListRow from "@/components/ListRow";
import { useRouter } from "next/navigation";

const holdings = [
  { 
    iconSrc: "/btc-logo.png", 
    name: "Bitcoin", 
    label: "BTC · Spot", 
    amount: "0,0021 BTC", 
    value: "2.10 €",
    change: "+2.4%"
  },
  { 
    iconSrc: "/eth-logo.png", 
    name: "Ethereum", 
    label: "ETH · Spot", 
    amount: "0,030 ETH", 
    value: "1.20 €",
    change: "-1.2%"
  },
  { 
    iconSrc: "/sol-logo.png", 
    name: "Solana", 
    label: "SOL · Spot", 
    amount: "0,50 SOL", 
    value: "12.50 €",
    change: "+5.8%"
  },
  { 
    iconSrc: "/bnb-logo.png", 
    name: "Binance Coin", 
    label: "BNB · Spot", 
    amount: "0,01 BNB", 
    value: "2.80 €",
    change: "+0.5%"
  },
];

const quickActions = [
  { 
    label: "Kaufen", 
    href: "/dashboard/buy",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
    color: "buy"
  },
  { 
    label: "Verkaufen", 
    href: "/dashboard/sell",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14" />
      </svg>
    ),
    color: "sell"
  },
  { 
    label: "Tauschen", 
    href: "/dashboard/swap",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12M17 20l4-4M17 20l-4-4" />
      </svg>
    ),
    color: "swap"
  },
  { 
    label: "Einzahlen", 
    href: "/dashboard/deposit",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M2 12h20" />
      </svg>
    ),
    color: "deposit"
  },
];

export default function PortfolioPage() {
  const router = useRouter();
  const totalValue = holdings.reduce((acc, h) => acc + parseFloat(h.value.replace("€", "").replace(",", ".")), 0);
  const portfolioChange = "+1.8%";

  return (
    <div className="dashboard-container">
      <div className="dashboard-app">
        <DashboardHeader userName={"User"} />

        <main>
          {/* Portfolio Value Card */}
          <section className="portfolio">
            <div className="portfolio-inner">
              <small>Gesamtwert</small>
              <div className="value-row">
                <div className="value">
                  {totalValue.toFixed(2)}<span className="value-currency">€</span>
                </div>
                <div className="value-detail">
                  <div className="value-label">24h</div>
                  <div className={`change ${portfolioChange.startsWith("+") ? "" : "negative"}`}>
                    {portfolioChange}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions Grid */}
          <section style={{ marginTop: "16px" }}>
            <div className="portfolio-actions">
              {quickActions.map((action, i) => (
                <button 
                  key={i} 
                  className="action-btn"
                  onClick={() => router.push(action.href)}
                >
                  <div className={`action-icon ${action.color}`}>
                    {action.icon}
                  </div>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Holdings Section */}
          <section style={{ marginTop: "20px" }}>
            <div className="page-header">
              <h3 className="section-title" style={{ marginTop: 0, marginBottom: 0 }}>
                Deine Bestände
              </h3>
              <button 
                className="btn btn-outline"
                onClick={() => router.push('/dashboard/portfolio/manage')}
                style={{ padding: "8px 14px", fontSize: "13px" }}
              >
                Verwalten
              </button>
            </div>

            <div className="list-card">
              {holdings.map((h, i) => (
                <ListRow 
                  key={i} 
                  iconSrc={h.iconSrc} 
                  name={h.name} 
                  label={h.label} 
                  amount={h.amount} 
                  pill={h.value}
                  pillClass={h.change.startsWith("+") ? "" : "negative"}
                />
              ))}
            </div>
          </section>

          {/* Asset Performance Chart Placeholder */}
          <section style={{ marginTop: "20px" }}>
            <div className="page-header">
              <h3 className="section-title" style={{ marginTop: 0, marginBottom: 0 }}>
                Performance
              </h3>
              <div className="times">
                <span>1T</span>
                <span>1W</span>
                <span className="active">1M</span>
                <span>1J</span>
              </div>
            </div>
            
            <div className="chart">
              <div className="chart-grid"></div>
              <svg viewBox="0 0 300 100" preserveAspectRatio="none">
                <path 
                  d="M0,80 C20,75 30,60 50,65 C70,70 80,40 100,45 C120,50 130,30 150,35 C170,40 180,20 200,25 C220,30 230,10 250,15 C270,20 280,5 300,10 L300,100 L0,100 Z" 
                  fill="rgba(15, 157, 88, 0.1)"
                  stroke="none"
                />
                <path 
                  d="M0,80 C20,75 30,60 50,65 C70,70 80,40 100,45 C120,50 130,30 150,35 C170,40 180,20 200,25 C220,30 230,10 250,15 C270,20 280,5 300,10" 
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </section>

          {/* Recent Transactions */}
          <section style={{ marginTop: "20px" }}>
            <div className="page-header">
              <h3 className="section-title" style={{ marginTop: 0, marginBottom: 0 }}>
                Letzte Aktivitäten
              </h3>
              <button 
                className="view-all-link"
                onClick={() => router.push('/dashboard/transactions')}
              >
                Alle anzeigen
              </button>
            </div>

            <div className="transactions-card">
              <div className="transaction-row has-border">
                <div className="transaction-type-icon buy">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
                <div className="transaction-info">
                  <div className="transaction-asset">
                    <span className="asset-name">Bitcoin</span>
                    <span className="asset-symbol">BTC</span>
                  </div>
                  <div className="transaction-meta">
                    <span className="tx-type-label">Kauf</span>
                    <span className="tx-date">· Heute, 14:32</span>
                  </div>
                </div>
                <div className="transaction-amounts">
                  <div className="tx-amount">+0,001 BTC</div>
                  <div className="tx-value">≈ 45,00 €</div>
                </div>
                <div className="transaction-status completed">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              </div>

              <div className="transaction-row has-border">
                <div className="transaction-type-icon deposit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M2 12h20" />
                  </svg>
                </div>
                <div className="transaction-info">
                  <div className="transaction-asset">
                    <span className="asset-name">Euro</span>
                    <span className="asset-symbol">EUR</span>
                  </div>
                  <div className="transaction-meta">
                    <span className="tx-type-label">Einzahlung</span>
                    <span className="tx-date">· Gestern, 09:15</span>
                  </div>
                </div>
                <div className="transaction-amounts">
                  <div className="tx-amount">+500,00 €</div>
                </div>
                <div className="transaction-status completed">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              </div>

              <div className="transaction-row">
                <div className="transaction-type-icon sell">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" />
                  </svg>
                </div>
                <div className="transaction-info">
                  <div className="transaction-asset">
                    <span className="asset-name">Ethereum</span>
                    <span className="asset-symbol">ETH</span>
                  </div>
                  <div className="transaction-meta">
                    <span className="tx-type-label">Verkauf</span>
                    <span className="tx-date">· 15.01.2025</span>
                  </div>
                </div>
                <div className="transaction-amounts">
                  <div className="tx-amount pill negative">-0,05 ETH</div>
                  <div className="tx-value">≈ 120,00 €</div>
                </div>
                <div className="transaction-status completed">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

