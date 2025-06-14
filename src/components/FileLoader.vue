<template>
  <div class="file-loader" style="display:flex;justify-content:center;margin-top:2%;">
    <input style="display:none;" type="file" id="fileLoader" accept=".json" @change="handleFile" />
    <label for="fileLoader" class="btn">Load New Test</label>
  </div>
</template>

<script setup>
import {useRoute,useRouter} from 'vue-router'
import { useTestState } from '../stores/testState'
import { useTestManager } from '../stores/testManager'

const route = useRoute()
const router = useRouter()

const testState = useTestState()
const testManager = useTestManager()

function handleFile(e)
{
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () =>
  {
    try
    {
      const json = JSON.parse(reader.result)
      testState.loadTest(json)
      const testId = testState.testId
      const snapshot = testState.snapshotState()
      testManager.addTestSnapshot(snapshot)
      router.push(`/test/${testId}/info`)
    }
    catch (err)
    {
      alert('Invalid test file.')
    }
  }
  reader.readAsText(file)
}
</script>
