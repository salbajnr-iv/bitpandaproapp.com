"use client";

import * as React from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "promo";
  title: string;
  message: string;
  time: string;
  read: boolean;
  action?: string;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Deposit Completed",
    message: "Your deposit of €1,000.00 has been credited to your account.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "info",
    title: "Price Alert",
    message: "Bitcoin has increased by 5% in the last hour.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "warning",
    title: "Security Notice",
    message: "A new device has logged into your account. If this wasn't you, please secure your account.",
    time: "Yesterday",
    read: false,
  },
  {
    id: "4",
    type: "promo",
    title: "VIP Benefits",
    message: "Congratulations! You've qualified for BEST VIP Level with reduced trading fees.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "5",
    type: "success",
    title: "Withdrawal Processed",
    message: "Your withdrawal of €500.00 has been sent to your bank account.",
    time: "3 days ago",
    read: true,
  },
  {
    id: "6",
    type: "info",
    title: "System Maintenance",
    message: "Scheduled maintenance will occur on Sunday, 2:00 AM - 4:00 AM UTC.",
    time: "1 week ago",
    read: true,
  },
  {
    id: "7",
    type: "promo",
    title: "New Feature Available",
    message: "Introducing staking rewards - earn up to 30% on selected assets!",
    time: "2 weeks ago",
    read: true,
  },
];

const typeConfig = {
  success: { color: "#0f9d58", bg: "rgba(15, 157, 88, 0.1)" },
  warning: { color: "#ff9800", bg: "rgba(255, 152, 0, 0.1)" },
  info: { color: "#007aff", bg: "rgba(0, 122, 255, 0.1)" },
  promo: { color: "#9c27b0", bg: "rgba(156, 39, 176, 0.1)" },
};

function NotificationItem({ notification }: { notification: Notification }) {
  const config = typeConfig[notification.type];

  return (
    <div className={`notification-item ${notification.read ? "read" : "unread"}`}>
      <div 
        className="notification-icon"
        style={{ backgroundColor: config.bg }}
      >
        {notification.type === "success" && (
          <svg viewBox="0 0 24 24" fill="none" stroke={config.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        )}
        {notification.type === "warning" && (
          <svg viewBox="0 0 24 24" fill="none" stroke={config.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        )}
        {notification.type === "info" && (
          <svg viewBox="0 0 24 24" fill="none" stroke={config.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        )}
        {notification.type === "promo" && (
          <svg viewBox="0 0 24 24" fill="none" stroke={config.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        )}
      </div>
      <div className="notification-content">
        <div className="notification-header">
          <h4>{notification.title}</h4>
          <span className="notification-time">{notification.time}</span>
        </div>
        <p>{notification.message}</p>
        {notification.action && (
          <button className="notification-action">
            {notification.action}
          </button>
        )}
      </div>
      {!notification.read && <span className="unread-dot"></span>}
    </div>
  );
}

export default function NotificationsPage() {
  const { user: authUser, loading: authLoading } = useAuth();
  const [isClient, setIsClient] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<"all" | "unread">("all");
  const [notificationsList, setNotificationsList] = React.useState<Notification[]>([]);
  const supabase = createClient();

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (authLoading || !authUser) {
      // not signed in or still loading - show nothing or fallback mock
      setNotificationsList(notifications);
      return;
    }

    (async () => {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', authUser.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Notifications table not available or query failed, using mock data', error);
          setNotificationsList(notifications);
        } else if (data && data.length > 0) {
          // map rows to Notification shape as needed
          const mapped = data.map((row: any) => ({
            id: String(row.id),
            type: row.type || 'info',
            title: row.title || 'Notification',
            message: row.message || '',
            time: row.created_at ? new Date(row.created_at).toLocaleString() : '',
            read: !!row.read,
            action: row.action || undefined,
          }));
          setNotificationsList(mapped);
        } else {
          setNotificationsList(notifications);
        }
      } catch (err) {
        console.error('Failed to load notifications', err);
        setNotificationsList(notifications);
      }
    })();
  }, [authLoading, authUser, supabase]);

  const unreadCount = notificationsList.filter(n => !n.read).length;

  const filteredNotifications = notificationsList.filter(n => {
    if (filter === "unread") return !n.read;
    return true;
  });

  const markAllAsRead = async () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
    if (!authUser) return;
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', authUser.id);
      if (error) console.warn('Could not bulk mark notifications as read on server', error);
    } catch (err) {
      console.error('Error updating notifications', err);
    }
  };

  if (!isClient || authLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-app">
        {/* HEADER */}
        <header className="header">
          <div className="header-left">
            <Link href="/dashboard" className="header-back">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </Link>
            <span className="header-eyebrow">ALERTS</span>
            <div className="header-title">Notifications</div>
          </div>
          <button className="sync-btn" onClick={() => setIsSidebarOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </header>

        {/* NOTIFICATION HEADER */}
        <div className="notifications-header">
          <div className="unread-badge">
            {unreadCount > 0 ? (
              <span>{unreadCount} unread</span>
            ) : (
              <span>All caught up!</span>
            )}
          </div>
          {unreadCount > 0 && (
            <button className="mark-read-button" onClick={markAllAsRead}>
              Mark all as read
            </button>
          )}
        </div>

        {/* FILTER TABS */}
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-tab ${filter === "unread" ? "active" : ""}`}
            onClick={() => setFilter("unread")}
          >
            Unread
            {unreadCount > 0 && <span className="tab-badge">{unreadCount}</span>}
          </button>
        </div>

        {/* NOTIFICATIONS LIST */}
        <section className="notifications-section">
          <div className="notifications-list">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))
            ) : (
              <div className="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <p>No notifications</p>
              </div>
            )}
          </div>
        </section>

        {/* NOTIFICATION SETTINGS */}
        <section className="notification-settings">
          <div className="settings-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span>Notification Settings</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </section>
      </div>

      <BottomNav 
        onMenuClick={() => setIsSidebarOpen(true)} 
        isMenuActive={isSidebarOpen} 
      />
    </div>
  );
}

