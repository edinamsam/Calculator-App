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

  if (value === ".") {
    handleDecimal();
    return;
  }

  if (isOperator(value)) {
    handleOperator(value);
    return;
  }

  if (value === "DEL") {
    handleDelete();
    return;
  }

  if (value === "RESET") {
    handleReset();
    return;
  }

  if (value === "=") {
    handleEquals();
  }
});

document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) {
    handleNumber(e.key);
    return;
  }

  if (e.key === ".") {
    handleDecimal();
    return;
  }

  if (["+", "-", "*", "/"].includes(e.key)) {
    const mappedOperator = e.key === "*" ? "x" : e.key;
    handleOperator(mappedOperator);
    return;
  }

  if (e.key === "Enter" || e.key === "=") {
    handleEquals();
    return;
  }

  if (e.key === "Backspace") {
    handleDelete();
    return;
  }

  if (e.key === "Escape") {
    handleReset();
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

function handleOperator(op) {
  firstOperand = displayValue;
  operator = op;
  shouldResetDisplay = true;
}

function handleDelete() {
  if (shouldResetDisplay) return;

  if (displayValue.length === 1) {
    displayValue = "0";
  } else {
    displayValue = displayValue.slice(0, -1);
  }

  updateDisplay();
}

function handleReset() {
  displayValue = "0";
  firstOperand = null;
  operator = null;
  shouldResetDisplay = false;

  updateDisplay();
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

function handleDecimal() {
  if (shouldResetDisplay) {
    displayValue = "0.";
    shouldResetDisplay = false;
    updateDisplay();
    return;
  }

  if (displayValue.includes(".")) return;

  displayValue += ".";
  updateDisplay();
}

const themeButtons = document.querySelectorAll(".theme-numbers span");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setTheme(btn.dataset.theme);
  });
});

const savedTheme = localStorage.getItem("theme") || "1";
setTheme(savedTheme);
