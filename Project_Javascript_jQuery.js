var _XCord;
var _YCord;
var _gameBoardLocations = [];


function SetSecretGrid()
{
    _XCord = Math.floor(Math.random() * (15 - (-1) + 1));
    _YCord = Math.floor(Math.random() * (15 - (-1) + 1));
}

function TakeTurn()
{
    setInterval(compsTurn,1000);
}

function compsTurn()
{
    XCord = Math.floor(Math.random() * (15 - (-1) + 1));
    YCord = Math.floor(Math.random() * (15 - (-1) + 1));
    var cords = XCord.toString().concat("," + YCord.toString())
    var isGridUsed = checkGridState(cords);
    if (isGridUsed > -1){
        checkGameBoard(cords);
    }
}

function updateGameBoard(id)
{
    _gameBoardLocations.splice(_gameBoardLocations.indexOf(id),1);
}

function checkGridState(gridCords)
{
    return _gameBoardLocations.indexOf(gridCords);
}

function checkGameBoard(id)
{
    var isMatch = matchGridCord(id)
    if (isMatch)
    {
        document.getElementById(id).style.backgroundColor = 'green';
        document.getElementById(id).innerHTML = "WIN!";
    }
    else
    {
        document.getElementById(id).style.backgroundColor = 'red';
        document.getElementById(id).innerHTML = "MISS!";
        updateGameBoard(id);
    }
}

function createGrid(x) {
    for (var rows = 0; rows < x; rows++) {
        for (var columns = 0; columns < x; columns++) {
            $("#container").append("<div class='grid' id='" + rows.toString().concat("," + columns.toString()) + "'> </div>");
            _gameBoardLocations.push(rows.toString().concat("," + columns.toString())); //TODO consolidate
        };
    };
    $(".grid").width(960/x);
    $(".grid").height(960/x);
};

// function that clears the grid
function clearGrid(){
    $(".grid").remove();
};  

// function that prompts the user to select the number of boxes in a new grid
// the function then also creates that new grid
function refreshGrid(){
    var z = prompt("How many boxes per side?");
    clearGrid();
    createGrid(z);
};

function matchGridCord(gridCord){
    return (gridCord == _XCord + "," + _YCord) ? true : false;
}
// create a 16x16 grid when the page loads
// allows the click of a button to prompt the user to create a new grid
$(document).ready(function() {
    createGrid(16);
    SetSecretGrid();
    $(".clearGrid").click(function(){
        clearGrid();
    });

    $('.grid').click(function(){
        checkGameBoard($(this).attr('id'));
   });

   $(".newGrid").click(function() {
        refreshGrid();
    });

    TakeTurn();
});

