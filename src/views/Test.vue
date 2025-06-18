<template>
  <div class="container">
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
      <h3>{{ timeLeft }}</h3>
    </header>

    <div class="testArea">
      <button class="drawerOpen" @click="drawerVis = true">&lt</button>

      <div class="qArea">
        <QuestionRenderer :subIdx="cSub" :secIdx="cSec" :qIdx="cQ" />
      </div>

      <div class="qNav" v-show="drawerVis || isWideScreen">
        <button class="submit" v-show="!isWideScreen">SUBMIT</button>
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
          <button>MARK FOR REVIEW</button>
          <button @click="nextQ">NEXT</button>
          <button v-if="isWideScreen">SUBMIT</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue";

import { useRoute, useRouter } from "vue-router";
import { useTestState } from "../stores/testState";
import QuestionRenderer from "../components/QuestionRenderer.vue";
import QuestionNav from "../components/QuestionNav.vue";

const testState = useTestState();

const testId = computed(() => testState.testId);
const testTitle = computed(() => testState.testTitle);

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

const drawerVis = ref(false);
const subDropdownVis = ref(false);
const secDropdownVis = ref(false);

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

onMounted(() => {
  window.addEventListener("resize", handleResize);
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

const timeLeft = "00:00";
</script>
