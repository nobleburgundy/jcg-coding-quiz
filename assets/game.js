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
  if (event.target.id === getCorrectAnswer(currentQuestionId).toString()) {
    correctAnswerCount++;
    updateScore();
    displayFeedbackThenAdvanceQuestion("Correct!");
  } else {
    displayFeedbackThenAdvanceQuestion("Wrong!");
  }
});

function getCorrectAnswer(questionId) {
  return questions[questionId - 1].correctAnswerIndex;
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

// increment the score element text
function updateScore() {
  score += questions[currentQuestionId - 1].worth;
  scoreElement.textContent = score;
}

// Show some answer feedback for short period of time, then advance question
function displayFeedbackThenAdvanceQuestion(text) {
  let answerResultElement = document.createElement("h4");
  answerResultElement.textContent = text;
  questionArticle.lastElementChild.appendChild(answerResultElement);

  // wait .5 seconds, then remove
  setTimeout(() => {
    answerResultElement.parentElement.removeChild(answerResultElement);
    // Update to next question regardless of correct/incorrect answer
    clearPreviousQuestion();
    currentQuestionId++;

    // Only update to the next question if there are questions left
    if (currentQuestionId <= questions.length) {
      updateQuestion(currentQuestionId);
    }
  }, 500);
}

// Show Game Over modal when the game ends
function endGame() {
  $(document).ready(function () {
    $("#modal-score-text").text(`${score}pts [${correctAnswerCount}\\${questions.length}]`);
    $("#endModal").modal();
    $("button.close").on("click", function () {
      location.reload();
    });
    $("#high-score-form").on("submit", function (event) {
      event.preventDefault();
      saveHighScoreToLocalStorage();
      window.location.href = "./highscores.html";
    });
  });
}

function updateQuestion(questionId) {
  let currentQuestionData = questions[questionId - 1];

  // Create question text h3
  let questionTextElement = document.createElement("h3");
  questionTextElement.id = "question-text";
  questionTextElement.innerHTML = currentQuestionData.questionText;
  questionForm.prepend(questionTextElement);

  // Create divs for the possible answers and add styles
  for (let index = 0; index < currentQuestionData.answers.length; index++) {
    let div = document.createElement("div");
    div.setAttribute("class", "btn btn-small btn-outline-primary");
    div.id = index;
    div.textContent = currentQuestionData.answers[index];
    questionForm.appendChild(div);
  }
}

// Clear the previous question after it was answered
function clearPreviousQuestion() {
  // The first child is the question text h3
  questionForm.firstChild.remove();
  questionForm.innerHTML = "";
}

function getTodaysDateFormatted() {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let todaysDate = `${month}/${day}/${year}`;

  return todaysDate;
}

function saveHighScoreToLocalStorage() {
  let initials = document.querySelector("#initials-input").value;
  let highscore = {
    initials: initials.toUpperCase(),
    score: score,
    date: getTodaysDateFormatted(),
  };

  if (localStorage.getItem("high-scores") === null) {
    /* create it as an array of objects. Since this is the first,
    create an array with a single object. */
    localStorage.setItem("high-scores", JSON.stringify([highscore]));
  } else {
    let highscores = JSON.parse(localStorage.getItem("high-scores"));
    highscores.push(highscore);
    localStorage.setItem("high-scores", JSON.stringify(highscores));
  }
}

// Question List as an array of objects containing text, possible answers,
// and correct answer key
let questions = [
  {
    id: 1,
    questionText: "JSON stands for:",
    answers: [
      "JavaScript Standards Organization Notation",
      "Java Script Oracle Network",
      "JavaScript Object Notation",
      "Java Source Oriented Nodes",
    ],
    correctAnswerIndex: 2,
    worth: 10,
  },
  {
    id: 2,
    questionText: "event.preventDefault() should be added to the ___",
    answers: [
      "start of the inner function of the addEventListener.",
      "end of the inner function of the addEventListener.",
      "top of the file.",
      "the HEAD section of the HTML file where this function is used.",
    ],
    correctAnswerIndex: 0,
    worth: 20,
  },
  {
    id: 3,
    questionText: "When looking at the box model, in what order do you calculate values?",
    answers: [
      "top, right, left, bottom",
      "up, down, left, right",
      "top, right, bottom, left",
      "North, South, East, West",
    ],
    correctAnswerIndex: 2,
    worth: 30,
  },
  {
    id: 4,
    questionText: "What does CSS stand for?",
    answers: ["Cool Site Styles", "Cascading Style Sheets", "Cats Sound Silly", "Cascading Style Sources"],
    correctAnswerIndex: 1,
    worth: 40,
  },
  {
    id: 5,
    questionText: "What prefix symbol is used to select an element by <code>id</code> in a CSS file?",
    answers: ["#", ".", "?", "$"],
    correctAnswerIndex: 0,
    worth: 50,
  },
  {
    id: 6,
    questionText: "What prefix symbol is used to select an element by <code>class</code> in a CSS file?",
    answers: ["*", "$", "?", "."],
    correctAnswerIndex: 3,
    worth: 60,
  },
  {
    id: 7,
    questionText: "Which of the following is true?",
    answers: ["1 === '1'", "1 == null", "1 === true", "1 !== true"],
    correctAnswerIndex: 3,
    worth: 70,
  },
  {
    id: 8,
    questionText: "What is returned by the following: <code>Math.floor(Math.random() * 5)</code>?",
    answers: [
      "Random number between 1 and 5",
      "Math",
      "Random number between 0 and 5",
      "Random number between 5 and infinity",
    ],
    correctAnswerIndex: 2,
    worth: 80,
  },
  {
    id: 9,
    questionText:
      "What is logged to the console by the following: <pre><code>let x = 0.1; \nlet y = 'test';\nconsole.log(x + y);</code></pre>",
    answers: ["Undefined", "0.1test", "Null", "Nan"],
    correctAnswerIndex: 1,
    worth: 90,
  },
  {
    id: 10,
    questionText:
      "The following will return what? <pre><code>let x = 2, y = 140;\nif (x > 1 || y < 100) { \n  return true; \n} else { \n  return false; \n}</code></pre>",
    answers: ["true", "false", "140", "2"],
    correctAnswerIndex: 0,
    worth: 100,
  },
];
