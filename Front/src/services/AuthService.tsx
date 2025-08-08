export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  image?: string;
  roles: Array<{
    id: number;
    name: string;
  }>;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  image?: File;
}

interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

const API_URL = "http://localhost:8000/api";

class AuthService {
  async register(userData: RegisterData | FormData): Promise<AuthResponse> {
    try {
      console.log('🔍 Making registration request to:', `${API_URL}/register`);
      if (userData instanceof FormData) {
        for (const [key, value] of userData.entries()) {
          console.log(`🔍 FormData: ${key} => ${value}`);
        }
      } else {
        console.log('🔍 Request data:', userData);
      }

      const headers: HeadersInit = {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      };

      if (!(userData instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers,
        body: userData instanceof FormData ? userData : JSON.stringify(userData),
        credentials: "include",
      });

      console.log('🔍 Response status:', response.status);
      console.log('🔍 Response headers:', Object.fromEntries(response.headers.entries()));

      // Get the raw response text first
      const responseText = await response.text();
      console.log('🔍 Raw response:', responseText);

      // Try to parse as JSON
      let data: AuthResponse | ErrorResponse;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('🚨 Failed to parse JSON response:', parseError);
        console.error('🚨 Raw response was:', responseText);

        // If response contains HTML or other non-JSON content
        if (responseText.includes('<!DOCTYPE') || responseText.includes('<html')) {
          throw new Error('Server returned HTML instead of JSON. Check Laravel logs for errors.');
        }

        throw new Error(`Invalid JSON response: ${responseText.substring(0, 200)}...`);
      }

      if (!response.ok) {
        if (response.status === 422) {
          throw new Error(JSON.stringify(data.errors || { general: data.message || 'Validation failed' }));
        }
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }

      if ('token' in data && data.token) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event('authChange'));
      }

      return data as AuthResponse;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }

  async login(loginData: LoginData): Promise<AuthResponse> {
    try {
      console.log('🔍 Making request to:', `${API_URL}/login`);

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(loginData),
      });

      console.log('🔍 Response status:', response.status);

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422) {
          throw new Error(JSON.stringify(data.errors || { general: data.message || 'Validation failed' }));
        }
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }

      if (data.token) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event('authChange'));
      }

      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  async logout(): Promise<{ message: string }> {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      window.dispatchEvent(new Event('authChange'));

      return data;
    } catch (error) {
      console.error("Logout failed:", error);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      window.dispatchEvent(new Event('authChange'));
      throw error;
    }
  }

  async getProfile(): Promise<ProfileResponse> {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }

      if (data.user) {
        sessionStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem("token");
  }

  getCurrentUser(): User | null {
    const userStr = sessionStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return sessionStorage.getItem("token");
  }

  async checkTokenValidity(): Promise<boolean> {
    try {
      const token = this.getToken();
      if (!token) return false;

      const response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      return response.ok;
    } catch (error) {
      console.error("Token validation failed:", error);
      return false;
    }
  }

  async refreshUserData(): Promise<User> {
    try {
      const profileData = await this.getProfile();
      return profileData.user;
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      throw error;
    }
  }

  clearAuthData(): void {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.dispatchEvent(new Event('authChange'));
  }

  roles(requiredRole: string): boolean {
    const user = this.getCurrentUser();
    return user?.roles.some(role => role.name === requiredRole) || false;
  }

  isAdmin(): boolean {
    return this.roles('admin');
  }

  isCustomer(): boolean {
    return this.roles('customer');
  }
}

export const authService = new AuthService();