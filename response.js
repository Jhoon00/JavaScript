const $screen = document.querySelector("#screen");
const $result = document.querySelector("#result");
let startTime;
let endTime;
const records = [];
let timeoutId;

$screen.addEventListener("click", clickScreen);

function clickScreen() {
  if ($screen.classList.contains("waiting")) {
    $screen.classList.remove("waiting");
    $screen.classList.add("ready");
    $screen.textContent = "초록색이 되면 클릭하세요";
    timeoutId = setTimeout(showNow, Math.floor(Math.random() * 1000) + 2000);
  } else if ($screen.classList.contains("ready")) {
    clearTimeout(timeoutId);
    $screen.classList.remove("ready");
    $screen.classList.add("waiting");
    $screen.textContent = "너무 성급하시군요!";
  } else if ($screen.classList.contains("now")) {
    endTime = new Date();
    const current = endTime - startTime;
    records.push(current);
    const average = records.reduce((a, c) => a + c) / records.length;
    const bestScore = records.sort((a, b) => a - b).slice(0, 5);
    $result.textContent = `현재 ${current}ms, 평균: ${average}ms 최고점수 ${bestScore.join(
      " > "
    )}`;
    startTime = null;
    endTime = null;
    $screen.classList.remove("now");
    $screen.classList.add("waiting");
    $screen.textContent = "클릭해서 시작하세요";
  }
}

function showNow() {
  startTime = new Date();
  $screen.classList.remove("ready");
  $screen.classList.add("now");
  $screen.textContent = "클릭하세요!";
}
