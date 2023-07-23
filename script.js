const grid = document.getElementById('grid');
const slider = document.getElementById('slider');
const pixel = document.querySelector(".cell");
const resetBtn = document.getElementById("reset-btn");

let gridSize = 50;
createGrid();
slider.addEventListener("input", createGrid);
resetBtn.onclick = function () {createGrid();}

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

function setGridSize() {
    gridSize = slider.value;
}

function setGridDimensions(gridSize) {
    grid.style.cssText = `grid-template-columns: repeat(${gridSize}, 1fr);
                          grid-template-rows: repeat(${gridSize}, 1fr);`;
}

function fillGrid (gridSize) {
    for (i = 0; i < (gridSize * gridSize); i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
        cell.addEventListener('mouseover', function(event){
            event.target.style.backgroundColor = 'black';
        })
    }
}