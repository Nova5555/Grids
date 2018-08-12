// function that builds a grid in the "container"
function createGrid(x) {
    for (var rows = 0; rows < x; rows++) {
        for (var columns = 0; columns < x; columns++) {
            //$("#container").append("<div class='grid' id='" + rows.toString().concat("," + columns.toString()) + "'>T<button class='btn' id='" + rows.toString().concat(columns.toString()) + "'>" + rows.toString() + "-" + columns.toString() + "</button></div>");
            $("#container").append("<div class='grid' id='" + rows.toString().concat("," + columns.toString()) + "'> </div>");
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
    return (gridCord == "5,8") ? true : false;
}
// create a 16x16 grid when the page loads
// allows the click of a button to prompt the user to create a new grid
$(document).ready(function() {
    createGrid(16);

    $(".clearGrid").click(function(){
        clearGrid();
    });

    $('.grid').click(function(){
        var isMatch = matchGridCord($(this).attr('id'))
        $(this).css('background-color', 'red');
        if (isMatch)
        {
            //this.text = "Found!";
            //$(this).text("Found!"); 
            //$(this).innerHTML = "Found!"; 
            //$(this).html($(this).html().replace(' ','Found!'));
            document.getElementById($(this).attr('id')).innerHTML = "Found!";
        }
        else
        {
            //this.text = "Not Found!";
            //$(this).text("Nope!"); 
            //$(this).innerHTML = "Not Found!"; 
            //$(this).html($(this).html().replace(' ','Not Found!'));
            document.getElementById($(this).attr('id')).innerHTML = "Not Found!";
        }
   })

   $(".newGrid").click(function() {
        refreshGrid();
    });
});

