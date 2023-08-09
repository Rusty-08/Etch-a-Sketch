// set default values
let defaultBoardSize = 32;

const rangeInput = document.getElementById('range');
const colorPickerIcons = document.querySelectorAll(".material-symbols-outlined");
const colorPickers = document.querySelectorAll("input[type='color']");
const bgColorPicker = document.querySelector(".bg-color-picker");
const penColorPicker = document.querySelector(".pen-color-picker");
const erasure = document.querySelector(".eraser");
const clear = document.querySelector(".clear");
const board = document.getElementById('board');
const boardBody = document.querySelector('.board-body');

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

clear.onclick = () => reloadBoard()
erasure.onclick = () => changeColor()
penColorPicker.onclick = () => changeColor()

// display range input in settings
const clearBoard = () => {
    boardBody.innerHTML = '';
}

const reloadBoard = () => {
    inputGridSize();
    clearBoard();
    createGridElement();
}

// input number of grid items
const inputGridSize = () => {
    document.getElementById('size').textContent = `${rangeInput.value} x ${rangeInput.value}`;
    boardBody.style.gridTemplateRows = `repeat(${rangeInput.value}, 1fr`;
    boardBody.style.gridTemplateColumns = `repeat(${rangeInput.value}, 1fr`;
}

// create elements to board
const createGridElement = () => {
    for (let i = 0; i < Number(rangeInput.value) * Number(rangeInput.value); i++) {
        const gridItems = document.createElement('div');
        gridItems.className = 'grid-items'

        gridItems.addEventListener('mouseover', changeColor)
        gridItems.addEventListener('mousedown', changeColor)
        boardBody.appendChild(gridItems);
    }
}

// create default grid board
document.addEventListener('DOMContentLoaded', () => {
    rangeInput.addEventListener('input', () => {

        inputGridSize();
        clearBoard();

        createGridElement();
    });
});

// change the color of pen
function changeColor(e) {
    e.preventDefault()
    if (e.type === 'mouseover' && !mouseDown) return
    e.target.style.backgroundColor = penColorPicker.value
}

// color icons when clicked
colorPickerIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => {
        colorPickers[index].click();
        colorPickers[index].style.border = 'transparent !important';
    });
});

// color picker and color display
colorPickers.forEach((colorPicker, index) => {
    colorPicker.addEventListener("input", () => {
        const selectedColor = colorPicker.value;

        // icon color design
        colorPickerIcons[index].style.color = selectedColor;
        colorPickerIcons[index].style.border = `solid 1px rgba(0, 0, 0, 0.1)`;

        // board color design
        bgColorPicker.addEventListener('input', () => {
            board.style.backgroundColor = selectedColor;
        });
    });
});

// setup default grid templates and create grid elements
const setupDefault = () => {
    document.getElementById('size').textContent = `${defaultBoardSize} x ${defaultBoardSize}`;

    boardBody.style.gridTemplateRows = `repeat(${defaultBoardSize}, 1fr`;
    boardBody.style.gridTemplateColumns = `repeat(${defaultBoardSize}, 1fr`;

    createGridElement();
}

// onload display
window.onload = () => {
    setupDefault();
}