import React from 'react';
import type { AdviceResponse } from '../types';
import { PriceCard } from './PriceCard';
import { WindGauge } from './WindGauge';
import { RecommendationList } from './RecommendationList';
import { BestHoursDisplay } from './BestHoursDisplay';

interface DashboardProps {
    data: AdviceResponse;
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                    Smart Energy Advisor
                </h1>
                <p className="text-xl text-gray-400">
                    Optimization for {new Date(data.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <PriceCard price={data.data_context.average_price} />
                <WindGauge percentage={data.data_context.wind_share_percent} />
                <BestHoursDisplay hours={data.lowest_price_hours} />
            </div>

            <div className="grid grid-cols-1 gap-6">
                <RecommendationList recommendations={data.recommendations} />
            </div>

            <footer className="mt-12 text-center text-gray-500 text-sm">
                <p>Data Sources: {data.data_context.data_source_prices} & {data.data_context.data_source_grid}</p>
            </footer>
        </div>
    );
};
