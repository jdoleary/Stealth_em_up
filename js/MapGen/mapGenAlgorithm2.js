function generateMap2(){
    
    //init grid
    for(var xx = 0; xx < c_width; xx++){
      for(var yy = 0; yy < c_height; yy++){
        if(grid[xx] == undefined)grid[xx] = [];
        if(grid[xx][yy] == undefined)grid[xx][yy] = {x:xx,y:yy,style:0,nearDoor:false,numberOfNearDoors:0,type:'floor',depth:null};
      }
    }
    ///////////////////////////////////////////////////
    //generate map:
    ///////////////////////////////////////////////////
    //Map Border:
    makeRectOutline(0,0,c_width,c_height,true,true,5,true);
    addGridToRecord();
    printLoadingStep('Placing rooms ' + c_width + ' by ' + c_height);
    setTimeout(placeRooms2,100);
}
function placeRooms2(){
    
    var roomWidth = 7;
    var roomHeight = 7;
    for(var i = 0; i < c_width/(roomWidth-1) - 1; i++){
        for(var j = 0; j < c_height/(roomHeight-1) - 1; j++){
            //Leave a non outside area for spawn:
            if(i == 0 && j == 0)makeRectOutline(i*(roomWidth-1),j*(roomHeight-1),roomWidth,roomHeight,true,true,5,true);
            else makeRectOutline(i*(roomWidth-1),j*(roomHeight-1),roomWidth,roomHeight,true,true,5,false);
        }
    }


    getListOfWalls();
    console.log('walls: ' + wallPieces.length);
    addGridToRecord();

    printLoadingStep(('adding doors'));
    setTimeout(setWallTypes,100);
}
/*
  Each cell should have the follwing info:
  {
    x:0,
    y:0,
    blocks_vision:true,
    imageInfo: "corner",
    solid:true,
    type:"wall"
    outside:false
  }
*/
var testRoom1 = [
[
  {
    blocks_vision:true,
    imageInfo: "corner",
    solid:true,
    type:"wall",
    outside:false
  },
  
  {
    blocks_vision:true,
    imageInfo: "corner",
    solid:true,
    type:"wall",
    outside:false
  },
  
  {
    blocks_vision:true,
    imageInfo: "corner",
    solid:true,
    type:"wall",
    outside:false
  }],
[
  {
    blocks_vision:true,
    imageInfo: "corner",
    solid:true,
    type:"wall",
    outside:false
  },
  
  {
    blocks_vision:true,
    imageInfo: "corner",
    solid:true,
    type:"wall",
    outside:false
  },
  
  {
    blocks_vision:true,
    imageInfo: "corner",
    solid:true,
    type:"wall",
    outside:false
  }],
[
  {
    blocks_vision:true,
    imageInfo: "corner",
    solid:true,
    type:"floor",
    outside:false
  },
  
  {
    blocks_vision:true,
    imageInfo: "corner",
    solid:true,
    type:"wall",
    outside:false
  },
  
  {
    blocks_vision:true,
    imageInfo: "corner",
    solid:true,
    type:"wall",
    outside:false
  }],
]
// Overwrite cell info:
function changeGridWithInfo(x,y,info){
  grid[x][y] = info;
  grid[x][y].x = x;
  grid[x][y].y = y;
}
function pasteCellInfo(cells,startX,startY){
  for(var x = 0; x < cells.length; x++){
    for(var y = 0; y < cells[x].length; y++){
      changeGridWithInfo(x+startX,y+startY,cells[x][y]);
    }
  }
    printLoadingStep(('paste'));
    setTimeout(setWallTypes2,100);
  
}
function setWallTypes2(){
    //set wall type for image drawing
    for(var w = 0; w < wallPieces.length; w++){
        var wall = wallPieces[w];
        //if they don't already have image info set
        if(!grid[wall.x][wall.y].imageInfo){
            grid[wall.x][wall.y].imageInfo = findWallType.call(grid[wall.x][wall.y],wall.x,wall.y);
        }
    }
    addGridToRecord();
  
}