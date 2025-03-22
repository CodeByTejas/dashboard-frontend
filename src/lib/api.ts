import axios from 'axios';
import type { User, Product } from '../types';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

// User operations
export const getUsers = () => api.get<User[]>('/users').then(res => res.data);
export const getUser = (id: string) => api.get<User>(`/users/${id}`).then(res => res.data);
export const createUser = (user: Omit<User, 'id'>) => api.post<User>('/users', user).then(res => res.data);
export const updateUser = (id: string, user: Partial<User>) => api.put<User>(`/users/${id}`, user).then(res => res.data);
export const deleteUser = (id: string) => api.delete(`/users/${id}`).then(res => res.data);

// Product operations
export const getProducts = () => api.get<Product[]>('/products').then(res => res.data);
export const getProduct = (id: string) => api.get<Product>(`/products/${id}`).then(res => res.data);
export const createProduct = (product: Omit<Product, 'id'>) => api.post<Product>('/products', product).then(res => res.data);
export const updateProduct = (id: string, product: Partial<Product>) => api.put<Product>(`/products/${id}`, product).then(res => res.data);
export const deleteProduct = (id: string) => api.delete(`/products/${id}`).then(res => res.data);

// Category operations
export const getCategories = () => api.get<string[]>('/products/categories').then(res => res.data);
export const getProductsByCategory = (category: string) => api.get<Product[]>(`/products/category/${category}`).then(res => res.data);