import { useEffect, useState } from 'react';
import type { AdviceResponse } from './types';
import { fetchAdvice } from './api/client';
import { Dashboard } from './components/Dashboard';
import { Loader2, AlertTriangle } from 'lucide-react';

function App() {
  const [data, setData] = useState<AdviceResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        // Using "2025-11-19" as default for demo if today's date fails or is requested specifically, 
        // but normally we'd allow the user to select.
        // For the purpose of this task, we will try to fetch the specific date mentioned in the prompt first,
        // or fall back to general logic. The prompt URL had ?date=2025-11-19.
        const advice = await fetchAdvice('2025-11-19');
        setData(advice);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white selection:bg-green-500 selection:text-white">
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Loader2 className="w-12 h-12 text-green-500 animate-spin mb-4" />
          <p className="text-gray-400 animate-pulse">Analyzing grid data...</p>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Connection Error</h2>
            <p className="text-red-300 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {!loading && !error && data && (
        <Dashboard data={data} />
      )}
    </div>
  );
}

export default App;
