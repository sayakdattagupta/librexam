<template>
  <div class="container">
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap">
      <h2 @click="showLocal = false" :class="{ inactive: showLocal }">
        Online
      </h2>
      <h2 @click="showLocal = true" :class="{ inactive: !showLocal }">Local</h2>
    </div>

    <GitLoader v-if="!showLocal" />
    <FileLoader v-if="showLocal" />
  </div>
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
}
h2 {
  text-decoration: underline;
  cursor: pointer;
}
</style>
