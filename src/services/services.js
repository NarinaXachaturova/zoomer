import api from "./api";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const registration = (data) => {
  return api.post(`${baseURL}/auth/register`, { ...data });
};

export const login = (data) => {
  return api.post(`${baseURL}/auth/login`, { ...data });
};

export const updateUserDetails = (userData) => {
  return api.put(`${baseURL}/user`, userData);
};

export const getUserDetails = () => {
  return api.get(`${baseURL}/user/current-user`);
};

export const refreshAccessToken = (data) => {
  return api.post(`${baseURL}/auth/update-tokens`, { ...data });
};

export const getCartProducts = (data) => {
  return api.get(`${baseURL}/cart`, { ...data });
};

export const addCartProducts = (data) => {
  return api.post(`${baseURL}/cart`, { ...data });
};

export const removeCartProducts = (productId, removeAll) => {
  return api.delete(`${baseURL}/cart/${productId}?removeAll=${removeAll}`);
};

export const getProduct = (productId, data) => {
  return api.get(`${baseURL}/product/${productId}`, { ...data });
};

export const getProducts = (params) => {
  return api.get("/product", { params });
};

export const getCategories = (data) => {
  return api.get(`${baseURL}/product-category`, { ...data });
};

export const purchaseProducts = (data) => {
  return api.post(`${baseURL}/purchases`, { ...data });
};

export const getPurchases = (data) => {
  return api.get(`${baseURL}/purchases`, { ...data });
};

export const getLikedProducts = (data) => {
  return api.get(`${baseURL}/liked-products`, { ...data });
};

export const addLikedProduct = (data) => {
  return api.post(`${baseURL}/liked-products`, { ...data });
};

export const removeLikedProduct = (productId, data) => {
  return api.delete(`${baseURL}/liked-products/${productId}`, { ...data });
};
