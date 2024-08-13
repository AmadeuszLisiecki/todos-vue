<script>
  export default {
    data() {
      return {
        editing: false,
        newTitle: '',
      }
    },
    props: {
      todo: Object,
    },
    emits: {
      remove: ({ id }) => id !== undefined,
    },
    methods: {
      edit() {
        this.editing = true;
        this.newTitle = this.todo.title;
        this.$nextTick(() => {
          this.$refs['new-title'].focus();
        });
      },
      cancel() {
        this.editing = false;
      },
      rename() {
        if (this.editing) {
          this.todo.title = this.newTitle;
          this.cancel();
        }
      },
    },
  };
</script>
<template>
  <li :class="{ completed: todo.completed, edit: editing }">
    <div 
      class="view" 
      role="row" 
      tabindex="0"
    >
      <template v-if="!editing">
        <input
          type="checkbox" 
          class="toggle"
          v-model="todo.completed"
        />
        <label @dblclick="edit">{{ todo.title }}</label>
      </template>
    
      <form v-if="editing" @submit.prevent="rename">
        <input
          type="text"
          class="todo-editing__title-field"
          placeholder="Empty todo will be deleted."
          value="Todo is being edited now."
          @keyup.esc="cancel"
          v-model="newTitle"
          @blur="rename"
          ref="new-title"
        >
      </form>

      <button
        v-else
        @click="$emit('remove', { id: todo.id })" 
        type="button" 
        class="destroy"
      >
      </button>
    </div>
  </li>
</template>