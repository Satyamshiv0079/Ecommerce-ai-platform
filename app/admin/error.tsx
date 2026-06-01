'use client';

import { useEffect } from 'react';
import { Terminal, RefreshCw, AlertTriangle } from 'lucide-react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin layout error boundary caught:', error);
  }, [error]);

  return (
    <div className="space-y-6 max-w-2xl mx-auto my-12 bg-white p-8 rounded-2xl border">
      <div className="flex items-center gap-4 text-red-600">
        <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Admin Console Error</h2>
          <p className="text-sm text-gray-500">A database query or backend action failed</p>
        </div>
      </div>

      <div className="bg-gray-950 text-gray-200 rounded-xl p-4 font-mono text-xs overflow-x-auto space-y-2 border">
        <div className="flex items-center gap-2 border-b border-gray-800 pb-2 text-gray-400">
          <Terminal className="h-4 w-4" />
          <span>System Diagnostics</span>
        </div>
        <p className="text-red-400">{error.message || 'Unknown server error occured'}</p>
        {error.digest && <p className="text-gray-500">Digest: {error.digest}</p>}
        <p className="text-gray-600 mt-2">// Tip: Check if Supabase connection is unpaused and prisma model schema is pushed.</p>
      </div>

      <div className="flex gap-4 pt-2">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 bg-violet-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-violet-700 transition shadow-sm text-sm"
        >
          <RefreshCw className="h-4 w-4" />
          Reload Component
        </button>
        <button
          onClick={() => window.location.reload()}
          className="text-gray-600 hover:text-gray-900 border px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition text-sm"
        >
          Refresh Entire Window
        </button>
      </div>
    </div>
  );
}
