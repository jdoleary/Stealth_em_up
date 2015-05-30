var wabbitTexture = PIXI.Texture.fromImage("images/spritesheet.png");
var img_blood_1= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(5,5,16,16));
var img_blood_2= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(31,5,16,16));
var img_blood_3= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(57,5,16,16));
var img_bullet= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(83,5,64,64));
var img_bomb= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(157,5,64,64));
var img_security_camera= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(231,5,128,128));
var img_security_camera_alerted= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(369,5,128,128));
var img_cam_broken= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(507,5,128,128));
var img_cam_off= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(5,143,128,128));
var img_computer= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(645,5,64,64));
var img_computer_off= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(143,79,64,64));
var img_door_closed= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(645,79,64,64));
var img_door_open= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(143,153,64,64));
var img_guard_reg= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(217,143,128,128));
var img_guard_alert= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(355,143,128,128));
var img_guard_knows_hero_face= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(493,143,128,128));
var img_guard_choke= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(5,281,128,128));
var img_guard_dead= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(143,281,128,128));
var img_guard_drag= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(281,281,128,128));
var img_guard_spawn_icon= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(419,281,128,128));
var img_blue= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(631,153,64,64));
var img_hero_with_money= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(631,227,64,64));
var img_masked= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(557,301,128,128));
var img_hero_with_pistol_silenced= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(5,439,128,128));
var img_hero_with_machine_gun= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(143,439,128,128));
var img_hero_with_shotty= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(281,439,128,128));
var img_hero_with_shotty_sawed= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(419,439,128,128));
var img_hero_dead= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(557,439,128,128));
var img_doodad_lamp= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(5,577,64,64));
var img_lastSeen= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(79,577,64,64));
var img_gun_machine= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(153,577,128,128));
var img_money= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(291,577,64,64));
var img_doodad_paper= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(365,577,64,64));
var img_gun_pistol= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(439,577,128,128));
var img_player_spawn_icon= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(577,577,128,128));
var img_gun_shotgun_sawed= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(719,5,128,128));
var img_shard_1= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(857,5,16,16));
var img_shard_2= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(5,31,16,16));
var img_shard_3= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(31,31,16,16));
var img_shell= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(57,31,16,16));
var img_gun_shotgun= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(719,143,128,128));
var img_gun_pistol_silenced= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(705,281,128,128));

var img_tile_black= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(695,419,64,64));
var img_tile_brown= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(769,419,64,64));
var img_tile_red= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(695,493,64,64));
var img_tile_white= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(769,493,64,64));

/*
NOTE: when using a sprite sheet, load with (a) not (b)

            (a)var sprite = new PIXI.Sprite(img_tile_black);
            (b)var sprite = new PIXI.Sprite.fromImage(img_tile_black);
*/



var img_getawaycar= new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(715,567,128,128));


var img_hero_body = PIXI.Texture.fromImage("images/new_hero/body.png");
var img_hero_head = PIXI.Texture.fromImage("images/new_hero/head.png");
var img_origin = PIXI.Texture.fromImage("images/last_seen.png");
var img_blood_splatter = PIXI.Texture.fromImage("images/blood_splatter.png");
var img_blood_splatter2 = PIXI.Texture.fromImage("images/blood_splatter2.png");
var img_hero_head_masked = PIXI.Texture.fromImage("images/new_hero/head_masked.png");