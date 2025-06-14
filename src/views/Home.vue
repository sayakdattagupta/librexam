<template>
  <div class="container">
    <h2 class="title">librexam.github.io</h2>

            <nav>
            <RouterLink style="btn" to="/">Home</RouterLink> |
            <RouterLink style="btn" to="/make">Make New Test</RouterLink>
            </nav>

    
    <FileLoader />

    <div class="saved-tests" v-if="testManager.savedTests.length">
      <h3>Resume a Saved Test</h3>
      <ul>
        <li style="padding-bottom:5px;" v-for="test in testManager.savedTests" :key="test.id">
          <div class="button-hor">
          <button class="btn" @click="resume(test)">Resume "{{ test.name }}" ({{ test.timestamp.split('T')[0] }})</button>
          <div class="spacer"></div>
          <button class="btn" @click="deleteTest(test)">Delete Test</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import FileLoader from '../components/FileLoader.vue'
import { useTestManager } from '../stores/testManager'
import { useTestState } from '../stores/testState'
import {RouterView,useRouter} from 'vue-router'

const testManager = useTestManager()
const testState = useTestState()
const router = useRouter()

testManager.loadFromStorage()

function resume(snapshot)
{
  testState.loadSnapshot(snapshot)
  router.push(`/test/${snapshot.id}`)
}

function deleteTest(test)
{
    testManager.deleteTest(test.id)
}
</script>

