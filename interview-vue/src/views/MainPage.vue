<template>
  <fieldset>
    <TodoList
      v-model:model-value="tasks"
      @update:model-value="onUpdate"
    />
  </fieldset>
  <div v-if="allDone">
    All done!
  </div>
</template>

<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
import { Task } from '@/models/Task'
import { computed, ref, watch } from 'vue'

const tasks = ref([
  new Task('Submit presentation', [
    new Task('Draft', [], { completed: true }),
    new Task('Create'),
    new Task('Review'),
    new Task('Submit')
  ]),
  new Task('Get haircut'),
  new Task('Go to work'),
  new Task('Interview')
])

const allDone = computed(() => {
  return tasks.value.every(t => t.isAllComplete())
})

watch(() => tasks, v => console.log('watch task', v.value))
watch(() => tasks, v => console.log('watch task deep', v.value), { deep: true })

function onUpdate (value?: Task[]) {
  console.log('v-model update', value)
}

</script>

<style scoped>

</style>
