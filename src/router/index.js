import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Test from "../views/Test.vue";
import TestInfo from "../views/TestInfo.vue";
import TestMaker from "../views/TestMaker.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/test/:testId", component: Test },
  { path: "/test/:testId/info", component: TestInfo },
  { path: "/make", component: TestMaker },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
