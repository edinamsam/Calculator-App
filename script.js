const keypad = document.querySelector(".keypad");
const display = document.querySelector(".display-text");

let displayValue = "0";

function updateDisplay() {
  display.textContent = displayValue;
}

keypad.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;

  const value = e.target.textContent;

  if (!isNaN(value)) {
    handleNumber(value);
  }
});

function handleNumber(number) {
  if (displayValue === "0") {
    displayValue = number;
  } else {
    displayValue += number;
  }

  updateDisplay();
}
