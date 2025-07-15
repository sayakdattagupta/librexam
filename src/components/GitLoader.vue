<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTestState } from "../stores/testState";

const CENTRAL_INDEX_URL =
  "https://raw.githubusercontent.com/sayakdattagupta/librexamtests/main/indexedRepos.json";

const router = useRouter();
const testState = useTestState();

const loadedRepos = ref([]);
const jsonList = ref([]);

const searchQuery = ref("");
const sortOption = ref("updated");
const activeTags = ref([]);

const allTags = computed(() => {
  const tags = new Set();
  jsonList.value.forEach((entry) => {
    entry.tags?.forEach((t) => tags.add(t));
  });
  return Array.from(tags);
});

async function fetchCentralRepoIndex() {
  const cacheKey = "cached-indexedRepos";
  try {
    const res = await fetch(`${CENTRAL_INDEX_URL}?t=${Date.now()}`);
    if (!res.ok) throw new Error("Failed to load central index");

    const data = await res.json();
    if (!data.repositories || data.repositories.length === 0) {
      throw new Error("Received empty central index");
    }

    loadedRepos.value = data.repositories;
    localStorage.setItem(cacheKey, JSON.stringify(data));
  } catch (err) {
    console.error("Error loading indexedRepos.json:", err);

    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const data = JSON.parse(cached);
        loadedRepos.value = data.repositories || [];
        alert("Using cached central index due to error or empty result.");
      } catch (parseErr) {
        console.error("Error parsing cached central index:", parseErr);
        alert("Could not load central test repository list.");
      }
    } else {
      alert("Could not fetch central test repository list.");
    }
  }
}

async function fetchAllIndexes() {
  jsonList.value = [];

  const promises = loadedRepos.value.map(async (repo) => {
    const rawUrl = `https://raw.githubusercontent.com/${repo.full_name}/main/index.json`;
    const cacheKey = `cached-index-${repo.full_name}`;
    let tests = [];

    try {
      const res = await fetch(`${rawUrl}?t=${Date.now()}`);
      if (!res.ok) throw new Error("Failed to load index.json");

      const fetchedTests = await res.json();

      if (Array.isArray(fetchedTests) && fetchedTests.length > 0) {
        tests = fetchedTests;
        localStorage.setItem(cacheKey, JSON.stringify(fetchedTests)); // ✅ Save cache
      } else {
        throw new Error("Fetched index is empty, using cache");
      }
    } catch (err) {
      console.warn(`Error loading index for ${repo.full_name}:`, err);

      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          tests = JSON.parse(cached);
        } catch (parseErr) {
          console.error(
            `Error parsing cached index for ${repo.full_name}:`,
            parseErr,
          );
        }
      }
    }

    for (const test of tests) {
      jsonList.value.push({
        ...test,
        repo: repo.full_name,
        updated_at: repo.updated_at,
        stargazers_count: repo.stargazers_count,
      });
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

function toggleTag(tag) {
  if (activeTags.value.includes(tag)) {
    activeTags.value = activeTags.value.filter((t) => t !== tag);
  } else {
    activeTags.value.push(tag);
  }
}

const filteredList = computed(() => {
  let list = jsonList.value;

  const query = searchQuery.value.toLowerCase();
  if (query) {
    list = list.filter(
      (entry) =>
        (entry.name && entry.name.toLowerCase().includes(query)) ||
        (entry.description &&
          entry.description.toLowerCase().includes(query)) ||
        (entry.author && entry.author.toLowerCase().includes(query)) ||
        (entry.tags && entry.tags.some((t) => t.toLowerCase().includes(query))),
    );
  }

  if (activeTags.value.length > 0) {
    list = list.filter(
      (entry) =>
        entry.tags && entry.tags.some((tag) => activeTags.value.includes(tag)),
    );
  }

  if (sortOption.value === "updated") {
    list = [...list].sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
    );
  } else if (sortOption.value === "stars") {
    list = [...list].sort((a, b) => b.stargazers_count - a.stargazers_count);
  }

  return list;
});

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins} minute${mins !== 1 ? "s" : ""}${secs ? `, ${secs} second${secs !== 1 ? "s" : ""}` : ""}`;
}

onMounted(() => {
  initializeRepoBrowser();
});
</script>
<template>
  <div style="width: 100%">
    <div style="margin-bottom: 1em">
      <input
        v-model="searchQuery"
        placeholder="Search..."
        style="box-sizing: border-box; margin-bottom: 1em"
      />
      <select v-model="sortOption" class="btn" style="padding: 1em">
        <option value="updated">Sort by Last Updated</option>
        <option value="stars">Sort by Stars</option>
      </select>
    </div>

    <div style="margin-bottom: 1em">
      <span
        v-for="tag in allTags"
        :key="tag"
        @click="toggleTag(tag)"
        :style="{
          cursor: 'pointer',
          borderRadius: '5px',
          backgroundColor: activeTags.includes(tag)
            ? 'var(--color-t)'
            : 'var(--color-alt)',
          color: activeTags.includes(tag)
            ? 'var(--color-bg)'
            : 'var(--color-t)',
          marginRight: '0.5em',
          padding: '0.5rem',
          fontSize: '0.8em',
        }"
      >
        #{{ tag }}
      </span>
    </div>

    <div v-if="filteredList.length === 0">
      <p>No matching tests found.</p>
    </div>

    <ul v-else>
      <li
        v-for="entry in filteredList"
        :key="entry.filename + entry.repo"
        style="
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-top: 1em;
          padding: 0.8rem;
          padding-top: 0;
          padding-right: 1.2rem;
          border: none;
          border-radius: 5px;
          background-color: var(--color-alt);
          flex-direction: column;
        "
      >
        <div>
          <h2
            class="tName"
            style="font-size: 1em"
            @click="download(entry.filename, entry.url)"
          >
            <b>{{ entry.name }}</b> by {{ entry.author }}
          </h2>
          <p style="font-size: 0.9em; margin-bottom: 0.3rem">
            {{ entry.description }}
          </p>

          <p
            v-if="entry.duration"
            style="font-size: 0.8em; margin-bottom: 0.3em"
          >
            Duration: {{ formatDuration(entry.duration) }}
          </p>
          <p
            v-if="entry.tags && entry.tags.length"
            style="font-size: 0.9em; margin-bottom: 0.3rem"
          >
            <span
              v-for="(tag, i) in entry.tags"
              :key="i"
              style="margin-right: 0.5em"
            >
              #{{ tag }}
            </span>
          </p>
          <div style="display: flex; gap: 0.5em">
            <a
              style="font-size: 0.9em; color: var(--color-t)"
              :href="`https://github.com/${entry.repo}`"
              target="_blank"
            >
              Source: {{ entry.repo }}
            </a>
            <span style="font-size: 0.9em"
              >(Stars ⭐: {{ entry.stargazers_count }})</span
            >
          </div>
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
