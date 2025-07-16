<template>
  <div style="display: flex; gap: 1.5rem; flex-wrap: wrap">
    <h1>
      <RouterLink to="/" style="text-decoration: none"><b>&lt;</b></RouterLink>
    </h1>
    <h1 @click="showLocal = false" :class="{ inactive: showLocal }">Online</h1>
    <h1 @click="showLocal = true" :class="{ inactive: !showLocal }">Local</h1>
  </div>

  <GitLoader v-if="!showLocal" />
  <FileLoader v-if="showLocal" />
</template>

<script setup>
import GitLoader from "../components/GitLoader.vue";
import FileLoader from "../components/FileLoader.vue";
import { ref } from "vue";

const showLocal = ref(false);
</script>

<style scoped>
.inactive {
  text-decoration: none;
  filter: opacity(50%);
}
h1 {
  filter: opacity(100%);
  cursor: pointer;
  font-size: 2.5rem;
}
</style>
