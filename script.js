
const gridContainer = document.getElementById("grid-container");
const btnReset = document.getElementById("btn-reset");
const gridItems = gridContainer.getElementsByTagName('div');
const inputGridSize = document.getElementById("input-grid-size");

generateGrid(16,16);

btnReset.addEventListener("click", function(e) {
    resetGrid("colors");
});

inputGridSize.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        sizes = e.target.value.split("x");
        if (sizes[0] > 0 && sizes[0] < 500 && sizes[1] > 0 && sizes[1] < 500) {
            resetGrid("complete");
            generateGrid(sizes[0],sizes[1]);
            //e.target.value = "";
            e.target.placeholder = "16x16 (Enter Grid-Size)" 
        }
        else {
            e.target.value = "";
            e.target.placeholder = "Unknown format. e.g. 16x16"
            
        }
    }
})






function generateGrid(rows, columns){
    let divcounter = 0;
    gridContainer.style.gridTemplateRows = `repeat${rows}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat${columns}, 1fr)`;
    for (let i = 1; i <= rows; i++) {  //ROWs
        for (let j = 1; j <= columns; j++) {  //COLUMNS
           newDiv = document.createElement("div");
           newDiv.style.gridRow = i
           newDiv.style.gridColumn = j
           newDiv.addEventListener('mouseover', testFunction);
           gridContainer.appendChild(newDiv);
           divcounter++;
        }
    }
    console.log(divcounter)
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

function testFunction(e) {
    e.target.style.backgroundColor = "lightblue";
}

