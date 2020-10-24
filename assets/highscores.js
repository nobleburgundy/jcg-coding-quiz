function loadHighScores() {
  let highscores = JSON.parse(localStorage.getItem("high-scores"));
  if (!highscores) {
    highscores = [];
  }
  return highscores;
}

function clearHighScores() {}

// Citation for sorting array of objects:
// https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
function sortHighScores() {
  let newAr = loadHighScores();
  // Only sort if there are more than one element in the array
  if (newAr.length > 1) {
    newAr.sort(function (a, b) {
      return b.score - a.score;
    });
  } else {
    return newAr;
  }
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
    let table = document.querySelector("table");
    let noScoresMessage = document.createElement("p");
    noScoresMessage.textContent = "No high scores have been set yet.";
    table.parentElement.replaceChild(noScoresMessage, table);
  }
}

$(document).ready(function () {
  loadHighScores();
  setHighScores();
});
