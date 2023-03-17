const { body } = document;
const $table = document.createElement("table");
const $result = document.createElement("div");
const rows = [];
let turn = "O";

function callback(event) {
  if (event.target.textContent !== "") {
    console.log("빈칸이 아닙니다");
  } else {
    console.log("빈칸입니다");
    event.target.textContent = turn;
    const hasWinner = checkWinner(event.target);
    if (hasWinner) {
      $result.textContent = `${turn}님이 승리!`;
      $table.removeEventListener("click", callback);
      return;
    }
    const draw = rows.flat().every((cell) => cell.textContent);
    if (draw) {
      $result.textContent = `무승부`;
      return;
    }
    if (turn === "X") {
      turn = "O";
    } else {
      turn = "X";
    }
    if (turn === "X") {
      const emptyCells = rows.flat().filter((v) => !v.textContent);
      const randomCells =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      randomCells.textContent = "X";
      const hasWinner = checkWinner(randomCells);
      if (hasWinner) {
        $result.textContent = `${turn}님이 승리!`;
        return;
      }
      const draw = rows.flat().every((cell) => cell.textContent);
      if (draw) {
        $result.textContent = "무승부";
        return;
      }
      if (turn === "X") {
        turn = "O";
      } else {
        turn = "X";
      }
    }
  }
}

for (let i = 0; i < 3; i++) {
  const $tr = document.createElement("tr");
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement("td");
    cells.push($td);
    $tr.appendChild($td);
  }
  rows.push(cells);
  $table.appendChild($tr);
  $table.addEventListener("click", callback);
}
body.appendChild($table);
body.appendChild($result);

function checkWinner(target) {
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  let hasWinner = false;

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
  return hasWinner;
}
