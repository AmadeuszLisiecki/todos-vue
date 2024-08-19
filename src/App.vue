<script>
  import StatusFilter from './components/StatusFilter.vue';
  import Todo from './components/Todo.vue';
  import { TODOS_KINDS } from './constants/todosKinds';

  const TODOS_KEY = 'todos';

  export default {
    components: {
      StatusFilter,
      Todo,
    },
    data() {
      const data = localStorage.getItem(TODOS_KEY);
      const todos = data === null ? [] : JSON.parse(data);
      let statusFilterName;
      const pathName = location.pathname;

      if (pathName.includes(TODOS_KINDS.ACTIVE)) {
        statusFilterName = TODOS_KINDS.ACTIVE;
      } else if (pathName.includes(TODOS_KINDS.COMPLETED)) {
        statusFilterName = TODOS_KINDS.COMPLETED;
      } else {
        statusFilterName = TODOS_KINDS.ALL;
      }

      return {
        todos,
        title: '',
        statusFilterName,
      };
    },
    computed: {
      activeTodos() {
        return this.todos.filter(todo => !todo.completed);
      },
      activeTodosLength() {
        return this.activeTodos.length;
      },
      completedTodos() {
        return this.todos.filter(todo => todo.completed);
      },
      visibleTodos() {
        switch (this.statusFilterName) {
          case TODOS_KINDS.ACTIVE:
            return this.activeTodos;
          case TODOS_KINDS.COMPLETED:
            return this.completedTodos;
          case TODOS_KINDS.ALL:
          default:
            return this.todos;
        }
      },
    },
    watch: {
      todos: {
        deep: true,
        handler() {
          localStorage.setItem(TODOS_KEY, JSON.stringify(this.todos));
        },
      },
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
      },
      removeTodo({ id }) {
        const index = this.todos.findIndex(todo => todo.id === id);

        if (index > -1) {
          this.todos.splice(index, 1);
        }
      },
      removeCompleted() {
        this.todos = this.activeTodos;
      },
      reverseStatuses() {
        const newStatus = !!this.activeTodosLength;

        this.todos = this.todos.map(todo => {
          todo.completed = newStatus;

          return todo;
        });
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
          @click="reverseStatuses"
        >
        <label for="toggle-all">Mark all as complete</label>
        <TransitionGroup class="todo-list" tag="ul" name="todo-list">
          <Todo 
            v-for="todo of visibleTodos" 
            :todo="todo"  
            @remove="removeTodo"
            :key="todo.id"
          />
        </TransitionGroup>
      </section>
      <footer class="footer">
        <span class="todo-count">
          {{`${activeTodosLength} item${activeTodosLength === 1 ? '' : 's'} left`}}
        </span>
        <StatusFilter v-model="statusFilterName"
        />
        <button 
          type="button" 
          class="clear-completed"
          @click="removeCompleted"
        >
          Clear completed
        </button>
      </footer>
    </div>
  </div>
</template>
