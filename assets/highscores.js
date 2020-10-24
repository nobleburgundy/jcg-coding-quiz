function loadHighScores() {
  let highscores = JSON.parse(localStorage.getItem("high-scores"));
  return highscores;
}

function clearHighScores() {}

function sortHighScores() {
  let newAr = loadHighScores();

  newAr.sort(function (a, b) {
    return b.score - a.score;
  });

  return newAr;
}

function setHighScores(max = 10) {
  let highscores = sortHighScores();
  let tableBody = document.querySelector("tbody");
  for (let i = 0; i < max; i++) {
    // just set the max ranking
    let tr = document.createElement("tr");
    let td_rank = document.createElement("td");
    let td_initials = document.createElement("td");
    let td_score = document.createElement("td");
    let td_date = document.createElement("td");
    td_rank.textContent = i + 1;
    td_initials.textContent = highscores[i].initials;
    td_score.textContent = highscores[i].score;
    td_date.textContent = highscores[i].date;
    tableBody.appendChild(tr);
    tr.appendChild(td_rank);
    tr.appendChild(td_initials);
    tr.appendChild(td_score);
    tr.appendChild(td_date);
  }
}

$(document).ready(function () {
  loadHighScores();
  setHighScores();
});
