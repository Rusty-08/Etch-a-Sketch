// display range input in settings

const rangeInput = document.getElementById('range');

rangeInput.addEventListener('input', () => document.getElementById('size').textContent = `${rangeInput.value} x ${rangeInput.value}`)