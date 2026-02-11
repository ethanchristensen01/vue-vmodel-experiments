<template>
  <div v-for="(task, index) in modelValue" :key="task.id" :class="{readonly}">
    <label>
      <input type="checkbox" @change="toggleItem(index, $event)" :disabled="readonly">
      {{ task.title }}
    </label>
    <div class="subtasks" v-if="task.subtasks?.length">
      <TodoListManual
        v-model="task.subtasks"
        @update:model-value="updateChildren(index, $event)"
        :readonly="readonly"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { unref } from 'vue'
import { Task } from '@/models/Task'
import * as R from 'ramda'

const props = defineProps<{
  modelValue: Task[]
  readonly?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:model-value', payload: Task[]): void
}>()

function toggleItem (index: number, event: Event) {
  const clone = R.clone(unref(props.modelValue)) satisfies Task[]
  const newValue = (event.currentTarget as HTMLInputElement).checked
  clone[index]!.completed = newValue
  emit('update:model-value', clone)
}

function updateChildren (index: number, childValue: Task[]) {
  const clone = R.clone(unref(props.modelValue)) satisfies Task[]
  clone[index]!.subtasks! = childValue
  emit('update:model-value', clone)
}

</script>

<style scoped>
.subtasks {
  padding-left: 2ch;
}
.readonly {
  color: rgba(from white r g b / 0.4);
}
</style>
