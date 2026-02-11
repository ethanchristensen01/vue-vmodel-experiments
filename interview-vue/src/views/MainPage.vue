<template>
  <section>
    <h2>Task Tracker</h2>
    <fieldset>
      <legend>Todo List</legend>
      <TodoList
        v-model:model-value="tasks"
        @update:model-value="onUpdate"
      />
      <button @click="resetTasks" class="reset-button">Reset</button>
    </fieldset>
    <form @submit.prevent="() => false">
      <h3>
        Add a new task
      </h3>
      <label>
        Name:
        <input type="text" v-model="newText"/>
      </label>
      <button @click="addNewTask" class="add-button">Add</button>
    </form>
    <div v-if="allDone">
      All done!
    </div>
  </section>
  <section>
    <details>
      <summary>Debug</summary>
      <div>
        <fieldset>
          <legend>Copy of Todo List</legend>
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

const newText = ref('')

function addNewTask () {
  if (newText.value) {
    tasks.value.push(new Task(newText.value))
  }
}

function resetTasks () {
  tasks.value.forEach(t => t.reset())
}

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

section {
  width: 40ch;
}

:is(section, details) > * + * {
  margin-top: 1em;
}

fieldset, form {
  display: flex;
  flex-direction: column;
  padding: 1em;
  border: 2px groove rgba(40, 40, 40, 1);
}

output {
  background-color: #171717;
  padding: 0.5em;
  min-height: 6em;
  display: block;
}

.add-button {
  align-self: end;
  margin-top: 3em;
}

.reset-button {
  align-self: end;
  margin-top: 1em;
}

summary {
  font-size: x-large;
}
</style>
