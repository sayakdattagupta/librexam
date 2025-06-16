import { defineStore } from 'pinia'

export const useTestState = defineStore('testState', {
  state: () => ({
    testId: null,
    testTitle: '',
    author: '',
    duration: 0,
    description: '',
    testData: null,
    currentSubjectIndex: 0,
    currentSectionIndex: 0,
    currentQuestionIndex: 0,
    answers: {},
    viewedQuestions: new Set(),
    markedForReview: new Set(),
    timeElapsed: 0,
    questionTimes: {}
  }),

  actions: {
    initFromLocalStorage()
    {
      const saved = localStorage.getItem('currentTest')
      if (saved)
      {
        const snapshot = JSON.parse(saved)
        this.loadSnapshot(snapshot)
      }
    },

    loadTest(testJson)
    {
      this.testId = crypto.randomUUID()
      this.testTitle = testJson.title
      this.author = testJson.author
      this.duration = testJson.duration
      this.description = testJson.description
      this.testData = testJson
      this.currentSubjectIndex = 0
      this.currentSectionIndex = 0
      this.currentQuestionIndex = 0
      this.answers = {}
      this.viewedQuestions = new Set()
      this.markedForReview = new Set()
      this.timeElapsed = 0
      this.questionTimes = {},
      localStorage.setItem('currentTest', JSON.stringify(this.snapshotState()))
    },

    getCurrentQuestionId()
    {
        return `${this.currentSubjectIndex}-${this.currentSectionIndex}-${this.currentQuestionIndex}`
    },

    answerQuestion(questionId, response)
    {
      this.answers[questionId] = response
      this.viewedQuestions.add(questionId)
    },

    toggleMarkForReview(questionId)
    {
      if (this.markedForReview.has(questionId))
      {
        this.markedForReview.delete(questionId)
      }
      else
      {
        this.markedForReview.add(questionId)
      }
    },

    getCurrentQuestion()
    {
      return this.testData
        ?.subjects[this.currentSubjectIndex]
        ?.sections[this.currentSectionIndex]
        ?.questions[this.currentQuestionIndex] || null
    },

    logQuestionTime(questionId, seconds)
    {
      if (!questionId) return
      if (!this.questionTimes[questionId])
      {
        this.questionTimes[questionId] = 0
      }
      this.questionTimes[questionId] += seconds
    },

    snapshotState()
    {
      return {
        id: this.testId || crypto.randomUUID(),
        name: this.testTitle,
        author: this.author,
        timestamp: new Date().toISOString(),
        duration: this.duration,
        description: this.description,
        testData: this.testData,
        currentSubjectIndex: this.currentSubjectIndex,
        currentSectionIndex: this.currentSectionIndex,
        currentQuestionIndex: this.currentQuestionIndex,
        answers: { ...this.answers },
        viewedQuestions: Array.from(this.viewedQuestions),
        markedForReview: Array.from(this.markedForReview),
        timeElapsed: this.timeElapsed,
        questionTimes: { ...this.questionTimes }
      }
    },

    loadSnapshot(snapshot)
    {
      this.testId = snapshot.id
      this.testTitle = snapshot.name
      this.author = snapshot.author
      this.duration = snapshot.duration
      this.description = snapshot.description
      this.testData = snapshot.testData
      this.currentSubjectIndex = snapshot.currentSubjectIndex
      this.currentSectionIndex = snapshot.currentSectionIndex
      this.currentQuestionIndex = snapshot.currentQuestionIndex
      this.answers = snapshot.answers || {}
      this.viewedQuestions = new Set(snapshot.viewedQuestions || [])
      this.markedForReview = new Set(snapshot.markedForReview || [])
      this.timeElapsed = snapshot.timeElapsed || 0
      this.questionTimes = snapshot.questionTimes || {},
      localStorage.setItem('currentTest', JSON.stringify(this.snapshotState()))
    }
  }
})

