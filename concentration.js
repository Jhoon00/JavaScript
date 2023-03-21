const $wrapper = document.querySelector("#wrapper"); // 태그 선택자
// 카드의 갯수를 입력 받아 저장
const total = parseInt(prompt("카드 개수를 짝수로 입력하세요(최대 20개)"));
const colors = [
  // 카드에 사용할 색을 저장
  "red",
  "orange",
  "yellow",
  "green",
  "white",
  "pink",
  "cyan",
  "violet",
  "gray",
  "black",
];
let colorSlice = colors.slice(0, total / 2); // 갯수에 맞게 색을 추출
let colorCopy = colorSlice.concat(colorSlice); // 배열의 값을 2개씩으로 늘림
let shuffled = []; // 섞어서 저장
let clicked = []; // 현재 클릭한 카드 값
let completed = []; // 조건이 성립된 카드를 저장
let clickable = false; // 클릭 가능여부 저장
let startTime; // 스타트 시각 저장

// 첫 호출 스택
startGame();

// 게임시작
function startGame() {
  shuffle(); // shuffle함수 호출
  // total만큼 카드 만들기
  for (let i = 0; i < total; i += 1) {
    const card = createCard(i);
    card.addEventListener("click", onclickCard); // 이벤트 후 함수 실행
    $wrapper.appendChild(card); // 화면에 카드 출력
  }
  document.querySelectorAll(".card").forEach((card, index) => {
    setTimeout(() => {
      //카드 공개
      card.classList.add("flipped");
    }, 1000 + 100 * index);
  });
  setTimeout(() => {
    //카드 감추기
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("flipped");
    });
    clickable = true;
    startTime = new Date();
  }, 5000);
}

// 카드를 섞는 함수
function shuffle() {
  // 게임에 사용되는 카드를 랜덤 값으로 뽑아내서 shuffled에 저장
  for (let i = 0; colorCopy.length > 0; i += 1) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
  }
}

// 카드를 생성하는 함수
function createCard(i) {
  // 카드 틀
  const card = document.createElement("div");
  card.className = "card";
  const cardInner = document.createElement("div");
  // 카드 속성 틀
  cardInner.className = "card-inner";
  const cardFront = document.createElement("div");
  // 카드 앞면 속성
  cardFront.className = "card-front";
  const cardBack = document.createElement("div");
  // 카드 뒷면 속성
  cardBack.className = "card-back";
  cardBack.style.backgroundColor = shuffled[i];
  // 카드 합치기
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  return card;
}

// 카드를 클릭시 불러오는 함수
function onclickCard() {
  // 선택 가능한 카드인지 체크
  if (!clickable || completed.includes(this) || clicked[0] === this) {
    return;
  }
  // 누렀을 때 변화
  this.classList.toggle("flipped");
  clicked.push(this); // 클릭된 카드 저장
  // 2장을 뽑았는지 검사
  if (clicked.length !== 2) {
    return;
  }
  const firstBackColor =
    clicked[0].querySelector(".card-back").style.backgroundColor;
  const secondBackColor =
    clicked[1].querySelector(".card-back").style.backgroundColor;
  if (firstBackColor === secondBackColor) {
    //두 카드가 같으면
    completed.push(clicked[0]);
    completed.push(clicked[1]);
    clicked = [];
    if (completed.length !== total) {
      // 모든 카드를 맞추면
      return;
    }
    const endTime = new Date(); // 종료 시각 저장
    // 1초후 종료 메세지 출력
    setTimeout(() => {
      alert(`축하합니다! ${(endTime - startTime) / 1000}초 걸렸습니다`);
      resetGame();
    }, 1000);
    return;
  }
  //두 카드가 다르면
  clickable = false;
  setTimeout(() => {
    // 누르기 전 상태 초기화
    clicked[0].classList.remove("flipped");
    clicked[1].classList.remove("flipped");
    clicked = [];
    clickable = true;
  }, 500);
}

function resetGame() {
  $wrapper.innerHTML = "";
  colorCopy = colors.concat(colors);
  shuffled = [];
  completed = [];
  clickable = false;
  startGame();
}
