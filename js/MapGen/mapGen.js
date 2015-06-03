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
var style = ['#ffffff','#000000','#ff0000','#00ff00','#0000ff','#f0f0f0','#0ff0ff']
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
    if(grid[xx][yy] == undefined)grid[xx][yy] = {x:xx,y:yy,style:0};
  }
}
var borderPointsFromLastRect = [];
var drawDebug = [];//for drawing special pionts afte the main draw

///////////////////////////////////////////////////
//generate map:
///////////////////////////////////////////////////
var firstbounds = makeRandomRectOutlineInBounds({xmin:0,ymin:0,xmax:c_width,ymax:c_height},20,20,40,40,0);
makeRandomRectOutlineInBounds(firstbounds,10,10,27,27,2);
makeRandomRectOutlineInBounds(firstbounds,5,5,12,12,3);
makeRandomRectOutlineInBounds(firstbounds,5,5,12,12,4);


firstbounds = makeRandomRectOutlineInBounds({xmin:0,ymin:0,xmax:c_width,ymax:c_height},20,20,40,40,0);
makeRandomRectOutlineInBounds(firstbounds,10,10,27,27,2);
makeRandomRectOutlineInBounds(firstbounds,5,5,12,12,3);
makeRandomRectOutlineInBounds(firstbounds,5,5,12,12,4);
/*
makeRandomRectOutlineInBounds({xmin:0,ymin:0,xmax:c_width,ymax:c_height},0);
makeRandomRectOutlineInBounds(boundsOfLastRect,2);
makeRandomRectOutlineInBounds(boundsOfLastRect,3);*/
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////


//draw grid based on data in array:
for(var xx = 0; xx < c_width; xx++){
  for(var yy = 0; yy < c_height; yy++){
    //console.log(grid[xx][yy].x + ' ' + grid[xx][yy].y + ' ' + grid[xx][yy].style);
    drawSquare(grid[xx][yy].x,grid[xx][yy].y,grid[xx][yy].style);
  }
}
for(var d = 0; d < drawDebug.length; d++){
    
    console.log(drawDebug[d].x + ' ' + drawDebug[d].y);
    drawSquare(drawDebug[d].x,drawDebug[d].y,drawDebug[d].s);
}

//UTILITY:
function intInRange(min,max)
{
    //console.log('min: ' + min + ', max:' + max);
    return Math.floor(Math.random()*(max-min)+min);
}

function change(x,y,color){
    if(grid[x] && grid[x][y]){
        grid[x][y].style = color;
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
    
    startCorner.y = starty;
    startCorner.x = startx;
    /*Keep it in bounds
    if(down){
        startCorner.y = starty;
    }else{
        startCorner.y = starty-height+1;
    }
    if(right){
        startCorner.x = startx;
    }else{
        startCorner.x = startx-width+1;
    }*/
    //Number can't be negative
    if(startCorner.x < 0)startCorner.x = 0;
    if(startCorner.y < 0)startCorner.y = 0;
    if(startCorner.x + width >= c_width)startCorner.x = startCorner.x + width - c_width;
    if(startCorner.y + height >= c_height)startCorner.y = startCorner.y + height - c_height;
    
    return startCorner;
  
}
//returns the bounds of the created rectangle
function makeRandomRectOutlineInBounds(bounds,width_min,height_min,width_max,height_max,colorIndex){
    //Chooses random values
    var width = intInRange(width_min,width_max);
    var height = intInRange(height_min,height_max);
    
    var x = intInRange(bounds.xmin,bounds.xmax);
    var y = intInRange(bounds.ymin,bounds.ymax);
    //will choose true or false
    var right = intInRange(0,1);
    var down = intInRange(0,1);
    
    return makeRectOutline(x,y,width,height,right,down,colorIndex);
}
function makeRectOutline(startx,starty,width,height,right,down,colorIndex){
    //drawDebug.push({x:startx,y:starty,s:3});
  
    var startCorner = getStartCorner(startx,starty,width,height,right,down);
    drawDebug.push({x:startCorner.x,y:startCorner.y,s:2});
    makeRectFillWithStartCorner(startCorner,width,height,1);
    makeRectFillWithStartCorner({x:startCorner.x+1,y:startCorner.y+1},width-2,height-2,colorIndex);
    
    bounds = {xmin:0,ymin:0,xmax:0,ymax:0};
    bounds.xmin = startCorner.x;
    bounds.ymin = startCorner.y;
    bounds.xmax = startCorner.x+width-1;
    bounds.ymax = startCorner.y+height-1;
    return bounds;
  
}
function makeRectFillWithStartCorner(startCorner,width,height,colorIndex){
    for(var xx = 0; xx < width; xx++){
        if(startCorner.x + xx > c_width-1)break;//oob
        
        for(var yy = 0; yy < height; yy++){    
            if(startCorner.y + yy > c_height-1)break;//oob
            change(startCorner.x + xx, startCorner.y + yy,colorIndex);
            
            if(xx == 0 || xx == width-1 || yy == 0 || yy == height-1){
                //border point:
                console.log('x ' + (startCorner.x + xx));
                console.log('y ' + (startCorner.y + yy));
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
