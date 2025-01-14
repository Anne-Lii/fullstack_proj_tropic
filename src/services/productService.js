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