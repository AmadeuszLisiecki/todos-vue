import { createMemoryHistory, createRouter } from 'vue-router';

import './assets/styles/index.css';
import './assets/styles/todo-list.css';
import './assets/styles/todo-editing.css';
import './assets/styles/filters.css';

import { createApp } from 'vue';
import App from './App.vue';

const routes = [
  { path: '/', component: App },
  // { path: '/:status', component: App },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

createApp(App)
  .use(router)
  .mount('#app');
