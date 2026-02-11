<template>
  <div v-for="task in list" :key="task.id" :class="{readonly}">
    <label>
      <input type="checkbox" v-model="task.completed" :disabled="readonly">
      {{ task.title }}
    </label>
    <div class="subtasks" v-if="task.subtasks?.length">
      <TodoListVueUse
        v-model="task.subtasks"
        :readonly="readonly"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Task } from '@/models/Task'
import { useVModel } from '@vueuse/core'
import * as R from 'ramda'
import { watch } from 'vue'

const props = defineProps<{
  modelValue: Task[]
  readonly?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', payload: Task[]): void
}>()

const list = useVModel(props, 'modelValue', emit, {
  passive: true,
  deep: true,
  clone: R.clone,
})

watch(() => props.modelValue, () => list.value = R.clone(props.modelValue), { deep: true })

</script>

<style scoped>
.subtasks {
  padding-left: 2ch;
}
.readonly {
  color: rgba(from white r g b / 0.4);
}
</style>
