let words = ["hellos"];
const wordsSplit = words[0].split("")
const inputs = document.querySelectorAll("input[class='row-letter']");
console.log(inputs);

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
    const element = inputs[i];
    result.push(element.value);
  }
  return result;
}

function makeGuess() {
  const result = getAllInputsValues();
  if (check(wordsSplit, result) === true) {
    gotoResults;
  } else {
    showWrongMessage();
  }
}

function check(codeArray, valuesArray) {
  console.log("codeArray", codeArray);
  console.log("valuesArray", valuesArray);
  return true; //; boolean
}

function main() {
  hideOtherPagesBesideStart();
  basicMode.addEventListener("click", gotoInst);
  startButton.addEventListener("click", gotoGame);
};

main();