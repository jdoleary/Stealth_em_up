/*
This is a stand alone module,
if you use it in conjunction with mapGen.html it will
draw out the maps
*/
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var cell_size = 10;
//c_width/height is the number of cells in the grid:
var c_height = canvas.height/cell_size;
var c_width = canvas.width/cell_size;
//            white     black     red       green     blue
//                                          DOOR
var style = ['#ffffff','#000000','#ff0000','#00ff00','#0000ff','#ff00ff','#0ff0ff']
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

var grid = [];
//init grid
for(var xx = 0; xx < c_width; xx++){
  for(var yy = 0; yy < c_height; yy++){
    if(grid[xx] == undefined)grid[xx] = [];
    if(grid[xx][yy] == undefined)grid[xx][yy] = {x:xx,y:yy,style:0,nearDoor:false,type:'none'};
  }
}
var borderPointsFromLastRect = [];
var drawDebug = [];//for drawing special points after the main draw

///////////////////////////////////////////////////
//generate map:
///////////////////////////////////////////////////
var firstbounds = makeRandomRectOutlineInBounds({xmin:0,ymin:0,xmax:c_width,ymax:c_height},20,20,40,40,0,0);
makeRandomRectOutlineInBounds(firstbounds,10,10,27,27,2,3);
makeRandomRectOutlineInBounds(firstbounds,5,5,12,12,2,3);
makeRandomRectOutlineInBounds(firstbounds,5,5,12,12,2,3);
//hall:makeRandomRectOutlineInBounds(firstbounds,3,15,3,20,4,3);


firstbounds = makeRandomRectOutlineInBounds({xmin:0,ymin:0,xmax:c_width,ymax:c_height},20,20,40,40,0,0);
makeRandomRectOutlineInBounds(firstbounds,10,10,27,27,2,3);
makeRandomRectOutlineInBounds(firstbounds,5,5,12,12,2,3);
makeRandomRectOutlineInBounds(firstbounds,5,5,12,12,2,3);

draw();

setTimeout(function(){

    ///////////////////////////////////////////////////
    //Place doors:
    ///////////////////////////////////////////////////
    //get list of walls (style==1)
    var wallPieces = [];

    for(var xx = 0; xx < c_width; xx++){
        for(var yy = 0; yy < c_height; yy++){
            if(grid[xx][yy].type == 'wall'){
                wallPieces.push(grid[xx][yy]);
                grid[xx][yy].nearDoor = true;//wall pieces do not need this property
            }
        }
    }
    console.log('walls: ' + wallPieces.length);
    for(var w = 0; w < wallPieces.length; w++){
        var wall = wallPieces[w];
        wall.nearDoor = true;
        try{
            //if top or bottom neighs don't touch a door
            if((!grid[wall.x][wall.y+1].nearDoor || !grid[wall.x][wall.y-1].nearDoor) && (grid[wall.x][wall.y+1].style != 1 && grid[wall.x][wall.y-1].style != 1)){
                grid[wall.x][wall.y].style = 3;
                grid[wall.x][wall.y].type = 'door'
                magicWandFill(wall.x,wall.y+1,markAsAccessToDoor);
                magicWandFill(wall.x,wall.y-1,markAsAccessToDoor);
            }
        }catch(err){}//Catch undefined errors
        try{
            //if left or right neighs don't touch a door
            if((!grid[wall.x+1][wall.y].nearDoor || !grid[wall.x-1][wall.y].nearDoor) && (grid[wall.x+1][wall.y].style != 1 && grid[wall.x-1][wall.y].style != 1)){
                grid[wall.x][wall.y].style = 3;
                grid[wall.x][wall.y].type = 'door'
                magicWandFill(wall.x+1,wall.y,markAsAccessToDoor);
                magicWandFill(wall.x-1,wall.y,markAsAccessToDoor);
            }
        }catch(err){}//Catch undefined errors
    }

    //marks that this cell has access to a door in the room:
    function markAsAccessToDoor(indexX,indexY){
        //console.log('mark access ' + indexX + ' ' + indexY);
        if(grid[indexX][indexY].style == 1)return;//do not change walls
        grid[indexX][indexY].style = 4;
        grid[indexX][indexY].nearDoor = true;
    }
    draw();
},1000);
/*
makeRandomRectOutlineInBounds({xmin:0,ymin:0,xmax:c_width,ymax:c_height},0);
makeRandomRectOutlineInBounds(boundsOfLastRect,2);
makeRandomRectOutlineInBounds(boundsOfLastRect,3);*/
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
function draw(){
    console.log('draw');
    //draw grid based on data in array:
    for(var xx = 0; xx < c_width; xx++){
      for(var yy = 0; yy < c_height; yy++){
        //console.log(grid[xx][yy].x + ' ' + grid[xx][yy].y + ' ' + grid[xx][yy].style);
        drawSquare(grid[xx][yy].x,grid[xx][yy].y,grid[xx][yy].style);
      }
    }
    for(var d = 0; d < drawDebug.length; d++){
        
        //console.log(drawDebug[d].x + ' ' + drawDebug[d].y);
        drawSquare(drawDebug[d].x,drawDebug[d].y,drawDebug[d].s);
    }
}

//UTILITY:
function intInRange(min,max)
{
    //console.log('min: ' + min + ', max:' + max);
    return Math.floor(Math.random()*(max-min)+min);
}

function change(x,y,color,cellType){
    if(grid[x] && grid[x][y]){
        grid[x][y].style = color;
        grid[x][y].type = cellType;
        return true;
    }else{
        //out of bounds:
        return false;
    }
}
function getStartCorner(startx,starty,width,height,right,down){
  //right down is the direction from startx, starty

    //the start corner is always the upper left hand corner
    //because the array iterates down right
    var startCorner = {x:0,y:0};
    //change the direction of the rectangle from the start point:
    if(down){
        startCorner.y = starty;
    }else{
        startCorner.y = starty-height+1;
    }
    if(right){
        startCorner.x = startx;
    }else{
        startCorner.x = startx-width+1;
    }
    //Keep it in bounds
    if(startCorner.x < 0)startCorner.x = 0;
    if(startCorner.y < 0)startCorner.y = 0;
    if(startCorner.x + width >= c_width)startCorner.x -= startCorner.x + width - c_width;
    if(startCorner.y + height >= c_height)startCorner.y -= startCorner.y + height - c_height;
    
    return startCorner;
  
}
//returns the bounds of the created rectangle
function makeRandomRectOutlineInBounds(bounds,width_min,height_min,width_max,height_max,colorIndex,chanceOfBeingNearAnEdge){
    //Chooses random values
    var width = intInRange(width_min,width_max);
    var height = intInRange(height_min,height_max);
    
    var x = intInRange(bounds.xmin,bounds.xmax);
    var y = intInRange(bounds.ymin,bounds.ymax);
    
    //will choose true or false
    var right = intInRange(0,2);
    var down = intInRange(0,2);
    
    //higher chance of being near an edge, not in the middle:
    if(intInRange(0,chanceOfBeingNearAnEdge) > 0){
        console.log('near an edge');
        var which = intInRange(0,4);
        switch(which){
            case 0:
                x = intInRange(bounds.xmax-2,bounds.xmax);
                right = true;
                break;
            case 1:
                x = intInRange(bounds.xmin,bounds.xmin+2);
                right = false;
                break;
            case 2:
                y = intInRange(bounds.ymax-2,bounds.ymax);
                down = true;
                break;
            case 3:
                y = intInRange(bounds.ymin,bounds.ymin+2);
                down = false;
                break;
        }
    }
    
    return makeRectOutline(x,y,width,height,right,down,colorIndex);
}
function makeRectOutline(startx,starty,width,height,right,down,colorIndex){
    //drawDebug.push({x:startx,y:starty,s:3});
  
    var startCorner = getStartCorner(startx,starty,width,height,right,down);
    //drawDebug.push({x:startCorner.x,y:startCorner.y,s:2});
    makeRectFillWithStartCorner(startCorner,width,height,1,'wall');
    makeRectFillWithStartCorner({x:startCorner.x+1,y:startCorner.y+1},width-2,height-2,colorIndex,'floor');
    
    bounds = {xmin:0,ymin:0,xmax:0,ymax:0};
    bounds.xmin = startCorner.x;
    bounds.ymin = startCorner.y;
    bounds.xmax = startCorner.x+width-1;
    bounds.ymax = startCorner.y+height-1;
    return bounds;
  
}
function makeRectFillWithStartCorner(startCorner,width,height,colorIndex,cellType){
    for(var xx = 0; xx < width; xx++){
        if(startCorner.x + xx > c_width-1)break;//oob
        
        for(var yy = 0; yy < height; yy++){    
            if(startCorner.y + yy > c_height-1)break;//oob
            change(startCorner.x + xx, startCorner.y + yy,colorIndex,cellType);
            
            if(xx == 0 || xx == width-1 || yy == 0 || yy == height-1){
                //border point:
                //console.log('x ' + (startCorner.x + xx));
                //console.log('y ' + (startCorner.y + yy));
                borderPointsFromLastRect.push(grid[startCorner.x + xx][startCorner.y + yy]);
            }
        }
    }
  
}
function makeRectFill(startx,starty,width,height,right,down,colorIndex){
    var startCorner = getStartCorner(startx,starty,width,height,right,down);
    makeRectFillWithStartCorner(startCorner,width,height,colorIndex);
    
}
/*
Usage examples:


makeRectOutline(10,10,7,6,true,true,0);
makeRectOutline(10,10,7,6,false,true,0);
makeRectOutline(10,10,7,6,true,false,0);
makeRectOutline(10,10,7,6,false,false,0);

drawSquare(10,10,3);
*/
