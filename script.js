const grid = document.getElementById('grid');
const slider = document.getElementById('slider');
const classicBtn = document.getElementById('classic-btn');
const rainbowBtn = document.getElementById('rainbow-btn');
const customBtn = document.getElementById('custom-btn');
const customColor = document.getElementById('custom-color')
const resetBtn = document.getElementById('reset-btn');

// Set up default grid
let mode = 'classic';
let gridSize = 50;
createGrid();
slider.addEventListener('input', createGrid);

classicBtn.onclick = function () {mode = 'classic'}
rainbowBtn.onclick = function () {mode = 'rainbow'};
customBtn.onclick = function () {mode = 'custom'};
resetBtn.onclick = function () {createGrid();};

function createGrid() {
    clearGrid();
    setGridSize();
    setGridDimensions(gridSize);
    fillGrid(gridSize);
}

function clearGrid() {
    while (grid.hasChildNodes()) {
        grid.removeChild(grid.firstChild);
    }
}

function setGridSize() {gridSize = slider.value;}

function setGridDimensions(gridSize) {
    grid.style.cssText = `grid-template-columns: repeat(${gridSize}, 1fr);
                          grid-template-rows: repeat(${gridSize}, 1fr);`;
}

function fillGrid (gridSize) {
    for (i = 0; i < (gridSize * gridSize); i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
        cell.addEventListener('mouseenter', function(event){
            if (mode == 'classic') {
                event.target.style.opacity = getComputedStyle(event.target).opacity - .3
            }
            else if (mode == 'rainbow') {
                event.target.style.backgroundColor = getRandomColor()
                event.target.style.opacity = 1
            }
            else if (mode == 'custom') {
                event.target.style.backgroundColor = `${customColor.value}`
                event.target.style.opacity = 1
            }
        })
    }
}

function getRandomColor () {
    let randomNum = Math.random() * 6;
         if (randomNum <= 1) {return '#d12229'}
    else if (randomNum <= 2) {return '#f68a1e'}
    else if (randomNum <= 3) {return '#fde01a'}
    else if (randomNum <= 4) {return '#007940'}
    else if (randomNum <= 5) {return '#24408e'}
    else if (randomNum <= 6) {return '#732982'}
}

