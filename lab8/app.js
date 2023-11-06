function evaluateInput() {
  let input = document.getElementById("calc-input");
  input.value = eval(input.value);
}

function clearInput() {
  let input = document.getElementById("calc-input");
  input.value = "";
}

function inputButtonClicked(callerElement) {
  let thingToAdd = callerElement.innerText;

  switch (thingToAdd) {
    case "C":
      clearInput();
      break;
    case "=":
      evaluateInput();
      break;
    default:
      if (isInputValid(thingToAdd)) {
        let input = document.getElementById("calc-input");
        input.value = input.value + thingToAdd;
      } else {
        // TODO: show better kind of alert to the user, perhaps like a snackbar.
        alert("Something went wrong, the value you entered is not valid 😅");
      }
      break;
  }
}

function isInputValid(inputValue) {
  let validInputs = [
    "7",
    "8",
    "9",
    "+", //
    "4",
    "5",
    "6",
    "-", //
    "1",
    "2",
    "3",
    "*", //
    "C",
    "0",
    "=",
    "/", //
  ];

  return validInputs.includes(inputValue);
}
