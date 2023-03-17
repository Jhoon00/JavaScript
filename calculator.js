let numF = "";
let numS = "";
let operator = "";
const operation = document.querySelector("#operator");
const result = document.querySelector("#result");

function onClickNum(event) {
  if (!operator) {
    numF += event.target.value;
    result.value = numF;
    return;
  }
  if (!numS) {
    result.value = "";
  }
  numS += event.target.value;
  result.value = numS;
  return;
}
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

function onClickOper(event) {
  const oper = event.target.value;
  if (numF) {
    operator = oper;
    operation.value = oper;
    numS = "";
  } else {
    alert("숫자를 입력");
  }
}
document.querySelector("#plus").addEventListener("click", onClickOper);
document.querySelector("#minus").addEventListener("click", onClickOper);
document.querySelector("#divide").addEventListener("click", onClickOper);
document.querySelector("#multiply").addEventListener("click", onClickOper);

function onClickCal() {
  if (numS) {
    numF = Number(numF);
    numS = Number(numS);
    switch (operator) {
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
    numF = result.value;
  } else {
    alert("숫자를 입력");
  }
}
document.querySelector("#calculat").addEventListener("click", onClickCal);

function onClickCl() {
  numF = "";
  numS = "";
  operator = "";
  operation.value = "";
  result.value = "";
}

document.querySelector("#clear").addEventListener("click", onClickCl);
