const number = Number(prompt("몇 명에서 참가하나요?"));
const btn = document.querySelector("#btn");
const input = document.querySelector("#input");
const word = document.querySelector("#word");
const order = document.querySelector("#order");
let words; //제시어
let newWord; //현재 단어

function onClickBtn() {
  if (!words) {
    //비어 있을때
    words = newWord;
    word.textContent = words;
    counting();
    inputEmpty();
  } else {
    //비어 있지 않을때
    if (words[words.length - 1] === newWord[0]) {
      words = newWord;
      word.textContent = words;
      counting();
      inputEmpty();
    } else {
      alert("올바르지 않습니다.");
      inputEmpty();
    }
  }
}
function onInput(event) {
  newWord = ("글자입력", event.target.value);
}
function counting() {
  const orders = Number(order.textContent);
  if (orders + 1 > number) {
    order.textContent = 1;
  } else {
    order.textContent = orders + 1;
  }
}
function inputEmpty() {
  input.value = "";
  input.focus();
}
btn.addEventListener("click", onClickBtn);
input.addEventListener("input", onInput);
