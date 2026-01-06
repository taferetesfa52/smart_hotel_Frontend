import React from 'react';
import { Lightbulb, Zap, Thermometer, Info } from 'lucide-react';

interface RecommendationListProps {
    recommendations: string[];
}

export const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations }) => {
    const getIcon = (text: string) => {
        if (text.includes('Boilers') || text.includes('heat')) return <Thermometer className="w-5 h-5 text-orange-400" />;
        if (text.includes('Charging') || text.includes('EV')) return <Zap className="w-5 h-5 text-yellow-400" />;
        return <Lightbulb className="w-5 h-5 text-blue-400" />;
    };

    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl col-span-full">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Info className="w-6 h-6 mr-2 text-indigo-400" />
                Smart Recommendations
            </h3>
            <div className="space-y-4">
                {recommendations.map((rec, index) => (
                    <div
                        key={index}
                        className="flex items-start bg-black/20 p-4 rounded-xl border border-white/5 hover:bg-black/40 transition-colors"
                    >
                        <div className="mt-1 p-2 bg-white/5 rounded-full mr-4">
                            {getIcon(rec)}
                        </div>
                        <p className="text-gray-200 text-lg leading-relaxed">{rec}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
