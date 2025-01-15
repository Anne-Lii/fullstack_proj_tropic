import apiClient from './apiClient';

const API_URL = 'https://projekt-webbtjanst-api-anne-lii.onrender.com/categories';

//Add a category with POST-method
export const addCategory = (category) => {
    return apiClient.post(API_URL, category);
};

//Get all categories with GET-method
export const getCategories = () => {
    return apiClient.get(API_URL);
};

//Remove a category with DELETE-method using category_name
export const removeCategory = (categoryName) => {
    // Send a DELETE request to remove category by name
    return apiClient.delete(`${API_URL}/${categoryName}`);
};
  