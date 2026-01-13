const keypad = document.querySelector(".keypad");

keypad.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;

  const value = e.target.textContent;
  console.log(value);
});
