// html 태그 선택
const $form = document.querySelector("#form");
const $input = document.querySelector("#input");
const $logs = document.querySelector("#logs");

let out = 0; // 아웃 카운팅
const tries = []; // 입력된 숫자를 기록

// 입력된 후 함수 실행
$form.addEventListener("submit", submitInput);

//랜덤숫자 생성
const numbers = []; // 0~9까지 뽑을 숫자를 넣을 배열
for (let i = 0; i < 9; i++) {
  // 0~9까지 숫자를 배열에 푸쉬
  numbers.push(i + 1);
}
const answer = []; // 랜덤으로 숫자 4개를 넣을 배열
for (let i = 0; i < 4; i++) {
  // 0이상 (index - 1)이하의 정수값을 뽑아 answer 배열에 저장
  const index = Math.floor(Math.random() * numbers.length);
  answer[i] = numbers[index];
  numbers.splice(index, 1); // numbers 배열에서 뽑힌 숫자를 제거
}

// 적절한 데이터인지 검사하는 함수
function checkInput(input) {
  if (input.length !== 4) {
    // 4자리 숫자가 아닐 시 경고
    return alert("4자리 숫자를 입력하세요");
  }
  if (new Set(input).size !== 4) {
    // set함수로 중복값 검사 후 경고
    return alert("중복되지 않게 입력하세요");
  }
  if (tries.includes(input)) {
    // 입력했던 데이터인지 검사 후 경고
    return alert("이미 시도한 값입니다");
  }
  return true; // 적절한 입력 값이면 true를 반환
}

// 데이터를 입력했을때 불러오는 함수
function submitInput(event) {
  event.preventDefault(); // html 자동 새로고침 중지
  const value = $input.value; // 입력된 값을 저장
  $input.value = ""; // 다음 입력을 위한 초기화
  const valid = checkInput(value); // 입력 값에 대한 boolean값 저장
  if (!valid) {
    return; // 적절한 입력값이 아닐 시 정지
  }
  if (answer.join("") === value) {
    // 입력 값이 정답인지 확인
    $logs.textContent = "홈런";
    return;
  }
  if (tries.length > 10) {
    // 도전 횟수 카운팅
    const message = document.createTextNode(`패배! 정답은 ${answer.join("")}`);
    $logs.appendChild(message); // 패배 메세지 출력
    return;
  }
  // 입력값의 S, B, O 검사
  let strike = 0;
  let ball = 0;
  let checkOut = 0;
  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]);
    // 배열에 저장된 값이 value 값에 저장되어 있는지 검사
    if (index > -1) {
      if (index === i) {
        // 값과 자리가 일치할 시
        strike += 1;
      } else {
        // 값만 일치할 시
        ball += 1;
      }
    }
  }
  checkOut = strike + ball; // 스트라이크, 볼 나온 수를 저장
  if (checkOut === 0) {
    // 스트라이크, 볼이 없을 시 out++
    out += 1;
    if (out === 3) {
      // 아웃 횟수가 3회일 시 게임 종료 및 메세지 출력
      const message = document.createTextNode(
        `${out} 아웃! 정답은 ${answer.join("")}`
      );
      $logs.appendChild(message);
      return;
    }
    // 아웃일 시 메세지 출력
    $logs.append(`${value}: ${out} 아웃`, document.createElement("br"));
  } else {
    // 입력된 숫자의 결과 값 메세지 출력
    $logs.append(
      `${value}: ${strike} 스트라이크 ${ball} 볼`,
      document.createElement("br")
    );
  }
  // 입력된 값을 tries배열에 푸쉬
  tries.push(value);
}
