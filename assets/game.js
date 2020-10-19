// Elements to interact with
let startButton = document.querySelector("button#start");
let jumbotron = document.querySelector("article#jumbotron-start");
let questionArticle = document.querySelector("article#question-article");
let gameTimer = document.querySelector("span#time");
let scoreElement = document.querySelector("span#score");
let answerButtons = document.querySelectorAll("button.btn-outline-primary");
let answerDiv = document.querySelector("div#answer-div");
let questionTextElement = document.querySelector("h3#question-text");
let answer1Element = document.querySelector("button#answer1");
let answer2Element = document.querySelector("button#answer2");
let answer3Element = document.querySelector("button#answer3");
let answer4Element = document.querySelector("button#answer4");

// Initialize Game Variables
let currentQuestionId = 1;
let secondsLeft = 60;
let score = 0;

let timerElement = startButton.addEventListener("click", function (event) {
  event.preventDefault();
  startGame();
});

function startGame() {
  updateQuestion(currentQuestionId);
  jumbotron.style.display = "none";
  questionArticle.style.display = "block";
  runTimer();
}

function runTimer() {
  let interval = 1000;
  let timer = setInterval(() => {
    secondsLeft--;
    if (secondsLeft === 0 || currentQuestionId > questions.length) {
      clearInterval(timer);
      endGame(timer);
    }
    gameTimer.textContent = secondsLeft;
  }, interval);
}

answerDiv.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.id === getCorrectAnswer(currentQuestionId)) {
    console.log("Correct!");
    score += 10;
    updateScore();
  } else {
    console.log("Incorrect");
  }

  // Update to next question regardless of correct/incorrect answer
  currentQuestionId++;

  // Only update to the next question if there are questions left
  if (currentQuestionId <= questions.length) {
    updateQuestion(currentQuestionId);
  }
});

function getCorrectAnswer(questionId) {
  return questions[questionId - 1].question.correctAnswer;
}

function updateScore() {
  scoreElement.textContent = score;
}

function endGame() {
  console.log(`GAME OVER\nYOUR SCORE: ${score}`);
  alert(`GAME OVER\nYOUR SCORE: ${score}`);
}

function updateQuestion(questionId) {
  let questionData = questions[questionId - 1];

  questionTextElement.textContent = questionData.question.questionText;
  answer1Element.textContent = questionData.question.answer1;
  answer2Element.textContent = questionData.question.answer2;
  answer3Element.textContent = questionData.question.answer3;
  answer4Element.textContent = questionData.question.answer4;
}

// Question List as an array of objects containing text, possible answers,
// and correct answer key
let questions = [
  {
    id: 1,
    question: {
      questionText: "JSON stands for:",
      answer1: "JavaScript Standards Organization Notation",
      answer2: "Java Script Oracle Network",
      answer3: "JavaScript Object Notation",
      answer4: "Java Source Oriented Nodes",
      correctAnswer: "answer3",
    },
  },
  {
    id: 2,
    question: {
      questionText: "event.preventDefault() should be added to the ___",
      answer1: "start of the inner function of the addEventListener.",
      answer2: "end of the inner function of the addEventListener.",
      answer3: "top of the file.",
      answer4: "the HEAD section of the HTML file where this function is used.",
      correctAnswer: "answer1",
    },
  },
  {
    id: 3,
    question: {
      questionText: "What tag is used to tell the browser what character set to use?",
      answer1: "<metaphysical type=charset>",
      answer2: "<meta src='UTF-8'>UTF</meta>",
      answer3: "<script type='charset' val='UTF-8'>",
      answer4: "<meta charset='UTF-8'>",
      correctAnswer: "answer4",
    },
  },
  {
    id: 4,
    question: {
      questionText: "When looking at the box model, in what order do you calculate values?",
      answer1: "top, right, left, bottom",
      answer2: "up, down, left, right",
      answer3: "top, right, bottom, left",
      answer4: "North, South, East, West",
      correctAnswer: "answer3",
    },
  },
];
