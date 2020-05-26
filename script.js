
const gridContainer = document.getElementById("grid-container");
const btnReset = document.getElementById("btn-reset");
const gridItems = gridContainer.getElementsByTagName('div');
const inputGridSize = document.getElementById("input-grid-size");
const btnGridSize = document.getElementById("btn-grid-size");
const tools = document.querySelectorAll('#side-bar *');

//Initial Values
generateGrid(16,16);
let mode = currentColor = "hsl(040, 100%, 067%)";

tools.forEach((tool) => {
    tool.addEventListener('click', (e) => {
        mode = e.target.getAttribute("data-tool");
        console.log(mode)
    });
});

btnReset.addEventListener("click", function(e) {
    resetGrid("colors");
});

btnGridSize.addEventListener("click", handleSizeInput);

inputGridSize.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        handleSizeInput();
    }
})

let mouseDown = false
document.addEventListener('mousedown', () => {
    mouseDown = true
})

document.addEventListener('mouseup', () => {
    mouseDown = false
})

function handleSizeInput(e) {
    sizes = inputGridSize.value.split("x");
    if (sizes[0] > 0 && sizes[0] < 129 && sizes[1] > 0 && sizes[1] < 129) {
        resetGrid("complete");
        generateGrid(sizes[0],sizes[1]);
        inputGridSize.placeholder = "16x16 (Enter Grid-Size)";
    }
    else {
        inputGridSize.value = "";
        inputGridSize.placeholder = "Format: 16x16 max 128x128";
            
    }

}

function generateGrid(rows, columns){
    gridContainer.style.gridTemplateRows = `repeat${rows}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat${columns}, 1fr)`;
    for (let i = 1; i <= rows; i++) {  //ROWs
        for (let j = 1; j <= columns; j++) {  //COLUMNS
           newDiv = document.createElement("div");
           newDiv.style.gridRow = i
           newDiv.style.gridColumn = j
           newDiv.style.backgroundColor = "hsl(040, 100%, 100%)";
           newDiv.setAttribute("color", "hsl(040, 100%, 100%)");
           newDiv.addEventListener('mouseover', draw);
           gridContainer.appendChild(newDiv);
        }
    }
}

function resetGrid(operation) {

    Array.from(gridItems).forEach((el) => {
        if (operation == "colors") {
            el.style.backgroundColor = "";
        }
        else if (operation == "complete") {
            el.remove();
        }
    });
} 

function draw(e) {
    if (mouseDown == false) return;
    if (mode == "rainbow") {
        currentColor = getRandomColor();
    }
    else if (mode == "lighten") {
        colorBefore = Array.from(e.target.getAttribute("color"));
        newColorValue = +(colorBefore[15] + colorBefore[16] + colorBefore[17]) + 10;
        newColor = Array.from(String(newColorValue));
        console.log(newColor)
        if (newColorValue > 100) {
            colorBefore[15] = 1;
            colorBefore[16] = 0; 
            colorBefore[17] = 0;
        } 
        else if (newColor.length == 2) { 
            colorBefore[16] = newColor[0];
            colorBefore[17] = newColor[1];
        }
        else if (newColor.length == 3) {
            colorBefore[15] = newColor[0];
            colorBefore[16] = newColor[1];
            colorBefore[17] = newColor[2];
        }
        currentColor = colorBefore.join("");
    }
    else if (mode == "darken") {
        colorBefore = Array.from(e.target.getAttribute("color"));
        newColorValue = +(colorBefore[15] + colorBefore[16] + colorBefore[17]) - 10;
        console.log(newColorValue)
        newColor = Array.from(String(newColorValue));
        console.log(colorBefore)
        console.log(newColor)

        if (newColorValue <= 0 || newColor.length == 1) {
            colorBefore[15] = 0;
            colorBefore[16] = 0; 
            colorBefore[17] = 0;

        } 
        else if (newColor.length == 2) {
            colorBefore[15] = 0;
            colorBefore[16] = newColor[0];
            colorBefore[17] = newColor[1];
        }
        else if (newColor.length == 3) {
            colorBefore[15] = newColor[0];
            colorBefore[16] = newColor[1];
            colorBefore[17] = newColor[2];
        }
        currentColor = colorBefore.join("");
    }
    else {
        currentColor = mode;
    }
    e.target.style.backgroundColor = currentColor;
    e.target.setAttribute("color", currentColor);
}

function getRandomColor() {
    //It wont work with a value below 100 because of the array syntax i use in func lighten and darken
    let h = randomVal(100,360);
    let s = randomVal(30, 95);
    let l = randomVal(30, 80);
    returnvalue = `hsl(${h}, 0${s}%, 0${l}%)`
    console.log(returnvalue);
    return returnvalue;
}
function randomVal(min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min;
  }