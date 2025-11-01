import { AuthService } from './auth';

class ApiService {
  private baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api`;

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...AuthService.getAuthHeaders(),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  // Authentication
  async login(email: string, password: string) {
    return AuthService.login(email, password);
  }

  // Services
  async getServices() {
    return this.request('/services');
  }

  async getFeaturedServices() {
    return this.request('/services/featured');
  }

  async getService(slug: string) {
    return this.request(`/services/${slug}`);
  }

  async createService(serviceData: any) {
    return this.request('/services', {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  }

  async updateService(id: string, serviceData: any) {
    return this.request(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData),
    });
  }

  async deleteService(id: string) {
    return this.request(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Memberships
  async getMemberships() {
    return this.request('/memberships');
  }

  async createMembership(membershipData: any) {
    return this.request('/memberships', {
      method: 'POST',
      body: JSON.stringify(membershipData),
    });
  }

  async updateMembership(id: string, membershipData: any) {
    return this.request(`/memberships/${id}`, {
      method: 'PUT',
      body: JSON.stringify(membershipData),
    });
  }

  async deleteMembership(id: string) {
    return this.request(`/memberships/${id}`, {
      method: 'DELETE',
    });
  }

  // Testimonials
  async getTestimonials() {
    return this.request('/testimonials');
  }

  async createTestimonial(testimonialData: any) {
    return this.request('/testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonialData),
    });
  }

  async updateTestimonial(id: string, testimonialData: any) {
    return this.request(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(testimonialData),
    });
  }

  async deleteTestimonial(id: string) {
    return this.request(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  // Settings
  async getSettings() {
    return this.request('/settings');
  }

  async updateSetting(key: string, value: string) {
    return this.request(`/settings/${key}`, {
      method: 'PUT',
      body: JSON.stringify({ value }),
    });
  }

  async updateSettings(settings: Record<string, string>) {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // Homepage Content
  async getHomepageContent() {
    return this.request('/homepage');
  }

  async updateHomepageContent(content: any) {
    return this.request('/homepage', {
      method: 'PUT',
      body: JSON.stringify(content),
    });
  }

  // About Content
  async getAboutContent() {
    return this.request('/about');
  }

  async updateAboutContent(content: any) {
    return this.request('/about', {
      method: 'PUT',
      body: JSON.stringify(content),
    });
  }

  // File Upload
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${this.baseURL}/upload/image`, {
      method: 'POST',
      headers: {
        ...AuthService.getAuthHeaders(),
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }

    return data;
  }

  async uploadImages(files: File[]) {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    const response = await fetch(`${this.baseURL}/upload/images`, {
      method: 'POST',
      headers: {
        ...AuthService.getAuthHeaders(),
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }

    return data;
  }

  async deleteImage(publicId: string) {
    return this.request(`/upload/image/${publicId}`, {
      method: 'DELETE',
    });
  }

  async getCategoriesAdmin() {
    return this.request('/categories/admin');
  }
}

export const apiService = new ApiService();