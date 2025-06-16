<template>
 <div class="button-hor" style="padding:none;margin-top:0">
 <h3>Question No. {{props.qIdx+1}}</h3>
 <div class="spacer"/>
 <h3>{{section.posM}}</h3>
 </div>
 <p>{{question.text}}</p>
 <ul>
  <li style="padding-bottom:5px" v-for="(option,index) in question.options" :key="index">
   <button style="width:100%;text-align:left;font-size:1em;">{{option}}</button>
  </li>
 </ul>
</template>

<script setup>
import {computed} from 'vue'
import {useTestState} from '../stores/testState'

const testState = useTestState()

const props = defineProps({
  subIdx: Number,
  secIdx: Number,
  qIdx: Number
})

const subject = computed(() => testState.testData.subjects[props.subIdx])
const section = computed(() => subject.value.sections[props.secIdx])
const question = computed(() => section.value.questions[props.qIdx])
</script>
