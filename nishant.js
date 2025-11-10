
function toggleContainer1() {
  const text = document.getElementById("toggleText1");
  const button = event.target;

}

function showSum() {
  let nishant = 5;
  let shrestha = 6;
  const sum = nishant + shrestha;
  const result = document.getElementById("sumResult");
  result.textContent = `The sum of ${nishant} + ${shrestha} is ${sum}.`;
}

function showSub() {
  let nishant = 5;
  let shrestha = 6;
  const sub = nishant - shrestha;
  const result = document.getElementById("subResult");
  result.textContent = `The subtraction of ${nishant} - ${shrestha} is ${sub}.`;
}

function showMul() {
  let nishant = 5;
  let shrestha = 6;
  const mul = nishant * shrestha;
  const result = document.getElementById("mulResult");
  result.textContent = `The multiplication of ${nishant} × ${shrestha} is ${mul}.`;
}

function showDiv() {
  let nishant = 5;
  let shrestha = 6;
  const div = nishant / shrestha ;
  const result = document.getElementById("divResult");
  result.textContent = `The division of ${nishant} ÷ ${shrestha} is ${div.toFixed(2)}.`;
}
