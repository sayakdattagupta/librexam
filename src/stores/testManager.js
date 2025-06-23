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
      const raw = localStorage.getItem(STORAGE_KEY);
      const existing = raw ? JSON.parse(raw) : [];

      const updated = existing.filter((t) => t.id !== id);

      this.savedTests = updated;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },

    clearAll() {
      localStorage.clear();
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
        this.savedTests = jsonData;
        this.saveToStorage();
        alert("Data loaded successfully.");
      } catch (e) {
        console.error("Invalid import data.", e);
      }
    },
  },
});
