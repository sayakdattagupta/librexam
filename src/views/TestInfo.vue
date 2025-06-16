<template>
 <div class="container">
  <h2>{{ testTitle }}</h2>
  <div class="secBreak"/>
  <p>Author: {{ author }}</p>
  <p>Duration: {{ duration }} minutes</p>
  <p>Description: {{ description }}</p>

  <h3>Subjects</h3>
  <ul>
   <li style="margin-bottom:0.3rem;" v-for="subject in subjects" :key="subject.name">
    {{ subject.name }}
   </li>
  </ul>
  <br>
  <button @click="startTest">Start Test</button>
 </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTestManager } from '../stores/testManager'
import { useTestState } from '../stores/testState'

const route = useRoute()
const router = useRouter()

const testManager = useTestManager()
const testState = useTestState()

const testId = computed(() => testState.testId)
const testTitle = computed(() => testState.testTitle)
const author = computed(() => testState.author)
const duration = computed(() => testState.duration)
const description = computed(() => testState.description)
const subjects = computed(() => testState.testData?.subjects || [])

function startTest()
{
  const snapshot = testState.snapshotState()
  testManager.addTestSnapshot(snapshot)
  router.push(`/test/${testId.value}`)
}
</script>
