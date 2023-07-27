const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [{
        question: 'Which of the following keywords is used to define a variable in Javascript ? ',
        choice1: 'var',
        choice2: 'let',
        choice3: 'Both A and B',
        choice4: 'None of the above',
        answer: 3,
    },
    {
        question: 'Which of the following methods is used to access HTML elements using Javascript?',
        choice1: 'getElementbyid()',
        choice2: 'getElementByClassName()',
        choice3: 'Both A and B',
        choice4: 'None of the above',
        answer: 3,
    },
    {
        question: 'Upon encountering empty statements, what does the Javascript Interpreter do?',
        choice1: 'Throws an error',
        choice2: 'Ignores the statements',
        choice3: 'Gives a warning',
        choice4: 'None of the above',
        answer: 2,
    },
    {
        question: 'What keyword is used to check whether a given property is valid or not ? ',
        choice1: 'in',
        choice2: 'is in',
        choice3: 'exists',
        choice4: 'lies',
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach((choice) => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach((choice) => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}
startGame()