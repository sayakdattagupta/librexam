<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTestState } from "../stores/testState";

const CENTRAL_INDEX_URL =
  "https://raw.githubusercontent.com/sayakdattagupta/librexamtests/main/indexedRepos.json";

const router = useRouter();
const testState = useTestState();

const loadedRepos = ref([]);
const jsonList = ref([]);

async function fetchCentralRepoIndex() {
  try {
    const res = await fetch(`${CENTRAL_INDEX_URL}?t=${Date.now()}`);
    if (!res.ok) throw new Error("Failed to load central index");
    const data = await res.json();
    loadedRepos.value = data.repositories || [];
  } catch (err) {
    console.error("Error loading indexedRepos.json:", err);
    alert("Could not fetch central test repository list.");
  }
}

async function fetchAllIndexes() {
  jsonList.value = [];

  const promises = loadedRepos.value.map(async (repo) => {
    const rawUrl = `https://raw.githubusercontent.com/${repo.full_name}/main/index.json`;
    try {
      const res = await fetch(`${rawUrl}?t=${Date.now()}`);
      if (!res.ok) throw new Error("Failed to load index.json");

      const tests = await res.json();
      for (const test of tests) {
        jsonList.value.push({
          ...test,
          repo: repo.full_name,
        });
      }
    } catch (err) {
      console.warn(`Failed to load index for ${repo.full_name}:`, err);
    }
  });

  await Promise.all(promises);
}

async function initializeRepoBrowser() {
  await fetchCentralRepoIndex();
  await fetchAllIndexes();
}

async function download(filename, url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    localStorage.setItem(`json-${filename}`, JSON.stringify(data));
    loadDownloaded(filename);
  } catch (err) {
    console.error(`Failed to fetch ${url}:`, err);
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
    if (testId) {
      router.push(`/testInfo/${testId}`);
    } else {
      alert("Test ID not found.");
    }
  } catch (err) {
    console.error("Error parsing stored test file:", err);
    alert("Stored test file is invalid.");
  }
}

onMounted(() => {
  initializeRepoBrowser();
});
</script>

<template>
  <div style="width: 100%">
    <h2 style="margin-bottom: 1em">Available Tests from All Repositories:</h2>

    <div v-if="jsonList.length === 0">
      <p>Loading test index...</p>
    </div>

    <ul v-else>
      <li
        v-for="entry in jsonList"
        :key="entry.filename + entry.repo"
        style="
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-top: 0.5em;
          padding: 0.8rem;
          padding-top: 0;
          padding-right: 1.2rem;
          border: solid var(--color-t);
          flex-direction: column;
        "
      >
        <div>
          <h2
            class="tName"
            style="font-size: 1.2em"
            @click="download(entry.filename, entry.url)"
          >
            <u>{{ entry.name }}</u> by {{ entry.author }}
          </h2>
          <p style="font-size: 1em; margin-bottom: 0.3rem">
            {{ entry.description }}
          </p>
          <a
            style="font-size: 0.9em; color: var(--color-t)"
            :href="`https://github.com/${entry.repo}`"
            target="_blank"
          >
            Source: {{ entry.repo }}
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
.tName:hover {
  cursor: pointer;
}
</style>
