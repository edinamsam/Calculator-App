const keypad = document.querySelector(".keypad");
const display = document.querySelector(".display-text");

let displayValue = "0";

function updateDisplay() {
  display.textContent = displayValue;
}

let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

keypad.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;

  const value = e.target.textContent;

  if (!isNaN(value)) {
    handleNumber(value);
  }

  if (isOperator(value)) {
    handleOperator(value);
    return;
  }
});

function handleNumber(number) {
  if (displayValue === "0" || shouldResetDisplay) {
    displayValue = number;
    shouldResetDisplay = false;
  } else {
    displayValue += number;
  }

  updateDisplay();
}

function isOperator(value) {
  return ["+", "-", "x", "/"].includes(value);
}

function handleOperator(op) {
  operand = displayValue;
  operator = op;
  shouldResetDisplay = true;
}
