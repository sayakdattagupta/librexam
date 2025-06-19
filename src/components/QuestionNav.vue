<template>
  <div class="bGrid">
    <button
      v-for="(question, index) in section.questions"
      :key="index"
      :class="{
        CurrentQuestion: index === props.qIdx,
        ViewedQuestion:
          testState.viewedQuestions[props.subIdx][props.secIdx][index] === true,
        MarkedQuestion:
          testState.markedForReview?.[props.subIdx]?.[props.secIdx]?.[index] ===
          true,
        AnsweredQuestion:
          testState.answers[props.subIdx][props.secIdx][index] !== null,
      }"
      @click="changeQ(index)"
    >
      {{ index + 1 }}
    </button>
  </div>
</template>
<script setup>
import { useTestState } from "../stores/testState";
import { computed } from "vue";

const testState = useTestState();

const props = defineProps({
  subIdx: Number,
  secIdx: Number,
  qIdx: Number,
});

const subject = computed(() => testState.testData.subjects[props.subIdx]);
const section = computed(() => subject.value.sections[props.secIdx]);
const question = computed(() => section.value.questions[props.qIdx]);

function changeQ(index) {
  testState.currentQuestionIndex = index;
}
</script>
