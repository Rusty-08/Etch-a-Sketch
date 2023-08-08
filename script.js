const rangeInput = document.getElementById('range');
const colorPickerIcons = document.querySelectorAll(".material-symbols-outlined");
const colorPickers = document.querySelectorAll("input[type='color']");
const bgColorPicker = document.querySelector(".bg-color-picker");
const board = document.getElementById('board');
const boardBody = document.querySelector('.board-body');

// display range input in settings

document.addEventListener('DOMContentLoaded', () => {
    rangeInput.addEventListener('input', () => {
        document.getElementById('size').textContent = `${rangeInput.value} x ${rangeInput.value}`;

        // setup grid in board
        boardBody.style.gridTemplateRows = `repeat(${rangeInput.value}, 1fr`;
        boardBody.style.gridTemplateColumns = `repeat(${rangeInput.value}, 1fr`;

        boardBody.innerHTML = '';

        for (let i = 0; i < Number(rangeInput.value) * Number(rangeInput.value); i++) {
            const gridItems = document.createElement('div');
            boardBody.appendChild(gridItems);
            gridItems.style.backgroundColor = 'black';
            gridItems.style.border = '1px white solid';
        }
    });
});




// color picker when clicked
colorPickerIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => {
        colorPickers[index].click();
        colorPickers[index].style.border = 'transparent !important';
    });
});

// color picker color display
colorPickers.forEach((colorPicker, index) => {
    colorPicker.addEventListener("input", () => {
        const selectedColor = colorPicker.value;
        colorPickerIcons[index].style.color = selectedColor;
        colorPickerIcons[index].style.backgroundColor = `rgba(89, 152, 219, 0.2)`;
        colorPickerIcons[index].style.border = `solid 1px rgba(0, 0, 0, 0.1)`;

        bgColorPicker.addEventListener('input', () => {
            board.style.backgroundColor = selectedColor;
        })
    });
});