let words = ["hello"];
const wordsSplit = words[0].split("")
const rows = [
  document.querySelectorAll("#row1 .row-letter"),
  document.querySelectorAll("#row2 .row-letter"),
  document.querySelectorAll("#row3 .row-letter"),
  document.querySelectorAll("#row4 .row-letter"),
  document.querySelectorAll("#row5 .row-letter"),
  document.querySelectorAll("#row6 .row-letter")
];
let currentIndex = 0;
let inputs = rows[currentIndex];

const startPage = document.getElementById("start-page");
const instPage = document.getElementById("instruction-page");
const gamePage = document.getElementById("game-page");
const resultsPage = document.getElementById("results-page");

const basicMode = document.getElementById("basic-mode");
const challengerMode = document.getElementById("challenger-mode");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");

function disableText(row) {
  for (let i = 0; i < row.length; i++) {
    row[i].disabled = true;
  }
}

function enableText(row) {
  for (let i = 0; i < row.length; i++) {
    row[i].disabled = false;
  }
}

function gotoInst() {
  startPage.style.display = "none";
  instPage.style.display = "block";
}

function gotoGame() {
  instPage.style.display = "none";
  gamePage.style.display = "block";
}

function gotoResults() {
  gamePage.style.display = "none";
  resultsPage.style.display = "block";
}

function resetGame() {
  currentIndex = 0;
  inputs = rows[currentIndex];
  for (let x = 0; x < rows.length; x++){
    for (let i = 0; i < inputs.length; i++) {
      rows[x][i].value = "";
      rows[x][i].style.backgroundColor = "";
      disableText(rows[x]);
    }
  }
  enableText(inputs);
  hideOtherPagesBesideStart();
}

function hideOtherPagesBesideStart() {
  startPage.style.display = "block";
  gamePage.style.display = "none";
  instPage.style.display = "none";
  resultsPage.style.display = "none";
}


for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", getAllInputsValues);
}

function getAllInputsValues() {
  const result = [];
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      return;
    }
    result.push(inputs[i].value);
  }
  makeGuess(result);
}

function makeGuess(result) {
  checkGuess(wordsSplit, result);
}

function checkGuess(preWords, userInput) {
  let allCorrect = true;
  let letterCount = {};
  for (let i = 0; i < preWords.length; i++) {
    letterCount[preWords[i]] = (letterCount[preWords[i]] || 0) + 1;
  }
  for (let i = 0; i < preWords.length; i++) {
    if (preWords[i] === userInput[i]) {
      inputs[i].style.backgroundColor = "green";
      letterCount[userInput[i]]--;
    } else if (preWords.indexOf(userInput[i]) !== -1 && letterCount[userInput[i]] > 0) {
      inputs[i].style.backgroundColor = "yellow"; 
      letterCount[userInput[i]]--;
      allCorrect = false;
    } else {
      inputs[i].style.backgroundColor = "grey";
      allCorrect = false;
    }
  }
  if (allCorrect) {
    gotoResults();
  } else {
    disableText(inputs)
    currentIndex++;
    if (currentIndex < rows.length) {
      inputs = rows[currentIndex];
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("input", getAllInputsValues);
      }
      enableText(inputs);
    } else {
      console.log("You Lose");
    }
  }
}

function main() {
  hideOtherPagesBesideStart();
  basicMode.addEventListener("click", gotoInst);
  startButton.addEventListener("click", gotoGame);
  resetButton.addEventListener("click", resetGame);
  disableText(rows[1]);
  disableText(rows[2]);
  disableText(rows[3]);
  disableText(rows[4]);
  disableText(rows[5]);
}

main();