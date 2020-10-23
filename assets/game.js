// Elements to interact with
let startButton = document.querySelector("button#start");
let jumbotron = document.querySelector("article#jumbotron-start");
let questionArticle = document.querySelector("article#question-article");
let timeAndScoreElement = document.querySelector("div#score-time");
let gameTimer = document.querySelector("span#time");
let scoreElement = document.querySelector("span#score");
let highscoreLink = document.querySelector("a#high-score-link");
let questionForm = document.querySelector("form#question-form");
let answerButtons = document.querySelectorAll("button.btn-outline-primary");
// let answerDiv = document.querySelector("div#answer-div");
let answer1Element = document.querySelector("div#answer1");
let answer2Element = document.querySelector("div#answer2");
let answer3Element = document.querySelector("div#answer3");
let answer4Element = document.querySelector("div#answer4");

// Initialize Game Variables
let currentQuestionId = 1;
let secondsLeft = 60;
let score = 0;
let correctAnswerCount = 0;

let timerElement = startButton.addEventListener("click", function (event) {
  event.preventDefault();
  startGame();
});

function startGame() {
  updateQuestion(currentQuestionId);
  jumbotron.style.display = "none";
  highscoreLink.style.display = "none";
  questionArticle.style.display = "block";
  timeAndScoreElement.style.display = "block";
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

questionForm.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.id === getCorrectAnswer(currentQuestionId)) {
    correctAnswerCount++;
    updateScore();
    showAnswerFeedback("Correct!");
  } else {
    showAnswerFeedback("Wrong!");
  }

  // Update to next question regardless of correct/incorrect answer
  clearPreviousQuestion();
  currentQuestionId++;

  // Only update to the next question if there are questions left
  if (currentQuestionId <= questions.length) {
    updateQuestion(currentQuestionId);
  }
});

function getCorrectAnswer(questionId) {
  return questions[questionId - 1].question.correctAnswer;
}

function getTotalPotentialScore() {
  let total = 0;
  for (let index = 0; index < questions.length; index++) {
    total += questions[index].worth;
  }
  return total;
}

function getScorePercentage() {
  return ((correctAnswerCount / questions.length) * 100).toFixed(0);
}

function updateScore() {
  score += questions[currentQuestionId - 1].worth;
  scoreElement.textContent = score;
}

// Show some answer feedback for 1 second
function showAnswerFeedback(text) {
  let answerResultElement = document.createElement("h4");
  answerResultElement.textContent = text;
  questionArticle.lastElementChild.appendChild(answerResultElement);

  // wait 1 second, then remove
  setTimeout(() => {
    answerResultElement.parentElement.removeChild(answerResultElement);
  }, 1000);
}

function endGame() {
  alert(
    `GAME OVER\nYOUR SCORE: ${score}\nAnswered ${correctAnswerCount} out of ${
      questions.length
    } (${getScorePercentage()}%)`
  );

  // restart
  location.reload();

  //pop modal with score info, save high score with initials, and restart button?
}

function updateQuestion(questionId) {
  let questionData = questions[questionId - 1];

  let questionTextElement = document.createElement("h3");
  questionTextElement.id = "question-text";
  questionTextElement.innerHTML = questionData.question.questionText;
  questionForm.prepend(questionTextElement);

  for (let index = 0; index < 4; index++) {
    let div = document.createElement("div");
    div.setAttribute("class", "btn btn-small btn-outline-primary");
    div.id = `answer${index + 1}`;
    div.textContent = questionData.question[`answer${index + 1}`];
    questionForm.appendChild(div);
  }
}

// Clear the previous question after it was answered
function clearPreviousQuestion() {
  // The first child is the question text h3
  questionForm.firstChild.remove();
  questionForm.innerHTML = "";
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
    worth: 10,
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
    worth: 10,
  },
  {
    id: 3,
    question: {
      questionText: "When looking at the box model, in what order do you calculate values?",
      answer1: "top, right, left, bottom",
      answer2: "up, down, left, right",
      answer3: "top, right, bottom, left",
      answer4: "North, South, East, West",
      correctAnswer: "answer3",
    },
    worth: 10,
  },
  {
    id: 4,
    question: {
      questionText: "What does CSS stand for?",
      answer1: "Cool Site Styles",
      answer2: "Cascading Style Sheets",
      answer3: "Cats Sound Silly",
      answer4: "Cascading Style Sources",
      correctAnswer: "answer2",
    },
    worth: 10,
  },
  {
    id: 5,
    question: {
      questionText: "What prefix symbol is used to select an element by <code>id</code> in a CSS file?",
      answer1: "#",
      answer2: ".",
      answer3: "?",
      answer4: "$",
      correctAnswer: "answer1",
    },
    worth: 10,
  },
  {
    id: 6,
    question: {
      questionText: "What prefix symbol is used to select an element by <code>class</code> in a CSS file?",
      answer1: "$",
      answer2: "<id>",
      answer3: "%",
      answer4: ".",
      correctAnswer: "answer2",
    },
    worth: 10,
  },
  {
    id: 7,
    question: {
      questionText: "Which of the following is true?",
      answer1: "1 === '1'",
      answer2: "1 == null",
      answer3: "1 === true",
      answer4: "1 !== true",
      correctAnswer: "answer4",
    },
    worth: 10,
  },
  {
    id: 8,
    question: {
      questionText: "What is returned by the following: <code>Math.floor(Math.random() * 5)</code>?",
      answer1: "Random number between 1 and 5",
      answer2: "Math",
      answer3: "Random number between 0 and 5",
      answer4: "Random number between 5 and infinity",
      correctAnswer: "answer3",
    },
    worth: 10,
  },
  {
    id: 9,
    question: {
      questionText:
        "What is logged to the console by the following: <pre><code>let x = 0.1; \nlet y = 'test';\nconsole.log(x + y);</code></pre>",
      answer1: "Undefined",
      answer2: "0.1test",
      answer3: "Null",
      answer4: "Nan",
      correctAnswer: "answer2",
    },
    worth: 10,
  },
  {
    id: 10,
    question: {
      questionText:
        "The following will return what? <pre><code>let x = 2, y = 140;\nif (x > 1 || y < 100) { \n  return true; \n} else { \n  return false; \n}</code></pre>",
      answer1: "true",
      answer2: "false",
      answer3: "140",
      answer4: "2",
      correctAnswer: "answer1",
    },
    worth: 10,
  },
];
