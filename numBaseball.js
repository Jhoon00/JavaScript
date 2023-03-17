const $form = document.querySelector("#form");
const $input = document.querySelector("#input");
const $logs = document.querySelector("#logs");
let out = 0;
//랜덤숫자 생성
const numbers = [];
for (let i = 0; i < 9; i++) {
  numbers.push(i + 1);
}
const answer = [];
for (let i = 0; i < 4; i++) {
  const index = Math.floor(Math.random() * numbers.length);
  answer[i] = numbers[index];
  numbers.splice(index, 1);
}
//입력값 검증
const tries = [];
function checkInput(input) {
  if (input.length !== 4) {
    return alert("4자리 숫자를 입력하세요");
  }
  if (new Set(input).size !== 4) {
    return alert("중복되지 않게 입력하세요");
  }
  if (tries.includes(input)) {
    return alert("이미 시도한 값입니다");
  }
  return true;
}
function submitInput(event) {
  event.preventDefault();
  const value = $input.value;
  $input.value = "";
  const valid = checkInput(value);
  if (!valid) {
    return;
  }
  if (answer.join("") === value) {
    $logs.textContent = "홈런";
    return;
  }
  if (tries.length > 10) {
    const message = document.createTextNode(`패배! 정답은 ${answer.join("")}`);
    $logs.appendChild(message);
    return;
  }
  let strike = 0;
  let ball = 0;
  let checkOut = 0;
  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]);
    if (index > -1) {
      if (index === i) {
        strike += 1;
      } else {
        ball += 1;
      }
    }
  }
  checkOut = strike + ball;
  if (checkOut === 0) {
    out += 1;
    if (out === 3) {
      const message = document.createTextNode(
        `${out} 아웃! 정답은 ${answer.join("")}`
      );
      $logs.appendChild(message);
      return;
    }
    $logs.append(`${value}: ${out} 아웃`, document.createElement("br"));
  } else {
    $logs.append(
      `${value}: ${strike} 스트라이크 ${ball} 볼`,
      document.createElement("br")
    );
  }
  tries.push(value);
}
$form.addEventListener("submit", submitInput);
