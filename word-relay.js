// 게임을 시작할때 플레이 인원을 묻고 저장
const number = Number(prompt("몇 명에서 참가하나요?"));
// html 태그 선택
const btn = document.querySelector("#btn");
const input = document.querySelector("#input");
const word = document.querySelector("#word");
const order = document.querySelector("#order");
let words; // 제시어
let newWord; // 현재 단어

// 이벤트후 함수 실행
btn.addEventListener("click", onClickBtn);
input.addEventListener("input", onInput);

// 입력버튼을 불렀을때 불러오는 함수
function onClickBtn() {
  if (!words) {
    // 제시어가 없을 때 (처음 입력자일때 실행)
    words = newWord; // 제시어에 입력값 저장
    word.textContent = words; // html에 보여주기
    counting();
    inputEmpty();
  } else {
    //비어 있지 않을때
    if (words[words.length - 1] === newWord[0]) {
      // 제시어의 마지막 글자와 입력 단어의 첫글자가 일치할 때
      words = newWord; // 제시어를 입력 값으로 변경
      word.textContent = words; // 새로운 제시어를 html에 보여줌
      counting();
      inputEmpty();
    } else {
      // 일치하지 않을 때
      alert("올바르지 않습니다."); // 경고 전송
      inputEmpty();
    }
  }
}
// 입력한 값을 newWord에 저장하는 함수
function onInput(event) {
  newWord = event.target.value;
}
// 차례를 나타내기 위한 카운팅 함수
function counting() {
  const orders = Number(order.textContent); // (문자 -> 숫자)후 값을 받음
  if (orders + 1 > number) {
    // 마지막 차례가 끝나면 첫 번째로 돌아감
    order.textContent = 1;
  } else {
    //아닐시 차례에 +1
    order.textContent = orders + 1;
  }
}
//입력하는 창을 비워주는 함수
function inputEmpty() {
  input.value = ""; // 값을 빈 값으로 변경
  input.focus(); // 포커스 상태로 지정
}
