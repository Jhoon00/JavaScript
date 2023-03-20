// 태그 선택자
const $screen = document.querySelector("#screen");
const $result = document.querySelector("#result");

let startTime; // 게임시작 시각
let endTime; // 클릭 후 시각
const records = []; // 기록 저장
let timeoutId; // 랜

// 이벤트 후 함수 실행
$screen.addEventListener("click", clickScreen);

// 클릭 후 불러오는 함수
function clickScreen() {
  // 클릭할 때의 상자의 상태
  if ($screen.classList.contains("waiting")) {
    // 상자의 상태를 변경
    $screen.classList.remove("waiting");
    $screen.classList.add("ready");
    $screen.textContent = "초록색이 되면 클릭하세요";
    // 랜덤초 후에 showNow함수 실행
    timeoutId = setTimeout(showNow, Math.floor(Math.random() * 1000) + 2000);
  } else if ($screen.classList.contains("ready")) {
    clearTimeout(timeoutId); // 다음 상자로 넘어가는 함수 정지
    // 상자의 상태를 변경
    $screen.classList.remove("ready");
    $screen.classList.add("waiting");
    $screen.textContent = "너무 성급하시군요!";
  } else if ($screen.classList.contains("now")) {
    endTime = new Date(); // 클릭한 시각을 저장
    const current = endTime - startTime; // 클릭이 걸린 시간을 저장
    records.push(current); // 현재기록을 저장
    // 기록의 평균 저장
    const average = records.reduce((a, c) => a + c) / records.length;
    // 기록을 오름차순으로 5개까지 출력
    const bestScore = records.sort((a, b) => a - b).slice(0, 5);
    $result.textContent = `현재 ${current}ms, 평균: ${average}ms 최고점수 ${bestScore.join(
      " > "
    )}`; // 결과를 출력
    startTime = null; // 초기화
    endTime = null; // 초기화
    // 상자 상태 변경
    $screen.classList.remove("now");
    $screen.classList.add("waiting");
    $screen.textContent = "클릭해서 시작하세요";
  }
}

// 클릭해야 하는 상자가 나올때 불러오는 함수
function showNow() {
  startTime = new Date(); // 화면이 변경된 시각 저장
  // 상자의 상태를 변경
  $screen.classList.remove("ready");
  $screen.classList.add("now");
  $screen.textContent = "클릭하세요!";
}
