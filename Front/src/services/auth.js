// Interfaces for authentication types
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  image?: string;
  role_id: number;
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

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

interface ProfileResponse {
  user: User;
  message?: string;
}

const API_URL = "http://localhost:8000/api"; 

class AuthService {
  /**
   * Registers a new user
   * @param userData User registration data (can be RegisterData or FormData)
   * @returns Promise with authentication response
   */
  async register(userData: RegisterData | FormData): Promise<AuthResponse> {
    try {
      console.log('🔍 Making registration request to:', `${API_URL}/register`);
      console.log('🔍 Request data:', userData);

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
      });

      console.log('🔍 Response status:', response.status);
      console.log('🔍 Response headers:', response.headers);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('🚨 Non-JSON response received:', text.substring(0, 200));
        throw new Error('Server returned non-JSON response. Check Laravel logs.');
      }

      const data = await response.json();
      console.log('🔍 Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }

      if (data.token) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event('authChange'));
      }

      return data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }

  /**
   * Logs in a user
   * @param loginData Login credentials
   * @returns Promise with authentication response
   */
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

  /**
   * Logs out the user
   * @returns Promise with logout status
   */
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

  /**
   * Fetches the authenticated user's profile
   * @returns Promise with profile data
   */
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

  /**
   * Checks if the user is authenticated
   * @returns boolean indicating authentication status
   */
  isAuthenticated(): boolean {
    return !!sessionStorage.getItem("token");
  }

  /**
   * Gets the current user from session storage
   * @returns User data or null
   */
  getCurrentUser(): User | null {
    const userStr = sessionStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Gets the authentication token
   * @returns Token or null
   */
  getToken(): string | null {
    return sessionStorage.getItem("token");
  }

  /**
   * Checks token validity by making a server request
   * @returns Promise<boolean> indicating token validity
   */
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

  /**
   * Refreshes user data from the server
   * @returns Promise with updated user data
   */
  async refreshUserData(): Promise<User> {
    try {
      const profileData = await this.getProfile();
      return profileData.user;
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      throw error;
    }
  }

  /**
   * Clears authentication data
   */
  clearAuthData(): void {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.dispatchEvent(new Event('authChange'));
  }

  /**
   * Checks if the user has a specific role
   * @param requiredRole The required role
   * @returns boolean indicating if the user has the role
   */
  hasRole(requiredRole: string): boolean {
    const user = this.getCurrentUser();
    return user?.roles.some(role => role.name === requiredRole) || false;
  }

  /**
   * Checks if the user is an admin
   * @returns boolean
   */
  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  /**
   * Checks if the user is a customer
   * @returns boolean
   */
  isCustomer(): boolean {
    return this.hasRole('customer');
  }
}
