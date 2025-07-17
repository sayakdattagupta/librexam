<template>
  <div style="display: flex; gap: 1em">
    <h1 style="font-size: 2.5rem">
      <RouterLink to="/" style="text-decoration: none"><b>&lt;</b></RouterLink>
    </h1>
    <h1 style="font-size: 2.5rem"><b>About LibrExam</b></h1>
  </div>

  <a href="https://github.com/sayakdattagupta/librexam" type="_blank">
    <img
      src="https://img.shields.io/github/stars/sayakdattagupta/librexam?style=flat"
      alt="GitHub Repo stars"
    />
  </a>

  <p>
    This app allows users to interact with community-contributed tests. All
    tests and quizzes are written in JSON, making distribution simple and
    transparent.
  </p>
  <p>
    A collection of tests can be hosted in a GitHub repository and indexed. Any
    repository tagged with the topic <code>librexam-test</code> is automatically
    added to a central index, enabling decentralised hosting. Tests can also be
    loaded manually via local JSON files.
  </p>
  <p>
    Although images currently need to be hosted externally and linked into the
    JSON, future versions may allow bundling of images with the test into a
    single zip file, enabling fully offline and decentralised test sharing.
  </p>

  <h2><b>Features</b></h2>
  <ul>
    <li>Browse tests from automatically indexed repositories</li>
    <li>Manage multiple tests (paused or submitted)</li>
    <li>Support for SMCQ, MMCQ, and Numerical questions</li>
    <li>Mark questions for review</li>
    <li>Image support for questions and solutions</li>
    <li>Math rendering via KaTeX</li>
    <li>Dark mode and light mode toggle</li>
    <li>Basic results page</li>
  </ul>

  <h3><b>Planned Features</b></h3>
  <ul>
    <li>Improved results and statistics dashboard</li>
    <li>Track user performance across multiple tests</li>
    <li>Code optimization and bug fixing</li>
    <li>A WYSIWYG test maker (maybe)</li>
    <li>Test bundles with images (maybe)</li>
    <li>Audio support</li>
    <li>Quizzing/game modes (e.g. Kahoot-style rooms) (maybe)</li>
  </ul>
</template>
<script setup>
import { RouterView, useRouter } from "vue-router";
const router = useRouter();
</script>
<style scoped>
ul {
  margin-left: 1em;
}
li {
  margin-bottom: 0.5em;
  list-style: disc;
  display: list-item;
}
</style>
