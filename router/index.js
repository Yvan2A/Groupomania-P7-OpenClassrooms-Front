import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";


const routes = [
  // ROUTES USERS
  {
    path: '/',
    redirect: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/CreateAccountView.vue'),
  },

  // ROUTE PAGE PRINCIPALE
  {
    path: '/actu',
    name: 'actu',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/ActuView.vue'),
  },
  {
    path: '/profil',
    name: 'profil',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/ProfilView.vue'),
  },
  // ROUTES GESTION DES POST USERS
  {
    path: '/modify-post/:id',
    name: 'Modify-Post',
    component: () => import('../views/Modify-Post.vue'),
    meta: { requiresAuth: true },
  },
  // ROUTES GESTION DES COMMENTAIRES USERS
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Sécurite d'acces au pages
router.beforeEach((to, from, next) =>
{
  // console.log('pas init');
  console.log(to);
  console.log(from);
  const  token  = localStorage.getItem('token');
  console.log(token);
  if ((to.path == '/login' || to.path == '/signup') && token) {
    next('/actu');
  }
  if ((to.path == '/actu') && !token) {
    next('/login');
  }
  
  next();
  
});

export default router;
