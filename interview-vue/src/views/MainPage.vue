<template>
  <div class="panel">
    <h2>Main List</h2>
    <ul>
      <ItemList
        v-for="(v, index) in trees"
        :model-value="v!"
        @update:model-value="updateTree(index, $event)"
        :key="v!.content.id"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import ItemList from '@/components/ItemList.vue';
import { Task, Tree } from '@/models/tasks';
import { computed, ref, watch, watchEffect } from 'vue';
import * as R from 'ramda';

const trees = ref([
  new Tree(new Task('Make presentation'), [
    new Tree(new Task('Open editor'), [
      new Tree(new Task('Choose editor')), 
      new Tree(new Task('Open it'))
    ])
  ]),
  new Tree(new Task('Make appointment')),
  new Tree(new Task('Foo Bar'))
])

function updateTree(index: number, tree: Tree<Task>) {
  trees.value[index] = tree
}
watchEffect(() => console.log('treesUpdated', trees.value))

</script>

<style scoped>

</style>
