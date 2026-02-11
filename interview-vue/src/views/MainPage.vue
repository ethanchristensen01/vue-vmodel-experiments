<template>
  <section>
    <h2>Todos</h2>
    <fieldset>
      <TodoList
        v-model:model-value="tasks"
        @update:model-value="onUpdate"
      />
    </fieldset>
    <div v-if="allDone">
      All done!
    </div>
  </section>
  <section>
    <details>
      <summary>Debug</summary>
      <div>
        <h3>Copy of Todos</h3>
        <fieldset>
          <TodoList
            v-model="tasksMirror"
          />
        </fieldset>
      </div>
      <output>
        <code>
          tasks.value === tasksMirror.value: {{ tasks === tasksMirror }}
        </code>
      </output>
    </details>
  </section>
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

const tasksMirror = ref(tasks.value)
</script>

<style scoped>
* {
  box-sizing: border-box;
}

fieldset {
  width: fit-content;
  margin-bottom: 1em;
}

output {
  background-color: #171717;
  padding: 0.5em;
  min-height: 6em;
}
</style>
