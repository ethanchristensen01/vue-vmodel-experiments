<template>
  <div v-for="task in list" :key="task.id" :class="{readonly}">
    <label>
      <input type="checkbox" v-model="task.completed" :disabled="readonly">
      {{ task.title }}
    </label>
    <div class="subtasks" v-if="task.subtasks?.length">
      <TodoList
        v-model="task.subtasks"
        :readonly="readonly"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Task } from '@/models/tasks'

const list = defineModel<Task[]>()
const props = defineProps<{
  readonly?: boolean
}>()

</script>

<style scoped>
.subtasks {
  padding-left: 2ch;
}
.readonly {
  color: rgba(from white r g b / 0.4);
}
</style>
