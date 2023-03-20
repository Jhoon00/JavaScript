// 태그 선택자
const { body } = document;
const $table = document.createElement("table");
const $result = document.createElement("div");

const rows = []; // 선택한 기록 저장
let turn = "O"; // "O" "X" 값을 저장

// 각각의 tr태그의 영역을 누를때 불러오는 함수
function callback(event) {
  // 안에 값이 있는지 체크
  if (event.target.textContent !== "") {
    console.log("빈칸이 아닙니다");
  } else {
    console.log("빈칸입니다");
    event.target.textContent = turn; // 내가 클릭할 시 "O" 저장
    const hasWinner = checkWinner(event.target); // 승자가 있는지 없는지 저장
    if (hasWinner) {
      $result.textContent = `${turn}님이 승리!`; // 메세지 출력
      $table.removeEventListener("click", callback); // 이벤트 리스너 종료
      return; // 함수 종료
    }
    // 1차원 배열로 합친 후 값이 있는지 확인
    const draw = rows.flat().every((cell) => cell.textContent);
    if (draw) {
      // 승부가 안나고 꽉 차면 무승부
      $result.textContent = `무승부`;
      return;
    }
    // 차례를 넘기면서 turn 모양을 바꿔줌
    if (turn === "X") {
      turn = "O";
    } else {
      turn = "X";
    }
    if (turn === "X") {
      // 비어있는 칸을 탐색
      const emptyCells = rows.flat().filter((v) => !v.textContent);
      // 랜덤으로 하나의 칸에 "X" 넣기
      const randomCells =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      randomCells.textContent = "X";
      // 승자가 있는지 없는지 확인
      const hasWinner = checkWinner(randomCells);
      if (hasWinner) {
        $result.textContent = `${turn}님이 승리!`;
        return;
      }
      // 무승부인지 확인
      const draw = rows.flat().every((cell) => cell.textContent);
      if (draw) {
        $result.textContent = "무승부";
        return;
      }
      // 턴 넘기기
      if (turn === "X") {
        turn = "O";
      } else {
        turn = "X";
      }
    }
  }
}

// 이중반복문으로 표 생성
for (let i = 0; i < 3; i++) {
  const $tr = document.createElement("tr"); // tr생성
  const cells = []; // 생성된 태그를 저장
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement("td"); // td생성
    cells.push($td); // cells 배열에 크기 저장
    $tr.appendChild($td); // tr에 생성된 td 넣기
  }
  rows.push(cells); // rows에 완성된 행을 넣기
  $table.appendChild($tr); // table태그에 tr태그 넣기
  $table.addEventListener("click", callback); // 이벤트 후 함수 실행
}
// body태그에 표와 결과 넣기
body.appendChild($table);
body.appendChild($result);

// 게임이 끝났는지 확인하는 함수
function checkWinner(target) {
  // 선택된 영역의 row, column
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  // 승자가 있는지 boolean값으로 저장
  let hasWinner = false;

  // 같은 모양으로 한줄이 이어지는지 확인 후 있으면 true반환
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    hasWinner = true;
  }
  // 아무것도 없을시
  return hasWinner;
}
