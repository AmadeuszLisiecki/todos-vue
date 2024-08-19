<script>
  import { HASH_ROUTE, TODOS_KINDS } from '@/constants/constants';

  const EMIT_KEY = 'update:modelValue';

  export default {
    data() {
      return {
        TODOS_KINDS,
        EMIT_KEY,
        HASH_ROUTE,
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
        :href="`${HASH_ROUTE}`"
        @click="$emit(EMIT_KEY, TODOS_KINDS.ALL)"
      >
        All
      </a>
    </li>
    <li>
      <a 
        :class="{ selected: modelValue === TODOS_KINDS.ACTIVE}" 
        :href="`${HASH_ROUTE}${TODOS_KINDS.ACTIVE}`"
        @click="$emit(EMIT_KEY, TODOS_KINDS.ACTIVE)"
      >
        Active
      </a>
    </li>
    <li>
      <a 
        :class="{ selected: modelValue === TODOS_KINDS.COMPLETED}" 
        :href="`${HASH_ROUTE}${TODOS_KINDS.COMPLETED}`"
        @click="$emit(EMIT_KEY, TODOS_KINDS.COMPLETED)"
      >
        Completed
      </a>
    </li>
  </ul>
</template>