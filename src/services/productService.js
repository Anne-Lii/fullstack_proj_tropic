'use strict'

import apiClient from './apiClient';//import global axios instance

const API_URL = 'https://projekt-webbtjanst-api-anne-lii.onrender.com/products';

//Get all products
export const getAllProducts = () => {
  return apiClient.get(API_URL);
};

//Add product
export const addProduct = (product) => {
  return apiClient.post(API_URL, product)
  .then(response => response)
  .catch(error => {
      console.error('Fel vid tillägg av produkt:', error.response.data);
      throw error;
  });
};

//Remove a product by id
export const removeProductById = (productId) => {
  return apiClient.delete(`${API_URL}/${productId}`);
};

//Update a product by ID
export const updateProductById = (productId, updatedProduct) => {
  return apiClient.put(`${API_URL}/${productId}`, updatedProduct)
  .then(response => response)
  .catch(error => {
      console.error('Fel vid uppdatering av produkt:', error.response.data);
      throw error;
  });
};

// Update product stock
export const updateProductStock = (productId, stockData) => {
  return apiClient.patch(`${API_URL}/${productId}/stock`, stockData);
};