const startButton = document.getElementById('start-button');
let introHide = document.querySelector('.hide');
let questionShow = document.querySelector('.show');
let questionTitle = document.getElementById("title-question")
let answerButtons = document.getElementById("buttons-answer")
let timerClock = document.getElementById("timer")
let scoreBoard = document.getElementById("score-board")

let score = 0 ;
let timerCount ;
let randomQuestion ;
let currentQuestion ;

startButton.addEventListener('click', startGame)


function startGame(){
    console.log("hi");
    introHide.style.display = "none";
    questionShow.style.display = "block";
    randomQuestion = questions.sort(() => Math.random() - .5);
    currentQuestion = 0;
    nextQuestion()
    startTimer()
   
    console.log(questions[0].answers)
}

function nextQuestion(){
    cleanScreen()
    showQuestion(randomQuestion[currentQuestion])
    document.body.classList.remove('correct')
}

function showQuestion(question){
    questionTitle.innerText = question.question
    question.answers.forEach(answers => {
        const button = document.createElement("button")
        button.innerText = answers.text
        button.classList.add('answer-button')
        if (answers.correct) {
            button.dataset.correct = answers.correct
        }
        button.addEventListener('click', selectedAnswer)
        answerButtons.appendChild(button)
    })
}

function cleanScreen(){
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }

}

function correctAnswer(){
    document.body.classList.add('correct');
    currentQuestion++;
    nextQuestion();
    console.log("correcto");
}

function wrongAnswer(){
    if(timerCount <=20){
        timerCount=0
        clearInterval(timer)
        finishGame()
        console.log("menor de 20")
    
    }
    else {
        timerCount -= 20
        currentQuestion++
        nextQuestion()
        console.log("mas de 20 error")
    }
}

function selectedAnswer(e){
    const clickedButton = e.target;
    const correct = clickedButton.dataset.correct
    if (correct){
        correctAnswer()
    }
    else  {
        wrongAnswer()
    }
}

function startTimer(){
    timerCount = 61
    timerClock.classList.add("timer")
    timer = setInterval( function() {
        timerCount--;
        timerClock.textContent = timerCount + " : Seconds left";
        if (timerCount === 0){
            clearInterval(timer);
        }
    }, 1000);
}    

function startScore(){
    scoreBoard.classList.add("score");
    scoreBoard.textContent = "Score: " + score;
    if (correctAnswer()){
        score += 10;
    }
}

function finishGame(){
    return
}

const questions = [
    {
        question : 'Which of the following does the pop() method do?',
        answers : [
            { text: 'It decrements the total length by 1', correct: true},
            { text: 'It increments the total length by 1', correct: false},
            { text: 'It prints the first element but no effect on the length', correct: false},
            { text: 'None of the above options', correct: false},
    ],
        correctanswer : '0',
    },
    {
        question : 'Inside which element do you put JavaScript?',
        answers : [
            { text: '<var>', correct: false},
            { text: '<script>', correct: true},
            { text: '<section>', correct: false},
            { text: '<code>', correct: false},
        ],
        correctanswer : '1',
    },
    {
        question : 'How do you get the DOM element with id in JavaScript?',
        answers : [
            { text: 'window.getElementById(...)', correct: false},
            { text: 'page.getElementById(...)', correct: false},
            { text: 'document.getElementById(...)', correct: true},
            { text: 'document.innerHTML.getElementById(...)', correct: false},
        ],
        correctanswer : '2',
    },
    {
        question : 'How do you create a new function in JavaScript?',
        answers : [
            { text: 'new.function() {}', correct: false},
            { text: 'function = myFunction() {}', correct: false},
            { text: 'function:myFunction() {}', correct: false},
            { text: 'function myFunction() {}', correct: true},
        ],
        correctanswer : '3',
    },
    {
        question : 'How do you create a JavaScript array?',
        answers : [
            { text: 'var fruits = ["banana", "apple", "peach"];', correct: true},
            { text: 'var fruits = "banana", "apple", "peach";', correct: false},
            { text: 'var fruits = (1:"banana", 2:"apple", 3:"peach");', correct: false},
            { text: 'var fruits = 1 = ("banana"), 2 = ("apple"), 3 = ("peach");', correct: false},
        ],
        correctanswer : '0',
    },
];
