<template>
 <div class="container">
  <header style="display:flex;flex-wrap:wrap;width:100%;justify-content:space-between;">
   <div>
    <h3 style="display:inline-block;">{{subject.name}}</h3> | 
    <h3 style="display:inline-block"> {{section.name}}</h3>
   </div>
   <h3>{{timeLeft}}</h3>
  </header>
  <div class="testArea">
   <button class="drawerOpen" @click="drawerVis=true">&lt</button>
   <div class="qArea">
    <QuestionRenderer :subIdx=cSub :secIdx=cSec :qIdx=cQ />
   </div>
   <div class="qNav" v-show="drawerVis || isWideScreen">
    <button class="drawerOpen" @click="drawerVis=false" v-show="!isWideScreen">&gt</button>
    <QuestionNav :subIdx=cSub :secIdx=cSec :qIdx=cQ />
   </div>
   <div class="fFooter">
    <div class="button-hor">
     <button>Mark for Review</button>
     <button>Submit</button>
     <button @click="nextQ">Next</button>
    </div>
   </div>
  </div>
 </div>
</template>
<script setup>
 import {computed,ref,watch,onMounted,onBeforeUnmount} from 'vue'
 import {useRoute,useRouter} from 'vue-router'
 import {useTestState} from '../stores/testState'
 import QuestionRenderer from '../components/QuestionRenderer.vue'
 import QuestionNav from '../components/QuestionNav.vue'

 const testState = useTestState()

 const testId = computed(() => testState.testId)
 const testTitle = computed(() => testState.testTitle)

 const cSub = computed(() => testState.currentSubjectIndex)
 const cSec = computed(() => testState.currentSectionIndex)
 const cQ = computed(() => testState.currentQuestionIndex)

 const subject = computed(() => testState.testData.subjects[testState.currentSubjectIndex])
 const section = computed(() => subject.value.sections[testState.currentSectionIndex])
 const question = computed(() => section.value.questions[testState.currentQuestionIndex])

 watch(
  () => [testState.currentSubjectIndex, testState.currentSectionIndex, testState.currentQuestionIndex],
  ([sub, sec, q]) => {
    testState.markViewed(sub, sec, q)
  },
  { immediate: true } 
 )

 const isWideScreen = ref(window.innerWidth >= 900)

 const handleResize = () => {
   isWideScreen.value = window.innerWidth >= 900
 }

 onMounted(() => {
   window.addEventListener('resize', handleResize)
 })

 onBeforeUnmount(() => {
   window.removeEventListener('resize', handleResize)
 })

 function nextQ()
 {
  if(testState.currentQuestionIndex<section.value.questions.length-1)
  {
    testState.currentQuestionIndex+=1;
  }
  else if(testState.currentSectionIndex<subject.value.sections.length-1)
  {
   testState.currentQuestionIndex=0;
   testState.currentSectionIndex+=1;
  }
  else if(testState.currentSubjectIndex<testState.testData.subjects.length-1)
  {
   testState.currentQuestionIndex=0;
   testState.currentSectionIndex=0;
   testState.currentSubjectIndex+=1;
  }
 }

 const drawerVis = ref(false)

 const timeLeft="00:00"
</script>
