'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useAdminAuth } from '@/contexts/AdminAuthContext'

interface UserProfile {
  id: string
  email: string
  full_name: string | null
  balance: number
  is_active: boolean
  is_admin: boolean
  created_at: string
}

interface PaginationState {
  page: number
  limit: number
  total: number
}

export default function AdminUsersPage() {
  const { loading: authLoading } = useAdminAuth()
  const [users, setUsers] = useState<UserProfile[]>([])
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    total: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showBalanceModal, setShowBalanceModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)
  const [balanceAction, setBalanceAction] = useState<'add' | 'subtract'>('add')
  const [balanceAmount, setBalanceAmount] = useState('')
  const [balanceReason, setBalanceReason] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchUsers()
  }, [pagination.page, statusFilter])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const from = (pagination.page - 1) * pagination.limit
      const to = from + pagination.limit - 1

      let query = supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('created_at', { ascending: false })

      if (statusFilter === 'active') {
        query = query.eq('is_active', true)
      } else if (statusFilter === 'inactive') {
        query = query.eq('is_active', false)
      }

      const { data, error, count } = await query

      if (error) {
        console.error('Error fetching users:', error)
        return
      }

      setUsers(data as unknown as UserProfile[])
      setPagination(prev => ({ ...prev, total: count || 0 }))
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdjustBalance = async () => {
    if (!selectedUser || !balanceAmount) return

    setActionLoading(true)
    try {
      const amount = parseFloat(balanceAmount)
      
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid positive amount')
        return
      }

      // Call the database function to adjust balance
      const { error } = await supabase.rpc('adjust_balance', {
        p_user_id: selectedUser.id,
        p_action_type: balanceAction,
        p_amount: amount,
        p_reason: balanceReason || null,
      })

      if (error) {
        console.error('Error adjusting balance:', error)
        alert('Failed to adjust balance: ' + error.message)
        return
      }

      alert(`Successfully ${balanceAction === 'add' ? 'added' : 'subtracted'} €${amount} ${balanceAction === 'add' ? 'to' : 'from'} user ${selectedUser.email}`)
      setShowBalanceModal(false)
      setBalanceAmount('')
      setBalanceReason('')
      fetchUsers()
    } catch (error) {
      console.error('Error adjusting balance:', error)
      alert('An unexpected error occurred')
    } finally {
      setActionLoading(false)
    }
  }

  const handleToggleUserStatus = async (user: UserProfile) => {
    if (!confirm(`Are you sure you want to ${user.is_active ? 'deactivate' : 'activate'} user ${user.email}?`)) {
      return
    }

    try {
      const { error } = await supabase.rpc('toggle_user_status', {
        user_id: user.id,
        is_active: !user.is_active,
      })

      if (error) {
        console.error('Error toggling user status:', error)
        alert('Failed to update user status')
        return
      }

      fetchUsers()
    } catch (error) {
      console.error('Error toggling user status:', error)
      alert('An unexpected error occurred')
    }
  }

  const filteredUsers = users.filter(user =>
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(pagination.total / pagination.limit)

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-gray-400 mt-1">Manage user accounts and balances</p>
        </div>
        <div className="text-sm text-gray-400">
          Total Users: <span className="text-white font-medium">{pagination.total}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users by email or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"
            />
            <svg 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-800"
        >
          <option value="all">All Users</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive Only</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-800/30 rounded-full flex items-center justify-center">
                          <span className="text-green-500 font-medium">
                            {user.email?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.full_name || 'N/A'}</p>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">
                        €{parseFloat(String(user.balance)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.is_active 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          user.is_active ? 'bg-green-500' : 'bg-red-500'
                        }`}></span>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user)
                            setShowBalanceModal(true)
                          }}
                          className="px-3 py-1.5 bg-green-800 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                        >
                          Adjust Balance
                        </button>
                        <button
                          onClick={() => handleToggleUserStatus(user)}
                          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                            user.is_active
                              ? 'bg-red-500/10 hover:bg-red-500/20 text-red-500'
                              : 'bg-green-500/10 hover:bg-green-500/20 text-green-500'
                          }`}
                        >
                          {user.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} users
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-gray-400 text-sm">
                Page {pagination.page} of {totalPages}
              </span>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === totalPages}
                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Balance Adjustment Modal */}
      {showBalanceModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Adjust User Balance</h2>
              <p className="text-gray-400 text-sm mt-1">User: {selectedUser.email}</p>
              <p className="text-gray-400 text-sm">Current Balance: €{parseFloat(String(selectedUser.balance)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Action</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setBalanceAction('add')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      balanceAction === 'add'
                        ? 'bg-green-800 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Add Funds
                  </button>
                  <button
                    onClick={() => setBalanceAction('subtract')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      balanceAction === 'subtract'
                        ? 'bg-red-800 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Subtract Funds
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
                  Amount (€)
                </label>
                <input
                  id="amount"
                  type="number"
                  value={balanceAmount}
                  onChange={(e) => setBalanceAmount(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800"
                />
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
                  Reason (Optional)
                </label>
                <textarea
                  id="reason"
                  value={balanceReason}
                  onChange={(e) => setBalanceReason(e.target.value)}
                  placeholder="Enter reason for this adjustment..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800 resize-none"
                />
              </div>

              {/* Preview */}
              {balanceAmount && (
                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <p className="text-gray-400 text-sm">New Balance Preview:</p>
                  <p className="text-2xl font-bold text-white">
                    €{(
                      parseFloat(String(selectedUser.balance)) +
                      (balanceAction === 'add' ? 1 : -1) * parseFloat(balanceAmount || '0')
                    ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowBalanceModal(false)
                  setSelectedUser(null)
                  setBalanceAmount('')
                  setBalanceReason('')
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdjustBalance}
                disabled={actionLoading || !balanceAmount}
                className="px-4 py-2 bg-green-800 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? 'Processing...' : 'Confirm Adjustment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

