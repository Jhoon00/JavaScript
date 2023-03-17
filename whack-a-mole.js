const $timer = document.querySelector("#timer");
const $score = document.querySelector("#score");
const $game = document.querySelector("#game");
const $start = document.querySelector("#start");
const $life = document.querySelector("#life");
const $$cells = document.querySelectorAll(".cell");

const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let started = false;
let score = 0;
let gopherPercent = 0.3;
let bombPercent = 0.5;
let time = 60;
let life = 3;

function tick() {
  holes.forEach((hole, index) => {
    if (hole) {
      //이벤트 발생중이면 실행x
      return;
    }
    if (Math.random() < gopherPercent) {
      const $gopher = $$cells[index].querySelector(".gopher");
      holes[index] = setTimeout(() => {
        //1초후 gopher에 hidden
        $gopher.classList.add("hidden");
        holes[index] = 0;
      }, 1000);
      $gopher.classList.remove("hidden");
    } else if (Math.random() < bombPercent) {
      const $bomb = $$cells[index].querySelector(".bomb");
      holes[index] = setTimeout(() => {
        //1초후 gopher에 hidden
        $bomb.classList.add("hidden");
        holes[index] = 0;
      }, 1000);
      $bomb.classList.remove("hidden");
    }
  });
}
$$cells.forEach(($cell, index) => {
  $cell.querySelector(".gopher").addEventListener("click", (event) => {
    if (!event.target.classList.contains("dead")) {
      score += 1;
      $score.textContent = score;
    }
    event.target.classList.add("dead");
    event.target.classList.add("hidden");
    clearTimeout(holes[index]);
    setTimeout(() => {
      holes[index] = 0;
      event.target.classList.remove("dead");
    }, 1000);
  });
  $cell.querySelector(".bomb").addEventListener("click", (event) => {
    if (!event.target.classList.contains("boom")) {
      life -= 1;
      $life.textContent = `목숨:${life}`;
      if (life === 0) {
        setTimeout(() => {
          alert(`Dead! 점수는${score}점`);
        }, 50);
      }
    }
    event.target.classList.add("boom");
    event.target.classList.add("hidden");
    clearTimeout(holes[index]);
    setTimeout(() => {
      holes[index] = 0;
      event.target.classList.remove("boom");
    }, 1000);
  });
});
$start.addEventListener("click", () => {
  if (started) {
    return;
  }
  life = 3;
  $life.textContent = `목숨:${life}`;
  started = true;
  const timerId = setInterval(() => {
    time = (time * 10 - 1) / 10;
    $timer.textContent = time;
    if (time === 0) {
      clearInterval(timerId);
      clearInterval(tickId);
      setTimeout(() => {
        alert(`시간 종료! 점수는${score}점`);
      }, 50);
    }
  }, 100);
  const tickId = setInterval(tick, 1000);
  tick();
});
