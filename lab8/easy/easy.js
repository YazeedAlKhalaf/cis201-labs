function addNumbers() {
  let { x, y } = getTwoNumbers();
  setResult(x + y);
}

function subtractNumbers() {
  let { x, y } = getTwoNumbers();
  setResult(x - y);
}

function multiplyNumbers() {
  let { x, y } = getTwoNumbers();
  setResult(x * y);
}

function divideNumbers() {
  let { x, y } = getTwoNumbers();
  setResult(x / y);
}

function getTwoNumbers() {
  let x = prompt("1️⃣ Enter the 1st number");
  let y = prompt("2️⃣ Enter the 2nd number");

  return { x: parseFloat(x), y: parseFloat(y) };
}

function setResult(newValue) {
  document.getElementById("result").innerHTML = newValue;
}
