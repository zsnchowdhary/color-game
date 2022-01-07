/************************************************************************************
                             Helper functions
************************************************************************************/

const changeColors = (color) => {
  for (let i = 0; i < colors.length; i++) {
    squares[i].style.backgroundColor = color;
  }
};

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const generateRandomColors = (num) => {
  const output = [];
  for (let i = 0; i < num; i++) {
    output.push(generateRandomColor());
  }
  return output;
};

const pickColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const reset = () => {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorCode.textContent = pickedColor;
  title.style.backgroundColor = "steelblue";
  gameStatus.textContent = "";
  resetBtn.textContent = "Reset";
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.backgroundColor = "black";
    }
  }
};

/************************************************************************************
                             Init variables
************************************************************************************/

//State
let numSquares = 6;
let colors = generateRandomColors(numSquares);
let pickedColor = pickColor();

// Select elements
const squares = document.querySelectorAll(".square");
const colorCode = document.querySelector("#color-code");
const gameStatus = document.querySelector("#game-status");
const title = document.querySelector("h1");
const resetBtn = document.querySelector("#reset");
const modeBtns = document.querySelectorAll(".mode");

// Update colorCode display
colorCode.textContent = pickedColor;

// Reset button
resetBtn.addEventListener("click", reset);

// Mode buttons
modeBtns.forEach((button) => {
  button.addEventListener("click", function () {
    modeBtns[0].classList.remove("selected");
    modeBtns[1].classList.remove("selected");
    modeBtns[2].classList.remove("selected");
    this.classList.add("selected");
    if (this.textContent === "Easy") {
      numSquares = 3;
    } else if (this.textContent === "Medium") {
      numSquares = 6;
    } else {
      numSquares = 9;
    }
    reset();
  });
});

// Set up squares
for (let i = 0; i < squares.length; i++) {
  squares[i].style.backgroundColor = colors[i];
  squares[i].addEventListener("click", function () {
    if (this.style.backgroundColor === pickedColor) {
      gameStatus.textContent = "You win!";
      changeColors(pickedColor);
      title.style.backgroundColor = pickedColor;
      resetBtn.textContent = "Play again?";
    } else {
      this.style.backgroundColor = "black";
      gameStatus.textContent = "Try again!";
    }
  });
}
