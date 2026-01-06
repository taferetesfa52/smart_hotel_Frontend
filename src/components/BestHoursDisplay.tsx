import React from 'react';
import { Clock } from 'lucide-react';

interface BestHoursDisplayProps {
    hours: number[];
}

export const BestHoursDisplay: React.FC<BestHoursDisplayProps> = ({ hours }) => {
    // Sort hours just in case
    const sortedHours = [...hours].sort((a, b) => a - b);

    return (
        <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl col-span-full md:col-span-1 lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-purple-400" />
                Lowest Price Hours
            </h3>

            <div className="flex flex-wrap gap-3">
                {sortedHours.map((hour) => (
                    <div
                        key={hour}
                        className="flex flex-col items-center justify-center w-20 h-20 bg-white/10 border border-white/10 rounded-xl hover:bg-green-500/20 hover:border-green-500/50 transition-all cursor-default group"
                    >
                        <span className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                            {hour.toString().padStart(2, '0')}
                        </span>
                        <span className="text-xs text-gray-400">:00</span>
                    </div>
                ))}
            </div>
            <p className="mt-4 text-sm text-gray-400">
                Best times to run high-energy appliances.
            </p>
        </div>
    );
};
