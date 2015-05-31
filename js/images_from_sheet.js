//object that holds spritesheet info from TexturePacker application
var fileNames = {};
prepFileNamesObject();

var spriteSheet = PIXI.Texture.fromImage("images/spritesheet.png");
var img_bullet= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("bullet3x.png"));
var img_bomb= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("c4.png"));

var img_security_camera= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("camera.png"));
var img_security_camera_alerted= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("camera_alert.png"));
var img_cam_broken= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("camera_broken.png"));
var img_cam_off= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("camera_off.png"));

var img_computer= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("computer.png"));
var img_computer_off= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("computer_off.png"));
var img_door_closed= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("door_closed.png"));
var img_door_open= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("door_open.png"));
var img_guard_reg= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("guard.png"));
var img_guard_alert= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("guard_alert.png"));
var img_guard_knows_hero_face= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("guard_alert_knows_face.png"));
var img_guard_choke= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("guard_choke.png"));
var img_guard_dead= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("guard_dead.png"));
var img_guard_drag= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("guard_dragging.png"));
var img_guard_spawn_icon= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("guard_spawn_icon.png"));
var img_blue= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("hero_body_1.png"));
var img_hero_with_money= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("hero_body_1_bag.png"));
//? double hero_body_1_masked
var img_masked= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("hero_body_1_masked.png"));
var img_hero_with_pistol = new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("hero_body_1_masked.png"));
var img_hero_with_pistol_silenced= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("hero_body_1_masked_handgun_silenced.png"));
var img_hero_with_machine_gun= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("hero_body_1_masked_machine.png"));
var img_hero_with_shotty= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("hero_body_1_masked_shotgun.png"));
var img_hero_with_shotty_sawed= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("hero_body_1_masked_shotty_sawed.png"));
var img_hero_dead= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("hero_dead.png"));
var img_doodad_lamp= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("lamp.png"));
var img_lastSeen= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("last_seen.png"));
var img_gun_machine= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("machine-gun2.png"));
var img_money= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("money.png"));
var img_doodad_paper= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("papers.png"));
var img_gun_pistol= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("pistol.png"));
var img_player_spawn_icon= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("player_spawn_icon.png"));
var img_gun_shotgun_sawed= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("sawed-shotgun.png"));
var img_shard_1= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("shard.png"));
var img_shard_2= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("shard2.png"));
var img_shard_3= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("shard3.png"));
var img_shell= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("shell.png"));
var img_gun_shotgun= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("shotgun.png"));
var img_gun_pistol_silenced= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("silenced_pistol.png"));

var img_tile_black= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("tile_black.png"));
var img_tile_brown= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("tile_brown.png"));
var img_tile_red= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("tile_red.png"));
var img_tile_white= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("tile_white.png"));

/*
NOTE: when using a sprite sheet, load with (a) not (b)

            (a)var sprite = new PIXI.Sprite(img_tile_black);
            (b)var sprite = new PIXI.Sprite.fromImage(img_tile_black);
*/



var img_getawaycar= new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("van.png"));


var img_hero_body = getTextureFromTexturePacker("body.png");
var img_hero_head = new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("head.png"));
var img_origin = new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("last_seen.png"));
var img_hero_head_masked = new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker("head_masked.png"));


function prepFileNamesObject(){
    //Highlight json and press Ctrl+j to put it on one line
    var json = {"frames": [  { 	"filename": "body.png", 	"frame": {"x":2,"y":1238,"w":21,"h":40}, 	"rotated": true, 	"trimmed": true, 	"spriteSourceSize": {"x":21,"y":10,"w":21,"h":40}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "bullet3x.png", 	"frame": {"x":91,"y":302,"w":29,"h":6}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":35,"y":29,"w":29,"h":6}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "c4.png", 	"frame": {"x":68,"y":921,"w":36,"h":58}, 	"rotated": true, 	"trimmed": true, 	"spriteSourceSize": {"x":12,"y":1,"w":36,"h":58}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "camera.png", 	"frame": {"x":68,"y":618,"w":58,"h":128}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":29,"y":0,"w":58,"h":128}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "camera_alert.png", 	"frame": {"x":68,"y":748,"w":58,"h":128}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":29,"y":0,"w":58,"h":128}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "camera_broken.png", 	"frame": {"x":107,"y":1178,"w":36,"h":11}, 	"rotated": true, 	"trimmed": true, 	"spriteSourceSize": {"x":29,"y":59,"w":36,"h":11}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "camera_off.png", 	"frame": {"x":107,"y":1216,"w":36,"h":11}, 	"rotated": true, 	"trimmed": true, 	"spriteSourceSize": {"x":29,"y":59,"w":36,"h":11}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "computer.png", 	"frame": {"x":2,"y":608,"w":64,"h":64}, 	"rotated": false, 	"trimmed": false, 	"spriteSourceSize": {"x":0,"y":0,"w":64,"h":64}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "computer_off.png", 	"frame": {"x":2,"y":674,"w":64,"h":64}, 	"rotated": false, 	"trimmed": false, 	"spriteSourceSize": {"x":0,"y":0,"w":64,"h":64}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "door_closed.png", 	"frame": {"x":2,"y":1070,"w":17,"h":64}, 	"rotated": true, 	"trimmed": true, 	"spriteSourceSize": {"x":0,"y":0,"w":17,"h":64}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "door_open.png", 	"frame": {"x":2,"y":1089,"w":17,"h":64}, 	"rotated": true, 	"trimmed": true, 	"spriteSourceSize": {"x":0,"y":0,"w":17,"h":64}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "guard.png", 	"frame": {"x":91,"y":310,"w":25,"h":40}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":50,"y":43,"w":25,"h":40}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "guard_alert.png", 	"frame": {"x":70,"y":575,"w":53,"h":41}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":50,"y":43,"w":53,"h":41}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "guard_alert_knows_face.png", 	"frame": {"x":2,"y":311,"w":77,"h":73}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":26,"y":28,"w":77,"h":73}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "guard_choke.png", 	"frame": {"x":68,"y":959,"w":37,"h":50}, 	"rotated": true, 	"trimmed": true, 	"spriteSourceSize": {"x":46,"y":39,"w":37,"h":50}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "guard_dead.png", 	"frame": {"x":2,"y":158,"w":122,"h":49}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":6,"y":40,"w":122,"h":49}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "guard_dragging.png", 	"frame": {"x":2,"y":260,"w":87,"h":49}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":41,"y":40,"w":87,"h":49}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "guard_spawn_icon.png", 	"frame": {"x":2,"y":520,"w":66,"h":42}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":37,"y":41,"w":66,"h":42}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "head.png", 	"frame": {"x":107,"y":1128,"w":23,"h":18}, 	"rotated": true, 	"trimmed": true, 	"spriteSourceSize": {"x":27,"y":24,"w":23,"h":18}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "head_masked.png", 	"frame": {"x":107,"y":1153,"w":23,"h":18}, 	"rotated": true, 	"trimmed": true, 	"spriteSourceSize": {"x":27,"y":24,"w":23,"h":18}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "hero_body_1.png", 	"frame": {"x":91,"y":260,"w":29,"h":40}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":21,"y":10,"w":29,"h":40}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "hero_body_1_bag.png", 	"frame": {"x":44,"y":1265,"w":41,"h":40}, 	"rotated": true, 	"trimmed": true, 	"spriteSourceSize": {"x":9,"y":10,"w":41,"h":40}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "hero_body_1_masked.png", 	"frame": {"x":70,"y":531,"w":56,"h":42}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":48,"y":42,"w":56,"h":42}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "hero_body_1_masked_handgun_silenced.png", 	"frame": {"x":2,"y":476,"w":67,"h":42}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":48,"y":42,"w":67,"h":42}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "hero_body_1_masked_machine.png", 	"frame": {"x":2,"y":431,"w":69,"h":43}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":47,"y":41,"w":69,"h":43}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "hero_body_1_masked_shotgun.png", 	"frame": {"x":2,"y":386,"w":72,"h":43}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":47,"y":41,"w":72,"h":43}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "hero_body_1_masked_shotty_sawed.png", 	"frame": {"x":81,"y":353,"w":77,"h":43}, 	"rotated": true, 	"trimmed": true, 	"spriteSourceSize": {"x":48,"y":41,"w":77,"h":43}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "hero_dead.png", 	"frame": {"x":2,"y":209,"w":121,"h":49}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":7,"y":40,"w":121,"h":49}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "lamp.png", 	"frame": {"x":73,"y":432,"w":53,"h":52}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":8,"y":5,"w":53,"h":52}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "last_seen.png", 	"frame": {"x":86,"y":1265,"w":38,"h":40}, 	"rotated": true, 	"trimmed": true, 	"spriteSourceSize": {"x":12,"y":10,"w":38,"h":40}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "machine-gun2.png", 	"frame": {"x":68,"y":998,"w":128,"h":48}, 	"rotated": true, 	"trimmed": true, 	"spriteSourceSize": {"x":0,"y":0,"w":128,"h":48}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "money.png", 	"frame": {"x":71,"y":486,"w":43,"h":53}, 	"rotated": true, 	"trimmed": true, 	"spriteSourceSize": {"x":12,"y":4,"w":43,"h":53}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "papers.png", 	"frame": {"x":2,"y":1265,"w":40,"h":41}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":8,"y":14,"w":40,"h":41}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "pistol.png", 	"frame": {"x":2,"y":564,"w":66,"h":42}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":0,"y":0,"w":66,"h":42}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "player_spawn_icon.png", 	"frame": {"x":68,"y":878,"w":58,"h":41}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":37,"y":41,"w":58,"h":41}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "sawed-shotgun.png", 	"frame": {"x":2,"y":119,"w":123,"h":37}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":3,"y":4,"w":123,"h":37}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "selector.png", 	"frame": {"x":2,"y":740,"w":64,"h":64}, 	"rotated": false, 	"trimmed": false, 	"spriteSourceSize": {"x":0,"y":0,"w":64,"h":64}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "shard.png", 	"frame": {"x":118,"y":328,"w":8,"h":11}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":3,"y":3,"w":8,"h":11}, 	"sourceSize": {"w":16,"h":16}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "shard2.png", 	"frame": {"x":107,"y":1254,"w":9,"h":9}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":2,"y":4,"w":9,"h":9}, 	"sourceSize": {"w":16,"h":16}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "shard3.png", 	"frame": {"x":118,"y":341,"w":10,"h":7}, 	"rotated": true, 	"trimmed": true, 	"spriteSourceSize": {"x":2,"y":6,"w":10,"h":7}, 	"sourceSize": {"w":16,"h":16}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "shell.png", 	"frame": {"x":118,"y":310,"w":8,"h":16}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":4,"y":0,"w":8,"h":16}, 	"sourceSize": {"w":16,"h":16}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "shotgun.png", 	"frame": {"x":2,"y":2,"w":123,"h":115}, 	"rotated": false, 	"trimmed": true, 	"spriteSourceSize": {"x":2,"y":4,"w":123,"h":115}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "silenced_pistol.png", 	"frame": {"x":63,"y":1128,"w":128,"h":42}, 	"rotated": true, 	"trimmed": true, 	"spriteSourceSize": {"x":0,"y":0,"w":128,"h":42}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "tile_black.png", 	"frame": {"x":2,"y":806,"w":64,"h":64}, 	"rotated": false, 	"trimmed": false, 	"spriteSourceSize": {"x":0,"y":0,"w":64,"h":64}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "tile_brown.png", 	"frame": {"x":2,"y":872,"w":64,"h":64}, 	"rotated": false, 	"trimmed": false, 	"spriteSourceSize": {"x":0,"y":0,"w":64,"h":64}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "tile_red.png", 	"frame": {"x":2,"y":938,"w":64,"h":64}, 	"rotated": false, 	"trimmed": false, 	"spriteSourceSize": {"x":0,"y":0,"w":64,"h":64}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "tile_white.png", 	"frame": {"x":2,"y":1004,"w":64,"h":64}, 	"rotated": false, 	"trimmed": false, 	"spriteSourceSize": {"x":0,"y":0,"w":64,"h":64}, 	"sourceSize": {"w":64,"h":64}, 	"pivot": {"x":0.5,"y":0.5} }, { 	"filename": "van.png", 	"frame": {"x":2,"y":1108,"w":128,"h":59}, 	"rotated": true, 	"trimmed": true, 	"spriteSourceSize": {"x":0,"y":0,"w":128,"h":59}, 	"sourceSize": {"w":128,"h":128}, 	"pivot": {"x":0.5,"y":0.5} }], "meta": { 	"app": "http://www.codeandweb.com/texturepacker", 	"version": "1.0", 	"image": "spritesheet.png", 	"format": "RGBA8888", 	"size": {"w":128,"h":1311}, 	"scale": "1", 	"smartupdate": "$TexturePacker:SmartUpdate:36ea991511b37259d0b0dbfe1ca25dbe:621c89c1c8e2d7ee551b5ec85dfc6d89:729adc6043343cfda41c447ce8f464d6$" } } ;
    for(var i in json.frames){
        fileNames[json.frames[i].filename] = json.frames[i];
    }
}
function getImageRectangleFromTexturePacker(filename){

    var fileInfo = fileNames[filename];
    var rect;
    if(!fileInfo.rotated)rect = new PIXI.Rectangle(fileInfo.frame.x,fileInfo.frame.y,fileInfo.frame.w,fileInfo.frame.h);
    else rect = new PIXI.Rectangle(fileInfo.frame.x,fileInfo.frame.y,fileInfo.frame.h,fileInfo.frame.w);
    console.log('loaded: ' + filename + " : " + rect.x + " " + rect.y + " " + rect.width + " " + rect.height);
    return rect;
}
function getFileInfoFromTexturePacker(filename){
    return fileNames[filename];
}
function getTextureFromTexturePacker(filename){
    var newTex = new PIXI.Texture(spriteSheet.baseTexture, getImageRectangleFromTexturePacker(filename));
    newTex.rotated = getFileInfoFromTexturePacker(filename).rotated;
    return newTex;
}