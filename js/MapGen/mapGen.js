/*
This is a stand alone module,
if you use it in conjunction with mapGen.html it will
draw out the maps
*/
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var cell_size = 10;
var c_height = canvas.height/cell_size;
var c_width = canvas.width/cell_size;
var style = ['#ffffff','#000000','#ff0000','#00ff00','#0000ff']
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
//change grid:
//makeRectFill(10,10,7,6,true,true,1);
//makeRectFill(11,11,5,4,true,true,0);
makeRectOutline(10,10,7,6,true,true,0);
makeRectOutline(10,10,7,6,false,true,0);
makeRectOutline(10,10,7,6,true,false,0);
makeRectOutline(10,10,7,6,false,false,0);

//draw grid
for(var xx = 0; xx < c_width; xx++){
  for(var yy = 0; yy < c_height; yy++){
    console.log(grid[xx][yy].x + ' ' + grid[xx][yy].y + ' ' + grid[xx][yy].style);
    drawSquare(grid[xx][yy].x,grid[xx][yy].y,grid[xx][yy].style);
  }
}
//test:
drawSquare(10,10,3);

//UTILITY:
function change(x,y,color){
    grid[x][y].style = color;
}
/*
function makeRectBorder(startx,starty,width,height,right,down,colorIndex){
  makeRectFill(startx,starty,width,height,right,down,colorIndex);
  makeRectFill(startx,starty,width,height,right,down,0)
}*/
function getStartCorner(startx,starty,width,height,right,down){
  //right down is the direction from startx, starty

    //the start corner is always the upper left hand corner
    //because the array iterates down right
    var startCorner = {x:0,y:0};
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
  return startCorner;
  
}
function makeRectOutline(startx,starty,width,height,right,down,colorIndex){
  
    var startCorner = getStartCorner(startx,starty,width,height,right,down);
    makeRectFillWithStartCorner(startCorner,width,height,1);
    makeRectFillWithStartCorner({x:startCorner.x+1,y:startCorner.y+1},width-2,height-2,colorIndex);
  
}
function makeRectFillWithStartCorner(startCorner,width,height,colorIndex){
    for(var xx = 0; xx < width; xx++){
        for(var yy = 0; yy < height; yy++){
            change(startCorner.x + xx, startCorner.y + yy,colorIndex);
        }
    }
  
}
function makeRectFill(startx,starty,width,height,right,down,colorIndex){
    var startCorner = getStartCorner(startx,starty,width,height,right,down);
    makeRectFillWithStartCorner(startCorner,width,height,colorIndex);
    
}
