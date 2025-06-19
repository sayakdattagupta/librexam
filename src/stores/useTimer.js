import { defineStore } from "pinia";
import { ref } from "vue";
import { useTestState } from "./testState";

export const useTimer = defineStore("countdown", () => {
  let intervalId = null;

  const isRunning = ref(false);

  function start() {
    if (isRunning.value) return;

    const testState = useTestState();
    isRunning.value = true;

    intervalId = setInterval(() => {
      testState.timeElapsed++;
      testState.syncToStorage();

      if (testState.timeElapsed >= testState.duration) {
        stop();
      }
    }, 1000);
  }

  function stop() {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
    isRunning.value = false;
  }

  return {
    start,
    stop,
    isRunning,
  };
});
