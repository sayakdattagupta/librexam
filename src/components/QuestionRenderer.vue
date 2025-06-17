<template>
 <div class="button-hor" style="padding:0; margin-top:0">
  <h3>Question No. {{ props.qIdx + 1 }}</h3>
  <div class="spacer" />
  <h3>
   <span style="color:red">+{{ section.posM }}</span>&nbsp;&nbsp;
   <span style="color:green">-{{ section.negM }}</span>
  </h3>
 </div>

 <p>{{ question.text }}</p>

 <ul v-if="question.type === 'SMCQ' || question.type === 'MMCQ'">
  <li
   style="padding-bottom:5px"
   v-for="(option, index) in question.options"
   :key="index"
  >
   <button
    style="width:100%; text-align:left; font-size:1em;"
    @click="question.type === 'SMCQ' ? answerQ(index) : answerMMCQ(index)"
    :class="{
     ViewedQuestion: question.type === 'SMCQ'
      ? testState.answers[props.subIdx]?.[props.secIdx]?.[props.qIdx] === index
      : Array.isArray(testState.answers[props.subIdx]?.[props.secIdx]?.[props.qIdx]) &&
        testState.answers[props.subIdx][props.secIdx][props.qIdx].includes(index)
    }"
   >
    {{ option }}
   </button>
  </li>
 </ul>

 <input
  v-if="question.type === 'NUM'"
  autocomplete="off"
  type="number"
  v-model="inputVal"
  @keyup.enter="submitInput()"
  @blur="submitInput()"
/>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useTestState } from '../stores/testState'

const testState = useTestState()

const props = defineProps({
 subIdx: Number,
 secIdx: Number,
 qIdx: Number
})

const subject = computed(() => 
 testState.testData.subjects[props.subIdx]
)

const section = computed(() => 
 subject.value.sections[props.secIdx]
)

const question = computed(() => 
 section.value.questions[props.qIdx]
)

const inputVal = ref('')

watch(
 () => [
  props.subIdx,
  props.secIdx,
  props.qIdx,
  testState.answers[props.subIdx]?.[props.secIdx]?.[props.qIdx]
 ],
 () => {
  const ans = testState.answers[props.subIdx]?.[props.secIdx]?.[props.qIdx]
  inputVal.value = ans != null ? ans.toString() : ''
 },
 { immediate: true }
)

function answerQ(index)
{
 testState.answerCurrentQuestion(index)
}

function answerMMCQ(index)
{
 if (!Array.isArray(testState.answers[props.subIdx][props.secIdx][props.qIdx]))
 {
  testState.answers[props.subIdx][props.secIdx][props.qIdx] = []
 }

 const answerArray = testState.answers[props.subIdx][props.secIdx][props.qIdx]
 const existingIndex = answerArray.indexOf(index)

 if (existingIndex === -1)
 {
  answerArray.push(index)
 }
 else
 {
  answerArray.splice(existingIndex, 1)
 }

 if (answerArray.length === 0)
 {
  testState.answers[props.subIdx][props.secIdx][props.qIdx] = null
 }

 console.log(testState.answers[props.subIdx][props.secIdx][props.qIdx])
}

function submitInput()
{
 const val = inputVal.value?.toString().trim()
 if (val === '')
 {
  testState.answers[props.subIdx][props.secIdx][props.qIdx] = null
 }
 else
 {
  testState.answers[props.subIdx][props.secIdx][props.qIdx] = Number(val)
 }
}
</script>
