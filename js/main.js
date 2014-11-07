////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/*
Window Setup
*/
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

//Mr Doob's Stats.js:
var stats = new Stats();

//CREATE STAGE
// create an new instance of a pixi stage
// the second parameter is interactivity...
var interactive = true;
var stage;

//make sure that width value is the same in index.html's style
var window_properties = {width: 620*2, height: 400*2};
//make sure that width value is the same in index.html's style

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(window_properties.width, window_properties.height);
// add the renderer view element to the DOM
document.body.appendChild(renderer.view);



var mouse;
var keys;

var stage_child;


//zoom:
var zoom;
var zoom_magnitude;


var look_sensitivity;

//display object containers that hold the layers of everything.
var display_tiles;
var display_blood;
var display_effects;
var display_actors;
var display_tiles_walls;


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/*
Map / Game Object Setup
*/
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////    

//grid/map
var grid;


//camera/debug
var camera;
var cameras_disabled;
var test_cone;
var hero_cir;



//images:
var img_orange = PIXI.Texture.fromImage("orange2.png");
var img_blue = PIXI.Texture.fromImage("blue.png");
var img_masked = PIXI.Texture.fromImage("masked.png");
var img_skull = PIXI.Texture.fromImage("skull.png");
var img_guard_alert = PIXI.Texture.fromImage("alert_guard.png");
var img_security_camera = PIXI.Texture.fromImage("camera.png");
var img_security_camera_alerted = PIXI.Texture.fromImage("camera_alert.png");
var img_cam_broken = PIXI.Texture.fromImage("camera_broken.png");
var img_computer = PIXI.Texture.fromImage("computer.png");
var img_computer_off = PIXI.Texture.fromImage("computer_off.png");
var img_money = PIXI.Texture.fromImage("money.png");
var img_getawaycar = PIXI.Texture.fromImage("van.png");
var img_hero_with_money = PIXI.Texture.fromImage("blue_with_money.png");
var img_civilian = PIXI.Texture.fromImage("civ.png");
var img_origin = PIXI.Texture.fromImage("origin.png");
var img_blood_splatter = PIXI.Texture.fromImage("blood_splatter.png");
var img_blood_splatter2 = PIXI.Texture.fromImage("blood_splatter2.png");
var img_door = PIXI.Texture.fromImage("door.png");



//blood_drawer:
var blood_holder;
var graphics_blood;

			//make sprites
            var hero;
            var hero_end_aim_coord;
			
			var hero_drag_target; // a special var reserved for when the hero is dragging something.
			var guards;
            var guard_backup_spawn;
            var numOfBackupGuards;
			var civs;
			

			
			var computer_for_security_cameras;
			
			//security camera
			var security_cameras;

var alarmingObjects;//guards will sound alarm if they see an alarming object (dead bodies)


			//Loot and Getaway car:
			var getawaycar;
			var loot;

  
//UI text.  Use newMessage() to add a message.
var message;
var messageText;

//Tooltip text:
var tooltip;

//MOVIE CLIPS:
var spark_clip;

//effects:
var static_effect_sprites;

//how far hero has to be from something to drag it:
var dragDistance;


var states = {"StartMenu":0,"Gameplay":1};
var state;

//circular progress bar:
var circProgBar;



startMenu();//init menu
requestAnimFrame(animate);//start main loop
        
function removeAllChildren(obj){
    if(obj){
        for (var i = obj.children.length - 1; i >= 0; i--) {
            obj.removeChild(obj.children[i]);
        };
    }
}
function clearStage(){
    //for menu:
    if(button){
        button.setInteractive(false);
        button.click = null;
        button = null;
    }
    //clear all timeouts
    var id = window.setTimeout(function() {}, 0);
    while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
    }

    //removekeyhandlers:
    removeKeyHandlers();
    //remove all children:
    removeAllChildren(display_tiles);
    removeAllChildren(display_blood);
    removeAllChildren(display_effects);
    removeAllChildren(display_actors);
    removeAllChildren(display_tiles_walls);
    removeAllChildren(stage_child);
    removeAllChildren(stage);
    stage = new PIXI.Stage(0xEEEEEE, interactive);
}
var button;//menu button
function startMenu(){
/////MENU/////

        clearStage();
        state = states["StartMenu"];
        addButton("play1.png","play2.png",startGame);
        //set music to "unmasked"
        if(music_masked && music_unmasked){
            music_masked.volume = 0.0;
            music_unmasked.volume = 1.0;
        }
        
        
}
function startGame(){

    //the the menu or any other previous children
    clearStage();
    
    state = states["Gameplay"];
    
    //initialize variables:
    keys = {w: false, a: false, s: false, d: false, v: false, space:false, shift:false};
    stage_child = new PIXI.DisplayObjectContainer();//replaces stage for scaling
    stage.addChild(stage_child);
    
    //zoom:
    zoom = 1;
    zoom_magnitude = 0.01;
    
    //look sensitivity: This affects how far the camera stretches when the player moves the mouse around;
    //1.5: very far, all the way to the mouse
    //2: a lot
    //3: not much
    look_sensitivity = 2.5;
    
    
    //display object containers that hold the layers of everything.
    display_tiles = new PIXI.DisplayObjectContainer();
    display_blood = new PIXI.DisplayObjectContainer();
    display_effects = new PIXI.DisplayObjectContainer();
    display_tiles_walls = new PIXI.DisplayObjectContainer();
    display_actors = new PIXI.DisplayObjectContainer();
    stage_child.addChild(display_tiles);
    stage_child.addChild(display_blood);
    stage_child.addChild(display_effects);
    stage_child.addChild(display_tiles_walls);//wall tiles are higher than effects and blood
    stage_child.addChild(display_actors);
    
    
    ///////////////////////
    ///////////////////////
    /*
    Map / Game Object Setup
    */
    ///////////////////////
    ///////////////////////    
    
    //grid/map
    grid = new jo_grid(map_diamond_store);
    display_tiles_walls.addChild(tile_containers[0]);//add SpriteBatches, black walls
    display_tiles_walls.addChild(tile_containers[2]);//add SpriteBatches, brown furnature
    display_tiles.addChild(tile_containers[1]);//add SpriteBatches
    display_tiles.addChild(tile_containers[3]);//add SpriteBatches
    display_tiles.addChild(tile_containers[4]);//add SpriteBatches
    
    //camera/debug
    camera = new jo_cam(window_properties);
    cameras_disabled = false;
    test_cone = new debug_line();
    hero_cir = new debug_circle();


    //blood_drawer:
    blood_holder = new PIXI.Sprite(img_origin);
    graphics_blood = new PIXI.Graphics();
    graphics_blood.lineStyle(15, 0xb51d1d, 1);
    blood_holder.addChild(graphics_blood);
    display_blood.addChild(blood_holder);
    
            //make sprites:
			hero = new sprite_hero_wrapper(new PIXI.Sprite(img_blue),4,8);
			hero_end_aim_coord;
            hero.x = 1182;
			hero.y = 615;
			hero.speed = hero.speed_walk;
            hero_drag_target = null; // a special var reserved for when the hero is dragging something.
			guards = [];
            guards.push(new sprite_guard_wrapper(new PIXI.Sprite(img_orange)));
			guards.push(new sprite_guard_wrapper(new PIXI.Sprite(img_orange)));
			guards.push(new sprite_guard_wrapper(new PIXI.Sprite(img_orange)));
			guards[0].x = 64*3+32;
			//guards[0].x = 288;
			guards[0].y = 64*5;
			//guards[0].y = 96;
			guards[1].x = 64*16+32;
			guards[1].y = 64*6;
			guards[2].x = 64*3+32;
			guards[2].y = 64*15;
            guard_backup_spawn = {'x':31*64,'y':1*64};
            numOfBackupGuards = 7;
            
			civs = [];
            /*
			for(var i = 0; i < 8; i++){
			    civs.push(new sprite_civ_wrapper(new PIXI.Sprite(img_civilian)));
			}*/
            
            		
			computer_for_security_cameras = new jo_sprite(new PIXI.Sprite(img_computer));
			computer_for_security_cameras.x = 11*64+32;
			computer_for_security_cameras.y = 19*64+32;
			
			//security camera
			security_cameras = [];
			security_cameras.push(new security_camera_wrapper(new PIXI.Sprite(img_security_camera),3*64,4*64,Math.PI/2,0));
			security_cameras.push(new security_camera_wrapper(new PIXI.Sprite(img_security_camera),5*64,21*64,Math.PI,0));
            
            
alarmingObjects = [];//guards will sound alarm if they see an alarming object (dead bodies)


			//Loot and Getaway car:
			getawaycar = new jo_sprite(new PIXI.Sprite(img_getawaycar));
			getawaycar.sprite.anchor.y = 0.25;
			getawaycar.x = 30.5*64;
			getawaycar.y = 6*64;
			getawaycar.rad = -Math.PI/2;
			loot = [];
			var money = new jo_sprite(new PIXI.Sprite(img_money));
			money.x = 12.5*64;
			money.y = 7.5*64;
            loot.push(money);

            
            //UI text.  Use newMessage() to add a message.
            message = new PIXI.Text("", { font: "20px Arial", fill: "#000000", align: "left", stroke: "#FFFFFF", strokeThickness: 4 });
            message.position.x = 0;
            message.position.y = window_properties.height;
            message.anchor.y = 1;
            messageText = [];
            stage.addChild(message);
            
            
            //Tooltip text: todo test
            tooltip = new PIXI.Text("Tooltip", { font: "30px Arial", fill: "#000000", align:"left", stroke: "#FFFFFF", strokeThickness: 4 });
            tooltip.anchor.x = 0.5;//centered
            tooltip.objX = 0;
            tooltip.objY = 0;
            stage_child.addChild(tooltip);

            //MOVIE CLIPS:
            spark_clip = new jo_sprite(jo_movie_clip("movie_clips/","spark_",9,".png"),display_effects);
            spark_clip.sprite.loop = false;
            spark_clip.sprite.animationSpeed = 0.7;//slow it down

            //effects:
            static_effect_sprites = [];
            
            dragDistance = 3;
            
            addKeyHandlers();
            
            
            //circular progress bar:
            circProgBar = new circularProgressBar(400,400,60,15);
            

}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/*
Animate Loop
*/
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
var lastTimeStamp;
var deltaTime;
function animate(time) {
    if(state == 0){
    }else if(state == 1){
        /////Game/////
        if(!lastTimeStamp) lastTimeStamp = time;
        deltaTime = time - lastTimeStamp;
        lastTimeStamp = time;
        //console.log('delta: ' + deltaTime);
        //console.log('time: ' + time);
        
        stats.begin();//Mr Doob's Stats.js
        
        gameloop(deltaTime);
        
        
        stats.end();//Mr Doob's Stats.js
    }
    // render the stage
    renderer.render(stage);
    //request another animate call
    requestAnimFrame(animate);	

    
}



////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/*
Game Loop
*/
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

function gameloop(deltaTime){
    
    //////////////////////
    //update Mouse
    //////////////////////
    mouse_rel = stage.getMousePosition();//gets relative mouse position
    if(mouse_rel.x != -10000)mouse = camera.objectivePoint(mouse_rel);//only set mouse position if the mouse is on the stage
    
    
    //////////////////////
    //Hero Movement and Aim
    //////////////////////
    
    //get raycast for hero aim:
    hero_end_aim_coord = getRaycastPoint(hero.x,hero.y,mouse.x,mouse.y);
    
    //update hero directions based on keys:
    if(keys.w){
        hero.target.y = hero.y - 100;
    }else if(keys.s){
        hero.target.y = hero.y + 100;
    }else hero.target.y = hero.y;
    if(keys.d){
        hero.target.x = hero.x + 100;
    }else if(keys.a){
        hero.target.x = hero.x - 100;
    }else hero.target.x = hero.x;
 
 
    
    //////////////////////
    //update all sprites:
    //////////////////////
    
    //reset graphics_blood:
    graphics_blood.clear();
    graphics_blood.lineStyle(15, 0xb51d1d, 1);
    
    //update effects:
    for(var i = 0; i < static_effect_sprites.length; i++){
        static_effect_sprites[i].prepare_for_draw();
    }
    spark_clip.prepare_for_draw();
    
    //update circularProgressBar:
    if(circProgBar.visible){
        circProgBar.increment(deltaTime);
        circProgBar.prepare_for_draw();
        circProgBar.draw();
    }
    
    //update door:
    for(var i = 0; i < grid.door_sprites.length; i++){
        grid.door_sprites[i].prepare_for_draw();
    }
    
    //////////////////////
    //update Hero
    //////////////////////
    
    hero.aim.set(hero.x,hero.y,hero_end_aim_coord.x,hero_end_aim_coord.y);
    if(hero.masked)hero.draw_gun_shot(hero.aim);//only draw aim line when hero is masked (which means gun is out).
    hero.move_to_target();
    
    if(grid.isTileRestricted_coords(hero.x,hero.y)){
        useMask(true);
    }
    
    //check collisions and prepare to draw walls:
    for(var i = 0; i < grid.cells.length; i++){
        if(grid.cells[i].solid){
            hero.collide(grid.cells[i].v2);
            hero.collide(grid.cells[i].v4);
            hero.collide(grid.cells[i].v6);
            hero.collide(grid.cells[i].v8);
            hero.collide_with_wall_sides(grid.cells[i]);
        }
        
        //draw:
        //grid.cells[i].draw();//debug
        grid.cells[i].prepare_for_draw();
    }
    hero.prepare_for_draw();
    
    if(hero_drag_target)hero.sprite.rotation += Math.PI;//reverse the hero's rotation because he is dragging something.
    
    //////////////////////
    //update Civs
    //////////////////////
    for(var i = 0; i < civs.length; i++){
        if(civs[i].alive){
            //if guard are not already alarmed
            if(!civs[i].alarmed  && !civs[i].being_choked_out){
                //check if civs sees alarming objects:
                for(var j = 0; j < alarmingObjects.length; j++){
                    if(civs[i].doesSpriteSeeSprite(alarmingObjects[j])){
                        newMessage('A civs has seen something alarming!');
                        civs[i].becomeAlarmed(alarmingObjects[j]);
                    }
                }
                //check if civs sees hero:
                if(civs[i].doesSpriteSeeSprite(hero)){
                    if(hero.masked){
                        newMessage('A civs has seen you wearing a mask!');
                        //alarm if hero is seen masked
                        civs[i].becomeAlarmed(hero);
                    }
                    //civs are not alarmed by seeing hero in a restricted area
                    
                }
            }
            //if civs has a path
            if(civs[i].path.length > 0){
                //if civs does not have a target:
                if(civs[i].target.x == null || civs[i].target.y == null){
                    civs[i].target = civs[i].path.shift();//get the first element.
                }
                
            }else{
                //if civs does not have a path:
                if(!civs[i].waiting){
                    civs[i].waiting = true;
                    var how_long_to_wait = Math.floor(Math.random() * 7000) + 1000;
                    setTimeout(function(){
                        this.waiting = false;
                        this.getRandomPatrolPath();//get new path after waiting
                    }.bind(civs[i]),how_long_to_wait);
                }
            }
            //call move to target, if target is reached, it will return true and set target to null
            if(civs[i].move_to_target()){
                civs[i].target.x = null;
                civs[i].target.y = null;
            }
        }
        civs[i].prepare_for_draw();
    }
    
    //////////////////////
    //update Guards
    //////////////////////
    
    for(var i = 0; i < guards.length; i++){
        if(guards[i].alive){
                //shooting
            //guards aim can be off by up to 50 pixels:
            var aim_x_offset = Math.floor(Math.random() * 50);
            var aim_y_offset = Math.floor(Math.random() * 50);
            //only set aim if they are able to shoot again, don't reset aim every loop
            if(guards[i].can_shoot)guards[i].aim.set(guards[i].x,guards[i].y,hero.x+aim_x_offset,hero.y+aim_y_offset);
            //draw the guards gun shot
            guards[i].draw_gun_shot(guards[i].aim);
            
            
            //if guard are not already alarmed
            if(!guards[i].alarmed  && !guards[i].being_choked_out){
                //check if guard sees alarming objects:
                for(var j = 0; j < alarmingObjects.length; j++){
                    if(guards[i].doesSpriteSeeSprite(alarmingObjects[j])){
                        newMessage('A guard has seen something alarming!');
                        guards[i].becomeAlarmed(alarmingObjects[j]);
                    }
                }
                //check if guard sees hero:
                if(!guards[i].being_choked_out && guards[i].doesSpriteSeeSprite(hero)){
                    if(hero.masked){
                        newMessage('A guard has seen you wearing a mask!');
                        //alarm if hero is seen masked
                        guards[i].becomeAlarmed(hero);
                        
                        //set lastSeen for investigating hero
                        hero.setLastSeen();
                    }
                    
                }
            }else{
                //guard is alarmed:
                if(!guards[i].being_choked_out && guards[i].doesSpriteSeeSprite(hero)){
                    //guard is not being choked out and sees hero
                    if(hero.masked && hero.alive){
                        //reset target
                        guards[i].moving = false;
                        guards[i].rotate_to(hero.x,hero.y);
                        if(guards[i].can_shoot){
                            
                            doGunShotEffects(guards[i], false);//plays sound and shows affects
                            
                            guards[i].shoot();//toggles on the visiblity of .draw_gun_shot's line
                            
                            //check if guard aim intersects with hero
                            if(hero.alive && circle_linesetment_intersect(hero.getCircleInfoForUtilityLib(),guards[i].aim.start,guards[i].aim.end)){
                                hero.kill();
                                //make blood splatter:
                                makeBloodSplatter(hero.x,hero.y,guards[i].x,guards[i].y);
                                newMessage("THEY KILLED YOU!!!!!");
                                //remove key handlers so hero can no longer move around
                                removeKeyHandlers();

                            }
            
            
                            
                            
                            
                            
                            
                            
                        }
                        
                        //set lastSeen for investigating hero
                        hero.setLastSeen();
                    }
                }else{
                    //if alarmed move to last place hero was seen
                    if(!guards[i].chasingHero && hero.lastSeenX && hero.lastSeenY){
                        //repath to hero pos
                        guards[i].moving = true;
                        guards[i].pathToCoords(hero.lastSeenX,hero.lastSeenY);
                        guards[i].chasingHero = true;
                    }
                }
            }
            //if guard has a path
            if(guards[i].path.length > 0){
                //if guard does not have a target:
                if(guards[i].target.x == null || guards[i].target.y == null){
                    guards[i].target = guards[i].path.shift();//get the first element.
                }
                
            }else{
                //set the rotation point when guard first starts idling
                if(!guards[i].startedIdling){
                    guards[i].idleRotateRad = guards[i].rad+Math.PI
                    guards[i].startedIdling = true;
                }
                //if guard does not have a path, wait a little while, then move
                var wait_max = 3000;
                var wait_min = 500;
                if(!guards[i].idling){
                    var random_idle = Math.random() * (wait_max - wait_min) + wait_min;
                    //console.log('random idle: ' + random_idle);
                    setTimeout(function(){
                        
                        this.getRandomPatrolPath();
                        //console.log('stop idle');
     
                    }.bind(guards[i]), random_idle);
                }else{
                    //note: if a path is not found and this.path == [], the guard will idle again.
                    //guard idling
                    guards[i].rotate_to(guards[i].idleRotateRad);
                }
                guards[i].idling = true;
                
            }
            //call move to target, if target is reached, it will return true and set target to null
            if(guards[i].move_to_target()){
                guards[i].target.x = null;
                guards[i].target.y = null;
            }
            
        }
        guards[i].prepare_for_draw();
        
        //draw blood trails.
        if(guards[i].blood_trail){
            for(var z = 20, j = 1; j > 0; z += 20, j -= 0.04){
                //decrease the alpha for every 40 points on the path
                var min = z-22;
                if(min < 0)min = 0;
                var path = guards[i].blood_trail.slice(min,z);
                graphics_blood.lineStyle(15, 0xb51d1d, j);
                graphics_blood.drawPath(path);
            }
        }
    }
    
    //prepare blood layer for draw:
    prepare_for_draw_blood();
    
    
    
    //////////////////////
    //Security Cameras
    //////////////////////
    for(var i = 0; i < security_cameras.length; i++){
        
        if(!cameras_disabled && security_cameras[i].alive){
            security_cameras[i].swivel();
            
            
            //if security_cameras are not already alarmed
            if(!security_cameras[i].alarmed){
                //check if security_cameras[i] sees alarming objects:
                for(var j = 0; j < alarmingObjects.length; j++){
                    if(security_cameras[i].doesSpriteSeeSprite(alarmingObjects[j])){
                        newMessage('A security camera has seen something alarming!');
                        security_cameras[i].becomeAlarmed(alarmingObjects[j]);
                    }
                }
                //check if security_camera sees hero:
                if(security_cameras[i].doesSpriteSeeSprite(hero)){
                    //alarm if hero is seen masked
                    if(hero.masked){
                        newMessage('A security camera has seen you wearing a mask!');
                        security_cameras[i].becomeAlarmed(hero);
                        
                        //set lastSeen for investigating hero
                        hero.setLastSeen();
                        
                        
                        
                    }
                }
            }
        }
        security_cameras[i].prepare_for_draw();
    }
    
    computer_for_security_cameras.prepare_for_draw();
    
    
    //////////////////////
    //Getaway Car and Loot
    //////////////////////
    getawaycar.prepare_for_draw();
    for(var i = 0; i < loot.length; i++){
        loot[i].prepare_for_draw();
    }

     //////////////////////
    //Doors
    //////////////////////
    for(var d = 0; d < grid.door_sprites.length; d++){
        var door_inst = grid.door_sprites[d];
        //door is anchored at top, so account for offset when checking distance
        var door_center_y_offset = 32;
        var door_center_x_offset = 0;
        if(door_inst.horizontal){
            door_center_y_offset = 0;
            door_center_x_offset = -32;
        }
        door_inst.openerNear = false; 
        for(var g = 0; g < guards.length; g++){
        //check if any guard is near door_inst, open door_inst:
            //this radius is very important!  If door_inst doesn't detect unit close enough, the "wall" tile that it is on will be solid and unit won't be able to get close enough
            if(get_distance(door_inst.x+door_center_x_offset,door_inst.y+door_center_y_offset,guards[g].x,guards[g].y) <= guards[g].radius*4){
               door_inst.openerNear = true;
            }
        }
        //if hero can open door_inst:
        //this radius is very important!  If door_inst doesn't detect unit close enough, the "wall" tile that it is on will be solid and unit won't be able to get close enough
        if(door_inst.unlocked && get_distance(door_inst.x+door_center_x_offset,door_inst.y+door_center_y_offset,hero.x,hero.y) <= hero.radius*4){
           door_inst.openerNear = true;
        }
        if(door_inst.openerNear){
            door_inst.open();
        
        }else{
            door_inst.close();
        
        }
    }
    
    //////////////////////
    //Drag Target
    //////////////////////
    //show tooltip if hero is close enough to drag a guard:
    var tooltipshown = false;  //hero is not close enough to any guards, toggle visiblity off.
    for(var i = 0; i < guards.length; i++){
        if(hero.masked && guards[i].alive  && !guards[i].being_choked_out && get_distance(hero.x,hero.y,guards[i].x,guards[i].y) <= hero.radius*dragDistance){
            tooltip.visible = true;
            tooltipshown = true;
            tooltip.setText("[Space]");
            tooltip.objX = guards[i].x;
            tooltip.objY = guards[i].y - 32;
        }
    }
    if(!tooltipshown)tooltip.visible = false;
    
    //move sprite/item which the hero is dragging.
    if(hero_drag_target){
        hero_drag_target.target = {x: hero.x , y: hero.y};//the drag target is "following" the hero.
        hero_drag_target.get_dragged();
        //leaves blood trail behind as you drag.
        if(hero_drag_target.blood_trail){
            var len = hero_drag_target.blood_trail.length;
            if(Math.abs(hero_drag_target.blood_trail[len-2]-hero_drag_target.x)>1 || Math.abs(hero_drag_target.blood_trail[len-1]-hero_drag_target.y)>1){
                hero_drag_target.blood_trail.push(hero_drag_target.x);//[0]:initial coords.x
                hero_drag_target.blood_trail.push(hero_drag_target.y);//[1]:initial coords.y
             }
        }
    }
    
    //////////////////////
    //Tooltip
    //////////////////////
        //I didn't want to create a whole new class for tooltip so I'm using a shorthand of prepare_for_draw
        //and I added two new memebers to the PIXI.Text object (objX and objY)
    var objPos = camera.relativePoint({x:tooltip.objX,y:tooltip.objY});
    tooltip.x = objPos.x;
    tooltip.y = objPos.y;
    
    //////////////////////
    //Camera
    //////////////////////
    
    //loose camera
    camera.x = hero.x + (mouse.x - hero.x)/look_sensitivity;
    camera.y = hero.y + (mouse.y - hero.y)/look_sensitivity;
    /*The below commented block is for smooth camera
    //press space to look around
    if(keys['space']){
        //camera floats between hero and mouse
        //smooth camera
        camera.following = true;
        camera.target = {x: hero.x + (mouse.x - hero.x)/2, y: hero.y + (mouse.y - hero.y)/2};
    }else{
        //set camera target to hero
        if(camera.following){
            //return to hero
            camera.target = hero;
        }else{
            //stick to hero
            camera.x = hero.x; 
            camera.y = hero.y;
        }
    }
    //if the camera is set to following, move it to target, otherwise, don't because it is sticking to target.
    if(camera.following && camera.move_to_target()){
        if(camera.target == hero){
            camera.following = false;//when camera reaches it's target, turn off following so it can just stick.
        }
    }*/
    
    //////////////////////
    //Zoom / Scale
    //////////////////////
    //this code allows the zoom / scale to change smoothly based on the mouse wheel input
    if(stage_child.scale.x < zoom - 0.05){//the 0.05 is close enough to desired value to stop so the zoom doesn't bounce back and forth.
        stage_child.scale.x += zoom_magnitude;
        stage_child.scale.y += zoom_magnitude;
        stage_child.position.x = window_properties.width*(1-stage_child.scale.x)/2;
        stage_child.position.y = window_properties.height*(1-stage_child.scale.y)/2;
    }else if(stage_child.scale.x > zoom + 0.05){//the 0.05 is close enough to desired value to stop so the zoom doesn't bounce back and forth.
        stage_child.scale.x -= zoom_magnitude;
        stage_child.scale.y -= zoom_magnitude;
        stage_child.position.x = window_properties.width*(1-stage_child.scale.x)/2;
        stage_child.position.y = window_properties.height*(1-stage_child.scale.y)/2;
    
    }
    
    
    

}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/*
Key Handlers
*/
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
function addKeyHandlers(){
    window.onkeydown = function(e){
        var code = e.keyCode ? e.keyCode : e.which;
        //keyinfo[code] = String.fromCharCode(code);
        if(code == 87){keys['w'] = true;}
        if(code == 65){keys['a'] = true;}
        if(code == 83){keys['s'] = true;}
        if(code == 68){keys['d'] = true;}
        if(code == 86){
            // !keys['v'] makes it so that it will only be called once for a single press of the letter
            if(!hero.carry && !keys['v']){
                //hero cannot remove mask while carrying loot
                circProgBar.heroMaskProg(2000,useMask,!hero.masked);
            }
            keys['v'] = true;
        }
        if(code == 16){
            keys['shift'] = true;
            //cannot sprint while dragging something
            if(!hero_drag_target){
                hero.speed = hero.speed_sprint;
            }
        
        }
        if(code == 27){
            //esc
            startMenu();
        }
        if(code == 32){
            keys['space'] = true;
            if(!hero_drag_target){
                //check if any dead guards are close enough to be dragged.
                for(var i = 0; i < guards.length; i++){
                    if(get_distance(hero.x,hero.y,guards[i].x,guards[i].y) <= hero.radius*dragDistance){
                        if(!guards[i].alive){
                            //hero is dragging a dead body
                            
                            //slow down hero speed because he just started dragging something.
                            hero.speed = hero.speed/2;
                            hero_drag_target = guards[i];
                            hero_drag_target.speed = hero.speed;
                            hero_drag_target.stop_distance = hero.radius*2;//I don't know why but the stop distance here seems to need to be bigger by a factor of 10
                            return;
                        }else if(hero.masked && !guards[i].alarmed){
                            //hero is choking out a live guard who is not already alarmed:
                            newMessage('You are choking out a guard!');
                            play_sound(sound_guard_choke);
                            
                            guards[i].moving = true;
                            guards[i].path = [];
                            guards[i].target = {x: null, y:null}; 
                            guards[i].being_choked_out = true;
                            //slow down hero speed because he just started dragging something.
                            hero.speed = hero.speed_walk/2;
                            hero_drag_target = guards[i];
                            hero_drag_target.speed = hero.speed;
                            hero_drag_target.stop_distance = hero.radius*2;//I don't know why but the stop distance here seems to need to be bigger by a factor of 10
                            setTimeout(function(){
                                //check that the guard is still being choked out, if not, he's not dead so don't kill() him
                                if(hero_drag_target == this){
                                    newMessage('The guard is dispached!');
                                    this.kill();
                                    //if space isn't still being held release body:
                                    if(!keys['space']){
                                        //drag is a toggle action so release current drag target.
                                        hero_drag_target = null;
                                        //bring hero speed back to normal
                                        hero.speed = hero.speed_walk;
                                    }
                                }
                            }.bind(guards[i]), 3000);
                            return;
                        }

                    }
                    
                        
                    
                }
                //note: dragging guards takes precedence over all the following actions.
                
                //check if hero is close enough to the security camera computer to disable cameras:
                if(get_distance(hero.x,hero.y,computer_for_security_cameras.x,computer_for_security_cameras .y) <= hero.radius*4){
                    cameras_disabled = true;
                    newMessage('All security cameras have been disabled!');
                    computer_for_security_cameras.sprite.setTexture(img_computer_off);
                }
                if(hero.masked){
                    //hero must be masked to lockpick:
                    if(!grid.a_door_is_being_unlocked){
                        for(var i = 0; i < grid.doors.length; i++){
                            if(grid.doors[i].solid && get_distance(hero.x,hero.y,grid.doors[i].x+grid.cell_size/2,grid.doors[i].y+grid.cell_size/2) <= hero.radius*5){
                                //if door isn't solid, then it is already unlocked.
                                grid.a_door_is_being_unlocked = true;
                                
                                //timer
                                var unlockTimeRemaining = 5000;
                                circProgBar.reset(grid.doors[i].x+grid.cell_size/2,grid.doors[i].y+grid.cell_size/2,unlockTimeRemaining,grid.door_sprites[i].unlock.bind(grid.door_sprites[i]));
                                
                                return;//unlocking doors succeeds loot interactions.  (Hero can unlock door while holding loot).
                            }
                        }
                    }
                    //hero must be masked to interact with loot
                    if(!hero.carry){
                        //check if hero is close enough to the loot to pick it up
                        for(var i = 0; i < loot.length; i++){
                            if(get_distance(hero.x,hero.y,loot[i].x,loot[i] .y) <= hero.radius*2){
                                hero.carry = loot[i];
                                loot[i].sprite.visible = false;
                                hero.sprite.setTexture(img_hero_with_money);
                                newMessage("You've got the money!  Get it to the escape vehicle!");
                                break;
                            }
                        }
                        
                    //hero is already carring loot, drop it
                    }else if(!grid.a_door_is_being_unlocked){
                        console.log("ggg: " + getawaycar.radius*5 + " " + get_distance(hero.x,hero.y,getawaycar.x,getawaycar.y));
                        //Note on if statement: unlocking doors succeeds loot interactions.  (Hero can unlock door while holding loot).
                        if(get_distance(hero.x,hero.y,getawaycar.x,getawaycar.y) <= getawaycar.radius*5){
                            //deposite money in car:
                            newMessage("The money is safe!");
                            //add button for win condition
                            addButton("menu.png","menu2.png",startMenu);
                        }else{
                            //just drop money:
                            hero.carry.sprite.visible = true;
                            hero.carry.x = hero.x;
                            hero.carry.y = hero.y;
                        }
                        hero.carry = null;
                        hero.sprite.setTexture(img_masked);
                    }
                    
                    
                }
            }
            
        }
        
    };
    window.onkeyup = function(e){
        var code = e.keyCode ? e.keyCode : e.which;
        if(code == 87){keys['w'] = false;}
        if(code == 65){keys['a'] = false;}
        if(code == 83){keys['s'] = false;}
        if(code == 68){keys['d'] = false;}
        if(code == 86){keys['v'] = false;}
        if(code == 16){
            keys['shift'] = false;
            hero.speed = hero.speed_walk;
        }
        if(code == 32){
            keys['space'] = false;
            //if hero was dragging something, drop it. (Don't drop a guard while he's being choked
            if(hero_drag_target && !hero_drag_target.alive){
                //drag is a toggle action so release current drag target.
                hero_drag_target = null;
                //bring hero speed back to normal
                hero.speed = hero.speed_walk;
            }
            grid.a_door_is_being_unlocked = false;//unlocking stops when space is released
            circProgBar.stop();
        }
        
    };
    // IE9, Chrome, Safari, Opera
    window.addEventListener("mousewheel", mouseWheelHandler, false);
    // Firefox
    window.addEventListener("DOMMouseScroll", mouseWheelHandler, false);
    function mouseWheelHandler(e){
        // cross-browser wheel delta
        var e = window.event || e; // old IE support
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        
        //limit amount that cam can zoom out
        if(delta < 0 && zoom > 0.1){
            zoom += delta * 0.05;
        }else if (delta >0){
            zoom += delta * 0.05;
        }
    }
    onmousedown = function(e){
        //you can only shoot if hero is masked
        if(hero.masked){
            doGunShotEffects(hero, true);//plays sound and shows affects
            
            //toggles on the visiblity of .draw_gun_shot's line
            hero.shoot();
            //shoot_gun();//make noise (not real sound, but noise for guards) which draws guards
            mouse_click_obj = camera.objectivePoint(e);  //uses e's .x and .y to find objective click
            
            //what happens on mouse click:
            
            
            //check if hero aim intersects guard:
            for(var i = 0; i < guards.length; i++){
                if(guards[i].alive && circle_linesetment_intersect(guards[i].getCircleInfoForUtilityLib(),hero.aim.start,hero.aim.end)){
                    guards[i].kill();
                    //make blood splatter:
                    makeBloodSplatter(guards[i].x,guards[i].y,hero.x,hero.y);
                    //make blood trail:
                    guards[i].blood_trail = [guards[i].x,guards[i].y];
                    //make sure the dead body sprite is on top of the blood trail:
                    display_actors.removeChild(guards[i].sprite);
                    display_actors.addChild(guards[i].sprite);
                    
                    if(guards[i].alarmed)newMessage("You dispatch the guard before he can get the word out!");

                }
            
            }
            //check if hero aim intersects civs:
            for(var i = 0; i < civs.length; i++){
                if(civs[i].alive && circle_linesetment_intersect(civs[i].getCircleInfoForUtilityLib(),hero.aim.start,hero.aim.end)){
                    civs[i].kill();
                    if(civs[i].alarmed)newMessage("You dispatch the civilian before he can get the word out!");

                }
            
            }
            //check if hero aim intersects camera:
            for(var i = 0; i < security_cameras.length; i++){
                if(circle_linesetment_intersect(security_cameras[i].getCircleInfoForUtilityLib(),hero.aim.start,hero.aim.end)){
                    security_cameras[i].kill();
                }
            
            }
        }

    }
}
function removeKeyHandlers(){

    keys = {w: false, a: false, s: false, d: false, v: false, space:false, shift:false};
    window.onkeydown = null;
    window.onkeyup = null;
    window.removeEventListener("mousewheel");
    window.removeEventListener("DOMMouseScroll");
    onmousedown = null;
}
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/*
Other
*/
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
function newMessage(mess){
    //console.log(mess);
    messageText.push(mess);
    setTimeout(function(){
        messageText.shift();
        updateMessage();
    },7000);
    updateMessage();
}
function updateMessage(){
    var textForMessage = "";
    for(var i = 0; i < messageText.length; i++){
        textForMessage += messageText[i] + "\n";
    }
    message.setText(textForMessage);
};
function alert_all_guards(){
    for(var z = 0; z < guards.length; z++){
        //alert the other living guards
        if(guards[z].alive)guards[z].hearAlarm();
    }
    //spawn backup:
    for(var backup = 0; backup < numOfBackupGuards; backup++){
        setTimeout(function(){
            var newGuard = new sprite_guard_wrapper(new PIXI.Sprite(img_orange));
            newGuard.x = guard_backup_spawn.x;
            newGuard.y = guard_backup_spawn.y;
            if(newGuard.alive)newGuard.hearAlarm();
            guards.push(newGuard);
            newMessage("The police have arrived!");
        },1000*backup);//wait an extra second for each guard
    }
    
            //
}
function shoot_gun(){
    console.log('old method');
    //makes a sound and draws all guards:
    for(var i = 0; i < guards.length; i++){
        guards[i].hearAlarm();
        var hero_index = grid.getIndexFromCoords_2d(hero.x,hero.y);
        var guard_index = grid.getIndexFromCoords_2d(guards[i].x,guards[i].y);
        var path = grid.getPath(guard_index,hero_index);
        guards[i].path = path;
    }
}
function prepare_for_draw_blood(){
    var draw_coords = camera.relativePoint({x:0,y:0});//0,0 because blood_holder does not consider its sprite
    blood_holder.x = draw_coords.x;
    blood_holder.y = draw_coords.y;
}
function makeBloodSplatter(atX,atY,pointAtX,pointAtY){
    var img = img_blood_splatter;
    //the below line has a 50% chance of reassigning the image
    var roll = [true,false][Math.round(Math.random())];
    if(roll){
        img = img_blood_splatter2;
    }
    var blood_splatter = new jo_sprite(new PIXI.Sprite(img),display_effects);
    blood_splatter.x = atX;
    blood_splatter.y = atY;
    blood_splatter.rotate_to_instant(pointAtX,pointAtY);
    static_effect_sprites.push(blood_splatter);//add to array of still effects
    alarmingObjects.push(blood_splatter);//add bloodsplatter to alarming objects so if it is see they will sound alarm
}
function useMask(toggle){
    hero.masked = toggle;
    if(toggle){
        if(hero.carry){
            //mask and bag of money
            hero.sprite.setTexture(img_hero_with_money);
        }else{
            //put on mask
            hero.sprite.setTexture(img_masked);
        }
        //switch music
        if(music_masked && music_unmasked){
            music_masked.volume = 0.4;
            music_unmasked.volume = 0.0;
        }
    }else{
        //take off mask
        hero.sprite.setTexture(img_blue);
        //switch music
        if(music_masked && music_unmasked){
            music_masked.volume = 0.0;
            music_unmasked.volume = 1.0;
        }
        
    }
}

//plays sound and shows affects
function doGunShotEffects(unit, silenced){
    //gun_shot sound:
    if(silenced)play_sound(sound_gun_shot_silenced);
    else{
        play_sound_many(sound_gun_shots);
    }
    //play gun spark against wall where gun shot hits:
    spark_clip.x = unit.aim.end.x;
    spark_clip.y = unit.aim.end.y;
    spark_clip.rotate_to_instant(unit.x,unit.y);
    spark_clip.sprite.gotoAndPlay(0);
}
//Mr. Doob's Stats.js
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );

