var _XCord;
var _YCord;
var _gameBoardLocations = [];
var _win;
var _CPUPlayer;
var _CurrentLevel = 1;
var _GameSpeed = 1000;
var _GridSize = 5;
var _CPUStarted = false;

function SetSecretGrid()
{
    _XCord = Math.floor(Math.random() * (_GridSize));
    _YCord = Math.floor(Math.random() * (_GridSize));
}

function SetLevelVisual()
{
    document.getElementById("level").innerHTML = "Level " + _CurrentLevel + " GS:" + _GameSpeed;
}

function TakeTurn()
{
    if (!_CPUStarted){
    _CPUPlayer = setInterval(compsTurn,_GameSpeed);
    _CPUStarted = true;
    }
}

function compsTurn()
{
    XCord = Math.floor(Math.random() * (_GridSize));
    YCord = Math.floor(Math.random() * (_GridSize));
    var cords = XCord.toString().concat("," + YCord.toString())
    var isGridUsed = checkGridState(cords);
    if (isGridUsed > -1){
        checkGameBoard(cords,"CPU");
    }
}

var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

function NextLevel()
{
    _GameSpeed -= 50;
    _CurrentLevel++;
    SetLevelVisual();
    clearGrid();
    createGrid(_GridSize);
    AddGridClickEvent();
    SetSecretGrid();
}

function checkWinCondition()
{
    if (_win == "Player"){
        clearInterval(_CPUPlayer);
        $("#container").append("<div class='win'>You win!!</div>");
        _CPUStarted = false;
        setTimeout(function () {NextLevel()},2000);
    }
    else if (_win == "CPU") 
    {
        clearInterval(_CPUPlayer);
        $("#container").append("<div class='win'>You lose!!</div>");
        _CPUStarted = false;
        setTimeout(function () {RestartGame()},2000);
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

function checkGameBoard(id,who)
{
    TakeTurn();
    var isMatch = matchGridCord(id)
    if (isMatch)
    {
        document.getElementById(id).style.backgroundColor = 'green';
        document.getElementById(id).innerHTML = "WIN!";
        _win = who;
        checkWinCondition();
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

function clearGrid(){
    $(".grid").remove();
    $(".win").remove();
};  

function refreshGrid(){
    var z = prompt("How many boxes per side?");
    clearGrid();
    createGrid(z);
};

function AddGridClickEvent()
{
    $('.grid').click(function(){
        checkGameBoard($(this).attr('id'),"Player");
   });
}

function SetupGrid()
{
    clearGrid();
    createGrid(_GridSize);
    SetSecretGrid();
    AddGridClickEvent();
}

function RestartGame()
{
    _GameSpeed = 1000;
    _GridSize = 5;
    _CurrentLevel = 1;
    SetLevelVisual();
    SetupGrid();
}

function matchGridCord(gridCord){
    return (gridCord == _XCord + "," + _YCord) ? true : false;
}

$(document).ready(function() {
    SetupGrid();
});

