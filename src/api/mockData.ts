import type { AdviceResponse } from '../types';

export const MOCK_ADVICE: AdviceResponse = {
    date: '2025-11-19',
    lowest_price_hours: [2, 3, 4, 14, 15],
    recommendations: [
        "Charge EV between 02:00 and 05:00 for lowest rates.",
        "Run dishwasher at 14:00 when wind power is high.",
        "Avoid heavy usage between 18:00 and 20:00."
    ],
    data_context: {
        wind_share_percent: 45.2,
        average_price: 3.85,
        data_source_prices: "Nord Pool (Day-ahead)",
        data_source_grid: "Fingrid (Real-time)"
    }
};
