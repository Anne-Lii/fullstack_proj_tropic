import { createRouter, createWebHistory } from 'vue-router';
import ProductsView from '../views/ProductsView.vue';
import LoginView from '../views/LoginView.vue';
import AddProduct from '../views/AddProductView.vue';
import AddCategory from '../views/AddCategoryView.vue';

const routes = [
  {
    path: '/',
    redirect: '/login' 
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsView,

    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if (!token) {
        next('/login'); //If no token exist redirect to /login
      } else {
        next();
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/add-category',
    name: 'AddCategory',
    component: AddCategory
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes
});

console.log(import.meta.env.BASE_URL);//DEBUG!!!!!!!!!!!!!!!!!!!!!!!!!!

export default router;
