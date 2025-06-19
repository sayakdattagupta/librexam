import { createApp } from "vue";
import "./assets/styles/index.css";
import "katex/dist/katex.min.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(createPinia());
app.use(router);
import { useThemeStore } from "./stores/themeStore";
const themeStore = useThemeStore();
themeStore.applyTheme();
app.mount("#app");
