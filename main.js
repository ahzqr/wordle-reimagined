// Global variables
let words = [];
let randomWords = [];
let rows = [];
let inputs = [];
let box = [];
let currentIndex = 0;
let score = 0;

// DOM Elements
const startPage = document.getElementById("start-page");
const customPage = document.getElementById("custom-page");
const instPage = document.getElementById("instruction-page");
const gamePage = document.getElementById("game-page");
const resultsPage = document.getElementById("results-page");
const basicMode = document.getElementById("basic-mode");
const customMode = document.getElementById("custom-mode");
const customButton = document.getElementById("custom-button");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const finalScore = document.createElement("p");
const alertContainer = document.getElementById("alertContainer");

// Utility Functions

function hideOtherPagesBesideStart() {
  startPage.style.display = "block";
  gamePage.style.display = "none";
  customPage.style.display = "none";
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
  customPage.style.display = "none";
  instPage.style.display = "block";
  words = ["hello", "gamer", "super", "drink", "tired"];
  randomWords = words[Math.floor(Math.random() * words.length)].split("");
  console.log(randomWords);
  rows = createBoard();
  inputs = rows[currentIndex]; //* To move through the rows for each guess
  box = [
    document.getElementById("0.0"),
    document.getElementById("1.0"),
    document.getElementById("2.0"),
    document.getElementById("3.0"),
    document.getElementById("4.0"),
    document.getElementById("5.0"),
  ];
}

function gotoChallenge() {
  startPage.style.display = "none";
  customPage.style.display = "block";
}

function gotoInstChallenge() {
  customPage.style.display = "none";
  instPage.style.display = "block";
  updateWord();
  console.log(randomWords);
  rows = createBoard();
  inputs = rows[currentIndex]; //* To move through the rows for each guess
  box = [
    document.getElementById("0.0"),
    document.getElementById("1.0"),
    document.getElementById("2.0"),
    document.getElementById("3.0"),
    document.getElementById("4.0"),
    document.getElementById("5.0"),
  ];
}

function gotoGame() {
  instPage.style.display = "none";
  gamePage.style.display = "block";
  guess();
  box[0].focus();
  disableText(rows[1]);
  disableText(rows[2]);
  disableText(rows[3]);
  disableText(rows[4]);
  disableText(rows[5]);
}

function gotoResults() {
  gamePage.style.display = "none";
  resultsPage.style.display = "block";
  finalScore.innerText = "You guessed in " + score + " tries!";
  resultsPage.insertBefore(finalScore, resetButton);
}

function guessAgain() {
  currentIndex = 0;
  inputs = rows[currentIndex];
  randomWords = words[Math.floor(Math.random() * words.length)].split("");
  document.getElementById("popup").remove();
  for (let x = 0; x < rows.length; x++) {
    for (let i = 0; i < inputs.length; i++) {
      rows[x][i].value = "";
      rows[x][i].style.backgroundColor = "";
      disableText(rows[x]);
    }
  }
  enableText(inputs);
  removeBoard();
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
  for (let x = 0; x < rows.length; x++) {
    for (let i = 0; i < inputs.length; i++) {
      rows[x][i].value = "";
      rows[x][i].style.backgroundColor = "";
      disableText(rows[x]);
    }
  }
  const inputField = document.getElementById("custom-word");
  inputField.value = "";
  removeBoard();
  enableText(inputs);
  hideOtherPagesBesideStart();
}

function updateWord() {
  //* Custom Mode
  let newWord = document.getElementById("custom-word").value;
  randomWords = newWord.split("");
}

function removeBoard() {
  const form0 = document.getElementById("row0");
  const form1 = document.getElementById("row1");
  const form2 = document.getElementById("row2");
  const form3 = document.getElementById("row3");
  const form4 = document.getElementById("row4");
  const form5 = document.getElementById("row5");
  form0.remove();
  form1.remove();
  form2.remove();
  form3.remove();
  form4.remove();
  form5.remove();
}

function createBoard() {
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
      input.setAttribute(
        "onkeyup",
        `autoTab(this, "${formIndex}.${
          boxIndex < randomWords.length - 1 ? boxIndex + 1 : formIndex + 1
        }")`
      );
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
function guess() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", checkUserInput);
  }
}

function checkUserInput() {
  const result = [];
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      return;
    }
    result.push(inputs[i].value);
  }
  crossCheck(randomWords, result);
}

function crossCheck(preWord, userInput) {
  let allCorrect = true;
  let letterCount = {}; // Amount of each letter in the defined word
  for (let i = 0; i < preWord.length; i++) {
    letterCount[preWord[i]] = (letterCount[preWord[i]] || 0) + 1;
  }
  for (let i = 0; i < preWord.length; i++) {
    // Conditionals
    if (preWord[i] === userInput[i]) {
      inputs[i].style.backgroundColor = "#93c47d"; //* Green
      letterCount[userInput[i]]--;
    } else {
      inputs[i].style.backgroundColor = "grey";
      allCorrect = false;
    }
  }
  for (let i = 0; i < preWord.length; i++) {
    if (letterCount[userInput[i]] > 0) {
      inputs[i].style.backgroundColor = "#ffd966"; //* Yellow
      letterCount[userInput[i]]--;
      allCorrect = false;
    }
  }
  if (allCorrect) {
    score = currentIndex + 1;
    setTimeout(gotoResults, 2000);
  } else {
    disableText(inputs);
    currentIndex++;
    if (currentIndex < rows.length) {
      inputs = rows[currentIndex];
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("input", checkUserInput);
      }
      enableText(inputs);
      box[currentIndex].focus();
    } else {
      showAlert(
        "Oops! The answer is " +
          randomWords.join("") +
          ". Click here to try again!"
      );
    }
  }
}

// Main function
function mainFlow() {
  hideOtherPagesBesideStart();
  basicMode.addEventListener("click", gotoInst);
  customMode.addEventListener("click", gotoChallenge);
  customButton.addEventListener("click", gotoInstChallenge);
  startButton.addEventListener("click", gotoGame);
  resetButton.addEventListener("click", newGame);
}

mainFlow();
