// 태그 선택자
const $computer = document.querySelector("#computer");
const $score = document.querySelector("#score");
const $rock = document.querySelector("#rock");
const $scissors = document.querySelector("#scissors");
const $paper = document.querySelector("#paper");
const images = ["paper.jpg", "rock.jpg", "scissors.jpg"];
// 컴퓨터가 선택한 값
let comchoice = "rock";

// 이벤트 후 함수 실행
$rock.addEventListener("click", clickButton);
$scissors.addEventListener("click", clickButton);
$paper.addEventListener("click", clickButton);

// 화면에 3가지의 사진을 차례대로 보여주고 값을 변수에 저장
function changeComHand() {
  if (comchoice === "rock") {
    comchoice = "scissors";
    $computer.style.background = `url(image/${images[2]})`;
  } else if (comchoice === "scissors") {
    comchoice = "paper";
    $computer.style.background = `url(image/${images[0]})`;
  } else if (comchoice === "paper") {
    comchoice = "rock";
    $computer.style.background = `url(image/${images[1]})`;
  }
  $computer.style.backgroundSize = "200px 200px";
}
let intervalid = setInterval(changeComHand, 100); // 0.1초마다 함수 실행
let clickable = true; // 중복 클릭 예방
let myScore = 0; // 나의 점수 저장
let comScore = 0; // 컴퓨터의 점수 저장
const scoreTable = {
  // 승패를 구분할 값 지정
  rock: 0,
  scissors: 1,
  paper: -1,
};

// 클릭할 시 불러오는 함수
function clickButton(event) {
  // 클릭 가능할 때 실행
  if (clickable) {
    clickable = false; // 클릭 불가능
    clearInterval(intervalid); // 반복함수 정지
    // 선택된 값들을 저장
    const myChoice = event.target.id;
    const myPick = scoreTable[myChoice];
    const comPick = scoreTable[comchoice];
    const diff = myPick - comPick;
    console.log(myChoice);
    console.log(comchoice);
    console.log(diff);
    let message; // 결과를 저장
    switch (diff) {
      case 2:
      case -1:
        myScore += 1;
        message = "나의 승리";
        break;
      case -2:
      case 1:
        comScore += 1;
        message = "컴퓨터의 승리";
        break;
      case 0:
        message = "무승부";
        break;
    }
    // 총 점수 출력
    $score.textContent = `${message} 총: 나 ${myScore}점 컴퓨터${comScore}점`;

    // 게임이 종료되는 조건
    if (myScore === 3) {
      const $winner = document.createElement("div"); // 태그 생성
      $winner.textContent = "승자는 나"; // 생성된 태그 안에 메세지 저장
      $score.appendChild($winner); // 화면에 출력
    } else if (comScore === 3) {
      const $winner = document.createElement("div"); // 태그 생성
      $winner.textContent = "승자는 컴퓨터"; // 생성된 태그 안에 메세지 저장
      $score.appendChild($winner); // 화면에 출력
    }
    if (myScore === 3 || comScore === 3) {
      // 게임이 끝나면 1초후 함수 발생
      setTimeout(reset, 1000);
    }

    // 2초 후 다시 사진을 돌리고 클릭 가능하도록 저장
    setTimeout(() => {
      clickable = true;
      intervalid = setInterval(changeComHand, 100);
    }, 2000);
  }
}

// 점수와 메시지 초기화
function reset() {
  myScore = 0;
  comScore = 0;
  message = " ";
}
