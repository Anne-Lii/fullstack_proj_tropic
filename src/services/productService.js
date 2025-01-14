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