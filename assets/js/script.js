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


