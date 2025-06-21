<script setup>
import { ref, onMounted } from "vue";

import { useRoute, useRouter } from "vue-router";
import { useTestState } from "../stores/testState";
import { useTestManager } from "../stores/testManager";

const route = useRoute();
const router = useRouter();

const testState = useTestState();
const testManager = useTestManager();

const INDEX_URL = ref(
  localStorage.getItem("indexURL") ||
    "https://raw.githubusercontent.com/librexam/testRepo/main/index.json",
);

const jsonList = ref([]);
const loadedData = ref(null);
const selectedFile = ref("");

async function loadIndex() {
  try {
    localStorage.setItem("indexURL", INDEX_URL.value);
    const res = await fetch(INDEX_URL.value + "?t=" + Date.now());
    jsonList.value = await res.json();
  } catch (err) {
    console.error("Failed to load index.json:", err);
    alert("Could not fetch index.json. Check URL.");
  }
}

loadIndex();

async function download(filename, url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    localStorage.setItem(`json-${filename}`, JSON.stringify(data));
    loadDownloaded(filename);
  } catch (err) {
    console.error(`Failed to fetch ${url}`, err);
    alert(`Download failed for ${filename}`);
  }
}

function loadDownloaded(filename) {
  const raw = localStorage.getItem(`json-${filename}`);
  if (!raw) {
    alert(`No data found for ${filename}`);
    return;
  }

  try {
    const json = JSON.parse(raw);
    testState.loadTest(json);
    const testId = testState.testId;
    router.push(`/testInfo/${testId}`);
  } catch (err) {
    alert("Stored test file is invalid.");
    console.error(err);
  }
}
</script>

<template>
  <div style="width: 100%; margin: auto">
    <label>
      <input
        v-model="INDEX_URL"
        style="
          width: 100%;
          box-sizing: border-box;
          margin: 1rem auto;
          padding: 0.5em;
        "
        placeholder="https://...test-repository.../index.json"
      />
    </label>

    <button @click="loadIndex" style="margin-bottom: 1em">Refresh</button>
    <h3>Available Tests:</h3>
    <div style="overflow-y: auto">
      <ul>
        <li
          v-for="entry in jsonList"
          :key="entry.filename"
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1em;
            padding: 0.8rem;
            padding-right: 1.2rem;
            background-color: var(--color-alt);
          "
        >
          <h3 style="font-size: 0.8em">{{ entry.name }}</h3>
          <div style="display: flex; gap: 5px">
            <button
              style="display: inline-block; background-color: var(--color-alt)"
              @click="download(entry.filename, entry.url)"
            >
              Attempt
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
