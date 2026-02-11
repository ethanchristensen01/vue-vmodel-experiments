# Vue 3 v-model with complex objects

A simple TODO application. This project demonstrates the different ways to use v-model with complex objects and the different behaviors of those methods.

The TodoList component takes a v-model for a list of tasks. Tasks can contain subtasks.

## Approach 1: Direct manipulation

We can modify the v-model prop from the child if it's an object or array. This gets propagated to the parent component, and changes to the external data correctly show updates.

However, this method circumvents the v-model mechanism. The v-model update does not get triggered. We can see that copying the ref and making a second list for it synchronizes the two lists. The copied ref and the original ref contain the same array reference, as demonstrated by them being literally equal by `===`.

## Approach 2: Manual Cloning

Instead of modifying the v-model prop, we can emit updates with clones of the data.
We must use a clone if we want the original data to stay unmodified.

It's tricky to support external updates to the v-model with this method. In this example, adding tasks or resetting the list does not update the component.

## Approach 3: VueUse Deep v-model

The vueuse library has a composable that replicates the manual cloning method with more robust design. It creates an internal clone value in a ref, and lets us watch the external value to update it however we want.

This lets us modify the list on the outside and see the updates in our component. The add task button and reset button work.

## Alternative approach: Use a store

Whether it's a Vuex store or a pinia store, this will allow updating individual items in the list without cloning the whole thing. Changes to internal items can be observed inside the store or by adding a watcher.

This approach is more efficient for larger data structures, albeit slightly less convenient. For small struct-like data, the v-model approach may still be preferred.

## Conclusion

Ranking the approaches

1. Using a store
   - Better for a more complex data structure like a todo list
2. VueUse deep v-model
   - Better for a small data structure that can afford to be cloned
3. Manual cloning
   - Too tedious and messy
4. Direct manipulation
   - Circumvents v-model. Can lead to unexpected behaviors.
