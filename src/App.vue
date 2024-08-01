<script>
import { todos } from './todos.ts';

const TODOS_KEY = 'todos';

export default {
  data() {
    const data = localStorage.getItem(TODOS_KEY);
    const todos = data === null ? [] : JSON.parse(data);

    return {
      todos,
      title: '',
    };
  },
  computed: {
    activeTodosLength() {
      return this.todos.filter(todo => !todo.completed).length;
    },
  },
  watch: {
    todos: {
      deep: true,
      handler() {
        localStorage.setItem(TODOS_KEY, JSON.stringify(this.todos));
      },
    }
  },
  methods: {
    handleSubmit() {
      if (this.title.trim()) {
        this.todos.push({
          id: Date.now(),
          title: this.title,
          completed: false,
        });
      }

      this.title = '';
    }
  }
};
</script>

<template>
  <div id="root">
    <div class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <form class="todos-form" @submit.prevent="handleSubmit">
          <input 
            type="text" 
            class="new-todo" 
            placeholder="What needs to be done?"
            v-model="title"
          >
        </form>
      </header>
      <section class="main">
        <input 
          type="checkbox" 
          id="toggle-all" 
          class="toggle-all" 
        >
        <label for="toggle-all">Mark all as complete</label>
        <ul v-for="todo, index of todos" class="todo-list">
          <li :class="{
            completed: todo.completed,
          }">
            <div 
              class="view" 
              role="row" 
              tabindex="0"
            >
              <input 
                type="checkbox" 
                class="toggle" 
                v-model="todo.completed"
              >
              <label>{{ todo.title }}</label>
              <button 
                @click="todos.splice(index, 1)"
                type="button" 
                class="destroy"
              >
              </button>
            </div>
            <input 
              type="text" 
              class="edit" 
              value="test 1"
            >
          </li>
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count">
          {{ `${activeTodosLength} item${activeTodosLength === 1 ? '' : 's'} letf`}}
        </span>
        <ul class="filters">
          <li><a aria-current="page" class="selected" href="#/">All</a></li>
          <li><a class="" href="#/active">Active</a></li>
          <li><a class="" href="#/completed">Completed</a></li>
        </ul>
          <button type="button" class="clear-completed">
            Clear completed
          </button>
      </footer>
    </div>
  </div>
</template>
