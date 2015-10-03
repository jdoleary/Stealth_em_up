function makeMapWithRooms(){
  var width = 41;
  var height = 41;
  var objects = {"hero":[1184,1824],"guards":[[2048,1728],[704,1728],[1472,1152],[1920,128],[960,448],[2240,2240]],"guard_backup_spawn":[2368,2368],"security_cams":[{"swivel_max":6.283185307179586,"swivel_min":1.5707963267948966,"pos":[448,512]},{"swivel_max":6.283185307179586,"swivel_min":1.5707963267948966,"pos":[896,1088]}],"computer":[2144,1888],"van":[2304,2368],"loot":[1856,128]};
  var data = [];
  // fill data:
  for(var w = 0; w < width; w++){
    for(var h = 0; h < height; h++){
      data.push(0);
    }
  }
  var mapData = {
    data:data,
    objects:objects,
    width:width,
    height:height
  };
  
  // Copy over rooms:
  debugger;
  var roomSizeMinusOne = 10;
  for(var w = 0; w < Math.floor(width/roomSizeMinusOne); w++){
    for(var h = 0; h < Math.floor(height/roomSizeMinusOne); h++){
      print(mapData);
      paste(mapData,fourWayRoom1,w*roomSizeMinusOne,h*roomSizeMinusOne);
    }
  }
  
  print(mapData);
  return mapData;
}
// var orig = {width:3,data:[0,1,2,3,4,5,6,7,8,9,10,11]};
// var copy2 = {width:2,data:[44,55,77,88]};
function paste(orig,copy,startX,startY){
  debugger;
  var moveX = 0;
  var moveY = -1;
  for(var i = 0; i < copy.data.length; i++){
    moveX++;
    if(i%copy.width==0){
      moveX = 0;
      moveY++;
    }
    var origIndexOverride = orig.width*(startY+moveY)+(startX+moveX);
    if(origIndexOverride >= orig.data.length){
      //out of bounds
      continue;
    }else{
      orig.data[origIndexOverride] = copy.data[i];
    }
  }
  return orig
}
function print(a){
  var printer = a.data.slice(0);
  var width = a.width;
  while(printer.length){
    console.log(printer.splice(0,width));
  }

}

/*
 * Use:
 */
// paste(copy2,1,1);
// print(orig);