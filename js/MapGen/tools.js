var neighbors_left = [];
var checked = {};
function magicWandFill(Ax,Ay,callback,changeIfTrue){
    neighbors_left = [];
    checked = {};
    var stop = 0;
    //console.log('Fill: ' + Ax + ',' + Ay);
    ////console.log(grid.getCellFromIndex(Ax,Ay));
    //getAllOfSameTypeTouchingA
    var cell = grid[Ax][Ay];
    var type = cell.style;
    ////console.log('Overwrite cells in proximity with type: ' + cell.image_number);
    //console.time('magicwand');
    neighbors(Ax,Ay,type);
    while(neighbors_left.length>0){
        //console.log('neighbors_left: ' + neighbors_left.length);
        if(neighbors_left.length > 100)debugger;
        var n = neighbors_left.shift();
        neighbors(n.x,n.y,type);
    }
    //console.timeEnd('magicwand');

    var magicSelector = 9;
    function change(indexX,indexY){
        ////console.log('try change: ' + indexX + ',' + indexY);
        var cell = grid[indexX][indexY];
        if(cell !== null){
            //console.log('change: ' + indexX + ',' + indexY);
            //console.count('change');
            //cell.style = (newStyle);
            callback(indexX,indexY);
        }
        
            
        
    }
    function neighbors(x,y,type) {
        //console.log('type: ' + type);
        stop++;
        if(stop>1000000){
            console.error('ERROR, neighbors timeout');
            return;
        }
        var ret = [];
        ////console.log('--------------------------------neighbors:');
        change(x,y);
        var west = null;
        var east = null;
        var south = null;
        var north = null;
        if(grid[x])west = grid[x][y-1];
        if(grid[x])east = grid[x][y+1];
        if(grid[x-1])south = grid[x-1][y];
        if(grid[x+1])north = grid[x+1][y];
        // West
        if(west != null) {
            //console.log(west);
            ////console.log({x:x,y:y-1,data:grid[y-1][x]});
            if(west.style === type && changeIfTrue(west.x,west.y)){
                //console.log('add to ret');
                ret.push({x:x,y:y-1,data:west});
            }
        }

        // East
        if(east != null) {
            //console.log(east);
            ////console.log({x:x,y:y+1,data:grid[y+1][x]});
            if(east.style === type && changeIfTrue(east.x,east.y)){
                //console.log('add to ret');
                ret.push({x:x,y:y+1,data:east});
            }
        }

        // South
        if(south != null) {
            //console.log(south);
            ////console.log({x:x-1,y:y,data:grid[x-1][y]});
            if(south.style === type && changeIfTrue(south.x,south.y)){
                //console.log('add to ret');
                ret.push({x:x-1,y:y,data:south});
            }
        }

        // North
        if(north != null) {
            //console.log(north);
            ////console.log({x:x+1,y:y,data:grid[y][x+1]});
            if(north.style === type && changeIfTrue(north.x,north.y)){
                //console.log('add to ret');
                ret.push({x:x+1,y:y,data:north});
            }
        }
        ////console.log(ret);
        for(var i = 0; i < ret.length; i++){
            //if cell not already checked
            if(!checked[ret[i].x + ',' + ret[i].y]){
                neighbors_left.push(ret[i]);
                checked[ret[i].x + ',' + ret[i].y] = true;
            }
            //neighbors(ret[i].x,ret[i].y,type);
        }

        return ret;
    };

    
}
function findWallType(x,y){
    //corner,long,T,single,edge,four
    var count_of_walls = 0;
    try{
        var north = grid[x][y-1];
    }catch(e){
        var north = null;
    }
    try{
        var south = grid[x][y+1];
    }catch(e){
        var south = null;
    }
    try{
        var east = grid[x+1][y];
    }catch(e){
        var east = null;
    }
    try{
        var west = grid[x-1][y];
    }catch(e){
        var west = null;
    }
    var northWall = north && north.solid && !north.door && north.blocks_vision;
    var southWall = south && south.solid && !south.door && south.blocks_vision;
    var eastWall = east && east.solid && !east.door && east.blocks_vision;
    var westWall = west && west.solid && !west.door && west.blocks_vision;
    if(northWall)count_of_walls++;
    if(southWall)count_of_walls++;
    if(eastWall)count_of_walls++;
    if(westWall)count_of_walls++;
    switch(count_of_walls){
        case 0:
            return "single";
            break;
        case 1:
            if(westWall)this.rotate_sprite = Math.PI;
            if(southWall)this.rotate_sprite = Math.PI/2;
            if(northWall)this.rotate_sprite = -Math.PI/2;
            return "edge";
            break;
        case 2:
            if((northWall && southWall)){
                this.rotate_sprite = Math.PI/2;
                return "long";
            }
            if((eastWall && westWall)){
                return "long"; 
            }
            else{
                if(northWall && westWall)this.rotate_sprite = Math.PI/2;
                if(northWall && eastWall)this.rotate_sprite = -Math.PI/2;
                if(northWall && westWall)this.rotate_sprite = Math.PI;
                if(southWall && westWall)this.rotate_sprite = Math.PI/2;
                return "corner";
            }
            break;
        case 3:
            if(northWall && southWall && eastWall)this.rotate_sprite = -Math.PI/2;
            if(northWall && southWall && westWall)this.rotate_sprite = Math.PI/2;
            if(northWall && eastWall && westWall)this.rotate_sprite = Math.PI;
            return "T";
            break;
        case 4:
            return "four";
            break;
    }
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
//Returns straight line of touching cells of same type, stops if it meets a cell not the same type.
function returnAllOfSameTypeInLine(x,y,vert){
    var ret = [];
    var type = grid[x][y].type;
    if(vert){
        for(var i = 0; i < c_height; i++){
            if(y-i<0)break;//out of bounds
            var cell = grid[x][y-i];
            if(cell.type == type)ret.push(cell);
            else break;
        }
        for(var i = 1; i < c_height; i++){
            if(y+i > c_height-1)break;//out of bounds
            var cell = grid[x][y+i];
            if(cell.type == type)ret.push(cell);
            else break;
        }
    }else{
        for(var i = 0; i < c_width; i++){
            if(x-i < 0)break;//out of bounds
            var cell = grid[x-i][y];
            if(cell.type == type)ret.push(cell);
            else break;
        }
        for(var i = 1; i < c_width; i++){
            if(x+i > c_width-1)break;//out of bounds
            var cell = grid[x+i][y];
            if(cell.type == type)ret.push(cell);
            else break;
        }
        
    }
    return ret;
}
//Returns true if there is already a door in the line of walls from this start point:
function isDoorInLineOfWalls(x,y,vert){
    //vert is true if this alg should search vertically, false if
    //it should search horizontally:
    //console.log(x + '    lllllllllllllllll ' + y);
    if(vert){
        for(var i = 0; i < c_height; i++){
            if(y-i<0)break;//out of bounds
            var cell = grid[x][y-i];
            if(cell.door)return true;
            //break if the cell is not a wall or is a T block because a T block is the end of a room's wall
            if(cell.type != 'wall' || cell.imageInfo == "T")break;
        }
        for(var i = 1; i < c_height; i++){
            if(y+i > c_height-1)break;//out of bounds
            var cell = grid[x][y+i];
            if(cell.door)return true;
            //break if the cell is not a wall or is a T block because a T block is the end of a room's wall
            if(cell.type != 'wall' || cell.imageInfo == "T")break;
        }
    }else{
        for(var i = 0; i < c_width; i++){
            if(x-i < 0)break;//out of bounds
            var cell = grid[x-i][y];
            if(cell.door)return true;
            if(cell.type != 'wall')break;
        }
        for(var i = 1; i < c_width; i++){
            if(x+i > c_width-1)break;//out of bounds
            var cell = grid[x+i][y];
            if(cell.door)return true;
            if(cell.type != 'wall')break;
        }
        
    }
    return false;
}
function getGridForAstar(){
    /*
    usage:
    var a = getGridForAstar()
    var g = new Graph(a)
    astar.search(g.nodes,g.nodes[1][1],g.nodes[17][4])
    */
    var grid_astar = [];
    //init double array:
    for(var xx = 0; xx < grid.length; xx++){
      grid_astar.push([]);
    }
    //convert to array of 0s and 1s for astar:
    for(var xx = 0; xx < grid.length; xx++){
      for(var yy = 0; yy < grid[xx].length; yy++){
        if(grid[xx][yy].type == 'wall'){
            grid_astar[xx][yy] = 0;
        }else if (grid[xx][yy].door){
            grid_astar[xx][yy] = 999;
        }else{
            grid_astar[xx][yy] = 1;
        }
      }
    }
    return grid_astar;
}
//like jquery but for grid that matches attributes
function gridQuery(jsonKeyValPairs){
    var matches = [];
    for(var xx = 0; xx < grid.length; xx++){
        for(var yy = 0; yy < grid[xx].length; yy++){
            var isMatch = false;
            for(var j in jsonKeyValPairs){
                if(jsonKeyValPairs[j] == grid[xx][yy][j]){
                    console.log(j + ': ' + grid[xx][yy][j]);
                    isMatch = true;
                }else{
                    isMatch = false;
                    break;
                }
            }
            if(isMatch){
                matches.push(grid[xx][yy]);
            }
        }
    }
    return matches;
}

//UTILITY:
function intInRange(min,max)
{
    //console.log('min: ' + min + ', max:' + max);
    return Math.floor(Math.random()*(max-min)+min);
}

function change(x,y,color,cellType,outside){
    if(grid[x] && grid[x][y]){
        grid[x][y].style = color;
        grid[x][y].type = cellType;
        grid[x][y].outside = outside;
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
    addGridToRecord();
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
        var which = intInRange(0,4);
        switch(which){
            case 0:
                x = intInRange(bounds.xmax-1,bounds.xmax);
                right = true;
                break;
            case 1:
                x = intInRange(bounds.xmin,bounds.xmin+1);
                right = false;
                break;
            case 2:
                y = intInRange(bounds.ymax-1,bounds.ymax);
                down = true;
                break;
            case 3:
                y = intInRange(bounds.ymin,bounds.ymin+1);
                down = false;
                break;
        }
    }
    
    return makeRectOutline(x,y,width,height,right,down,colorIndex,false);
}
//outside = position where player could spawn.
function makeRectOutline(startx,starty,width,height,right,down,colorIndex,outside){
    //drawDebug.push({x:startx,y:starty,s:3});
  
    var startCorner = getStartCorner(startx,starty,width,height,right,down);
    //drawDebug.push({x:startCorner.x,y:startCorner.y,s:2});
    makeRectFillWithStartCorner(startCorner,width,height,1,'wall',false);
    makeRectFillWithStartCorner({x:startCorner.x+1,y:startCorner.y+1},width-2,height-2,colorIndex,'floor',outside);
    
    
    bounds = {xmin:0,ymin:0,xmax:0,ymax:0};
    bounds.xmin = startCorner.x;
    bounds.ymin = startCorner.y;
    bounds.xmax = startCorner.x+width-1;
    bounds.ymax = startCorner.y+height-1;
    return bounds;
  
}
function makeRectFillWithStartCorner(startCorner,width,height,colorIndex,cellType,outside){
    for(var xx = 0; xx < width; xx++){
        if(startCorner.x + xx > c_width-1)break;//oob
        
        for(var yy = 0; yy < height; yy++){    
            if(startCorner.y + yy > c_height-1)break;//oob
            change(startCorner.x + xx, startCorner.y + yy,colorIndex,cellType,outside);
            
            if(xx == 0 || xx == width-1 || yy == 0 || yy == height-1){
                //border point:
                //console.log('x ' + (startCorner.x + xx));
                //console.log('y ' + (startCorner.y + yy));
                borderPointsFromLastRect.push(grid[startCorner.x + xx][startCorner.y + yy]);
            }
        }
    }
  
}
function makeRectFill(startx,starty,width,height,right,down,colorIndex,outside){
    var startCorner = getStartCorner(startx,starty,width,height,right,down);
    makeRectFillWithStartCorner(startCorner,width,height,colorIndex,outside);
    
}
/*
Usage examples:


makeRectOutline(10,10,7,6,true,true,0);
makeRectOutline(10,10,7,6,false,true,0);
makeRectOutline(10,10,7,6,true,false,0);
makeRectOutline(10,10,7,6,false,false,0);

drawSquare(10,10,3);
*/
