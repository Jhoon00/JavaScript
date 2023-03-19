let numF = ""; // 첫 번째 숫자를 넣을 변수
let numS = ""; // 두 번째 숫자를 넣을 변수
let operator = ""; // 연산기호를 넣을 변수
// 태그 선택자
const operation = document.querySelector("#operator");
const result = document.querySelector("#result");

// 이벤트 발생 후 함수 실행
document.querySelector("#num-0").addEventListener("click", onClickNum);
document.querySelector("#num-1").addEventListener("click", onClickNum);
document.querySelector("#num-2").addEventListener("click", onClickNum);
document.querySelector("#num-3").addEventListener("click", onClickNum);
document.querySelector("#num-4").addEventListener("click", onClickNum);
document.querySelector("#num-5").addEventListener("click", onClickNum);
document.querySelector("#num-6").addEventListener("click", onClickNum);
document.querySelector("#num-7").addEventListener("click", onClickNum);
document.querySelector("#num-8").addEventListener("click", onClickNum);
document.querySelector("#num-9").addEventListener("click", onClickNum);
document.querySelector("#plus").addEventListener("click", onClickOper);
document.querySelector("#minus").addEventListener("click", onClickOper);
document.querySelector("#divide").addEventListener("click", onClickOper);
document.querySelector("#multiply").addEventListener("click", onClickOper);
document.querySelector("#calculat").addEventListener("click", onClickCal);
document.querySelector("#clear").addEventListener("click", onClickCl);

// 숫자버튼을 클릭할때 불러오는 함수
function onClickNum(event) {
  if (!operator) {
    //연산기호가 선택 되지 않았을때
    numF += event.target.value; // 문자열로 선택된 숫자를 변수에 넣음
    result.value = numF; // 변수를 화면에 보여줌
    return; // 함수탈출
  }
  if (!numS) {
    // 연산기호 선택 후 두번 째 숫자 입력 준비
    result.value = "";
  }
  numS += event.target.value; // 문자열로 선택된 숫자를 변수에 넣음
  result.value = numS; // 변수를 화면에 보여줌
  return; // 함수 탈출
}

// 연산기호 버튼 누를때 불러오는 함수
function onClickOper(event) {
  const oper = event.target.value; // 선택된 연산기호로 상수 선언
  if (numF) {
    // 첫 번째 숫자가 있을 경우
    operator = oper; // 연산 기호를 변수로 저장
    operation.value = oper; // 선택된 연산기호를 보여줌
    numS = ""; // 두 번째 변수를 초기화
  } else {
    // 첫 번째 숫자 입력하라고 경고
    alert("숫자를 입력");
  }
}

// 등호를 누르면 불러오는 함수
function onClickCal() {
  if (numS) {
    // 두번 째 숫자까지 입력 했을 시
    numF = Number(numF); // 문자인 첫 번째 값을 숫자로 변환
    numS = Number(numS); // 문자인 두 번째 값을 숫자로 변환
    switch (operator) {
      // 선택된 연산기호를 사용해 결과값 도출
      case "+":
        result.value = numF + numS;
        break;

      case "-":
        result.value = numF - numS;
        break;

      case "*":
        result.value = numF * numS;
        break;

      case "/":
        result.value = numF / numS;
        break;

      default:
        break;
    }
    numF = result.value; // 다음 계산을 위해서 결과값을 첫 번째 숫자에 저장
  } else {
    // 두 번째 숫자가 없으면 경고
    alert("숫자를 입력");
  }
}

// 초기화 버튼을 누르면 불러오는 함수
function onClickCl() {
  numF = ""; // 첫 번째 숫자 초기화
  numS = ""; // 두 번째 숫자 초기화
  operator = ""; // 연산기호 초기화
  operation.value = ""; // 화면에 보이는 기호 초기화
  result.value = ""; // 화면에 보이는 값 초기화
}
