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
  },
  //Catch-all route to handle invalid paths and redirect to login
  {
    path: '/:pathMatch(.*)*', 
    redirect: '/login'  // Redirects to login for any undefined routes
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes
});


export default router;
