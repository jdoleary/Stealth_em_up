/*******************************************************\
Copyright 2014,2015, Jordan O'Leary, All rights reserved.
If you would like to copy or use my code, you may contact
me at jdoleary@gmail.com
/*******************************************************/
//also referred to as "cell"

var img_tile_black = "tile_black.png";
var img_tile_white = "tile_white.png";
var img_tile_brown = "tile_brown.png";
var img_doodad_paper = "papers.png";
var img_doodad_lamp = "lamp.png";
var img_tile_red = "tile_red.png";

function jo_wall(image_number,solid,blocks_vision,restricted,vertices){
    /*
    To be able to build walls dynamically they will be made of points
    Grid cells around the cell that the wall is in will only check against 
    the specific point which applies to that particular cell.
    8 1 2
    7 w 3
    6 5 4
    For example, cell 2 will only need to check against vertex 2
    
    */
    //yes, v8 is index 0 because I normally think of corner order in 8246 based on
    //the above illustration
    this.solid = solid;//if true, hero cannot walk through the wall
    this.blocks_vision = blocks_vision;//enemies cannot see / shoot through wall which blocks vision
    this.restricted = restricted; //the hero will cause alert if he is seen on a restricted tile even unmasked.
    this.door = false;
    
    this.v8 = vertices[0];
    this.v2 = vertices[1];
    this.v4 = vertices[2];
    this.v6 = vertices[3];
    if(this.v2.x < 0 || this.v2.y < 0) throw new Error("Walls cannot be placed in negative space!");
    if(this.v4.x < 0 || this.v4.y < 0) throw new Error("Walls cannot be placed in negative space!");
    if(this.v6.x < 0 || this.v6.y < 0) throw new Error("Walls cannot be placed in negative space!");
    if(this.v8.x < 0 || this.v8.y < 0) throw new Error("Walls cannot be placed in negative space!");
    
    //for drawing image
    this.x = this.v8.x;
    this.y = this.v8.y;
    switch(image_number) {
        case 0:
            var sprite = new PIXI.Sprite.fromImage(img_tile_black);
            break;
        case 1:
            var sprite = new PIXI.Sprite.fromImage(img_tile_white);
            break;
        case 2:
            var sprite = new PIXI.Sprite.fromImage(img_tile_brown);
            var random_tile = Math.round(Math.random() * (10 - 1) + 1);
            var sprite_doodad;
            if(random_tile==1 || random_tile==3){
                sprite_doodad = new PIXI.Sprite.fromImage(img_doodad_paper);
            }else if(random_tile==2){
                sprite_doodad = new PIXI.Sprite.fromImage(img_doodad_lamp);
            }
            
            //PROBLEM HERE
            //if(display_actors && sprite_doodad)new jo_doodad(sprite_doodad,display_actors,this.x,this.y);
            /*var random_rot = Math.round(Math.random() * (4 - 1) + 1);
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            
            switch(random_rot){
                case 1:
                    sprite.rotation = Math.PI/2;
                    break;
                case 2:
                    sprite.rotation = Math.PI;
                    break;
                case 3:
                    sprite.rotation = 3*Math.PI/2;
                    break;
                case 4:
                    sprite.rotation = 2*Math.PI;
                    break;
            }
            sprite.anchor.x = 0.0;
            sprite.anchor.y = 0.0;*/
            
            break;
        case 3:
        case 4:
            var sprite = new PIXI.Sprite.fromImage(img_tile_red);
            break;
            
    }
    this.image_sprite = sprite;
    //tile_container.addChild(this.image_sprite);//caused fps drops because you can't have different sprites in a sprite batcher
    tile_containers[image_number].addChild(sprite);
    
    
    this.graphics = new PIXI.Graphics();
    //stage_child.addChild(this.graphics);
    this.draw = function(){
        //draw wall with debug lines
        var v2_ob = camera.relativePoint(this.v2);
        var v4_ob = camera.relativePoint(this.v4);
        var v6_ob = camera.relativePoint(this.v6);
        var v8_ob = camera.relativePoint(this.v8);
        
        
        this.graphics.clear();//without clear it wont erase the debug shape from previous frame.
        this.graphics.lineStyle(2, 0xFF0000, 1);
		this.graphics.moveTo(v2_ob.x, v2_ob.y);
		this.graphics.lineTo(v4_ob.x, v4_ob.y);
		this.graphics.lineTo(v6_ob.x, v6_ob.y);
		this.graphics.lineTo(v8_ob.x, v8_ob.y);
		this.graphics.lineTo(v2_ob.x, v2_ob.y);
    
    };
    this.prepare_for_draw = function(){
        var draw_coords = camera.relativePoint(this);
        this.image_sprite.position.x = draw_coords.x;
        this.image_sprite.position.y = draw_coords.y;
    };
    
    
    //Corresponding door_sprite is responsible for opening and closing this "door"
    //these two functions don't affect the door sprite only the door tile:
    this.openDoor = function(){
        this.solid = false;
        this.blocks_vision = false;
    
    }
    this.closeDoor = function(){
        this.solid = true;
        this.blocks_vision = true;
    
    }
    
}