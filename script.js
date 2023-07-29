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

// Resize text based on viewport
resizeText()
window.addEventListener('resize', resizeText);

// Prevent screen dragging while touching grid
grid.addEventListener('touchstart', function(e) {e.preventDefault()}, { passive: false });
grid.addEventListener('touchmove', function(e) {e.preventDefault()}, { passive: false });

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

slider.addEventListener('input', createGrid);

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
    // Fill grid based on slider value
    for (i = 0; i < (gridSize * gridSize); i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
        // Mouse: Give cells mouseover behavior based on current setting
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
        // Touchscreen: Give cells touchmove behavior based on current setting
        cell.addEventListener('touchmove', function(e){
            let xPos = e.touches[0].pageX;
            let yPos = e.touches[0].pageY;
            let touchPixel = document.elementFromPoint(xPos, yPos);
            if (grid.contains(touchPixel) && touchPixel !== grid){
                     if (mode == 'classic') {
                    touchPixel.style.opacity = getComputedStyle(touchPixel).opacity - .3
                }
                else if (mode == 'rainbow') {
                    touchPixel.style.backgroundColor = getRandomColor();
                    touchPixel.style.opacity = 1
                }
                else if (mode == 'custom') {
                    touchPixel.style.backgroundColor = `${customColor.value}`;
                    touchPixel.style.opacity = 1
                }
            else if (grid.contains(touchPixel) = 'false') {
                touchPixel.addEventListener('touchmove', function(e) {e.preventDefault()}, { passive: false });
            }
        }})
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

// Resize text dynamically as the window resizes
function resizeText () {
    // When window aspect ratio is taller than main wrapper
    // Font sizes are relative to viewport width
    if (main.offsetHeight < window.innerHeight) {
        title.style.fontSize = '8vw';
        signature.style.fontSize = '4vw';
        ghLogo.style.height = '4vw';
        customColor.style.height = '3vw';
        customColor.style.width = '3vw';
        text.forEach(word => {
            word.style.fontSize = '3vw'});
        slider.max = '50';
        slider.value= '25';
    }
    // Otherwise font sizes are relative to viewport height
    else {
        title.style.fontSize = '6vh';
        signature.style.fontSize = '3vh';
        ghLogo.style.height = '3vh';
        customColor.style.height = '2vh';
        customColor.style.width = '2vh';
        text.forEach(word => {
            word.style.fontSize = '2vh';})
        slider.max = '100';
        slider.value = '50';
    }
};