import { defineStore } from "pinia";
import { useTestManager } from "./testManager";
import { preloadAssets } from "../utils/preloadAssets";

export const useTestState = defineStore("testState", {
  state: () => ({
    testId: null,
    testTitle: "",
    author: "",
    duration: 0,
    description: "",
    testData: null,
    currentSubjectIndex: 0,
    currentSectionIndex: 0,
    currentQuestionIndex: 0,
    answers: {},
    viewedQuestions: {},
    markedForReview: {},
    questionTimes: {},
    timeElapsed: 0,
  }),

  actions: {
    initFromLocalStorage() {
      const saved = localStorage.getItem("currentTest");
      if (saved) {
        const snapshot = JSON.parse(saved);
        this.loadSnapshot(snapshot);
      }
    },

    async loadTest(testJson) {
      this.testId = crypto.randomUUID();
      this.testTitle = testJson.title;
      this.author = testJson.author;
      this.duration = testJson.duration;
      this.description = testJson.description;
      this.testData = testJson;
      this.currentSubjectIndex = 0;
      this.currentSectionIndex = 0;
      this.currentQuestionIndex = 0;
      this.answers = {};
      this.viewedQuestions = {};
      this.markedForReview = {};
      this.questionTimes = {};
      this.timeElapsed = 0;

      await preloadAssets(testJson);
      this.syncToStorage();
    },

    snapshotState() {
      return {
        id: this.testId,
        name: this.testTitle,
        author: this.author,
        duration: this.duration,
        description: this.description,
        testData: this.testData,
        timestamp: new Date().toISOString(),
        currentSubjectIndex: this.currentSubjectIndex,
        currentSectionIndex: this.currentSectionIndex,
        currentQuestionIndex: this.currentQuestionIndex,
        answers: this.answers,
        viewedQuestions: this.viewedQuestions,
        markedForReview: this.markedForReview,
        questionTimes: this.questionTimes,
        timeElapsed: this.timeElapsed,
      };
    },

    syncToStorage() {
      const snapshot = this.snapshotState();
      localStorage.setItem("currentTest", JSON.stringify(snapshot));
      const manager = useTestManager();
      manager.addTestSnapshot(snapshot);
    },

    loadSnapshot(snapshot) {
      this.testId = snapshot.id;
      this.testTitle = snapshot.name;
      this.author = snapshot.author;
      this.duration = snapshot.duration;
      this.description = snapshot.description;
      this.testData = snapshot.testData;
      this.currentSubjectIndex = snapshot.currentSubjectIndex;
      this.currentSectionIndex = snapshot.currentSectionIndex;
      this.currentQuestionIndex = snapshot.currentQuestionIndex;
      this.answers = snapshot.answers || {};
      this.viewedQuestions = snapshot.viewedQuestions || {};
      this.markedForReview = snapshot.markedForReview || {};
      this.questionTimes = snapshot.questionTimes || {};
      this.timeElapsed = snapshot.timeElapsed || 0;
      this.syncToStorage();
    },

    answerQuestion(subIdx, secIdx, qIdx, response) {
      this._initNested(this.answers, subIdx, secIdx);
      this.answers[subIdx][secIdx][qIdx] = response;
    },

    markViewed(subIdx, secIdx, qIdx) {
      this._initNested(this.viewedQuestions, subIdx, secIdx);
      this.viewedQuestions[subIdx][secIdx][qIdx] = true;
      this.syncToStorage();
    },

    toggleMarkForReview(subIdx, secIdx, qIdx) {
      this._initNested(this.markedForReview, subIdx, secIdx);
      const cur = this.markedForReview[subIdx][secIdx][qIdx];
      this.markedForReview[subIdx][secIdx][qIdx] = !cur;
      this.syncToStorage();
    },

    logQuestionTime(subIdx, secIdx, qIdx, seconds) {
      this._initNested(this.questionTimes, subIdx, secIdx);
      if (!this.questionTimes[subIdx][secIdx][qIdx])
        this.questionTimes[subIdx][secIdx][qIdx] = 0;
      this.questionTimes[subIdx][secIdx][qIdx] += seconds;
      this.syncToStorage();
    },

    getCurrentQuestion() {
      return (
        this.testData?.subjects?.[this.currentSubjectIndex]?.sections?.[
          this.currentSectionIndex
        ]?.questions?.[this.currentQuestionIndex] || null
      );
    },

    answerCurrentQuestion(response) {
      const s = this.currentSubjectIndex;
      const sec = this.currentSectionIndex;
      const q = this.currentQuestionIndex;
      this.answerQuestion(s, sec, q, response);
    },

    toggleMarkCurrentQuestion() {
      const s = this.currentSubjectIndex;
      const sec = this.currentSectionIndex;
      const q = this.currentQuestionIndex;
      this.toggleMarkForReview(s, sec, q);
    },

    logCurrentQuestionTime(seconds) {
      const s = this.currentSubjectIndex;
      const sec = this.currentSectionIndex;
      const q = this.currentQuestionIndex;
      this.logQuestionTime(s, sec, q, seconds);
    },

    initializeAnswers(testData) {
      if (!this.answers) this.answers = {};

      testData.subjects.forEach((subject, subIdx) => {
        if (!this.answers[subIdx]) this.answers[subIdx] = {};

        subject.sections.forEach((section, secIdx) => {
          if (!this.answers[subIdx][secIdx]) this.answers[subIdx][secIdx] = {};

          section.questions.forEach((_, qIdx) => {
            if (!(qIdx in this.answers[subIdx][secIdx])) {
              this.answers[subIdx][secIdx][qIdx] = null;
            }
          });
        });
      });
    },

    _initNested(obj, subIdx, secIdx) {
      if (!obj[subIdx]) obj[subIdx] = {};
      if (!obj[subIdx][secIdx]) obj[subIdx][secIdx] = {};
    },
  },
});
