<script>
export default {
  props: {
    todo: Object,
  },
  emits: {
    remove: ({ id }) => id !== undefined,
  }
};
</script>
<template>
  <li :class="{ completed: todo.completed }">
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
        @click="$emit('remove', { id: todo.id })" 
        type="button" 
        class="destroy"
      >
      </button>
    </div>
    <input 
      type="text" 
      class="edit" 
      @value="todo.completed"
    >
  </li>
</template>