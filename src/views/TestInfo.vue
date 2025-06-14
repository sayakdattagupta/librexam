<template>
  <div class="test-info">
    <h2>{{ testTitle }}</h2>
    <p>Author: {{ author }}</p>
    <p>Duration: {{ duration }} minutes</p>
    <p>{{ description }}</p>

    <h3>Subjects</h3>
    <ul>
      <li v-for="subject in subjects" :key="subject.name">
        {{ subject.name }}
      </li>
    </ul>
    <br>
    <button @click="startTest">Start Test</button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useTestManager } from '../stores/testManager'
import { useTestState } from '../stores/testState'

const route = useRoute()
const router = useRouter()

const testManager = useTestManager()
const testState = useTestState()

const testId = testState.testId;
const testTitle = testState.testTitle
const author = testState.author
const duration = testState.duration
const description = testState.description
const subjects = testState.testData?.subjects || []

function startTest()
{
  router.push(`/test/${testId}`)
}
</script>

