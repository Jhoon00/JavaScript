const $form = document.querySelector("#form");
const $timer = document.querySelector("#timer");
const $tbody = document.querySelector("#table tbody");
const $result = document.querySelector("#result");
const row = 10;
const cell = 10;
const mine = 10;
const CODE = {
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  MINE: -6,
  OPENED: 0,
};
let data;
let openCount = 0;
let startTime;
let interval;

// function onSubmit(event) {
//   event.preventDefault();
//   row = parseInt(event.target.row.value);
//   cell = parseInt(event.target.cell.value);
//   mine = parseInt(event.target.mine.value);
//   drawTable();
//   startTime = new Date();
//   interval = setInterval(() => {
//     const time = Math.floor((new Date() - startTime) / 1000);
//     $timer.textContent = `${time}초`;
//   }, 1000);
// }
// $form.addEventListener("submit", onSubmit);

//랜덤으로 지뢰 심기
function plantMine() {
  //지뢰판 만들기
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });
  //랜덤으로 지뢰 선택
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }
  //지뢰판을 처음 설정으로 초기화
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  //복사해둔 지뢰를 지뢰판에 표시
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  return data;
}
//지뢰판 그리기
function drawTable() {
  data = plantMine();
  data.forEach((row) => {
    const $tr = document.createElement("tr");
    row.forEach((cell) => {
      const $td = document.createElement("td");
      if (cell === CODE.MINE) {
        $td.textContent = "";
      }
      $tr.append($td);
    });
    $tbody.append($tr);
    $tbody.addEventListener("contextmenu", onRightClick);
    $tbody.addEventListener("click", onLeftClick);
  });
}
//오른쪽 클릭 이벤트
function onRightClick(event) {
  event.preventDefault();
  const target = event.target;
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  const cellData = data[rowIndex][cellIndex];
  if (cellData === CODE.MINE) {
    data[rowIndex][cellIndex] = CODE.QUESTION_MINE;
    target.className = "question";
    target.textContent = "?";
  } else if (cellData === CODE.QUESTION_MINE) {
    data[rowIndex][cellIndex] = CODE.MINE;
    target.className = "flag";
    target.textContent = "!";
  } else if (cellData === CODE.FLAG_MINE) {
    data[rowIndex][cellIndex] = CODE.MINE;
    target.className = "";
    target.textContent = "";
  } else if (cellData === CODE.NORMAL) {
    data[rowIndex][cellIndex] = CODE.QUESTION;
    target.className = "question";
    target.textContent = "?";
  } else if (cellData === CODE.QUESTION) {
    data[rowIndex][cellIndex] = CODE.FLAG;
    target.className = "flag";
    target.textContent = "!";
  } else if (cellData === CODE.FLAG) {
    data[rowIndex][cellIndex] = CODE.NORMAL;
    target.className = "";
    target.textContent = "";
  }
}
//왼쪽 클릭 이벤트
function onLeftClick(event) {
  const target = event.target;
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  const cellData = data[rowIndex][cellIndex];
  if (cellData === CODE.NORMAL) {
    //닫힌 칸이면
    openAround(rowIndex, cellIndex);
  } else if (cellData === CODE.MINE) {
    //지뢰칸이면
    target.textContent = "펑";
    target.className = "opened";
    clearInterval(interval);
    $tbody.removeEventListener("contextmenu", onRightClick);
    $tbody.removeEventListener("click", onLeftClick);
  } //나머지는 무시
}
//주변 지뢰 개수 구하기
function countMine(rowIndex, cellIndex) {
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
  let i = 0;
  mines.includes(data[rowIndex - 1]?.[cellIndex - 1]) && i++;
  mines.includes(data[rowIndex - 1]?.[cellIndex]) && i++;
  mines.includes(data[rowIndex - 1]?.[cellIndex + 1]) && i++;
  mines.includes(data[rowIndex][cellIndex - 1]) && i++;
  mines.includes(data[rowIndex][cellIndex + 1]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex - 1]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex + 1]) && i++;
  return i;
}
//열기
function open(rowIndex, cellIndex) {
  if (data[rowIndex]?.[cellIndex] >= CODE.OPENED) {
    return;
  }
  const target = $tbody.children[rowIndex]?.children[cellIndex];
  if (!target) {
    return;
  }
  const count = countMine(rowIndex, cellIndex);
  target.textContent = count || "";
  target.className = "opened";
  data[rowIndex][cellIndex] = count;
  openCount++;
  if (openCount === row * cell - mine) {
    const time = (new Date() - startTime) / 1000;
    clearInterval(interval);
    $tbody.removeEventListener("contextmenu", onRightClick);
    $tbody.removeEventListener("click", onLeftClick);
    setTimeout(() => {
      alert(`승리했습니다! ${time}초가 걸렸습니다.`);
    }, 0);
  }
  return count;
}
//주변 열기
function openAround(rI, cI) {
  setTimeout(() => {
    const count = open(rI, cI);
    if (count === 0) {
      openAround(rI - 1, cI - 1);
      openAround(rI - 1, cI);
      openAround(rI - 1, cI + 1);
      openAround(rI, cI - 1);
      openAround(rI, cI + 1);
      openAround(rI + 1, cI - 1);
      openAround(rI + 1, cI);
      openAround(rI + 1, cI + 1);
    }
  }, 0);
}
drawTable();
