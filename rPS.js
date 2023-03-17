const $computer = document.querySelector("#computer");
const $score = document.querySelector("#score");
const $rock = document.querySelector("#rock");
const $scissors = document.querySelector("#scissors");
const $paper = document.querySelector("#paper");
const images = ["paper.jpg", "rock.jpg", "scissors.jpg"];
let comchoice = "rock";
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
let intervalid = setInterval(changeComHand, 100);
let clickable = true;
let myScore = 0;
let comScore = 0;
const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
};
function clickButton(event) {
  if (clickable) {
    clickable = false;
    clearInterval(intervalid);
    const myChoice = event.target.id;
    const myPick = scoreTable[myChoice];
    const comPick = scoreTable[comchoice];
    const diff = myPick - comPick;
    console.log(myChoice);
    console.log(comchoice);
    console.log(diff);
    let message;
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
    $score.textContent = `${message} 총: 나 ${myScore}점 컴퓨터${comScore}점`;
    if (myScore === 3) {
      const $winner = document.createElement("div");
      $winner.textContent = "승자는 나";
      $score.appendChild($winner);
    } else if (comScore === 3) {
      const $winner = document.createElement("div");
      $winner.textContent = "승자는 컴퓨터";
      $score.appendChild($winner);
    }
    if (myScore === 3 || comScore === 3) {
      setTimeout(reset, 1000);
    }
    setTimeout(() => {
      clickable = true;
      intervalid = setInterval(changeComHand, 100);
    }, 2000);
  }
}
function reset() {
  myScore = 0;
  comScore = 0;
  message = " ";
}
$rock.addEventListener("click", clickButton);
$scissors.addEventListener("click", clickButton);
$paper.addEventListener("click", clickButton);
