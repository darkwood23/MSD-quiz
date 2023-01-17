const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: "Who is chosen to play the lion in the craftsmen's play? ",
    answers: [
      { text: 'Bottom', correct: false },
      { text: 'Quince', correct: false },
      { text: 'Peaseblossom', correct: false },
      { text: 'Snug', correct: true },
    ]
  },
  {
    question: 'Which of the young Athenians is first affected by the love potion?',
    answers: [
      { text: 'Lysander', correct: true },
      { text: 'Helena', correct: false },
      { text: 'Hermia', correct: false },
      { text: 'Demetrius', correct: false }
    ]
  },
  {
    question: "Which man does Hermia's father want her to marry?",
    answers: [
      { text: 'Lysander', correct: false },
      { text: 'Demetrius', correct: true },
      { text: 'Theseus', correct: false },
      { text: 'Philostrate', correct: false }
    ]
  },
  {
    question: 'Where do Lysander and Hermia plan to be married?',
    answers: [
      { text: "Theseus's palace", correct: false },
      { text: "Lysander's aunt's house", correct: true },
      { text: "The temple of Diana", correct: false },
      { text: "A forest glade", correct: false }
    ]
  },
  {
    question: "What part of her appearance does Hermia believe Helena has exploited to win Lysander's love? ",
    answers: [
      { text: "Her hair", correct: false },
      { text: "Her face", correct: false },
      { text: "Her height", correct: true },
      { text: "Her legs", correct: false }
    ]
  }
]