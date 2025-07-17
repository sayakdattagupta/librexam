<template>
  <div>
    <div style="display: flex; gap: 1em">
      <h1
        @click="backOff"
        style="font-size: 2rem; user-select: none"
        class="backLink"
      >
        <b>&lt;</b>
      </h1>
      <h1 style="font-size: 2rem">
        <b>{{ testTitle }}</b> by {{ author }}
      </h1>
    </div>
    <p>Duration: {{ duration / 60 }} minutes</p>
    <p>Description: {{ description }}</p>

    <h2><b>Subjects</b></h2>
    <ul>
      <li
        style="margin-bottom: 0.3rem"
        v-for="subject in subjects"
        :key="subject.name"
      >
        {{ subject.name }}
      </li>
    </ul>
    <br />
    <div>
      <button @click="startTest" style="margin-right: 1em">Start Test</button>
      <button @click="showPreview = true" style="margin-bottom: 2rem">
        View or Download (PDF)
      </button>
      <QuestionPaper v-model:showPreview="showPreview" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTestManager } from "../stores/testManager";
import { useTestState } from "../stores/testState";
import QuestionPaper from "../components/QuestionPaper.vue";

const route = useRoute();
const router = useRouter();

const testManager = useTestManager();
const testState = useTestState();

const showPreview = ref(false);

const testId = computed(() => testState.testId);
const testTitle = computed(() => testState.testTitle);
const author = computed(() => testState.author);
const duration = computed(() => testState.duration);
const description = computed(() => testState.description);
const subjects = computed(() => testState.testData?.subjects || []);

function startTest() {
  const snapshot = testState.snapshotState();
  testManager.addTestSnapshot(snapshot);
  router.push(`/test/${testId.value}`);
}

function backOff() {
  testManager.deleteTest(testId.value);
  router.push("/loadTest/");
}
</script>
<style scoped>
.backLink:hover {
  cursor: pointer;
}
</style>
