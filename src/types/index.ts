export interface AdviceResponse {
    date: string;
    lowest_price_hours: number[]; // e.g., [1, 2, 5]
    recommendations: string[];
    data_context: {
        wind_share_percent: number;
        average_price: number;
        data_source_prices: string;
        data_source_grid: string;
    };
}
