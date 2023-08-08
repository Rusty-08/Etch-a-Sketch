const rangeInput = document.getElementById('range');

// display range input in settings
rangeInput.addEventListener('input', () => {
    document.getElementById('size').textContent = `${rangeInput.value} x ${rangeInput.value}`
});

// color picker
const colorPickerIcons = document.querySelectorAll(".material-symbols-outlined");
const colorPickers = document.querySelectorAll("input[type='color']");
const bgColorPicker = document.querySelector(".bg-color-picker");
const board = document.getElementById('board');

colorPickerIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => {
        colorPickers[index].click();
        colorPickers[index].style.border = 'transparent !important';
    });
});

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

