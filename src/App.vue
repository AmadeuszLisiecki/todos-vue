<script>
import { todos } from './todos.ts';

export default {
  data() {
    return {
      todos,
    };
  },
};
</script>

<template>
  <div id="root">
    <div class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <form>
          <input 
            type="text" 
            class="new-todo" 
            placeholder="What needs to be done?"
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
        <span class="todo-count">1 item left</span>
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

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
