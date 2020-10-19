//  Psuedo Code Steps:
//  User clicks Start
//  Jumbotron disappears
//  First quetsion is presented
//      Selected randomly from a collection of questions?
//  Timer starts
//  If User answers Correct Answer
//      Score +=
//      Next question
//      Correct alert or message
//  Else
//      Next question
//      Incorrect alert or message

let startButton = document.querySelector("button#start");
let jumbotron = document.querySelector("article#jumbotron-start");
let questionArticle = document.querySelector("article#question-article");
let secondsLeft = 60;
let gameTimer = document.querySelector("span#time");

let timerElement = startButton.addEventListener("click", function (event) {
  event.preventDefault();
  startGame();
});

function startGame() {
  jumbotron.style.display = "none";
  questionArticle.style.display = "block";
  startTimer();
}

function startTimer() {
  let interval = 1000;
  let timer = setInterval(() => {
    secondsLeft--;
    if (secondsLeft === 0) {
      clearInterval(timer);
    }
    gameTimer.textContent = secondsLeft;
  }, interval);
}
