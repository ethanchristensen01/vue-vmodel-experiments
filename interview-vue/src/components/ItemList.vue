<template>
  <li :class="{readonly}">
    <label>
      <input type="checkbox" v-model="completed" :disabled="readonly">
      {{ modelValue.content.title }}
    </label>
    <ul v-if="children">
      <ItemList
        v-for="(c, index) in children"
        :model-value="c"
        @update:model-value="updateChild(index, $event)"
        :key="c.content.id"
        :readonly="readonly"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { Tree, Task } from '@/models/tasks'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: Tree<Task>
  readonly?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', payload: Tree<Task>): void
}>()

const completed = computed({
  get(): boolean {
    return props.modelValue.content.completed
  },
  set(completed: boolean) {
    props.modelValue.content.completed = completed
    emit('update:modelValue', props.modelValue)
  }
})

const children = computed(() => props.modelValue.children)

function updateChild(index: number, value: Tree<Task>) {
  props.modelValue.children![index] = value
  emit('update:modelValue', props.modelValue)
}
structuredClone
</script>

<style scoped>
ul {
  padding-left: 2ch;
  list-style-type: none;
}
li {
  list-style-type: none;
}
.readonly {
  color: rgba(from white r g b / 0.4);
}
</style>
