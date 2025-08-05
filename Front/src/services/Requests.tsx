import {authService} from "./AuthService.tsx";

    export const API_URL = "http://localhost:8000/api";

    export const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
        try {
            const token = authService.getToken();
            if (!token) {
                throw new Error("No authentication token found");
            }

            const headers: HeadersInit = {
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                Authorization: `Bearer ${token}`,
            };

            if (!(options.body instanceof FormData)) {
                headers["Content-Type"] = "application/json";
            }

            const config: RequestInit = {
                ...options,
                headers: { ...headers, ...options.headers },
                credentials: "include", // Send cookies (e.g., Sanctum session)
            };

            console.log('🔍 Making request to:', url, 'with config:', config);
            const response = await fetch(url, config);
            const text = await response.text();
            console.log('🔍 Response status:', response.status, 'Response text:', text);

            if (!response.ok) {
                let errorMessage = `HTTP ${response.status}`;
                try {
                    const errorData = JSON.parse(text);
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch {
                    errorMessage = text || errorMessage;
                }
                throw new Error(errorMessage);
            }

            return JSON.parse(text);
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    };
    export const makeSimpleRequest = async (url: string) => {
        try {
            console.log('🔍 Making request to:', url);
            const response = await fetch(url);
            const text = await response.text();
            console.log('🔍 Response status:', response.status, 'Response text:', text);

            if (!response.ok) {
                let errorMessage = `HTTP ${response.status}`;
                try {
                    const errorData = JSON.parse(text);
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch {
                    errorMessage = text || errorMessage;
                }
                throw new Error(errorMessage);
            }

            return JSON.parse(text);
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    };