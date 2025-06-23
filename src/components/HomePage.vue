<template>
  <RouterLink
    class="btn"
    style="display: block; text-align: center; margin: 0 auto; width: 20%"
    to="/loadTest"
    >Start</RouterLink
  >
  <div class="saved-tests secBreak" v-if="resumableTests.length">
    <h3>Paused Tests</h3>
    <ul>
      <li
        style="padding-bottom: 5px"
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
    <h3>Submitted Tests</h3>
    <ul>
      <li
        style="padding-bottom: 5px"
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
</template>
<script setup>
import { useTestManager } from "../stores/testManager";
import { useTestState } from "../stores/testState";
import { RouterView, useRouter } from "vue-router";
import { computed, onMounted } from "vue";

const testManager = useTestManager();
const testState = useTestState();
const router = useRouter();

function start() {
  router.push("/loadTest");
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
  router.push(`/result/${snapshot.id}`);
}

function deleteTest(test) {
  testManager.deleteTest(test.id);
}
</script>
