import { createWebHashHistory, createRouter } from 'vue-router';

import './assets/styles/index.css';
import './assets/styles/todo-list.css';
import './assets/styles/todo-editing.css';
import './assets/styles/filters.css';

import { createApp } from 'vue';
import App from './App.vue';
import { TODOS_KINDS } from './constants/constants';

const routes = [
  { path: '/', component: App, children: [
    { path: TODOS_KINDS.ACTIVE, component: App },
    { path: TODOS_KINDS.COMPLETED, component: App },
    ], 
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App)
  .use(router)
  .mount('#app');
