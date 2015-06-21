/*
This is a stand alone module,
if you use it in conjunction with mapGen.html it will
draw out the maps
*/



//Mouse info
var index = 0;
var mouse = {
  x: 0,
  y: 0
};
$('canvas').mousemove(function(event) {
  mouse.x = event.offsetX;
  mouse.y = event.offsetY;
  p();

})
$('canvas').mousedown(function(event) {
    switch (event.which) {
        case 1:
            $('.mouse').show();
            //alert('Left Mouse button pressed.');
            break;
        case 2:
            $('.mouse').hide();
            //alert('Middle Mouse button pressed.');
            break;
        case 3:
            //alert('Right Mouse button pressed.');
            break;
        default:
            //alert('You have a strange Mouse!');
    }

})
//Use arrow keys to step along the map gen process
$(document).keydown(function(e) {
  var key = e.which || e.keyCode;
  switch (key) {
    case 37:
      changeIndex(-1);
      clearInterval(player);
      break;
    case 38:
        //up arrow:
        //stop playback
        clearInterval(player);
        break;
    case 39:
      changeIndex(1);
      clearInterval(player);
      break;
    case 40:
    //down arrow
      play();
      break;
  }
 
  p();

});

var player = null;

function play() {
  clearInterval(player);
  player = setInterval(function() {
    changeIndex(1);
    p();
  }, 300);

}

var record = [];
function changeIndex(i) {
  index += i;
  if (index < 0) index = record.length - 1;
  if (index >= record.length) index = 0;
  draw(index);
}

function p() {
    var x_index = Math.ceil(mouse.x / cell_size)-1;
    var y_index = Math.ceil(mouse.y / cell_size)-1;
    var cellData = 'none';
    try{
        cellData = JSON.stringify(record[index][x_index][y_index], null, '<br>');
    }catch(e){}
  $('.mouse').html(x_index + ", " + y_index + "<br>Cell data: " + cellData + "<br>timeline index: " + index);
  $('.mouse').css({
    top: Math.round(mouse.y / cell_size) * cell_size,
    left: Math.round(mouse.x / cell_size) * cell_size + cell_size * 2
  });

}



var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var cell_size = 10;
//c_width/height is the number of cells in the grid:
var c_height = canvas.height/cell_size;
var c_width = canvas.width/cell_size;
//            white     black     red       green     blue
//                                          DOOR
var style = ['#ffffff','#000000','#ff0000','#00ff00','#0000ff','#ff00ff','#0ff0ff','#99C794']
function drawSquare(x,y,colorIndex){
    if(x > c_width-1 || x < 0){
    console.log('x out of bounds');
    return;
    }
    if(y > c_height-1 || y < 0){
    console.log('y out of bounds');
    return;
    }

    ctx.fillStyle=style[colorIndex];
    ctx.fillRect(x*cell_size, y*cell_size, cell_size, cell_size);
}
function drawImg(x,y,imgID,rad){
    if(x > c_width-1 || x < 0){
    console.log('x out of bounds');
    return;
    }
    if(y > c_height-1 || y < 0){
    console.log('y out of bounds');
    return;
    }
  	
    var img = new Image();
    img.onload = function () {
        // save the context's co-ordinate system before 
        // we screw with it
        ctx.save(); 
           
        ctx.translate(x*cell_size, y*cell_size); 
        
        // now move across and down half the 
        // width and height of the image (which is 128 x 128)
        ctx.translate(cell_size/2, cell_size/2); 
         
        // rotate around this point
        ctx.rotate(rad); 
         
        // then draw the image back and up
        ctx.drawImage(img, -cell_size/2, -cell_size/2, cell_size, cell_size); 
//        ctx.drawImage(img, x*cell_size, y*cell_size, cell_size, cell_size);
         
        // and restore the co-ordinate system to its default
        // top left origin with no rotation
        ctx.restore();
    }
    switch(imgID){
        case 'single':
            img.src = "../../images/wall_black_single.png";
        break;
        case 'edge':
            img.src = "../../images/wall_black_edge.png";
        break;
        case 'long':
            img.src = "../../images/wall_black_long.png";
        break;
        case 'corner':
            img.src = "../../images/wall_black_corner.png";
        break;
        case 'T':
            img.src = "../../images/wall_black_T.png";
        break;
        case 'four':
            img.src = "../../images/wall_black_four.png";
        break;
        case 'door_horiz':
            img.src = "../../images/door_closed.png";
        break;
        case 'door_virt':
            img.src = "../../images/door_closed.png";
        break;
    }
}

var grid = [];
var wallPieces = [];
//init grid
for(var xx = 0; xx < c_width; xx++){
  for(var yy = 0; yy < c_height; yy++){
    if(grid[xx] == undefined)grid[xx] = [];
    if(grid[xx][yy] == undefined)grid[xx][yy] = {x:xx,y:yy,style:0,nearDoor:false,numberOfNearDoors:0,type:'floor',depth:null};
  }
}
var borderPointsFromLastRect = [];
var drawDebug = [];//for drawing special points after the main draw

///////////////////////////////////////////////////
//generate map:
///////////////////////////////////////////////////
$('.info').append($('<div/>').text('Placing large rooms'));
setTimeout(function(){
    //Map Border:
    makeRectOutline(0,0,c_width,c_height,true,true,5,true);
    var numOfBuildings = randomIntFromInterval(2,3);
    var totalNumberOfSubrooms = 0;
    for(var i = 0; i < numOfBuildings; i++){
        //building 1
        var bounds = makeRandomRectOutlineInBounds({xmin:0,ymin:0,xmax:c_width,ymax:c_height},20,20,40,40,0,0);
        var numofSubRooms = randomIntFromInterval(2,6);
        totalNumberOfSubrooms += numofSubRooms;
        $('.info').append($('<div/>').text('--' + numofSubRooms + ' subrooms in building ' + (i+1)));
        for(var j = 0; j < numofSubRooms; j++){
            var isBigBuilding = randomIntFromInterval(0,1);
            if(isBigBuilding){
                makeRandomRectOutlineInBounds(bounds,10,10,27,27,2,3);
            }else{
                makeRandomRectOutlineInBounds(bounds,5,5,12,12,2,3);
            }
        }
        if(i == numOfBuildings-1 && totalNumberOfSubrooms <= 8){
            $('.info').append($('<div/>').text('--Not enough rooms, add another building'));
            i--;
        }
    }



    ///////////////////////////////////////////////////
    //Place doors:
    ///////////////////////////////////////////////////
    //get list of walls (style==1)
    wallPieces = [];

    for(var xx = 0; xx < c_width; xx++){
        for(var yy = 0; yy < c_height; yy++){
            if(grid[xx][yy].type == 'wall'){
                wallPieces.push(grid[xx][yy]);
                grid[xx][yy].nearDoor = true;//wall pieces do not need this property
                console.log(grid[xx][yy]);
            }
        }
    }
    console.log('walls: ' + wallPieces.length);
    addGridToRecord();

    //shuffle wallPieces for random access when choosing door locations:
    shuffle(wallPieces);

    $('.info').append($('<div/>').text('adding doors'));
    setTimeout(addDoors,100);
},100);

//used for determining room depth later:
var otherSidesOfDoors = [];

//add doors to grid:
function addDoors(){
    for(var w = 0; w < wallPieces.length; w++){
        console.log('w: ' + w);
        var wall = wallPieces[w];
        wall.nearDoor = true;
        wall.blocks_vision = true;
        wall.solid = true;
        try{
            //if top or bottom neighs don't touch a door
            if((!isNearThisManyDoorsOrMore(wall.x,wall.y+1,2) || !isNearThisManyDoorsOrMore(wall.x,wall.y-1,2)) && (grid[wall.x][wall.y+1].type == 'floor' && grid[wall.x][wall.y-1].type == 'floor')){
                //don't place a door on this wall cell if there is already a door touching this line of walls.
                if(!isDoorInLineOfWalls(wall.x,wall.y,false)){
                    //make a door
                    grid[wall.x][wall.y].style = 3;
                    grid[wall.x][wall.y].type = 'door'
                    grid[wall.x][wall.y].door = true;
                    grid[wall.x][wall.y].imageInfo = 'door_horiz';
                    grid[wall.x][wall.y].rotate_sprite = Math.PI/2;
                    console.log('make door vert at ' + wall.x + "," + wall.y);
                    magicWandFill(wall.x,wall.y+1,markAsAccessToDoor,isFloor);
                    magicWandFill(wall.x,wall.y-1,markAsAccessToDoor,isFloor);
                    
                    //used later for room depth
                    otherSidesOfDoors.push(grid[wall.x][wall.y+1]);
                    otherSidesOfDoors.push(grid[wall.x][wall.y-1]);
                }
            }
        }catch(err){
            console.error(err);
        }//Catch undefined errors
        try{
            //if left or right neighs don't touch a door
            if((!isNearThisManyDoorsOrMore(wall.x+1,wall.y,2) || !isNearThisManyDoorsOrMore(wall.x-1,wall.y,2)) && (grid[wall.x+1][wall.y].type == 'floor' && grid[wall.x-1][wall.y].type == 'floor')){
                //don't place a door on this wall cell if there is already a door touching this line of walls.
                if(!isDoorInLineOfWalls(wall.x,wall.y,true)){
                    grid[wall.x][wall.y].style = 3;
                    grid[wall.x][wall.y].type = 'door';
                    grid[wall.x][wall.y].door = true;
                    grid[wall.x][wall.y].imageInfo = 'door_virt';
                    
                    console.log('make door horiz at ' + wall.x + "," + wall.y);
                    magicWandFill(wall.x+1,wall.y,markAsAccessToDoor,isFloor);
                    magicWandFill(wall.x-1,wall.y,markAsAccessToDoor,isFloor);
                    
                    //used later for room depth
                    otherSidesOfDoors.push(grid[wall.x+1][wall.y]);
                    otherSidesOfDoors.push(grid[wall.x-1][wall.y]);
                }
            }
        }catch(err){
            console.error(err);
        }//Catch undefined errors
        
    }
    $('.info').append($('<div/>').text('setting wall types'));
    setTimeout(setWallTypes,100);
}
function setWallTypes(){
    //set wall type for image drawing
    for(var w = 0; w < wallPieces.length; w++){
        var wall = wallPieces[w];
        //if they don't already have image info set
        if(!grid[wall.x][wall.y].imageInfo){
            grid[wall.x][wall.y].imageInfo = findWallType.call(grid[wall.x][wall.y],wall.x,wall.y);
        }
    }
    $('.info').append($('<div/>').text('Determining Room Depth'));
    setTimeout(chooseSpawnPoint,100);
}
var spawnPoint;
function chooseSpawnPoint(){
    //choose spawn point:
    var possibleSpawnPoints = gridQuery({outside:true,type:'floor'});
    spawnPoint = possibleSpawnPoints[Math.floor(Math.random()*possibleSpawnPoints.length)];
    spawnPoint.style = 7;
    $('.info').append($('<div/>').text('Spawn Point Chosen'));
    setTimeout(determineDepth,100);
    
}
function determineDepth(){
    var astar_grid = getGridForAstar();
    var astar_graph = new Graph(astar_grid);
    
    //check the depth of the rooms on either side of every door:
    for(var i = 0; i < otherSidesOfDoors.length; i++){
        var path = astar.search(astar_graph.nodes,astar_graph.nodes[spawnPoint.x][spawnPoint.y],astar_graph.nodes[otherSidesOfDoors[i].x][otherSidesOfDoors[i].y]);
        var doorCount = 0;
        for(var p = 0; p< path.length; p++){
            if(grid[path[p].x][path[p].y].door)doorCount++;
        }
        console.log('door count: ' + doorCount);
        magicWandFill(otherSidesOfDoors[i].x,otherSidesOfDoors[i].y,setCellDepth(doorCount),isFloor);
    }
    $('.info').append($('<div/>').text('Done'));
    setTimeout(addDoorsForNonPathableRooms,100);
}

//add doors to grid for rooms that cannot be pathed to:
function addDoorsForNonPathableRooms(){
    for(var w = 0; w < wallPieces.length; w++){
        console.log('w: ' + w);
        var wall = wallPieces[w];
        wall.nearDoor = true;
        wall.blocks_vision = true;
        wall.solid = true;
        try{
            //if top or bottom neighs don't touch a door
            if((notPathable(wall.x,wall.y+1,2) || notPathable(wall.x,wall.y-1,2)) && (grid[wall.x][wall.y+1].type == 'floor' && grid[wall.x][wall.y-1].type == 'floor')){
                //don't place a door on this wall cell if there is already a door touching this line of walls.
                if(!isDoorInLineOfWalls(wall.x,wall.y,false)){
                    //make a door
                    grid[wall.x][wall.y].style = 3;
                    grid[wall.x][wall.y].type = 'door'
                    grid[wall.x][wall.y].door = true;
                    grid[wall.x][wall.y].imageInfo = 'door_horiz';
                    grid[wall.x][wall.y].rotate_sprite = Math.PI/2;
                    console.log('make door vert at ' + wall.x + "," + wall.y);
                    magicWandFill(wall.x,wall.y+1,markAsAccessToDoor,isFloor);
                    magicWandFill(wall.x,wall.y-1,markAsAccessToDoor,isFloor);
                    
                    //used later for room depth
                    otherSidesOfDoors.push(grid[wall.x][wall.y+1]);
                    otherSidesOfDoors.push(grid[wall.x][wall.y-1]);
                }
            }
        }catch(err){
            console.error(err);
        }//Catch undefined errors
        try{
            //if left or right neighs don't touch a door
            if((notPathable(wall.x+1,wall.y,2) || notPathable(wall.x-1,wall.y,2)) && (grid[wall.x+1][wall.y].type == 'floor' && grid[wall.x-1][wall.y].type == 'floor')){
                //don't place a door on this wall cell if there is already a door touching this line of walls.
                if(!isDoorInLineOfWalls(wall.x,wall.y,true)){
                    grid[wall.x][wall.y].style = 3;
                    grid[wall.x][wall.y].type = 'door';
                    grid[wall.x][wall.y].door = true;
                    grid[wall.x][wall.y].imageInfo = 'door_virt';
                    
                    console.log('make door horiz at ' + wall.x + "," + wall.y);
                    magicWandFill(wall.x+1,wall.y,markAsAccessToDoor,isFloor);
                    magicWandFill(wall.x-1,wall.y,markAsAccessToDoor,isFloor);
                    
                    //used later for room depth
                    otherSidesOfDoors.push(grid[wall.x+1][wall.y]);
                    otherSidesOfDoors.push(grid[wall.x-1][wall.y]);
                }
            }
        }catch(err){
            console.error(err);
        }//Catch undefined errors
        
    }
    $('.info').append($('<div/>').text('setting wall types'));
    setTimeout(finish,100);
}
function finish(){
    
    //last add to record
    addGridToRecord();
    //SHOW THE LAST RECORD GRID:
    changeIndex(record.length - 1);
}
//true if cell is near more or equal to numOfDoors.
function isNearThisManyDoorsOrMore(x,y,numOfDoors){
    return grid[x][y].numberOfNearDoors >= numOfDoors;
}

function notPathable(x,y){
    if(grid[x][y].outside = false && grid[x][y].depth == 0){
        return true;
    }else{
        return false;
    }
}

//set the number of doors between this cell and hero spawn:
function setCellDepth(doorCount){
    return function(indexX,indexY){
        //the shortest depth is the one that counts:
        if(doorCount < grid[indexX][indexY].depth || !grid[indexX][indexY].depth){
            grid[indexX][indexY].depth = doorCount;
            //test: TODO:
            grid[indexX][indexY].style = doorCount;
        }
    };
}
//marks that this cell has access to a door in the room:
function markAsAccessToDoor(indexX,indexY){
    //console.log('mark access ' + indexX + ' ' + indexY);
    if(grid[indexX][indexY].type == 'wall')return;//do not change walls
    grid[indexX][indexY].nearDoor = true;
    grid[indexX][indexY].numberOfNearDoors++;
}
function isFloor(indexX,indexY){
    return grid[indexX][indexY].type == 'floor';
}
function isNotNearDoor(indexX,indexY){
    return !grid[indexX][indexY].nearDoor;
}


///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
function addGridToRecord(){
    record.push(jQuery.extend(true, {}, grid));
    console.log('%c Add Record! ', 'background: #222; color: #bada55');
}
function draw(recordIndex){
    //draw record[recordIndex] based on data in array:
    for(var xx = 0; xx < c_width; xx++){
      for(var yy = 0; yy < c_height; yy++){
        var cell = record[recordIndex][xx][yy];
        //console.log(record[recordIndex][xx][yy].x + ' ' + record[recordIndex][xx][yy].y + ' ' + record[recordIndex][xx][yy].style);
        if(cell.imageInfo){
            drawImg(cell.x,cell.y,cell.imageInfo,cell.rotate_sprite);
        }else{
            drawSquare(cell.x,cell.y,cell.style);
        }
      }
    }
    for(var d = 0; d < drawDebug.length; d++){
        
        //console.log(drawDebug[d].x + ' ' + drawDebug[d].y);
        drawSquare(drawDebug[d].x,drawDebug[d].y,drawDebug[d].s);
    }
}

