<script>
  import { TODOS_KINDS } from '@/constants/todosKinds';

  const EMIT_KEY = 'update:modelValue';

  export default {
    data() {
      return {
        TODOS_KINDS,
        EMIT_KEY,
      };
    },
    props: {
      modelValue: String,
    },
    emits: [EMIT_KEY],
  }
</script>

<template>
  <ul class="filters">
    <li>
      <a 
        aria-current="page" 
        :class="{ selected: modelValue === TODOS_KINDS.ALL}" 
        href="#/"
        @click="$emit(EMIT_KEY, TODOS_KINDS.ALL)"
      >
        All
      </a>
    </li>
    <li>
      <a 
        :class="{ selected: modelValue === TODOS_KINDS.ACTIVE}" 
        href="#/active"
        @click="$emit(EMIT_KEY, TODOS_KINDS.ACTIVE)"
      >
        Active
      </a>
    </li>
    <li>
      <a 
        :class="{ selected: modelValue === TODOS_KINDS.COMPLETED}" 
        href="#/completed"
        @click="$emit(EMIT_KEY, TODOS_KINDS.COMPLETED)"
      >
        Completed
      </a>
    </li>
  </ul>
</template>