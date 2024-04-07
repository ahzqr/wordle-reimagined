// Global variables
let words = ["hello", "gamer", "super", "drink", "tired"];
let randomWords = words[(Math.floor(Math.random() * words.length))].split("");
let rows = createGame();
let currentIndex = 0;
let inputs = rows[currentIndex]; //* To move through the rows for each guess
let score = 0;

// DOM Elements
const startPage = document.getElementById("start-page");
const challengerPage = document.getElementById("challenger-page");
const instPage = document.getElementById("instruction-page");
const gamePage = document.getElementById("game-page");
const resultsPage = document.getElementById("results-page");
const basicMode = document.getElementById("basic-mode");
const challengerMode = document.getElementById("challenger-mode");
const challengeButton = document.getElementById("challenge-button");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const finalScore = document.createElement("p");
const alertContainer = document.getElementById("alertContainer");
const box = [
  document.getElementById("0.0"),
  document.getElementById("1.0"),
  document.getElementById("2.0"),
  document.getElementById("3.0"),
  document.getElementById("4.0"),
  document.getElementById("5.0")
];

// Utility functions

function hideOtherPagesBesideStart() {
  startPage.style.display = "block";
  gamePage.style.display = "none";
  challengerPage.style.display = "none";
  instPage.style.display = "none";
  resultsPage.style.display = "none";
}

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
  challengerPage.style.display = "none";
  instPage.style.display = "block";
}

function gotoChallenge() {
  startPage.style.display = "none";
  challengerPage.style.display = "block";
}

function gotoInstChallenge() {
  challengerPage.style.display = "none";
  instPage.style.display = "block";
  updateWord();
}

function gotoGame() {
  instPage.style.display = "none";
  gamePage.style.display = "block";
  box[0].focus();
}

function gotoResults() {
  gamePage.style.display = "none";
  resultsPage.style.display = "block";
  finalScore.innerText = "You guessed in " + score + " tries!"
  resultsPage.insertBefore(finalScore, resetButton);
}

function guessAgain() {
  currentIndex = 0;
  inputs = rows[currentIndex];
  randomWords = words[(Math.floor(Math.random() * words.length))].split("");
  document.getElementById("popup").remove();
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

function showAlert(message) {
  let popup = document.createElement("div");
  popup.setAttribute("id", "popup");
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.backgroundColor = "#fff";
  popup.style.padding = "20px";
  popup.style.border = "1px solid #000";
  popup.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
  popup.style.cursor = "pointer";
  popup.textContent = message;
  popup.addEventListener("click", guessAgain);
  document.getElementById("alertContainer").appendChild(popup);
}

function newGame() {
  currentIndex = 0;
  inputs = rows[currentIndex];
  finalScore.remove();
  score = currentIndex;
  randomWords = words[(Math.floor(Math.random() * words.length))].split("");
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

function updateWord() {
  let newWord = document.getElementById("custom-word").value;
  words = newWord;
}

function createGame() {
  const gamePage = document.getElementById("game-page");
  let rowsArray = [];
  for (let formIndex = 0; formIndex < 6; formIndex++) {
      const form = document.createElement("form");
      form.classList.add("word-row");
      form.id = "row" + formIndex;
      let rowInputs = [];
      for (let boxIndex = 0; boxIndex < randomWords.length; boxIndex++) {
          const div = document.createElement("div");
          const input = document.createElement("input");
          input.classList.add("row-letter");
          input.id = `${formIndex}.${boxIndex}`;
          input.type = "text";
          input.maxLength = 1;
          input.setAttribute("onkeydown", "return /[a-z]/i.test(event.key)");
          input.setAttribute("onkeyup", `autoTab(this, "${formIndex}.${boxIndex < randomWords.length - 1 ? boxIndex + 1 : (formIndex + 1)}")`);
          div.appendChild(input);
          form.appendChild(div);
          rowInputs.push(input);
      }
      rowsArray.push(rowInputs);
      gamePage.appendChild(form);
  }
  return rowsArray;
}

// Event listeners
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
  checkGuess(randomWords, result);
}

function checkGuess(preWord, userInput) {
  let allCorrect = true;
  let letterCount = {}; // Amount of each letter in the defined word
  for (let i = 0; i < preWord.length; i++) {
    letterCount[preWord[i]] = (letterCount[preWord[i]] || 0) + 1;
  }
  for (let i = 0; i < preWord.length; i++) { // Conditionals
    if (preWord[i] === userInput[i]) {
      inputs[i].style.backgroundColor = "green";
      letterCount[userInput[i]]--;
    } else {
      inputs[i].style.backgroundColor = "grey";
      allCorrect = false;
    }
  }
  for (let i = 0; i < preWord.length; i++) {
    if (letterCount[userInput[i]] > 0) {
        inputs[i].style.backgroundColor = "yellow"; 
        letterCount[userInput[i]]--;
        allCorrect = false;
    }
  }
  if (allCorrect) {
    score = currentIndex + 1;
    gotoResults()
  } else {
    disableText(inputs)
    currentIndex++;
    if (currentIndex < rows.length) {
      inputs = rows[currentIndex];
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("input", getAllInputsValues);
      }
      enableText(inputs);
      box[currentIndex].focus();
    } else {
      showAlert("Oops! The answer is " + randomWords.join("") + ". Click here to try again!");
    }
  }
}

// Main function
function main() {
  hideOtherPagesBesideStart();
  basicMode.addEventListener("click", gotoInst);
  challengerMode.addEventListener("click", gotoChallenge);
  challengeButton.addEventListener("click", gotoInstChallenge);
  startButton.addEventListener("click", gotoGame);
  resetButton.addEventListener("click", newGame);
  disableText(rows[1]);
  disableText(rows[2]);
  disableText(rows[3]);
  disableText(rows[4]);
  disableText(rows[5]);
}

main();