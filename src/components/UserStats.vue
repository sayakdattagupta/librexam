<template>
  <div
    style="
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      gap: 1.5rem;
      align-items: center;
    "
  >
    <label class="btn" @click="testManager.exportTests"
      >Export/Backup User Data</label
    >
    <input
      style="display: none"
      type="file"
      id="fileLoader"
      accept=".json"
      @change="handleFile"
    />
    <label for="fileLoader" class="btn">Load User Data</label>
    <label
      class="btn"
      style="background-color: var(--color-r)"
      @click="testManager.clearAll"
      >Clear User Data</label
    >
  </div>
</template>
<script setup>
import { useTestManager } from "../stores/testManager";
const testManager = useTestManager();

function handleFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const json = JSON.parse(reader.result);
      testManager.importTests(json);
    } catch (err) {
      alert("Invalid file.");
    }
  };
  reader.readAsText(file);
}
</script>
