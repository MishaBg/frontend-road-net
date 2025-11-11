import type { IPaginatedCitys, ICity } from '../types';
import { CITYS_MOCK } from './mock';

const API_PREFIX = '/api';

// Получение списка факторов с фильтраией по названию
export const getCitys = async (title: string): Promise<IPaginatedCitys> => {
    const url = title 
        ? `${API_PREFIX}/cites?name=${encodeURIComponent(title)}`
        : `${API_PREFIX}/cites`;

    try {
        const response = await fetch(url);
        console.log(response)
        if (!response.ok) {
            throw new Error('Backend is not available');
        }
    const data = await response.json();
    return {
        items: data || [],
        total: data.length || 0
    };
    } catch (error) {
        console.warn('Failed to fetch from backend, using mock data.', error);
        const filteredMockItems = CITYS_MOCK.items.filter(city =>
            city.name.toLowerCase().includes(title.toLowerCase())
        );
        return { items: filteredMockItems, total: filteredMockItems.length };
    }
};

// Получение одного фактора по ID
export const getCityById = async (id: string): Promise<ICity | null> => {
    try {
        const response = await fetch(`${API_PREFIX}/city/${id}`);
        if (!response.ok) {
            throw new Error('Backend is not available');
        }
        return await response.json();
    } catch (error) {
        console.warn(`Failed to fetch city ${id}, using mock data.`, error);
        const city = CITYS_MOCK.items.find(f => f.id === parseInt(id));
        return city || null;
    }
};