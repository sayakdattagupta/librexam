import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    currentTheme: localStorage.getItem("theme") || "light",
  }),
  actions: {
    toggleTheme() {
      this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", this.currentTheme);
      document.documentElement.classList.toggle(
        "dark",
        this.currentTheme === "dark",
      );
    },
    applyTheme() {
      document.documentElement.classList.toggle(
        "dark",
        this.currentTheme === "dark",
      );
    },
  },
});
