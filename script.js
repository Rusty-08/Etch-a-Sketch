// set default values
const DEFAULT_BOARD_SIZE = 32;
let defaultBoardSize = DEFAULT_BOARD_SIZE;

const rangeInput = document.getElementById('range');
const colorPickerIcons = document.querySelectorAll(".material-symbols-outlined");
const colorPickers = document.querySelectorAll("input[type='color']");
const bgColorPicker = document.querySelector(".bg-color-picker");
const penColorPicker = document.querySelector(".pen-color-picker");
const pen = document.querySelector(".pen");
const rainbow = document.getElementById('rainbow');
const erasure = document.querySelector(".eraser");
const clear = document.querySelector(".clear");
const board = document.getElementById('board');
const boardBody = document.querySelector('.board-body');
const date = document.getElementById('date');

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

clear.onclick = () => reloadBoard()

penColorPicker.onclick = () => {
    pen.classList.add('active')
    erasure.classList.remove('active')
    rainbow.classList.remove('active')
    changeColor()
}

erasure.onclick = () => {
    enableErasure()
    changeColor();
}

rainbow.onclick = () => {
    enableRainbow();
    changeColor();
}

const enableRainbow = () => {
    pen.classList.remove('active')
    erasure.classList.remove('active')
    rainbow.classList.toggle('active')
}

const enableErasure = () => {
    pen.classList.remove('active')
    rainbow.classList.remove('active')
    erasure.classList.toggle('active')
}

const rainborColor = () => {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

// display range input in settings
const clearBoard = () => {
    boardBody.innerHTML = '';
}

const reloadBoard = () => {
    inputGridSize();
    clearBoard();
    createGridElement();
    pen.classList.add('active');
    erasure.classList.remove('active');
    rainbow.classList.remove('active')
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

    if (pen.classList.contains('active')) {
        e.target.style.backgroundColor = penColorPicker.value
    } else if (erasure.classList.contains('active')) {
        e.target.style.backgroundColor = 'transparent'
    } else {
        e.target.style.backgroundColor = rainborColor();
    }
}

// color icons when clicked
colorPickerIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => {
        colorPickers[index].click();
        colorPickers[index].style.border = '1px solid transparent !important';
    });
});

// color picker and color display
colorPickers.forEach((colorPicker, index) => {
    colorPicker.addEventListener("input", () => {
        const selectedColor = colorPicker.value;

        // icon color design
        colorPickerIcons[index].style.color = selectedColor;
        colorPickerIcons[index].style.border = `1px solid transparent !important`;

        // board color design
        bgColorPicker.addEventListener('input', () => {
            board.style.backgroundColor = selectedColor;
        });
    });
});

// setup default grid templates and create grid elements
const setupDefault = () => {
    pen.classList.add('active');
    document.getElementById('size').textContent = `${defaultBoardSize} x ${defaultBoardSize}`;

    boardBody.style.gridTemplateRows = `repeat(${defaultBoardSize}, 1fr`;
    boardBody.style.gridTemplateColumns = `repeat(${defaultBoardSize}, 1fr`;

    createGridElement();
}

const currDate = new Date();
date.textContent = currDate.getFullYear()

// onload display
window.onload = () => {
    setupDefault();
}