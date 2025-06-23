<template>
  <div>
    <svg
      version="1.2"
      class="logo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 200"
    >
      <g id="Folder 1">
        <path
          id="Background"
          fill-rule="evenodd"
          class="s0"
          d="m222 50v100h-100v-100z"
        />
        <path
          id="Li"
          class="s1"
          aria-label="Li"
          d="m148.6 137h30.6v-5.6h-24.3v-46.8h-6.3zm39.6 0h6.1v-39.2h-6.1zm3.1-45.9c2.4 0 4.3-1.8 4.3-4 0-2.3-1.9-4.1-4.3-4.1-2.4 0-4.3 1.8-4.3 4.1 0 2.2 1.9 4 4.3 4z"
        />
        <path
          id="3"
          class="s1"
          aria-label="3"
          d="m137.1 78.3c3.8 0 6.6-2.4 6.6-5.6 0-2.5-1.5-4.3-3.9-4.7v-0.2c1.9-0.6 3.2-2.2 3.2-4.5 0-2.7-2.2-5.2-5.8-5.2-3.4 0-6.3 2.1-6.4 5.2h2.3c0.1-2 2-3.1 4-3.1 2.2 0 3.6 1.3 3.6 3.3 0 2-1.6 3.4-4 3.4h-1.5v2.1h1.5c3 0 4.7 1.5 4.7 3.7 0 2-1.8 3.5-4.4 3.5-2.2 0-4-1.2-4.2-3.1h-2.4c0.1 3.1 2.9 5.2 6.7 5.2z"
        />
        <path
          id="brExam"
          class="s1"
          aria-label="brExam"
          d="m234 142h5.9v-6h0.7c1.3 2.1 3.9 6.8 11.4 6.8 9.9 0 16.7-7.9 16.7-20.3 0-12.4-6.8-20.3-16.8-20.3-7.6 0-10 4.7-11.3 6.8h-0.5v-19.4h-6.1zm6-19.6c0-8.8 3.9-14.7 11.2-14.7 7.7 0 11.5 6.4 11.5 14.7 0 8.4-3.9 15-11.5 15-7.2 0-11.2-6.1-11.2-15zm37.9 19.6h6v-24.8c0-5.3 4.2-9.2 10-9.2 1.6 0 3.2 0.3 3.7 0.4v-6.1c-0.7-0.1-2.3-0.2-3.2-0.2-4.7 0-8.8 2.7-10.2 6.6h-0.5v-5.9h-5.8zm27.6 0h32v-5.7h-25.6v-17.8h23.6v-5.6h-23.6v-17.7h25.2v-5.6h-31.6zm46.8-39.3h-7l12.5 19.7-12.5 19.6h7l9.4-15.2 9.4 15.2h6.9l-12.6-19.6 12.6-19.7h-6.9l-9.4 16.1zm45.9 40.2c6.8 0 10.4-3.7 11.7-6.3h0.3v5.4h6v-25.9c0-12.5-9.5-13.9-14.5-13.9-6 0-12.7 2-15.8 9.2l5.8 2c1.3-2.8 4.4-5.9 10.2-5.9 5.5 0 8.3 2.9 8.3 8v0.2c0 2.9-3 2.6-10.2 3.6-7.2 0.9-15.2 2.5-15.2 11.5 0 7.7 5.9 12.1 13.4 12.1zm0.9-5.4c-4.8 0-8.3-2.2-8.3-6.4 0-4.6 4.2-6 8.9-6.6 2.6-0.3 9.4-1.1 10.5-2.3v5.5c0 4.9-3.9 9.8-11.1 9.8zm28.1 4.5h6.1v-24.6c0-5.7 4.2-9.8 8.9-9.8 4.6 0 7.7 3 7.7 7.5v26.9h6.2v-25.6c0-5.1 3.2-8.8 8.7-8.8 4.3 0 8 2.3 8 8.1v26.3h6v-26.3c0-9.3-5-13.5-12-13.5-5.6 0-9.7 2.6-11.7 6.6h-0.4c-2-4.2-5.4-6.6-10.6-6.6-5.1 0-8.9 2.4-10.5 6.6h-0.5v-6.1h-5.9z"
        />
      </g>
    </svg>
  </div>

  <nav
    style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem"
  >
    <h3 class="bNav" @click="currentPage = 'home'">Home</h3>
    <h3 class="bNav" @click="currentPage = 'make'">Create</h3>
    <h3 class="bNav" @click="currentPage = 'stats'">Settings</h3>
    <ThemeToggle class="bNav" />
  </nav>
  <HomePage v-if="currentPage === 'home'" />
  <CreateTest v-if="currentPage === 'make'" />
  <UserStats v-if="currentPage === 'stats'" />

  <footer style="margin-top: 15em; display: flex; justify-content: center">
    <div style="display: flex; gap: 1rem; align-items: center">
      <a
        href="https://github.com/sayakdattagupta/librexam"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
       0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.084-.729.084-.729
       1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.931
       0-1.31.468-2.381 1.235-3.221-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404
       1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.241 2.874.119 3.176.77.84
       1.233 1.911 1.233 3.221 0 4.61-2.804 5.625-5.475 5.921.43.37.823 1.103.823 2.222
       0 1.606-.014 2.898-.014 3.293 0 .321.216.694.825.576C20.565 21.796 24 17.296 24 12
       24 5.37 18.63 0 12 0z"
          />
        </svg>
      </a>
    </div>
  </footer>
</template>

<script setup>
import ThemeToggle from "../components/ThemeToggle.vue";
import HomePage from "../components/HomePage.vue";
import CreateTest from "../components/CreateTest.vue";
import UserStats from "../components/UserStats.vue";

import { ref } from "vue";

const currentPage = ref("home");
</script>
<style scoped>
h3.bNav:hover {
  cursor: pointer;
}
</style>
