import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import LoadTest from "../views/LoadTest.vue";
import Test from "../views/Test.vue";
import TestInfo from "../views/TestInfo.vue";
import Result from "../views/Result.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/loadTest", component: LoadTest },
  { path: "/test/:testId", component: Test },
  { path: "/testInfo/:testId", component: TestInfo },
  { path: "/result/:testId", component: Result },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
