import React from 'react';
import { Euro } from 'lucide-react';

interface PriceCardProps {
    price: number;
}

export const PriceCard: React.FC<PriceCardProps> = ({ price }) => {
    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-400/20 rounded-full">
                    <Euro className="w-8 h-8 text-yellow-400" />
                </div>
                <div>
                    <p className="text-sm text-gray-300">Average Price</p>
                    <h3 className="text-3xl font-bold">
                        {price.toFixed(2)} <span className="text-lg font-normal">cents/kWh</span>
                    </h3>
                </div>
            </div>
        </div>
    );
};
