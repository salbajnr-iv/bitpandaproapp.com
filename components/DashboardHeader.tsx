"use client";

import * as React from "react";
import ThemeToggle from "./ThemeToggle";

interface DashboardHeaderProps {
  userName?: string;
}

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <span className="header-eyebrow">PORTFOLIO</span>
        <div className="header-title">
          {userName || "User"} · Wert
          <span className="status-dot"></span>
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
}

