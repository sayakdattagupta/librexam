<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTestState } from "../stores/testState";
import { useTestManager } from "../stores/testManager";

const route = useRoute();
const router = useRouter();
const testState = useTestState();
const testManager = useTestManager();

const REPO_URL = ref(
  localStorage.getItem("repoURL") || "https://github.com/librexam/testRepo",
);

const INDEX_URL = ref("");

function githubToRawUrl(repoUrl, branch = "main") {
  try {
    const url = new URL(repoUrl);
    if (!url.hostname.includes("github.com"))
      throw new Error("Not a GitHub URL");
    const [, user, repo] = url.pathname.split("/");
    return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/index.json`;
  } catch (err) {
    console.error("Invalid GitHub URL:", err);
    return "";
  }
}

watch(
  REPO_URL,
  (newUrl) => {
    INDEX_URL.value = githubToRawUrl(newUrl);
    localStorage.setItem("repoURL", newUrl);
  },
  { immediate: true },
);

const jsonList = ref([]);
const loadedData = ref(null);
const selectedFile = ref("");

async function loadIndex() {
  if (!INDEX_URL.value) {
    alert("Invalid index URL.");
    return;
  }
  try {
    const res = await fetch(`${INDEX_URL.value}?t=${Date.now()}`);
    if (!res.ok) throw new Error("Network response was not ok");
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
</script>
<template>
  <div style="width: 100%; margin: auto">
    <label>
      <input
        v-model="REPO_URL"
        style="
          width: 100%;
          box-sizing: border-box;
          margin: 1rem auto;
          padding: 0.5em;
        "
        placeholder="https://github.com/username/test-repository"
      />
    </label>

    <button @click="loadIndex" style="margin-bottom: 0.5em">Refresh</button>
    <h2>Available Tests:</h2>
    <div style="overflow-y: auto">
      <ul>
        <li
          v-for="entry in jsonList"
          :key="entry.filename"
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0.5em;
            padding: 0.8rem;
            padding-right: 1.2rem;
            border: solid var(--color-t);
          "
        >
          <h3 style="font-size: 0.9em">{{ entry.name }}</h3>
          <div style="display: flex; gap: 5px">
            <button
              style="
                display: inline-block;
                background-color: var(--color-g);
                border: none;
                padding: 0.5rem;
              "
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
