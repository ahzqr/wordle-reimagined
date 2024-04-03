let words = ["hellos"];
const wordsSplit = words[0].split("")
const inputs = document.querySelectorAll("input[class='row-letter']");

const startPage = document.getElementById("start-page");
const instPage = document.getElementById("instruction-page");
const gamePage = document.getElementById("game-page");
const resultsPage = document.getElementById("results-page");

const basicMode = document.getElementById("basic-mode");
const challengerMode = document.getElementById("challenger-mode");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");


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
};


function makeGuess(result) {
  if (check(wordsSplit, result) === true) {
    // gotoResults()
    console.log("You are right!");
  } else {
    console.log("You are incorrect");
    // showWrongMessage();
  }
}

function check(codeArray, valuesArray) {
  for (let i = 0; i < codeArray.length; i++) {
    if (codeArray[i] !== valuesArray[i]) {
      return false; 
    }
  }
  return true; //; boolean
}

function main() {
  hideOtherPagesBesideStart();
  basicMode.addEventListener("click", gotoInst);
  startButton.addEventListener("click", gotoGame);
};

main();