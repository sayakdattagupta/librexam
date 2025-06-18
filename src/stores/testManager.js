import { defineStore } from "pinia";

const STORAGE_KEY = "librexam_test_history";

export const useTestManager = defineStore("testManager", {
  state: () => ({
    savedTests: [],
  }),

  actions: {
    ensureLoaded() {
      if (this.savedTests.length === 0) {
        const raw = localStorage.getItem(STORAGE_KEY);
        this.savedTests = raw ? JSON.parse(raw) : [];
      }
    },

    loadFromStorage() {
      this.ensureLoaded();
    },

    saveToStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.savedTests));
    },

    addTestSnapshot(snapshot) {
      this.ensureLoaded();
      const existingIndex = this.savedTests.findIndex(
        (t) => t.id === snapshot.id,
      );
      if (existingIndex !== -1) {
        this.savedTests[existingIndex] = snapshot;
      } else {
        this.savedTests.push(snapshot);
      }
      this.saveToStorage();
    },

    deleteTest(id) {
      this.ensureLoaded();
      this.savedTests = this.savedTests.filter((t) => t.id !== id);
      this.saveToStorage();
    },

    clearAll() {
      this.savedTests = [];
      this.saveToStorage();
    },

    exportTests() {
      this.ensureLoaded();
      const blob = new Blob([JSON.stringify(this.savedTests, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "librexam_saved_tests.json";
      a.click();
      URL.revokeObjectURL(url);
    },

    importTests(jsonData) {
      try {
        const parsed = JSON.parse(jsonData);
        if (Array.isArray(parsed)) {
          this.savedTests = parsed;
          this.saveToStorage();
        }
      } catch (e) {
        console.error("Invalid import data", e);
      }
    },
  },
});
