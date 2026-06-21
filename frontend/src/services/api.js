import axios from 'axios';

// Adicionamos o prefixo global /api que a sua API Express usa por padrão
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Injeta o token nas requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@ProvaFullstack:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Criamos e exportamos os objetos exatamente com os nomes que as páginas dão import
export const authService = {
  login: async (email, password) => {
    // Isso vai gerar: http://127.0.0.1:3000/api/auth/login
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('@ProvaFullstack:token', response.data.token);
      localStorage.setItem('@ProvaFullstack:user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('@ProvaFullstack:token');
    localStorage.removeItem('@ProvaFullstack:user');
  }
};

const mapEndpoint = (endpoint) => {
  if (endpoint === 'usuarios') return '/users';
  if (endpoint === 'itens') return '/cars'; // fallback genérico para carros para não dar 404
  return `/${endpoint}`;
};

export const crudService = {
  getAll: async (endpoint) => {
    const response = await api.get(mapEndpoint(endpoint));
    return response.data;
  },
  get: async (endpoint) => {
    const response = await api.get(mapEndpoint(endpoint));
    return response.data;
  },
  create: async (endpoint, data) => {
    const response = await api.post(mapEndpoint(endpoint), data);
    return response.data;
  },
  update: async (endpoint, id, data) => {
    const response = await api.put(`${mapEndpoint(endpoint)}/${id}`, data);
    return response.data;
  },
  delete: async (endpoint, id) => {
    const response = await api.delete(`${mapEndpoint(endpoint)}/${id}`);
    return response.data;
  }
};

export default api;