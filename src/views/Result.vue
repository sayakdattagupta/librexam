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
    <h3>Correct Questions: {{ correct }}</h3>
    <h3>Incorrect Questions: {{ incorrect }}</h3>
    <h3>Unattempted: {{ notAttempted }}</h3>
    <RouterLink class="btn" to="/">Back to Home</RouterLink>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTestState } from "../stores/testState";

const testState = useTestState();
const testId = computed(() => testState.testId);
const testTitle = computed(() => testState.testTitle);
const testData = computed(() => testState.testData);

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

          console.log(`Q[${i1},${i2},${i3}] has ${c} correct options`);
        } else if (question.answer === userAnswer) {
          console.log(`Correct: Q[${i1},${i2},${i3}]`);
          correct += 1;
        } else {
          incorrect += 1;
        }
      });
    });
  });
}
</script>
