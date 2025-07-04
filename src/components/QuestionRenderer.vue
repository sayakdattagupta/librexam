<template>
  <div class="button-hor" style="padding: 0; margin-top: 0">
    <h3>Question No. {{ props.qIdx + 1 }}</h3>
    <div class="spacer" />
    <h3>
      <span style="color: var(--color-g)">+{{ section.posM }}</span>
      &nbsp;&nbsp;
      <span style="color: var(--color-r)">-{{ section.negM }}</span>
    </h3>
  </div>

  <p><latexText :text="question.text" /></p>

  <div style="text-align: center">
    <img
      v-if="question.image"
      :src="question.image"
      alt="questionimg"
      style="max-width: 100%; max-height: 600px; margin: 1em 0"
    />
  </div>

  <ul v-if="question.type === 'SMCQ' || question.type === 'MMCQ'">
    <li
      v-for="(option, index) in question.options"
      :key="index"
      style="padding-bottom: 5px"
    >
      <button
        style="width: 100%; text-align: left; font-size: 1em"
        @click="handleClick(index)"
        :class="getOptionClass(index)"
      >
        <div><latexText :text="option" /></div>
      </button>
    </li>
  </ul>

  <div v-if="question.type === 'NUM'" style="margin-top: 1rem">
    <input
      type="number"
      autocomplete="off"
      v-model="inputVal"
      @keyup.enter="submitInput"
      @blur="submitInput"
      :disabled="props.readonly"
      style="box-sizing: border-box; width: 100%"
    />

    <div
      v-if="props.showCorrect"
      style="margin-top: 0.75rem; font-weight: bold"
    >
      <span v-if="isNumCorrect" style="color: var(--color-g)">
        Correct Answer
      </span>
      <span v-else style="color: var(--color-r)">
        Correct Answer: {{ correctAnswer }}
      </span>
    </div>
  </div>

  <div v-if="props.showCorrect">
    <h3>Solution:</h3>
    <div style="text-align: center">
      <img
        v-if="question.simage"
        :src="question.simage"
        alt="solutionimg"
        style="max-width: 100%; max-height: 600px; margin: 1em 0"
      />
    </div>
    <p v-if="question.solution"><latexText :text="question.solution" /></p>
    <p v-if="!question.solution && !question.simage">No Solution Provided.</p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useTestState } from "../stores/testState";
import latexText from "./latexText.vue";

const testState = useTestState();

const props = defineProps({
  subIdx: Number,
  secIdx: Number,
  qIdx: Number,
  readonly: { type: Boolean, default: false },
  showCorrect: { type: Boolean, default: false },
});

const subject = computed(() => testState.testData.subjects[props.subIdx]);
const section = computed(() => subject.value.sections[props.secIdx]);
const question = computed(() => section.value.questions[props.qIdx]);

const inputVal = ref("");

const userAnswer = computed(
  () => testState.answers[props.subIdx]?.[props.secIdx]?.[props.qIdx],
);
const correctAnswer = computed(() => question.value.answer);

const isNumCorrect = computed(
  () =>
    question.value.type === "NUM" &&
    userAnswer.value !== null &&
    userAnswer.value === correctAnswer.value,
);

watch(
  () => [props.subIdx, props.secIdx, props.qIdx, userAnswer.value],
  () => {
    inputVal.value =
      userAnswer.value != null ? userAnswer.value.toString() : "";
  },
  { immediate: true },
);

function handleClick(index) {
  if (props.readonly) return;

  if (question.value.type === "SMCQ") {
    answerQ(index);
  } else {
    answerMMCQ(index);
  }
}

function answerQ(index) {
  testState.answerCurrentQuestion(index);
}

function answerMMCQ(index) {
  const cur = testState.answers[props.subIdx]?.[props.secIdx]?.[props.qIdx];
  if (!Array.isArray(cur)) {
    testState.answers[props.subIdx][props.secIdx][props.qIdx] = [];
  }

  const answerArray = testState.answers[props.subIdx][props.secIdx][props.qIdx];
  const existingIndex = answerArray.indexOf(index);

  if (existingIndex === -1) {
    answerArray.push(index);
  } else {
    answerArray.splice(existingIndex, 1);
  }

  if (answerArray.length === 0) {
    testState.answers[props.subIdx][props.secIdx][props.qIdx] = null;
  }
}

function submitInput() {
  if (props.readonly) return;

  const val = inputVal.value?.toString().trim();
  if (val === "") {
    testState.answers[props.subIdx][props.secIdx][props.qIdx] = null;
  } else {
    testState.answers[props.subIdx][props.secIdx][props.qIdx] = Number(val);
  }
}

function getOptionClass(index) {
  const ua = testState.answers[props.subIdx]?.[props.secIdx]?.[props.qIdx];
  const ca = question.value.answer;

  const isSelected =
    question.value.type === "SMCQ"
      ? ua === index
      : Array.isArray(ua) && ua.includes(index);

  const isCorrect =
    question.value.type === "SMCQ"
      ? ca === index
      : Array.isArray(ca) && ca.includes(index);

  return {
    SelectedOption: isSelected,
    CorrectOption: props.showCorrect && isCorrect,
    IncorrectOption: props.showCorrect && isSelected && !isCorrect,
  };
}
</script>
