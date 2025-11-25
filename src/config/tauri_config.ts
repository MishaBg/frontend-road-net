const target_tauri = typeof window !== 'undefined' && (window as any).__TAURI__;

export const api_proxy_addr = "http://172.20.10.3:8080";
export const img_proxy_addr = "http://172.20.10.3:9000";

export const dest_api = target_tauri ? `${api_proxy_addr}/api` : "/api";
export const dest_img = target_tauri ? img_proxy_addr : "";
export const dest_root = target_tauri ? "" : import.meta.env.BASE_URL;

