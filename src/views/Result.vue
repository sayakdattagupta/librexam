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
      <h2>Result</h2>
      <h2>{{ testTitle }}</h2>
    </header>

    <h2>
      Time Taken: {{ Math.floor(timeTaken / 60) }} min {{ timeTaken % 60 }} sec
    </h2>

    <h2 style="text-align: center">Overall Stats</h2>

    <div class="p-6" style="max-width: 400px; margin: auto">
      <div style="width: 100%; height: 100%">
        <Pie :data="chartData" :options="chartOptions" />
      </div>
    </div>
    <div class="secBreak" />
    <h2 style="text-align: center">Question Wise Data</h2>
    <div class="resRenderer">
      <div
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
      </div>

      <QuestionRenderer
        :subIdx="cSub"
        :secIdx="cSec"
        :qIdx="cQ"
        :readonly="true"
        :showCorrect="true"
      />
      <br />
      <div class="button-hor">
        <button @click="prevQ">PREV</button>
        <button @click="nextQ">NEXT</button>
      </div>
    </div>
    <br />
    <button @click="returnHome">Back to Home</button>
  </div>
</template>
<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
import { useTestState } from "../stores/testState";
import QuestionRenderer from "../components/QuestionRenderer.vue";

const testState = useTestState();
const testId = computed(() => testState.testId);
const testTitle = computed(() => testState.testTitle);
const testData = computed(() => testState.testData);

const subDropdownVis = ref(false);
const secDropdownVis = ref(false);

const subject = computed(
  () => testState.testData.subjects[testState.currentSubjectIndex],
);
const section = computed(
  () => subject.value.sections[testState.currentSectionIndex],
);
const question = computed(
  () => section.value.questions[testState.currentQuestionIndex],
);

const timeTaken = computed(() => testState.timeElapsed);

const router = useRouter();
const allowLeave = ref(false);

onBeforeRouteLeave((to, from, next) => {
  if (!allowLeave.value) {
    alert("Please use the 'Back to Home' button to leave.");
    next(false);
  } else {
    next();
  }
});

const cSub = computed(() => testState.currentSubjectIndex);
const cSec = computed(() => testState.currentSectionIndex);
const cQ = computed(() => testState.currentQuestionIndex);

var correct = 0;
var incorrect = 0;
var notAttempted = 0;

if (testData.value?.subjects) {
  testData.value.subjects.forEach((subject, i1) => {
    subject.sections.forEach((section, i2) => {
      section.questions.forEach((question, i3) => {
        const userAnswer = testState.answers?.[i1]?.[i2]?.[i3];

        if (userAnswer === null || userAnswer === undefined) {
          notAttempted += 1;
        } else if (
          Array.isArray(question.answer) &&
          Array.isArray(userAnswer)
        ) {
          let c = 0;

          question.answer.forEach((ans, i4) => {
            if (userAnswer.includes(ans)) {
              c += 1;
            }
          });

          if (question.answer.length === c) correct += 1;
        } else if (question.answer === userAnswer) {
          correct += 1;
        } else {
          incorrect += 1;
        }
      });
    });
  });
}

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

function prevQ() {
  if (testState.currentQuestionIndex > 0) {
    testState.currentQuestionIndex -= 1;
  } else if (testState.currentSectionIndex > 0) {
    testState.currentSectionIndex -= 1;
    const prevSection = subject.value.sections[testState.currentSectionIndex];
    testState.currentQuestionIndex = prevSection.questions.length - 1;
  } else if (testState.currentSubjectIndex > 0) {
    testState.currentSubjectIndex -= 1;
    const prevSubject =
      testState.testData.subjects[testState.currentSubjectIndex];
    testState.currentSectionIndex = prevSubject.sections.length - 1;
    const lastSection = prevSubject.sections[prevSubject.sections.length - 1];
    testState.currentQuestionIndex = lastSection.questions.length - 1;
  }
}

import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

import { Pie } from "vue-chartjs";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const chartData = {
  labels: ["Correct", "Incorrect", "Not Attempted"],
  datasets: [
    {
      data: [correct, incorrect, notAttempted],
      backgroundColor: ["#7c8f6b", "#cb6d51", "#c8a56a"],
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Overall Stats",
    },
  },
};

function returnHome() {
  allowLeave.value = true;
  router.push("/");
}
</script>
