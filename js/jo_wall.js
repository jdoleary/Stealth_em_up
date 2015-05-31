/*******************************************************\
Copyright 2014,2015, Jordan O'Leary, All rights reserved.
If you would like to copy or use my code, you may contact
me at jdoleary@gmail.com
/*******************************************************/
//also referred to as "cell"
var walls = {
    black:{
        "corner":"images/wall_black_corner.png",
        "long":"images/wall_black_long.png",
        "T":"images/wall_black_T.png",
        "single":"images/wall_black_single.png",
        "edge":"images/wall_black_edge.png",
        "four":"images/wall_black_four.png",
    }
};
var img_tile_black = "images/tile_black.png";
var img_tile_white = "images/tile_white.png";
var img_tile_red = "images/tile_red.png";
var img_tile_brown = "images/tile_brown.png";
/*
var img_doodad_paper = "images/papers.png";
var img_doodad_lamp = "images/lamp.png";*/

function jo_wall(image_number,solid,blocks_vision,restricted,vertices,grid_index_x,grid_index_y){
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
    this.image_number = image_number; //for keeping track of the type of cell image
    this.rotate_sprite;//for rotating the wall sprite because the tile sheet only contains one orientation.
    
    //for new images:
    this.grid_index_x = grid_index_x;
    this.grid_index_y = grid_index_y;
    this.offsetX = 0;
    this.offsetY = 0;
    
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
    
    this.changeImage = function(image_number_p){
        
        //remove previous sprite
        if(this.image_sprite!=undefined)tile_containers[this.image_number].removeChild(this.image_sprite);
        
        switch(image_number_p) {
        case 0:
            //var sprite = new PIXI.Sprite(img_tile_black);
            //var sprite = new PIXI.Sprite.fromImage(img_tile_black);
            var imgPath = walls.black[this.findWallType()];
            var sprite = new PIXI.Sprite.fromImage(imgPath);
            if(this.rotate_sprite){
                sprite.rotation = this.rotate_sprite;
                if(this.rotate_sprite == Math.PI/2)this.offsetX = 64;
                if(this.rotate_sprite == -Math.PI/2)this.offsetY = 64;
                if(this.rotate_sprite == Math.PI){
                    this.offsetX = 64;
                    this.offsetY = 64;
                }
            }
            break;
        case 1:
            //var sprite = new PIXI.Sprite(img_tile_white);
            var sprite = new PIXI.Sprite.fromImage(img_tile_white);
            break;
        case 2:
            //var sprite = new PIXI.Sprite(img_tile_brown);
            var sprite = new PIXI.Sprite.fromImage(img_tile_brown);
            var random_tile = Math.round(Math.random() * (10 - 1) + 1);
            var sprite_doodad;
            if(random_tile==1 || random_tile==3){
                sprite_doodad = new PIXI.Sprite(img_doodad_paper);
                //sprite_doodad = new PIXI.Sprite.fromImage(img_doodad_paper);
            }else if(random_tile==2){
                sprite_doodad = new PIXI.Sprite(img_doodad_lamp);
                //sprite_doodad = new PIXI.Sprite.fromImage(img_doodad_lamp);
            }
            
            if(display_actors && sprite_doodad)new jo_doodad(sprite_doodad,display_actors,this.x,this.y);
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
            //var sprite = new PIXI.Sprite(img_tile_red);
            var sprite = new PIXI.Sprite.fromImage(img_tile_red);
            break;
            
        }
        this.image_sprite = sprite;
        
        tile_containers[image_number_p].addChild(sprite);
    }
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
        this.image_sprite.position.x = this.x+this.offsetX;
        this.image_sprite.position.y = this.y+this.offsetY;
    };
    
    this.findWallType = function(){
        //corner,long,T,single,edge,four
        var count_of_walls = 0;
        var north = grid.getCellFromIndex(this.grid_index_x,this.grid_index_y-1);
        var south = grid.getCellFromIndex(this.grid_index_x,this.grid_index_y+1);
        var east = grid.getCellFromIndex(this.grid_index_x+1,this.grid_index_y);
        var west = grid.getCellFromIndex(this.grid_index_x-1,this.grid_index_y);
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
    
    
    this.graphics = new PIXI.Graphics();
    //stage_child.addChild(this.graphics);
    
}