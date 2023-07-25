var startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", startQuiz);
var questions = [
    {
        question: "What bracket is an array?",
        choices: ["[]", "{}", "()", "none"],
        answer: "[]"
    },
    {
        question: "What bracket is an array?",
        choices: ["[]", "{}", "()", "none"],
        answer: "[]"
    }
];

var index = 0;
var time = 10 * questions.length;
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

    //for loop through currentQuestion.choices
    //logic of for loop: creat button element, creat var that rep currentQuestion.choices[i], set an attribute (method) to add value of the var that we just reated, text content to dosplay and append 
}

//create click event of choices container that will go to function, in function I need to creat condition on wrong answer. index++

//compare if we have time left or do we have questions left, 