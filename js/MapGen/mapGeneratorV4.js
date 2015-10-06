function makeMapWithRooms(){
  var width = 41;
  var height = 41;
  var objects = {"hero":[1184,1824],"guards":[],"guard_backup_spawn":[2368,2368],"security_cams":[],"computer":[2144,1888],"van":[2304,2368],"loot":[1856,128]};
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
  var roomSizeMinusOne = 10;
  for(var w = 0; w < Math.floor(width/roomSizeMinusOne); w++){
    for(var h = 0; h < Math.floor(height/roomSizeMinusOne); h++){
      var randomRoom = getRandomRoom();
      paste(mapData,randomRoom,w*roomSizeMinusOne,h*roomSizeMinusOne);
    }
  }
  
  //print(mapData);
  return mapData;
}
// var orig = {width:3,data:[0,1,2,3,4,5,6,7,8,9,10,11]};
// var copy2 = {width:2,data:[44,55,77,88]};
function paste(orig,copy,startX,startY){
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
  
  startPixelX = startX*cell_size;
  startPixelY = startY*cell_size;
  // Objects:
  if(copy.objects.hero){
    var ob = [];
    ob[0] = copy.objects.hero[0] + startPixelX;
    ob[1] = copy.objects.hero[1] + startPixelY;
    orig.objects.hero = ob;
  }
  if(copy.objects.computer){
    var ob = [];
    ob[0] = copy.objects.computer[0] + startPixelX;
    ob[1] = copy.objects.computer[1] + startPixelY;
    orig.objects.computer = ob;
  }
  if(copy.objects.loot){
    var ob = [];
    ob[0] = copy.objects.loot[0] + startPixelX;
    ob[1] = copy.objects.loot[1] + startPixelY;
    orig.objects.loot = ob;
  }
  if(copy.objects.van){
    var ob = [];
    ob[0] = copy.objects.van[0] + startPixelX;
    ob[1] = copy.objects.van[1] + startPixelY;
    orig.objects.van = ob;
  }
  if(copy.objects.guard_backup_spawn){
    var ob = [];
    ob[0] = copy.objects.guard_backup_spawn[0] + startPixelX;
    ob[1] = copy.objects.guard_backup_spawn[1] + startPixelY;
    orig.objects.guard_backup_spawn = ob;
  }
  if(copy.objects.guards){
    for(var i = 0; i < copy.objects.guards.length; i++){
      var ob = [];
      ob[0] = copy.objects.guards[i][0] + startPixelX;
      ob[1] = copy.objects.guards[i][0] + startPixelY;
      orig.objects.guards.push(ob);
    }
  }
  if(copy.objects.security_cams){
    for(var i = 0; i < copy.objects.security_cams.length; i++){
      var ob = {pos:[]};
      ob.swivel_max = copy.objects.security_cams[i].swivel_max;
      ob.swivel_min = copy.objects.security_cams[i].swivel_min;
      ob.pos[0] = copy.objects.security_cams[i].pos[0] + startPixelX;
      ob.pos[1] = copy.objects.security_cams[i].pos[1] + startPixelY;
      orig.objects.security_cams.push(ob);
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