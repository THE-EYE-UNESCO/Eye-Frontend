const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  async post(endpoint: string, data: any) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null;

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    if (user?.id) {
      headers['x-test-user-id'] = user.id;
      headers['x-test-user-role'] = user.role || 'CITIZEN';
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    let result;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        result = await response.json();
    } else {
        const text = await response.text();
        throw new Error(`Server error (${response.status}): ${text.substring(0, 100)}`);
    }

    if (!response.ok) {

      throw new Error(result.message || 'Something went wrong');
    }

    return result;
  },

  async get(endpoint: string) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers: Record<string, string> = {};

    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null;

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (user?.id) {
      headers['x-test-user-id'] = user.id;
      headers['x-test-user-role'] = user.role || 'CITIZEN';
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers,
    });

    let result;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        result = await response.json();
    } else {
        const text = await response.text();
        throw new Error(`Server error (${response.status}): ${text.substring(0, 100)}`);
    }

    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong');
    }

    return result;
  },

  async delete(endpoint: string) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers: Record<string, string> = {};

    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null;

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (user?.id) {
      headers['x-test-user-id'] = user.id;
      headers['x-test-user-role'] = user.role || 'CITIZEN';
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
    });

    let result;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        result = await response.json();
    } else {
        const text = await response.text();
        throw new Error(`Server error (${response.status}): ${text.substring(0, 100)}`);
    }

    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong');
    }

    return result;
  },

  async put(endpoint: string, data: any) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null;

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (user?.id) {
      headers['x-test-user-id'] = user.id;
      headers['x-test-user-role'] = user.role || 'CITIZEN';
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });

    let result;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        result = await response.json();
    } else {
        const text = await response.text();
        throw new Error(`Server error (${response.status}): ${text.substring(0, 100)}`);
    }

    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong');
    }

    return result;
  },

  async login(credentials: any) {
    const data = await this.post('/auth/login', credentials);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  async register(userData: any) {
    return this.post('/auth/register', userData);
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
