<template>
  <div @click="toggle" style="cursor: pointer">
    {{ isDark ? "🌙" : "☀️" }}
  </div>
</template>

<script setup>
import { useThemeStore } from "../stores/themeStore";
import { computed } from "vue";
const theme = useThemeStore();
const toggle = () => theme.toggleTheme();
const isDark = computed(() => theme.currentTheme === "dark");
</script>
