/*----- constants -----*/

/*----- state variables -----*/

/*----- cached elements  -----*/
const startPage = document.getElementById("start-page");
const gamePage = document.getElementById("game-page");
const scorePage = document.getElementById("score-page");

const startButton = document.getElementById("start-button");
const guessButton = document.getElementById("guess-button");

const input1 = document.getElementById("input Num 1");
const input2 = document.getElementById("input Num 2");
const input3 = document.getElementById("input Num 3");
const input4 = document.getElementById("input Num 4");
const inputs = [input1, input2, input3, input4];

/*----- event listeners -----*/
function gotoGame() {
  startPage.style.display = "none";
  gamePage.style.display = "block";
}

function gotoScore() {
  gamePage.style.display = "none";
  scorePage.style.display = "block";
}

function hideOtherPagesBesideStart() {
  gamePage.style.display = "none";
  scorePage.style.display = "none";
}

function createCode() {
  // https://www.w3schools.com/jsref/jsref_random.asp
  // let x = Math.floor(Math.random() * 100 + 1);
  return [1, 4, 3, 2];
}

function getAllInputsValues() {
  const result = [];
  for (let i = 0; i < inputs.length; i++) {
    const element = inputs[i];
    result.push(parseInt(element.value));
  }
  return result;
}

function makeGuess() {
  const result = getAllInputsValues(); // [1, 2, 4,2]
  if (check(createCode(), result) === true) {
    console.log("goto score");
  } else {
    showWrongMessage();
  }
}

/*----- functions -----*/
//* function -> code matches values
//* Input(s) -> Pure Function -> Output
function showWrongMessage() {
  // console.log("show wrong");
  const message = document.getElementById("message");
  message.innerText = "You are wrong";
}

function check(codeArray, valuesArray) {
  console.log("codeArray", codeArray);
  console.log("valuesArray", valuesArray);
  return true; //; boolean
}

function main() {
  hideOtherPagesBesideStart();
  gotoGame();

  // startButton.addEventListener("click", gotoGame);
  guessButton.addEventListener("click", makeGuess);
}

main();
//* console.log() what is inside the 1st box -> what do I write and where do i write it
//* value
