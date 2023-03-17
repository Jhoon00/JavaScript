const participant = Number(prompt("참가자의 수를 입력하시오"));
const inputTextS = document.querySelector("#inputText");
const btnS = document.querySelector("#btn");
const orderS = document.querySelector("#order");
const wordS = document.querySelector("#word");
let word;
let newWord;

function inputT(event) {
  newWord = ("글자입력", event.target.value);
}
function clickB() {
  word = newWord;
  if (word.length != 3) {
    alert("다시 입력하시오");
  } else {
    wordS.textContent = word;
    counting();
  }
  emptyV();
}
function emptyV() {
  inputTextS.value = "";
  inputTextS.focus();
}
function counting() {
  const order = Number(orderS.textContent);
  if ((order = participant)) {
    orderS.textContent = 1;
  } else {
    orderS.textContent = order + 1;
  }
}

inputTextS.addEventListener("input", inputT);
btnS.addEventListener("click", clickB);
