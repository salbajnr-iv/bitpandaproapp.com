"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardHeader from '@/components/DashboardHeader';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface KycRequest {
  id: string;
  status: string;
  submitted_at: string;
  reviewed_at?: string;
  review_reason?: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: string; bgColor: string }> = {
  none: {
    label: 'Not Started',
    color: 'text-gray-400',
    icon: '⭕',
    bgColor: 'bg-gray-950/50',
  },
  pending_review: {
    label: 'Pending Review',
    color: 'text-yellow-400',
    icon: '⏳',
    bgColor: 'bg-yellow-950/30',
  },
  approved: {
    label: 'Approved',
    color: 'text-green-400',
    icon: '✅',
    bgColor: 'bg-green-950/30',
  },
  rejected: {
    label: 'Rejected',
    color: 'text-red-400',
    icon: '❌',
    bgColor: 'bg-red-950/30',
  },
  resubmit_required: {
    label: 'Resubmit Required',
    color: 'text-orange-400',
    icon: '⚠️',
    bgColor: 'bg-orange-950/30',
  },
};

export default function KycStatusPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('none');
  const [requests, setRequests] = useState<KycRequest[]>([]);
  const [userId, setUserId] = useState<string>();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const loadData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) {
        router.push('/auth/signin');
        return;
      }
      setUserId(session.user.id);

      try {
        // Fetch profile status
        const { data: profile } = await supabase
          .from('profiles')
          .select('kyc_status')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          setStatus(profile.kyc_status || 'none');
        }

        // Fetch KYC requests
        const { data: kycRequests } = await supabase
          .from('kyc_requests')
          .select('*')
          .eq('user_id', session.user.id)
          .order('submitted_at', { ascending: false });

        if (kycRequests) {
          setRequests(kycRequests);
        }

        // Check for success message
        if (searchParams.get('submitted') === 'true') {
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 5000);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [supabase, router, searchParams]);

  const statusConfig = STATUS_CONFIG[status] || STATUS_CONFIG.none;
  const canStartKyc = status === 'none' || status === 'rejected' || status === 'resubmit_required';

  return (
    <div className="dashboard-container">
      <div className="dashboard-app">
        <DashboardHeader userName="User" />

        <main className="page-card max-w-2xl mx-auto">
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-6 p-4 bg-green-950/50 border border-green-600 rounded-lg flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <h3 className="text-white font-semibold">KYC Submitted Successfully</h3>
                <p className="text-sm text-green-200 mt-1">
                  Your documents have been submitted. We'll review them within 2-5 business days.
                </p>
              </div>
            </div>
          )}

          {/* Current Status */}
          <div className={`p-6 rounded-lg ${statusConfig.bgColor} border border-gray-600 mb-6`}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{statusConfig.icon}</span>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {statusConfig.label}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Current KYC Verification Status
                </p>
              </div>
            </div>

            {status === 'approved' && (
              <div className="mt-4 p-3 bg-green-950/50 border border-green-600 rounded text-sm text-green-200">
                Your identity has been verified. You can now use all platform features.
              </div>
            )}

            {status === 'pending_review' && (
              <div className="mt-4 p-3 bg-yellow-950/50 border border-yellow-600 rounded text-sm text-yellow-200">
                Your documents are being reviewed. Please be patient.
              </div>
            )}

            {status === 'rejected' && (
              <div className="mt-4 p-3 bg-red-950/50 border border-red-600 rounded text-sm text-red-200">
                Your KYC was rejected. Please review the documents and try again.
              </div>
            )}

            {status === 'resubmit_required' && (
              <div className="mt-4 p-3 bg-orange-950/50 border border-orange-600 rounded text-sm text-orange-200">
                We need updated documents. Please resubmit your KYC.
              </div>
            )}

            {status === 'none' && (
              <div className="mt-4 p-3 bg-blue-950/50 border border-blue-600 rounded text-sm text-blue-200">
                Start the verification process to unlock full platform access.
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {canStartKyc && (
              <Link
                href="/profile/kyc/step-1"
                className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold text-center hover:from-green-700 hover:to-green-600 transition-all"
              >
                Start Verification
              </Link>
            )}

            <Link
              href="/profile"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-600 text-gray-300 font-semibold text-center hover:bg-gray-700 transition-colors"
            >
              Back to Profile
            </Link>
          </div>

          {/* Previous Submissions */}
          {requests.length > 0 && (
            <div className="border border-gray-600 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white">Submission History</h3>

              <div className="space-y-3">
                {requests.map((request, idx) => {
                  const requestStatus = STATUS_CONFIG[request.status] || STATUS_CONFIG.none;
                  return (
                    <div key={idx} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{requestStatus.icon}</span>
                            <div>
                              <p className={`font-semibold ${requestStatus.color}`}>
                                {requestStatus.label}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                Submitted:{' '}
                                {new Date(request.submitted_at).toLocaleDateString()} at{' '}
                                {new Date(request.submitted_at).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        {request.reviewed_at && (
                          <span className="text-xs text-gray-500">
                            Reviewed:{' '}
                            {new Date(request.reviewed_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      {request.review_reason && (
                        <div className="mt-3 p-3 bg-red-950/30 border border-red-600/50 rounded text-sm text-red-200">
                          <strong>Reason:</strong> {request.review_reason}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* FAQ Section */}
          <div className="mt-8 border border-gray-600 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Frequently Asked Questions</h3>

            <div className="space-y-4">
              {[
                {
                  q: 'How long does the verification process take?',
                  a: 'Typically 2-5 business days. Weekend and holiday submissions may take longer.',
                },
                {
                  q: 'What documents do I need?',
                  a: 'You need a valid ID (passport, national ID, or driver\'s license), proof of address, and a selfie with your ID.',
                },
                {
                  q: 'Why was my KYC rejected?',
                  a: 'Common reasons include unclear documents, mismatched information, or expired ID. We\'ll provide feedback on what to correct.',
                },
                {
                  q: 'Can I use the platform before KYC is approved?',
                  a: 'Limited features are available. Full trading access requires KYC approval.',
                },
              ].map((faq, idx) => (
                <details key={idx} className="group">
                  <summary className="cursor-pointer text-white font-medium py-2 px-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">
                    {faq.q}
                  </summary>
                  <p className="text-gray-400 text-sm mt-2 pl-3 py-2">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
