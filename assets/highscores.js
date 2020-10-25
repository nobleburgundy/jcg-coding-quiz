function loadHighScores() {
  let highscores = JSON.parse(localStorage.getItem("high-scores"));
  if (!highscores) {
    highscores = [];
  }
  return highscores;
}

// Citation for sorting array of objects:
// https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
function sortHighScores() {
  let highScoreArray = loadHighScores();
  if (highScoreArray.length > 1) {
    // Array.sort with compare function comparing the object scores
    highScoreArray.sort(function (a, b) {
      return b.score - a.score;
    });
  } else {
    return highScoreArray;
  }
  return highScoreArray;
}

function setHighScores(max = 10) {
  let highScoresSorted = sortHighScores();
  let tableBody = document.querySelector("tbody");
  // Set max to highScores array length if less than initial setting
  if (max > highScoresSorted.length) {
    max = highScoresSorted.length;
  }
  if (highScoresSorted.length > 0) {
    for (let i = 0; i < max; i++) {
      // just set the max ranking
      let tr = document.createElement("tr");
      let td_rank = document.createElement("td");
      let td_initials = document.createElement("td");
      let td_score = document.createElement("td");
      let td_date = document.createElement("td");
      td_rank.textContent = i + 1;
      td_initials.textContent = highScoresSorted[i].initials;
      td_score.textContent = highScoresSorted[i].score;
      td_date.textContent = highScoresSorted[i].date;
      tableBody.appendChild(tr);
      tr.appendChild(td_rank);
      tr.appendChild(td_initials);
      tr.appendChild(td_score);
      tr.appendChild(td_date);
    }
  } else {
    // No high scores, so just display a
    let table = document.querySelector("table");
    let removeHighScoresButton = document.querySelector("#clear-highscores");
    let noScoresMessage = document.createElement("p");
    removeHighScoresButton.remove();
    noScoresMessage.textContent = "No high scores have been set yet.";
    table.parentElement.replaceChild(noScoresMessage, table);
  }
}

$(document).ready(function () {
  $("#clear-highscores").on("click", function () {
    if (confirm("Are you sure you want to do this?")) {
      localStorage.removeItem("high-scores");
      setHighScores();
    }
  });
  $("#restart-game").on("click", function () {
    window.location.href = "index.html";
  });
  setHighScores();
});
