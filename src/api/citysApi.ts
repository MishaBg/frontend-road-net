import type { IPaginatedCitys, ICity, ICartBadge } from '../types';
import { CITYS_MOCK } from './mock';
import { dest_api } from '../config/tauri_config';


const resolveImageUrls = (citys: ICity[]): ICity[] => {
    const isTauri = typeof window !== 'undefined' && (window as any).__TAURI__;
    
    return citys.map(city => {
        if (!city.image) return city;

        // Для Tauri используем полный URL
        if (isTauri) {
            return {
                ...city,
                image: `http://172.20.10.3:9000/web/${city.image}`
            };
        } else {
            // Для браузера используем относительный путь через прокси
            return {
                ...city,
                image: `http://172.20.10.3:9000/web/${city.image}`
            };
        }
    });
};
// Получение списка факторов с фильтраией по названию
export const getCitys = async (title: string): Promise<IPaginatedCitys> => {
    const url = `${dest_api}/cites${title ? `?name=${encodeURIComponent(title)}` : ''}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Backend is not available');
        const data = await response.json();
        return {
            items: resolveImageUrls(data || []),
            total: data || 0
        };
    } catch (error) {
        console.warn('Failed to fetch from backend, using mock data.', error);
        const filtered = CITYS_MOCK.items.filter(f =>
            f.name.toLowerCase().includes(title.toLowerCase())
        );
        return { items: filtered, total: filtered.length };
    }
};

// Получение одного фактора по ID
export const getCityById = async (id: string): Promise<ICity | null> => {
    const url = `${dest_api}/city/${id}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Backend not available');
        const city = await response.json();
        if (city && city.image) {
            city.image = `http://172.20.10.3:9000/web/${city.image}`;
        }
        return city;
    } catch (error) {
        console.warn(`Failed to fetch city ${id}, using mock data.`, error);
        return CITYS_MOCK.items.find(f => f.id === parseInt(id)) || null;
    }
};

export const getCartBadge = async (): Promise<ICartBadge> => {

    const url = `${dest_api}/city/citescart`;

    try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('No auth token found');

        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch cart data');
        return await response.json();
    } catch (error) {
        console.warn('Could not fetch cart data, assuming cart is empty.', error);
        return { city_id: null, count: 0 };
    }
};