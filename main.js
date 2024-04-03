let words = ["hellos"];
const wordsSplit = words[0].split("")
let inputs = document.querySelectorAll("input[class='row-letter']");

const startPage = document.getElementById("start-page");
const instPage = document.getElementById("instruction-page");
const gamePage = document.getElementById("game-page");
const resultsPage = document.getElementById("results-page");
let rowCount = 1;

const basicMode = document.getElementById("basic-mode");
const challengerMode = document.getElementById("challenger-mode");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");

function createRow() {
  const newRow = document.createElement("form");
  newRow.classList.add("word-row");
  newRow.id = "row" + (rowCount + 1);
  for (let i = 0; i < 6; i++) {
    const newDiv = document.createElement("div");
    const newInput = document.createElement("input");
    newInput.classList.add("row-letter");
    newInput.type = "text";
    newInput.maxLength = 1;
    newDiv.appendChild(newInput);
    newRow.appendChild(newDiv);
  }
  gamePage.appendChild(newRow);
  rowCount++;
  let inputs = newRow.querySelectorAll("input[class='row-letter']");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", getAllInputsValues);
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

function hideOtherPagesBesideStart() {
  gamePage.style.display = "none";
  instPage.style.display = "none";
  resultsPage.style.display = "none";
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

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", getAllInputsValues);
}

function makeGuess(result) {
  checkGuess(wordsSplit, result);
}

function checkGuess(preWords, userInput) {
  let allCorrect = true;
  for (let i = 0; i < preWords.length; i++) {
    if (preWords[i] === userInput[i]) {
      inputs[i].style.backgroundColor = "green";
    } else if (preWords.indexOf(userInput[i]) !== -1) {
      inputs[i].style.backgroundColor = "yellow"; 
      allCorrect = false;
    } else {
      inputs[i].style.backgroundColor = "grey";
      allCorrect = false;
    }
  }
  if (allCorrect) {
    gotoResults();
  } else {
    createRow();
  }
}

function main() {
  hideOtherPagesBesideStart();
  basicMode.addEventListener("click", gotoInst);
  startButton.addEventListener("click", gotoGame);
}

main();