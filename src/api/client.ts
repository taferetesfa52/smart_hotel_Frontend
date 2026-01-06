import type { AdviceResponse } from '../types';

export const fetchAdvice = async (date?: string): Promise<AdviceResponse> => {
    const targetDate = date || new Date().toISOString().split('T')[0];
    // Use the local proxy path '/api' which redirects to the actual URL
    const response = await fetch(`/api/advice?date=${targetDate}`);

    if (!response.ok) {
        throw new Error('Failed to fetch advice');
    }

    return response.json();
};
