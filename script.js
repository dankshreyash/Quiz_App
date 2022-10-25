const startbutton = document.getElementById('start-btn')
const nextbutton = document.getElementById('next-btn')
const quescontainerele = document.getElementById('question-container')
const quesele = document.getElementById('question')
const anssele = document.getElementById('answer-buttons')


let shuffleques, currentquesindex

startbutton.addEventListener('click', startgame)
nextbutton.addEventListener('click', () => {
    currentquesindex++
    nextques()
})

function startgame() {
    startbutton.classList.add('hide')
    shuffleques = questions.sort(() => Math.random() - .5)
    currentquesindex = 0
    quescontainerele.classList.remove('hide')
    nextques()
}

function nextques() {
    resetState()
    showques(shuffleques[currentquesindex])
}

function showques(question) {
    quesele.innerText = question.question
    question.answers.forEach(answers => {
        const button = document.createElement('button')
        button.innerText = answers.text
        button.classList.add('btn')

        if (answers.correct) {
            button.dataset.correct = answers.correct
        }
        button.addEventListener('click', selectans)
        anssele.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextbutton.classList.add('hide')
    while (anssele.firstChild) {
        anssele.removeChild(anssele.firstChild)
    }
}

function selectans(e) {
    const selectedbutton = e.target
    const correct = selectedbutton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(anssele.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleques.length > currentquesindex + 1)

        nextbutton.classList.remove('hide')
    else {
        startbutton.innerText = 'Restart'
        startbutton.classList.remove('hide')

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
        question: 'Which of these tags are all <table> tags?',
        answers: [
            { text: '<table><head><tfoot>', correct: false },
            { text: ' <table><tr><td>', correct: true },
            { text: '<table><tr><tt>', correct: false },
            { text: ' <thead><body><tr>', correct: false }

        ]
    },

    {
        question: 'What is fullform of HTML?',
        answers: [
            { text: 'HyperText Markup Language', correct: true },
            { text: 'HighText Machine Language', correct: false },
            { text: 'HyperText and links Markup Language', correct: false },
            { text: 'None of these', correct: false }
        ]
    },
    {
        question: 'In how many ways can CSS be written in?' ,

            answers : [
                { text: '1', correct: false },
                { text: '2', correct: false },
                { text: '3', correct: true },
                { text: '4', correct: false }
            ]
    },
    {
        question: 'Which of the following is not a Javascript framework?' ,

            answers : [
                { text: 'Node', correct: false },
                { text: 'React', correct: false },
                { text: 'vue', correct: false },
                { text: 'Cassandra', correct: true }
            ]
    }
]