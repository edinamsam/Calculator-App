const keypad = document.querySelector(".keypad");
const display = document.querySelector(".display-text");

let displayValue = "0";
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = displayValue;
}

function isOperator(value) {
  return ["+", "-", "x", "/"].includes(value);
}

function calculate(a, operator, b) {
  const first = Number(a);
  const second = Number(b);

  switch (operator) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "x":
      return first * second;
    case "/":
      return second === 0 ? "Error" : first / second;
    default:
      return second;
  }
}

keypad.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;

  const value = e.target.textContent;

  if (!isNaN(value)) {
    handleNumber(value);
    return;
  }

  if (isOperator(value)) {
    handleOperator(value);
    return;
  }

  if (value === "=") {
    handleEquals();
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

function handleOperator(op) {
  firstOperand = displayValue;
  operator = op;
  shouldResetDisplay = true;
}

function handleEquals() {
  if (!operator || firstOperand === null) return;

  const result = calculate(firstOperand, operator, displayValue);

  displayValue = String(result);
  updateDisplay();

  firstOperand = displayValue;
  operator = null;
  shouldResetDisplay = true;
}
