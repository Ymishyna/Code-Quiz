var startBtn = document.getElementById("startBtn");
// var resultsHistoryList = document.getElementById("ch")


startBtn.addEventListener("click", startQuiz);

var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["<scripting>", "<javascript>", "<script>", "<js>"],
        answer: "<script>"
    },
    {
        question: "What bracket is an array?",
        choices: ["[]", "{}", "()", "none"],
        answer: "[]"
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choices: ["alertBox('Hello World')", "msgBox('Hello World')", "msg('Hello World')", "alert('Hello World')"],
        answer: "alert('Hello World')"
    },
    {
        question: "How to write an IF statement in JavaScript?",
        choices: ["if i==5 then", "if i=5", "if (i==5)", "if i=5 then"],
        answer: "if (i==5)"
    },
    {
        question: "How does a FOR loop start?",
        choices: ["for (i = 0; i <= 5)", "for i = 1 to 5", "for (i = 0; i <= 5; i++)", "for (i <= 5; i++)"],
        answer: "for (i = 0; i <= 5; i++)"
    }
];

var indexQ = 0;
var time = 15 * questions.length;
var timerEl = document.getElementById("timer");
var questionsEl = document.getElementById("questions");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var allDoneEl = document.getElementById("allDone");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var highScoreResultsEl = document.querySelector("#highScores");
var countdownTimer;
console.log(time)

//define a clock
function clock() {
    time--;
    timerEl.textContent = time
    if (time <= 0) {
        quizDone()
    }
}

//purpose of this function is to hide 'intro', unhide 'questions' and start the cloock
function startQuiz () {
    var introEl = document.getElementById("intro");
    introEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    countdownTimer = setInterval(clock, 1000);
    timerEl.textContent = time

    getQuestions() 
}


//pull choices and the question from array

function getQuestions () {
    var currentQuestion = questions[indexQ]
    //locate where question will go on html
    questionEl.textContent = currentQuestion.question
    //display by calling it out currentQuestion.question
    choicesEl.innerHTML = ""
     //for loop through currentQuestion.choices
    //logic of for loop: creat button element, creat var that rep currentQuestion.choices[i], set an attribute (method) to add value of the var that we just created, text content to dosplay and append 
    for (let i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];
    var newListBtn = document.createElement("button");
    // newListBtn.textContent = index + 1 + "." + choice;
    newListBtn.setAttribute("class", "choice");
    newListBtn.setAttribute("value", choice);
    newListBtn.textContent = i + 1 + "." + choice;
    choicesEl.appendChild(newListBtn);   
    }
}
//identifying our buttons as clicks and than comparing user choice against the correct answer
function compareAnswer (event) {
    var btnAnswerEl = event.target;
    if (!btnAnswerEl.matches(".choice")) {
    return
    }
if (btnAnswerEl.value !== questions[indexQ].answer) {
    time -= 5
    console.log("Wrong!")
    if (time < 0) {
        time=0
    }
    timerEl.textContent = time
}
indexQ++
if (indexQ === questions.length || time <= 0) {
    quizDone()
} else {
    getQuestions()
}
}

//make function for quizDone. in this function we need to hide container questions and unhide allDone. stop timer  1

function quizDone () {
    var questionsEl = document.getElementById("questions");
    var scoreEl = document.getElementById("score");
    questionsEl.setAttribute("class", "hide");
    allDoneEl.removeAttribute("class");
    clearInterval(countdownTimer);
    timerEl.textContent = time
    scoreEl.textContent = time
}

//create an eventListener for a button allDone 3

submitBtn.addEventListener("click", function () {
    
    var initialsInput = initialsEl.value.trim();
    if (initialsInput === "") {
        alert ("Please type your initials");
        return
    }
    if (initialsInput !== "") {
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        var newScore = {
            score: time,
            initials: initialsInput,
        }
        highScores.push(newScore)
        localStorage.setItem("highScores", JSON.stringify(highScores))
    }
    // else {
    //     getResultsHistory(initialsInput);
    // }
    getResultsHistory(highScores)
})

function getResultsHistory (highScores) {
    highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    

    // var allDoneEl = document.getElementById("allDone");
    // allDoneEl.setAttribute("class", "hide");
    // highScoreResultsEl.removeAttribute("class");
    allDoneEl.setAttribute("class", "hide");  // hide previous screen
    highScoreResultsEl.removeAttribute("class"); // unhide results history screen
    for (let i = 0; i < highScores.length; i++) {
        var liTag = document.createElement("li")
        liTag.textContent = highScores[i].initials + highScores[i].score;
        var scoresUl = document.getElementById("high-scores-ul")
        scoresUl.appendChild(liTag);
    }
    // // var resultsHistoryListEl = document.getElementById("results-history-ul"); // ul element
    // var newListItem = document.createElement("li"); // create new list item
    // newListItem.textContent = `${initials} - ${finalScore}`; // write <initials - finalScore'
    // ulEl.appendChild(newListItem); // append the new list item
}


//create another finction to take a score and 




choicesEl.addEventListener("click", compareAnswer)

