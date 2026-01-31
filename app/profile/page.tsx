"use client";

import * as React from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";

interface ListItemProps {
  label: string;
  value?: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  danger?: boolean;
}

function ListItem({ label, value, icon, href, onClick, danger }: ListItemProps) {
  const content = (
    <>
      <div className="list-item-left">
        {icon && <div className="list-item-icon">{icon}</div>}
        <span className={danger ? "text-danger" : ""}>{label}</span>
      </div>
      <div className="list-item-right">
        {value && <span className="list-item-value">{value}</span>}
        {href && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )}
      </div>
    </>
  );

  if (href) {
    return <Link href={href} className="list-item">{content}</Link>;
  }

  if (onClick) {
    return <button className="list-item list-button" onClick={onClick}>{content}</button>;
  }

  return <div className="list-item">{content}</div>;
}

export default function ProfilePage() {
  const { user: authUser, loading: authLoading } = useAuth();
  const [isClient, setIsClient] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [profile, setProfile] = React.useState<any | null>(null);
  const [editing, setEditing] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', phone: '', accountType: '' });
  const [saving, setSaving] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);
  const supabase = createClient();

  // Effect to mark client-side hydration complete
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Effect to populate form when profile is loaded
  React.useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || '',
        phone: profile.phone || '',
        accountType: profile.accountType || 'Personal',
      });
    }
  }, [profile]);

  // Effect to fetch profile data
  React.useEffect(() => {
    if (authLoading || !authUser) return;

    // Fetch profile from profiles table, fallback to auth user
    (async () => {
      try {
        const { data, error } = await supabase.from('profiles').select('*').eq('id', authUser.id).maybeSingle();
        if (error) {
          console.warn('Could not fetch profile, falling back to auth user', error);
          setProfile({
            name: authUser.user_metadata?.full_name || authUser.email,
            email: authUser.email,
            phone: authUser.user_metadata?.phone || '',
            kycStatus: authUser.user_metadata?.kycStatus || 'pending',
            memberSince: authUser.user_metadata?.memberSince || '',
            accountType: authUser.user_metadata?.accountType || 'Personal',
          });
        } else if (data) {
          setProfile({
            name: data.full_name || authUser.email,
            email: authUser.email,
            phone: data.phone || '',
            kycStatus: (data.kyc_status as 'pending' | 'verified') || 'pending',
            memberSince: data.created_at ? new Date(data.created_at).toLocaleString('default', { month: 'long', year: 'numeric' }) : '',
            accountType: data.account_type || 'Personal',
            avatar_url: data.avatar_url || undefined,
          });
        } else {
          // Not found, use auth data
          setProfile({
            name: authUser.user_metadata?.full_name || authUser.email,
            email: authUser.email,
            phone: authUser.user_metadata?.phone || '',
            kycStatus: authUser.user_metadata?.kycStatus || 'pending',
            memberSince: authUser.user_metadata?.memberSince || '',
            accountType: authUser.user_metadata?.accountType || 'Personal',
          });
        }
      } catch (err) {
        console.error('Profile fetch failed', err);
        setProfile({
          name: authUser.user_metadata?.full_name || authUser.email,
          email: authUser.email,
          phone: authUser.user_metadata?.phone || '',
          kycStatus: authUser.user_metadata?.kycStatus || 'pending',
          memberSince: authUser.user_metadata?.memberSince || '',
          accountType: authUser.user_metadata?.accountType || 'Personal',
        });
      }
    })();
  }, [authLoading, authUser, supabase]);

  // Early returns after all hooks
  if (!isClient || authLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-app">
          <p>Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    if (!authUser) return;
    setSaving(true);
    setStatusMessage(null);
    try {
      const payload = {
        id: authUser.id,
        full_name: form.name,
        phone: form.phone,
        account_type: form.accountType,
        updated_at: new Date().toISOString(),
      };

      const { error: upsertError } = await supabase.from('profiles').upsert(payload);
      if (upsertError) throw upsertError;

      // Also update auth user metadata (display name)
      const { error: authErr } = await supabase.auth.updateUser({ data: { full_name: form.name } });
      if (authErr) console.warn('Could not update auth user metadata', authErr);

      // Update local UI
      setProfile((prev: any) => ({ ...(prev || {}), name: form.name, phone: form.phone, accountType: form.accountType }));
      setEditing(false);
      setStatusMessage('Profile saved');
    } catch (err) {
      console.error('Save failed', err);
      setStatusMessage('Could not save profile.');
    } finally {
      setSaving(false);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

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
            <span className="header-eyebrow">ACCOUNT</span>
            <div className="header-title">Profile</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {statusMessage && <span style={{ color: 'var(--color-neutrals-text-secondary)', fontSize: 13 }}>{statusMessage}</span>}
            {!editing ? (
              <button className="bp-button bp-button-secondary" onClick={() => setEditing(true)}>Edit</button>
            ) : (
              <>
                <button className="bp-button" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
                <button className="bp-button bp-button-secondary" onClick={() => { setEditing(false); setForm({ name: profile?.name || '', phone: profile?.phone || '', accountType: profile?.accountType || 'Personal' }); }}>Cancel</button>
              </>
            )}
            <button className="sync-btn" onClick={() => setIsSidebarOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </header>

        {/* PROFILE CARD */}
        <section className="profile-card">
          <div className="profile-avatar">
            {profile?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatar_url} alt={profile.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{profile?.name || authUser.email}</h2>
            <p className="profile-email">{profile?.email || authUser.email}</p>
            <div className="profile-meta">
              <span>Member since {profile?.memberSince || '—'}</span>
              <span className="dot">•</span>
              <span>{profile?.accountType || 'Personal'}</span>
            </div>
          </div>
        </section>

        {/* KYC SECTION */}
        <section className="kyc-section">
          <h3 className="section-title">Identity Verification</h3>
          <div className="kyc-card">
            {profile?.kycStatus === "verified" ? (
              <div className="kyc-verified">
                <div className="kyc-icon verified">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div className="kyc-info">
                  <span className="kyc-status">Verified</span>
                  <p>Your identity has been verified. You have full access to all platform features.</p>
                </div>
              </div>
            ) : (
              <div className="kyc-pending">
                <div className="kyc-icon pending">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div className="kyc-info">
                  <span className="kyc-status">Verification Required</span>
                  <p>Complete your identity verification to unlock all features.</p>
                </div>
                <button className="kyc-button">
                  Verify KYC
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* PERSONAL INFO */}
        <section className="info-section">
          <h3 className="section-title">Personal Information</h3>
          <div className="list-card">
            {editing ? (
              <div>
                <div className="form-group">
                  <label className="form-label">Full name</label>
                  <input
                    className="form-input"
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    placeholder="Full name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    className="form-input"
                    value={form.phone}
                    onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                    placeholder="Phone"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Account type</label>
                  <select className="form-input" value={form.accountType} onChange={(e) => setForm((s) => ({ ...s, accountType: e.target.value }))}>
                    <option>Personal</option>
                    <option>Business</option>
                  </select>
                </div>
              </div>
            ) : (
              <>
                <ListItem
                  label="Full Name"
                  value={profile?.name || authUser.email}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  }
                />
                <ListItem
                  label="Email"
                  value={profile?.email || authUser.email}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  }
                />
                <ListItem
                  label="Phone"
                  value={profile?.phone || '—'}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  }
                />
              </>
            )}
          </div>
        </section>

        {/* ACCOUNT SETTINGS */}
        <section className="info-section">
          <h3 className="section-title">Account Settings</h3>
          <div className="list-card">
            <ListItem
              label="Security"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
              href="/settings#security"
            />
            <ListItem
              label="Preferences"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              }
              href="/settings#preferences"
            />
            <ListItem
              label="Two-Factor Authentication"
              value="Enabled"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
              href="/settings#2fa"
            />
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

