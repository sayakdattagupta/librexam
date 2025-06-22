<template>
  <div>
    <header
      style="
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;
      "
    >
      <div style="position: relative">
        <h3
          class="clickable"
          @click="subDropdown"
          style="display: inline-block"
          :class="{ active: subDropdownVis }"
        >
          {{ subject.name }}
        </h3>
        <ul v-if="subDropdownVis" class="dropdown">
          <li
            class="clickable"
            v-for="(subj, idx) in testState.testData.subjects"
            :key="idx"
            @click="selectSubject(idx)"
          >
            {{ subj.name }}
          </li>
        </ul>
        |
        <h3
          class="clickable"
          @click="secDropdown"
          style="display: inline-block"
          :class="{ active: secDropdownVis }"
        >
          {{ section.name }}
        </h3>
        <ul v-if="secDropdownVis" class="dropdown">
          <li
            class="clickable"
            v-for="(sec, idx) in subject.sections"
            :key="idx"
            @click="selectSection(idx)"
          >
            {{ sec.name }}
          </li>
        </ul>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem">
        <h3><ThemeToggle /></h3>
        |
        <h3>{{ formatted }}</h3>
      </div>
    </header>

    <div class="testArea">
      <button class="drawerOpen" @click="drawerVis = true">&lt</button>

      <div class="qArea">
        <QuestionRenderer :subIdx="cSub" :secIdx="cSec" :qIdx="cQ" />
      </div>

      <div class="qNav" v-show="drawerVis || isWideScreen">
        <button @click="submitTest" class="submit" v-show="!isWideScreen">
          SUBMIT
        </button>
        <QuestionNav :subIdx="cSub" :secIdx="cSec" :qIdx="cQ" />
        <button
          class="drawerOpen"
          @click="drawerVis = false"
          v-show="!isWideScreen"
        >
          &gt
        </button>
      </div>

      <div class="fFooter">
        <div class="button-hor">
          <button @click="clearQ">CLEAR</button>
          <button @click="markReview">MARK FOR REVIEW</button>
          <button @click="nextQ">NEXT</button>
          <button @click="submitTest" v-if="isWideScreen">SUBMIT</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue";

import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
import { useTestState } from "../stores/testState";
import QuestionRenderer from "../components/QuestionRenderer.vue";
import QuestionNav from "../components/QuestionNav.vue";
import { useTimer } from "../stores/useTimer";
import ThemeToggle from "../components/ThemeToggle.vue";

const route = useRoute();
const router = useRouter();

const testState = useTestState();

const testId = computed(() => testState.testId);
const testTitle = computed(() => testState.testTitle);
const submitted = computed(() => testState.submitted);

testState.initializeAnswers(testState.testData);

const cSub = computed(() => testState.currentSubjectIndex);
const cSec = computed(() => testState.currentSectionIndex);
const cQ = computed(() => testState.currentQuestionIndex);

const subject = computed(
  () => testState.testData.subjects[testState.currentSubjectIndex],
);
const section = computed(
  () => subject.value.sections[testState.currentSectionIndex],
);
const question = computed(
  () => section.value.questions[testState.currentQuestionIndex],
);

const timer = useTimer();
const drawerVis = ref(false);
const subDropdownVis = ref(false);
const secDropdownVis = ref(false);

if (testState.submitted && testState.testId) {
  router.replace(`/result/${testState.testId}`);
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
  if (!timer.isRunning) {
    timer.start();
  }
});

onBeforeRouteLeave((to, from, next) => {
  timer.stop();
  if (to.path === "/") {
    window.location.href = "/";
  } else {
    next();
  }
});

watch(
  () => [
    testState.currentSubjectIndex,
    testState.currentSectionIndex,
    testState.currentQuestionIndex,
  ],
  ([sub, sec, q]) => {
    testState.markViewed(sub, sec, q);
  },
  { immediate: true },
);

const isWideScreen = ref(window.innerWidth >= 900);

const handleResize = () => {
  isWideScreen.value = window.innerWidth >= 900;
};

const timeLeft = computed(() =>
  Math.max(0, testState.duration - testState.timeElapsed),
);

watch(timeLeft, (newVal) => {
  if (newVal === 0 && !testState.submitted) {
    submitTest();
  }
});

const formatted = computed(() => {
  const minutes = String(Math.floor(timeLeft.value / 60)).padStart(2, "0");
  const seconds = String(timeLeft.value % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

function subDropdown() {
  subDropdownVis.value = !subDropdownVis.value;
  secDropdownVis.value = false;
}

function secDropdown() {
  secDropdownVis.value = !secDropdownVis.value;
  subDropdownVis.value = false;
}

function selectSubject(index) {
  testState.currentSubjectIndex = index;
  testState.currentSectionIndex = 0;
  testState.currentQuestionIndex = 0;
  subDropdownVis.value = false;
}

function selectSection(index) {
  testState.currentSectionIndex = index;
  testState.currentQuestionIndex = 0;
  secDropdownVis.value = false;
}

function nextQ() {
  if (testState.currentQuestionIndex < section.value.questions.length - 1) {
    testState.currentQuestionIndex += 1;
  } else if (
    testState.currentSectionIndex <
    subject.value.sections.length - 1
  ) {
    testState.currentQuestionIndex = 0;
    testState.currentSectionIndex += 1;
  } else if (
    testState.currentSubjectIndex <
    testState.testData.subjects.length - 1
  ) {
    testState.currentQuestionIndex = 0;
    testState.currentSectionIndex = 0;
    testState.currentSubjectIndex += 1;
  }
}

function clearQ() {
  testState.answers[testState.currentSubjectIndex][
    testState.currentSectionIndex
  ][testState.currentQuestionIndex] = null;
}

function markReview() {
  testState.toggleMarkCurrentQuestion();
}

function submitTest() {
  testState.submitted = true;
  testState.syncToStorage();
  router.push(`/result/${testId.value}`);
}
</script>
