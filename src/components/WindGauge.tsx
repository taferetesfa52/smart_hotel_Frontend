import React from 'react';
import { Wind } from 'lucide-react';

interface WindGaugeProps {
    percentage: number;
}

export const WindGauge: React.FC<WindGaugeProps> = ({ percentage }) => {
    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-400/20 rounded-full">
                    <Wind className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                    <p className="text-sm text-gray-300">Wind Power</p>
                    <div className="flex items-baseline space-x-2">
                        <h3 className="text-3xl font-bold">{percentage}%</h3>
                        <span className="text-sm text-green-400">of grid</span>
                    </div>
                </div>
            </div>
            <div className="mt-4 w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                <div
                    className="bg-gradient-to-r from-blue-400 to-green-400 h-2.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};
