import { useEffect, useState } from 'react';
import type { AdviceResponse } from './types';
import { fetchAdvice } from './api/client';
import { MOCK_ADVICE } from './api/mockData';
import { Dashboard } from './components/Dashboard';
import { Loader2, AlertTriangle, Calendar, ToggleLeft, ToggleRight } from 'lucide-react';

function App() {
  const [data, setData] = useState<AdviceResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('2025-11-19');
  const [useMock, setUseMock] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (useMock) {
          // Simulate network delay for realistic feel
          await new Promise(resolve => setTimeout(resolve, 800));
          setData(MOCK_ADVICE);
        } else {
          const advice = await fetchAdvice(selectedDate);
          setData(advice);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [selectedDate, useMock]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white selection:bg-green-500 selection:text-white flex flex-col">
      {/* Navigation / Header */}
      <nav className="p-4 flex flex-wrap gap-4 justify-between items-center z-10 w-full max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
            SmartGrid
          </h1>
          {useMock && (
            <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-semibold border border-yellow-500/30">
              DEMO MODE
            </span>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setUseMock(!useMock)}
            className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors"
            title={useMock ? "Switch to Live Data" : "Switch to Mock Data"}
          >
            <span>{useMock ? "Mock Data" : "Live Data"}</span>
            {useMock ? <ToggleRight className="w-6 h-6 text-yellow-400" /> : <ToggleLeft className="w-6 h-6 text-gray-500" />}
          </button>

          <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-2 hover:bg-white/10 transition-colors">
            <Calendar className="w-5 h-5 text-green-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent border-none text-white text-sm font-medium focus:ring-0 outline-none [&::-webkit-calendar-picker-indicator]:invert cursor-pointer"
              disabled={useMock}
            />
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col relative w-full">
        {loading && (
          <div className="flex flex-col items-center justify-center flex-grow">
            <Loader2 className="w-12 h-12 text-green-500 animate-spin mb-4" />
            <p className="text-gray-400 animate-pulse">Analyzing grid data...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center flex-grow px-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md text-center backdrop-blur-sm">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Connection Error</h2>
              <p className="text-red-300 mb-6">{error}</p>
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium shadow-lg shadow-red-500/20"
                >
                  Retry
                </button>
                {!useMock && (
                  <button
                    onClick={() => setUseMock(true)}
                    className="text-sm text-red-300 hover:text-white underline decoration-dashed underline-offset-4"
                  >
                    Switch to Demo Mode
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {!loading && !error && data && (
          <div className="w-full">
            <Dashboard data={data} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
