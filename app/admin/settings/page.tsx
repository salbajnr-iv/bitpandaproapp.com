'use client'

import { useState } from 'react'
import { useAdminAuth } from '@/contexts/AdminAuthContext'

export default function AdminSettingsPage() {
  const { user } = useAdminAuth()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [settings, setSettings] = useState({
    requireEmailConfirmation: true,
    allowUserRegistration: true,
    maxWithdrawalLimit: 10000,
    notifyOnLargeTransactions: true,
    largeTransactionThreshold: 5000,
    sessionTimeout: 60,
  })

  const handleSave = async () => {
    setSaving(true)
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Settings</h1>
          <p className="text-gray-400 mt-1">Configure platform settings and security options</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-green-800 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-500">Settings saved successfully</span>
        </div>
      )}

      {/* Platform Settings */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Platform Settings</h2>
          <p className="text-gray-400 text-sm mt-1">General platform configuration</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">User Registration</p>
              <p className="text-gray-400 text-sm">Allow new users to register</p>
            </div>
            <button
              onClick={() => setSettings(prev => ({ ...prev, allowUserRegistration: !prev.allowUserRegistration }))}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.allowUserRegistration ? 'bg-green-800' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                settings.allowUserRegistration ? 'translate-x-6' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Email Confirmation Required</p>
              <p className="text-gray-400 text-sm">Users must confirm email before trading</p>
            </div>
            <button
              onClick={() => setSettings(prev => ({ ...prev, requireEmailConfirmation: !prev.requireEmailConfirmation }))}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.requireEmailConfirmation ? 'bg-green-800' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                settings.requireEmailConfirmation ? 'translate-x-6' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Maximum Withdrawal Limit (EUR)</label>
            <input
              type="number"
              value={settings.maxWithdrawalLimit}
              onChange={(e) => setSettings(prev => ({ ...prev, maxWithdrawalLimit: parseFloat(e.target.value) || 0 }))}
              className="w-full max-w-xs px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-800"
            />
            <p className="text-gray-400 text-sm mt-1">Maximum amount a user can withdraw in one transaction</p>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Security Settings</h2>
          <p className="text-gray-400 text-sm mt-1">Admin account security configuration</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Large Transaction Alerts</p>
              <p className="text-gray-400 text-sm">Get notified for transactions above threshold</p>
            </div>
            <button
              onClick={() => setSettings(prev => ({ ...prev, notifyOnLargeTransactions: !prev.notifyOnLargeTransactions }))}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.notifyOnLargeTransactions ? 'bg-green-800' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                settings.notifyOnLargeTransactions ? 'translate-x-6' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Large Transaction Threshold (EUR)</label>
            <input
              type="number"
              value={settings.largeTransactionThreshold}
              onChange={(e) => setSettings(prev => ({ ...prev, largeTransactionThreshold: parseFloat(e.target.value) || 0 }))}
              className="w-full max-w-xs px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-800"
            />
            <p className="text-gray-400 text-sm mt-1">Transactions above this amount will trigger alerts</p>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Admin Session Timeout (minutes)</label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) || 30 }))}
              className="w-full max-w-xs px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-800"
            />
            <p className="text-gray-400 text-sm mt-1">Auto logout after inactivity</p>
          </div>
        </div>
      </div>

      {/* Admin Account Info */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Admin Account</h2>
          <p className="text-gray-400 text-sm mt-1">Your admin account information</p>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-800/30 rounded-full flex items-center justify-center">
              <span className="text-green-500 text-2xl font-bold">
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            <div>
              <p className="text-white font-medium text-lg">{user?.email}</p>
              <p className="text-gray-400 text-sm">Administrator</p>
              <p className="text-gray-500 text-xs mt-1">ID: {user?.id}</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700">
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-gray-800 rounded-xl border border-red-900/50">
        <div className="p-6 border-b border-red-900/50">
          <h2 className="text-lg font-semibold text-red-500">Danger Zone</h2>
          <p className="text-gray-400 text-sm mt-1">Irreversible and destructive actions</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Reset All User Balances</p>
              <p className="text-gray-400 text-sm">Set all user balances to zero</p>
            </div>
            <button className="px-4 py-2 bg-red-900 hover:bg-red-800 text-red-200 rounded-lg transition-colors">
              Reset All
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Deactivate All Users</p>
              <p className="text-gray-400 text-sm">Temporarily disable all user accounts</p>
            </div>
            <button className="px-4 py-2 bg-red-900 hover:bg-red-800 text-red-200 rounded-lg transition-colors">
              Deactivate All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

