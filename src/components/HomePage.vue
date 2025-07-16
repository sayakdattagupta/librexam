<template>
  <div class="container" style="padding-top: 0">
    <h1 class="titleH">
      Welcome to a
      <b>powerful, client-side, open-source, and decentralized</b> test and
      quizzing engine. Join a vibrant community of students and a growing
      collection of user-contributed exams.
    </h1>
    <RouterLink
      class="btn"
      style="
        display: block;
        text-align: center;
        margin-left: 0;
        margin-top: 2em;
        width: 20%;
      "
      to="/loadTest"
      >Browse Tests</RouterLink
    >
    <h3
      @click="scrollToSection"
      v-if="histAvailable"
      class="hoverBut"
      style="margin-top: 2em"
    >
      Or, see already attempted tests.
    </h3>
    <RouterLink
      to="/about"
      style="
        margin-top: 1em;
        display: block;
        text-align: right;
        text-decoration: none;
        user-select: none;
      "
      >Learn More</RouterLink
    >
    <section ref="targetSec" style="margin-top: 25em">
      <div class="saved-tests secBreak" v-if="resumableTests.length">
        <h2><b>Paused Tests</b></h2>
        <ul>
          <li
            style="padding-bottom: 1em"
            v-for="test in resumableTests"
            :key="test.id"
          >
            <div class="button-hor">
              <button class="btn" @click="resume(test)">
                {{ test.name }} ({{ test.timestamp.split("T")[0] }})
              </button>
              <div class="spacer"></div>
              <button
                class="btn"
                style="background-color: var(--color-r)"
                @click="deleteTest(test)"
              >
                X
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="saved-tests secBreak" v-if="submittedTests.length">
        <h2><b>Submitted Tests</b></h2>
        <ul>
          <li
            style="padding-bottom: 1em"
            v-for="test in submittedTests"
            :key="test.id"
          >
            <div class="button-hor">
              <button class="btn" @click="viewRes(test)">
                {{ test.name }} ({{ test.timestamp.split("T")[0] }})
              </button>
              <div class="spacer"></div>
              <button
                class="btn"
                style="background-color: var(--color-r)"
                @click="deleteTest(test)"
              >
                X
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
  <p style="text-align: center; margin-top: 4em">Powered by Vue.js</p>
</template>
<script setup>
import { useTestManager } from "../stores/testManager";
import { useTestState } from "../stores/testState";
import { RouterView, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";

const testManager = useTestManager();
const testState = useTestState();
const router = useRouter();

function start() {
  router.push("/loadTest");
}

const targetSec = ref(null);

const histAvailable = computed(
  () => resumableTests.value.length > 0 || submittedTests.value.length > 0,
);

function scrollToSection() {
  targetSec.value?.scrollIntoView({ behavior: "smooth" });
}

testManager.loadFromStorage();

localStorage.removeItem("currentTest");

const resumableTests = computed(() =>
  testManager.savedTests.filter((t) => !t.submitted),
);

const submittedTests = computed(() =>
  testManager.savedTests.filter((t) => t.submitted),
);

function resume(snapshot) {
  testState.loadSnapshot(snapshot);
  router.push(`/test/${snapshot.id}`);
}

function viewRes(snapshot) {
  testState.loadSnapshot(snapshot);
  router.push(`/result/${snapshot.id}`);
}

function deleteTest(test) {
  testManager.deleteTest(test.id);
}
</script>
<style>
.hoverBut {
  user-select: none;
}
.hoverBut:hover {
  cursor: pointer;
}
@media (max-width: 700px) {
  h1 {
    font-size: 1.5rem;
  }
}
</style>
