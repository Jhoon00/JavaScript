//공 셔플하기
const candidate = Array(45)
  .fill()
  .map((v, i) => i + 1);
const shuffle = [];

while (candidate.length > 0) {
  const randomNum = Math.floor(Math.random() * candidate.length);
  const spliceArray = candidate.splice(randomNum, 1);
  const value = spliceArray[0];
  shuffle.push(value);
}
//공 뽑기
const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
const bonus = shuffle[6];
//공보여주기
const $result = document.querySelector("#result");

for (let i = 0; i < winBalls.length; i++) {
  setTimeout(() => {
    const $ball = document.createElement("div");
    $ball.className = "ball";
    $ball.textContent = winBalls[i];
    switch (Math.floor(winBalls[i] / 10)) {
      case 0:
        $ball.style.backgroundColor = "red";
        $ball.style.color = "white";
        break;
      case 1:
        $ball.style.backgroundColor = "orange";
        $ball.style.color = "black";
        break;
      case 2:
        $ball.style.backgroundColor = "yellow";
        $ball.style.color = "black";
        break;
      case 3:
        $ball.style.backgroundColor = "blue";
        $ball.style.color = "white";
        break;
      case 4:
        $ball.style.backgroundColor = "green";
        $ball.style.color = "white";
        break;
    }
    $result.appendChild($ball);
  }, 1000 * (i + 1));
}

const $bonus = document.querySelector("#bonus");
setTimeout(() => {
  const $ball = document.createElement("div");
  $ball.className = "ball";
  $ball.textContent = bonus;
  switch (Math.floor(bonus / 10)) {
    case 0:
      $ball.style.backgroundColor = "red";
      $ball.style.color = "white";
      break;
    case 1:
      $ball.style.backgroundColor = "orange";
      $ball.style.color = "black";
      break;
    case 2:
      $ball.style.backgroundColor = "yellow";
      $ball.style.color = "black";
      break;
    case 3:
      $ball.style.backgroundColor = "blue";
      $ball.style.color = "white";
      break;
    case 4:
      $ball.style.backgroundColor = "green";
      $ball.style.color = "white";
      break;
  }
  $bonus.appendChild($ball);
}, 7000);
