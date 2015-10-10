//old
var fourWayRoom1 = {"data":[1,1,1,1,1,6,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,5,2,2,2,2,2,2,2,2,2,5,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,6,1,1,1,1,1],"height":11,"width":11,"objects":{"guards":[[526,467]],"security_cams":[{"swivel_max":1.5707963267948966,"swivel_min":0,"pos":[64,64]}]}};
var triRoom = {"data":[1,1,6,1,1,1,1,1,1,1,1,1,2,2,2,1,2,2,2,2,2,1,5,2,2,2,1,2,2,2,2,2,5,1,2,2,2,1,2,2,2,2,2,1,1,2,2,2,1,2,2,2,2,2,1,1,2,2,2,5,2,2,2,2,2,1,1,2,2,2,1,1,1,1,1,1,1,1,2,2,2,1,3,3,3,3,2,1,5,2,2,2,1,3,2,2,2,2,5,1,2,2,2,1,2,2,2,2,2,1,1,1,6,1,1,1,1,1,6,1,1],"height":11,"width":11,"objects":{}};
//new
var bottomOpen = {"data":[1,1,1,1,1,1,1,{type:'door',"unlocked":true,"horizontal":true},1,1,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,1,1,{type:'door',"unlocked":true,"horizontal":true},1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1],"height":11,"width":11,"objects":{"guards":[],"security_cams":[]}};
var sidesOpen = {"data":[1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1],"height":11,"width":11,"objects":{"guards":[],"security_cams":[]}};
var computerRoom = {"data":[1,1,1,{type:'door',"unlocked":true,"horizontal":true},1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,2,2,1,1,4,4,3,3,3,3,1,2,2,1,1,4,4,4,4,4,3,1,2,2,1,1,4,4,4,4,4,3,1,2,2,1,{type:'door',"unlocked":true,"horizontal":false},4,4,4,4,4,3,1,2,2,{type:'door',"unlocked":true,"horizontal":false},1,4,4,4,4,4,3,1,2,2,1,1,4,4,4,4,4,4,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1],"height":11,"width":11,"objects":{"guards":[],"security_cams":[],"computer":[416,480]}};
var fourWay = {"data":[1,1,1,1,1,{type:'door',"unlocked":true,"horizontal":true},1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,{type:'door',"unlocked":true,"horizontal":false},2,2,2,2,2,2,2,2,2,{type:'door',"unlocked":true,"horizontal":false},1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,{type:'door',"unlocked":true,"horizontal":true},1,1,1,1,1],"height":11,"width":11,"objects":{"guards":[],"security_cams":[]}};
var restrictedHall = {"data":[1,1,1,1,1,1,1,1,{type:'door',"unlocked":true,"horizontal":true},1,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,1,{type:'door',"unlocked":true,"horizontal":false},4,4,4,4,4,4,4,4,4,{type:'door',"unlocked":true,"horizontal":false},1,4,4,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1],"height":11,"width":11,"objects":{"guards":[],"security_cams":[]}};
var guardStand = {"data":[1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,3,3,2,3,3,2,2,1,1,2,2,3,4,4,4,3,2,2,1,1,2,2,3,4,4,4,3,2,2,1,1,2,2,3,4,4,4,3,2,2,1,1,2,2,3,3,3,3,3,2,2,1,1,2,2,2,2,2,2,2,2,2,1,{type:'door',"unlocked":true,"horizontal":false},2,2,2,2,2,2,2,2,2,{type:'door',"unlocked":true,"horizontal":false},1,1,1,1,1,1,1,1,1,1,1],"height":11,"width":11,"objects":{"guards":[[297,291],[392,389]],"security_cams":[{"swivel_max":3.141592653589793,"swivel_min":1.5707963267948966,"pos":[640,64]},{"swivel_max":1.5707963267948966,"swivel_min":0,"pos":[64,64]}]}};
var cornerBite = {"data":[2,2,2,2,1,1,1,1,1,1,1,2,2,2,2,1,4,4,4,4,4,1,2,2,2,2,1,4,4,4,4,4,{"type":"door","unlocked":true,"horizontal":false},2,2,2,2,1,4,4,4,4,4,1,1,1,1,1,1,3,3,3,3,3,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,1,{"type":"door","unlocked":true,"horizontal":true},1,1,1,1,1,1,1,1],"height":11,"width":11,"objects":{"guards":[[438,169]],"security_cams":[]}};
var sideHall = {"data":[2,2,2,2,2,2,1,1,{"type":"door","unlocked":false,"horizontal":true},1,1,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2,2,2,1,1,{"type":"door","unlocked":false,"horizontal":true},1,1],"height":11,"width":11,"objects":{"guards":[],"security_cams":[]}};
var spaceInvader = {"data":[2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,{"type":"door","unlocked":true,"horizontal":false},2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1],"height":11,"width":11,"objects":{"guards":[[386,551],[386,551]],"security_cams":[]}};


var rooms = [
  bottomOpen,
  sidesOpen,
  computerRoom,
  fourWay,
  restrictedHall,
  guardStand,
  cornerBite,
  sideHall,
  spaceInvader
]

// var rooms = {
  // bottomOpen:bottomOpen,
  // sidesOpen:sidesOpen,
  // computerRoom:computerRoom,
  // fourWay:fourWay,
  // restrictedHall:restrictedHall
// };
function getRandomRoom(){
  return rooms[Math.floor(Math.random()*rooms.length)];
  // var keys = Object.keys(rooms);
  // return rooms[keys[Math.floor(Math.random()*keys.length)]];
}