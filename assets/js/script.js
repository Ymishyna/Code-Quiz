var startBtn = document.getElementById("startBtn");
var choice0Btn = document.getElementById("choices");
var choice1Btn = document.getElementById("choices");
var choice2Btn = document.getElementById("choices");
var choice3Btn = document.getElementById("choices");



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

var index = 0;
var time = 15 * questions.length;
var timerEl = document.getElementById("timer");
var questionsEl = document.getElementById("questions");
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
    var currentQuestion = questions[index]
    //locate where question will go on html
    //display by calling it out currentQuestion.question
    questionsEl.innerHTML=currentQuestion.question
     //for loop through currentQuestion.choices
    //logic of for loop: creat button element, creat var that rep currentQuestion.choices[i], set an attribute (method) to add value of the var that we just created, text content to dosplay and append 
    for (let index = 0; index < currentQuestion.choices.length; index++) {
    var choice = currentQuestion.choices[index];
    var divChoice = document.getElementById("choices");
    var newListBtn = document.createElement("button");
    newListBtn.textContent = index + 1 + "." + choice;
    newListBtn.setAttribute("class", "choice")
    newListBtn.setAttribute("value", choice)
    
    // resultsHistoryList.appendChild(newListItem);  

    }
}


//create click event of choices container that will go to function, in function I need to creat condition on wrong answer. index++

//compare if we have time left or do we have questions left, 