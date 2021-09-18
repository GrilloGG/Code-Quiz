const startButton = document.getElementById('start-button');
let introHide = document.querySelector('.hide');
let questionShow = document.querySelector('.show');
let questionTitle = document.getElementById("title-question")
let answerButtons = document.getElementById("buttons-answer")
let timerClock = document.getElementById("timer")
let scoreBoard = document.getElementById("score-board")
let finalScreen = document.getElementById("final-screen")
let finalScore = document.getElementById("your-score")
let scoreList = document.getElementById("score-list")
let scoresTable = document.getElementById("highscores-table")
let startAgain = document.getElementById("start-again-button")
let nameScore = document.getElementById("name")
let submitScore = document.getElementById("submit")

let score = 0 ;
let timerCount ;
let randomQuestion ;
let currentQuestion ;


submitScore.addEventListener("click", function(event){
    event.preventDefault();
    if (nameScore.value == ""){
        window.alert("Please enter a Name");
        return
    }
    let allTheScores = []
    allTheScores.push ({
        name: nameScore.value.trim(),
        score: score,
    });
    localStorage.setItem("Score", JSON.stringify(allTheScores))
    renderScores()
    nameScore.value = "";
})

function renderScores(){
    let highScoresList = JSON.parse(localStorage.getItem("Score"));

    for (let i = 0; i < highScoresList.length; i++) {
        const li = document.createElement("li");
        li.textContent =
          "Name: " +
          highScoresList[i]["name"] +
          " - Score: " +
          highScoresList[i]["score"];
        scoreList.appendChild(li);
      }
}



startButton.addEventListener('click', startGame)


function startGame(){
    introHide.style.display = "none";
    questionShow.style.display = "block";
    randomQuestion = questions.sort(() => Math.random() - .5);
    currentQuestion = 0;
    scoreBoard.classList.add("score");
    scoreBoard.textContent = "Score: " + score;
    nextQuestion()
    startTimer()
    highScores()
    renderScores()
}

function nextQuestion(){
    cleanScreen()
    if (randomQuestion.length > currentQuestion ){
        showQuestion(randomQuestion[currentQuestion])
    }
    else {
       
        endScreen()
    } 
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

function correctAnswer(){
    score += 10;
    scoreBoard.textContent = "Score: " + score;
    currentQuestion++;
    document.body.classList.remove('wrong')
    document.body.classList.add('correct')
    nextQuestion();
}

function wrongAnswer(){
    if(timerCount <=20){
        clearInterval(timer)
        timerCount=0
        endScreen();
    }
    else {
        timerCount -= 20
        currentQuestion++
        document.body.classList.add('wrong')
        nextQuestion()
    }
}

function startTimer(){
    timerCount = 60
    timerClock.classList.add("timer")
    timer = setInterval( function() {
        timerCount--;
        timerClock.textContent = timerCount + " : Seconds left";
        if (timerCount === 0){
            clearInterval(timer);
            endScreen();
        }
    }, 1000);
}    

function highScores(){
    scoresTable.style.display = "block";
}

function endScreen(){
    document.body.classList.remove('wrong')
    document.body.classList.remove('correct')
    questionShow.style.display = "none";
    timerClock.style.display = "none";
    finalScreen.style.display = "block";
    scoreBoard.style.display = "none";
    finalScore.textContent = "Your final score is: " + score;
    startAgain.addEventListener('click', refreshPage) 
}

function refreshPage(){
    window.location.reload();
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
        ]
    },
    {
        question : 'Inside which element do you put JavaScript?',
        answers : [
            { text: '<var>', correct: false},
            { text: '<script>', correct: true},
            { text: '<section>', correct: false},
            { text: '<code>', correct: false},
        ]
    },
    {
        question : 'How do you get the DOM element with id in JavaScript?',
        answers : [
            { text: 'window.getElementById(...)', correct: false},
            { text: 'page.getElementById(...)', correct: false},
            { text: 'document.getElementById(...)', correct: true},
            { text: 'document.innerHTML.getElementById(...)', correct: false},
        ]
    },
    {
        question : 'How do you create a new function in JavaScript?',
        answers : [
            { text: 'new.function() {}', correct: false},
            { text: 'function = myFunction() {}', correct: false},
            { text: 'function:myFunction() {}', correct: false},
            { text: 'function myFunction() {}', correct: true},
        ]
    },
    {
        question : 'How do you create a JavaScript array?',
        answers : [
            { text: 'var fruits = ["banana", "apple", "peach"];', correct: true},
            { text: 'var fruits = "banana", "apple", "peach";', correct: false},
            { text: 'var fruits = (1:"banana", 2:"apple", 3:"peach");', correct: false},
            { text: 'var fruits = 1 = ("banana"), 2 = ("apple"), 3 = ("peach");', correct: false},
        ]
    },
]; 
