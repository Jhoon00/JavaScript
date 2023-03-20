// 태그 선택자
const $result = document.querySelector("#result");
const $bonus = document.querySelector("#bonus");

// 45 크기의 배열을 index + 1 채운다.
const candidate = Array(45)
  .fill()
  .map((v, i) => i + 1);

const shuffle = []; // 45개의 수에서 랜덤 값을 뽑아 저장

// 배열 안에 수를 다 뺄 때까지
while (candidate.length > 0) {
  // 0부터 candidate의 인덱스 값까지의 랜덤 정수
  const randomNum = Math.floor(Math.random() * candidate.length);
  // candidate 랜덤 인덱스의 값을 spiceArray로 잘라내기
  const spliceArray = candidate.splice(randomNum, 1);
  // 뽑아낸 랜덤 값을 배열에 푸쉬
  const value = spliceArray[0];
  shuffle.push(value);
}
//오름차순으로 winballs에 shuffle배열 [0]에서 [5]까지를 가져온다.
const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
// bonus에 shuffle[6]을 저장
const bonus = shuffle[6];

// winBalls의 길이 만큼 반복
for (let i = 0; i < winBalls.length; i++) {
  // 1초의 간격으로 볼을 출력
  setTimeout(() => {
    // ball를 만드는 태그
    const $ball = document.createElement("div");
    $ball.className = "ball";
    $ball.textContent = winBalls[i];
    // ball의 값마다 다른 색상 주기
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
    $result.appendChild($ball); // 화면에 출력
  }, 1000 * (i + 1));
}

// 7초후 보너스볼 출력
setTimeout(() => {
  //bonus ball을 만드는 태그
  const $ball = document.createElement("div");
  $ball.className = "ball";
  $ball.textContent = bonus;
  // ball의 값마다 다른 색상 주기
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
  $bonus.appendChild($ball); // bonus ball 출력
}, 7000);
