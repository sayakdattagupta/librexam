<template>
  <div id="app" class="container">
    <router-view />
  </div>
</template>
<script setup>
import { RouterView, RouterLink } from "vue-router";
import { useTestState } from "./stores/testState";
const testState = useTestState();
testState.initFromLocalStorage();
</script>
<style></style>
