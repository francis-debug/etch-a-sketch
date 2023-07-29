// Prepare DOM elements
const main = document.querySelector('.main');
const title = document.querySelector('.title');
const grid = document.querySelector('.grid');
const classicBtn = document.querySelector('.classic-btn');
const rainbowBtn = document.querySelector('.rainbow-btn');
const customBtn = document.querySelector('.custom-btn');
const customColor = document.querySelector('.custom-color');
const resetBtn = document.querySelector('.reset-btn');
const slider = document.querySelector('.slider');
const text = document.querySelectorAll('.text');
const signature = document.querySelector('.signature');
const ghLogo = document.querySelector('.gh-logo');

// Set up default grid
let mode = 'classic';
let gridSize = 50;
createGrid();
slider.addEventListener('input', createGrid);

// Create button functionality and styling
classicBtn.onclick = function () {
    mode = 'classic';
    classicBtn.style.backgroundColor = '#3d0000'
    rainbowBtn.style.backgroundColor = '#690000'
    customBtn.style.backgroundColor = '#690000'
};

rainbowBtn.onclick = function () {
    mode = 'rainbow';
    classicBtn.style.backgroundColor = '#690000'
    rainbowBtn.style.backgroundColor = '#3d0000'
    customBtn.style.backgroundColor = '#690000'
};

customBtn.onclick = function () {
    mode = 'custom';
    classicBtn.style.backgroundColor = '#690000'
    rainbowBtn.style.backgroundColor = '#690000'
    customBtn.style.backgroundColor = '#3d0000'
};

resetBtn.onclick = function () {createGrid();};

// This is the main function to create a grid
function createGrid() {
    clearGrid();
    setGridSize();
    setGridDimensions(gridSize);
    fillGrid(gridSize);
}

// These are its sub-functions:

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
                event.target.style.backgroundColor = getRandomColor();
                event.target.style.opacity = 1
            }
            else if (mode == 'custom') {
                event.target.style.backgroundColor = `${customColor.value}`;
                event.target.style.opacity = 1
            }
        })
        cell.addEventListener(' ', function(event){
            if (mode == 'classic') {
                event.target.style.opacity = getComputedStyle(event.target).opacity - .3
            }
            else if (mode == 'rainbow') {
                event.target.style.backgroundColor = getRandomColor();
                event.target.style.opacity = 1
            }
            else if (mode == 'custom') {
                event.target.style.backgroundColor = `${customColor.value}`;
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

// Prevent mobile devices from scrolling on grid
function stopTouchScrolling(grid){
document.body.addEventListener("touchstart", function (e) {
    if (e.target == grid) {
        e.preventDefault();
    }
}, { passive: false });
document.body.addEventListener("touchend", function (e) {
    if (e.target == grid) {
        e.preventDefault();
    }
}, { passive: false });
document.body.addEventListener("touchmove", function (e) {
    if (e.target == grid) {
        e.preventDefault();
    }
}, { passive: false });

}

// Resize text dynamically as the window resizes

resizeText()
window.addEventListener('resize', resizeText);

function resizeText () {
    // When window aspect ratio is taller than main wrapper
    // Font sizes are relative to viewport width
    if (main.offsetHeight < window.innerHeight) {
        title.style.fontSize = '10vw';
        signature.style.fontSize = '4vw';
        ghLogo.style.height = '4vw';
        customColor.style.height = '3vw';
        customColor.style.width = '3vw';
        text.forEach(word => {
            word.style.fontSize = '3vw';
        });
    }
    // Otherwise font sizes are relative to viewport height
    else {
        title.style.fontSize = '7vh';
        signature.style.fontSize = '3vh';
        ghLogo.style.height = '3vh';
        customColor.style.height = '2vh';
        customColor.style.width = '2vh';
        text.forEach(word => {
            word.style.fontSize = '2vh';
        });
    }
};