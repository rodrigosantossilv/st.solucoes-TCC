import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import KanbanBoard from './components/KanbanBoard.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/kanbanboard', component: KanbanBoard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
