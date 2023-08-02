/* Yana's cheetsheet:
Intro screen: id="into" - introEl
Questions screen: id="questions" - questionsEl
All done screen: id="allDone" - allDoneEl
Results screen: id="highScores" - highScoreResultsEl
*/

// Global vars
var indexQ = 0; //we are setting question index to 0
var time = ""; //beginning time
var initialTime = ""; //beginning time
var selectedAnswer; //button that user  clicks
var currentQuestion; //current question on the screen
var countdownTimerInterval; //freqensy of clock update

// Global HTML element vars
var timerEl = document.getElementById("timer"); //this represents clock on the right top corner
var questionsEl = document.getElementById("questions"); //questions screen 
var questionEl = document.getElementById("question"); //singular question
var choicesEl = document.getElementById("choices"); //div container for 4 choices
var allDoneEl = document.getElementById("allDone"); //all done screen 
var submitBtn = document.getElementById("submit"); //
var initialsEl = document.getElementById("initials"); //input element for initials
var highScoreResultsEl = document.getElementById("highScores"); //results screen
var goBackBtn = document.getElementById("goBack"); //go back button
var introEl = document.getElementById("intro"); //intro screen
var clearHighScoresBtn = document.getElementById("clear"); //clear score button 
var ulTag = document.getElementById("high-scores-ul"); //list of all scores screen
var startBtn = document.getElementById("startBtn"); //
var correctWrongEl = document.getElementById("correctWrong");

// var viewHighScores = document.getElementById("history");

// Global question array
var questions = [
    {
        question: "1. Inside which HTML element do we put the JavaScript?",
        choices: ["<scripting>", "<javascript>", "<script>", "<js>"],
        answer: "button2"
    },
    {
        question: "2. What bracket is an array?",
        choices: ["[]", "{}", "()", "none"],
        answer: "button0"
    },
    {
        question: "3. How do you write 'Hello World' in an alert box?",
        choices: ["alertBox('Hello World')", "msgBox('Hello World')", "msg('Hello World')", "alert('Hello World')"],
        answer: "button3"
    },
    {
        question: "4. How to write an IF statement in JavaScript?",
        choices: ["if i==5 then", "if i=5", "if (i==5)", "if i=5 then"],
        answer: "button2"
    },
    {
        question: "5. How does a FOR loop start?",
        choices: ["for (i = 0; i <= 5)", "for i = 1 to 5", "for (i = 0; i <= 5; i++)", "for (i <= 5; i++)"],
        answer: "button2"
    }
];

displayIntro(); 

//resets everething to "groung zero"
function displayIntro() {
    indexQ = 0;  //reset question index to 0
    selectedAnswer = ""; 
    currentQuestion = "";
    introEl.setAttribute("class", "unhide"); //unhide intro screen 
    timerEl.textContent = "";
    initialTime = 15 * questions.length;
    time = initialTime;
    correctWrongEl.textContent = "";

}

startBtn.addEventListener("click", startQuiz);

// define a clock
function clock() {
    time--;
    timerEl.textContent = time
    if (time <= 0) {
        quizDone()
    }
}

//purpose of this function is to hide 'intro', unhide 'questions' and start the cloock
function startQuiz() {
    introEl.setAttribute("class", "hide"); //hide intro screen
    console.log("Into sreen is hidden")
    questionsEl.removeAttribute("class"); //unhide question screen
    countdownTimerInterval = setInterval(clock, 1000);
    timerEl.textContent = time;
    getQuestions()
}


//pull choices and the question from array

function getQuestions() {
    currentQuestion = questions[indexQ]
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
        newListBtn.setAttribute("id", `button${i}`);
        newListBtn.setAttribute("class", "choice");
        newListBtn.setAttribute("value", choice);
        newListBtn.textContent = i + 1 + "." + " " + choice;
        choicesEl.appendChild(newListBtn);
    }
}
//identifying our buttons as clicks and than comparing user choice against the correct answer
function compareAnswer() {
    // var correctWrongEl = document.getElementById("correctWrong");
    // var btnAnswerEl = event.target;
    // console.log(`the current question.answer ${currentQuestion.answer} and the selected answer is ${selectedAnswer}`);
    if (currentQuestion.answer === selectedAnswer) {
        correctWrongEl.textContent = "Correct! 🤩"; 
    }
    else {
        correctWrongEl.textContent = "Wrong! 😭";
        time = parseInt(timerEl.textContent) - 10; //converting into number and subtracting 10
        // clearInterval(countdownTimerInterval); // freezes clock
        clock(); // calling clock to update with 10 sec penalty

    }

    indexQ++

    if (indexQ === questions.length || time <= 0) {
        quizDone()
    } else {
        getQuestions()
    }
}


//make function for quizDone. in this function we need to hide container questions and unhide allDone. stop timer  1

function quizDone() {
    var questionsEl = document.getElementById("questions");
    var scoreEl = document.getElementById("score");
    questionsEl.setAttribute("class", "hide");
    allDoneEl.removeAttribute("class");
    clearInterval(countdownTimerInterval);
    timerEl.textContent = time
    scoreEl.textContent = time
}

//create an eventListener for a button allDone 3

submitBtn.addEventListener("click", function () {

    var initialsInput = initialsEl.value.trim();
    if (initialsInput === "") {
        alert("Please type your initials");
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

function getResultsHistory(highScores) {
    highScores = JSON.parse(localStorage.getItem("highScores")) || [];


    // var allDoneEl = document.getElementById("allDone");
    // allDoneEl.setAttribute("class", "hide");
    // highScoreResultsEl.removeAttribute("class");
    allDoneEl.setAttribute("class", "hide");  // hide previous screen
    highScoreResultsEl.removeAttribute("class"); // unhide results history screen
    for (let i = 0; i < highScores.length; i++) {
        var liTag = document.createElement("li")
        liTag.textContent = highScores[i].initials + " - " + highScores[i].score;
        var scoresUl = document.getElementById("high-scores-ul")
        scoresUl.appendChild(liTag);
    }
}


// viewHighScores.addEventListener("click", function (event) {
//     var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//     getResultsHistory(highScores);
// })

goBackBtn.addEventListener("click", function (event) {
    event.preventDefault(); // prevent post back
    highScoreResultsEl.setAttribute("class", "hide"); //hiding history sore 
    introEl.setAttribute("class", "unhide"); //unhiding intro
    displayIntro();
})

clearHighScoresBtn.addEventListener("click", function (event) {
    event.preventDefault();
    while (ulTag.firstChild) { // loop for removing all li while there is a first child left
        ulTag.removeChild(ulTag.firstChild); // remove ul child
    }
    localStorage.clear(); //clears local storage 
})


choicesEl.addEventListener("click", function (event) {
    event.preventDefault();
    // Check if the clicked element is a button inside the container
    if (event.target.tagName === 'BUTTON') {
        // Get the id of the clicked button
        var buttonId = event.target.id;
        // Perform actions based on the clicked button

        selectedAnswer = buttonId;
        console.log("you clicked", selectedAnswer);
    }
    else {
        alert("You must choose your answer!");
    }
    compareAnswer(event);
});



