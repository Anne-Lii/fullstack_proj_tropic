'use strict'

import axios from 'axios';

const API_URL = 'https://projekt-webbtjanst-api-anne-lii.onrender.com/products';

//Get all products
export const getAllProducts = (token) => {
    return axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

//Remove a product by id
export const removeProductById = (productId, token) => {
    return axios.delete(`${API_URL}/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  };

//Update a product by ID
export const updateProductById = (productId, updatedProduct, token) => {
    return axios.put(`${API_URL}/${productId}`, updatedProduct, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error('Fel vid uppdatering av produkt:', error.response.data);
      throw error;
    });
  };

// Update product stock
export const updateProductStock = (productId, stockData, token) => {
    return axios.patch(`${API_URL}/${productId}/stock`, stockData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
};
  