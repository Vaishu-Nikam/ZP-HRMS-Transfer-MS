import api from './api';

// ==================== GET ALL ====================
export const getPosts = async () => {
  const res = await api.get('/posts');
  return res.data.data; // ✅ array
};

// ==================== GET BY ID ====================
export const getPostById = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data.data;
};

// ==================== CREATE ====================
export const createPost = async (payload) => {
  const res = await api.post('/posts', payload);
  return res.data;
};

// ==================== UPDATE ====================
export const updatePost = async (id, payload) => {
  const res = await api.put(`/posts/${id}`, payload);
  return res.data;
};

// ==================== DELETE ====================
export const deletePost = async (id) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};