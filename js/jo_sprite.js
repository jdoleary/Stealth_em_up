function jo_sprite(pixiSprite, parent){
    //utility variables, these do not affect the actual sprite, but are used for camera and such, see prepare_for_draw()
    this.x = 0;
    this.y = 0;
    this.rad = 0;//radians (rotation)
    this.target = {x: null, y:null};//the target that this sprite moves twords
    this.speed = 1.5;
    this.moving = true;
    this.alive = true;
    this.radius = 19;
    this.carry = null;//object hero is carrying (loot)
    
    this.gun_shot_line = new debug_line();
    this.gun_shot_line.graphics.visible = false;
    this.aim = new Ray(0,0,0,0);
    this.can_shoot = true;
    this.shoot_speed = 700;//shoots every 0.7 seconds
    
    this.sprite = pixiSprite;
    //center the image:
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    if(parent)parent.addChild(this.sprite);
	else display_actors.addChild(this.sprite);
    
    this.kill = function(){
        //play_sound(sound_unit_die);
        this.alive = false;
        this.target = {x: null, y:null};
    }
    
    this.shoot = function(){
        //make bullet (all assets in main.js):
        var bullet = new jo_sprite(new PIXI.Sprite(img_bullet));
        bullet.ignore = this;//don't kill the shooter with own bullet
        bullet.x = this.x;
        bullet.y = this.y;
        bullet.target = getRaycastPoint(this.x,this.y,this.aim.end.x,this.aim.end.y);
        bullet.rotate_to_instant(bullet.target.x,bullet.target.y);
        bullet.speed = 50;
        bullet.stop_distance = 30;
        bullets.push(bullet);
        
        //end make bullet
        
        
        this.rotate_to_instant(bullet.target.x,bullet.target.y);
        //shows gun_shot_line
        //this.gun_shot_line.graphics.visible = true;
        this.can_shoot = false; //so the guards don't shoot way too fast
        setTimeout(function(){
            //allow sprite to shoot again.
            this.can_shoot = true;
        }.bind(this),this.shoot_speed);
        //toggle gun_shot_line visibility.
        /*setTimeout(function(){
            this.gun_shot_line.graphics.clear();
            this.gun_shot_line.graphics.visible = false;//turn off gunshot after .5 seconds
        }.bind(this),50);*/
    }
    this.draw_gun_shot = function(ray){
        this.gun_shot_line.draw_Ray(ray);
    }

    this.stop_distance = 1.5; //Distance to stop from target.
    this.move_to_target = function(){
        //this function uses similar triangles with sides a,b,c and A,B,C where c and C are the hypotenuse
        //the movement of this.x and this.y (a,b) are found with the formulas: A/C = a/c and B/C = b/c
        if(this.target.x == null || this.target.y == null )return;//no target
        var a,b;
        var c = this.speed;
        var A = this.target.x-this.x;
        var B = this.target.y-this.y;
        var C = Math.sqrt(A*A+B*B);
        if(C<this.stop_distance){        
            return true; // the object is close enough that it need not move
        }
        a = c*A/C;
        b = c*B/C;
        if(this.moving){
            //only move the sprite if they are set to moving, for example when guards see hero they will stop in their tracks
            this.x += a;
            this.y += b;
        }
        //rotate to face direction of movement
        var newRad = Math.atan2(b,a);
        var diff = newRad - this.rad;
        if(Math.abs(diff) <= 0.1)this.rad = newRad;
        else if(diff > Math.PI)this.rad -= 0.1;
        else if(diff < -Math.PI)this.rad += 0.1;
        else if(diff < 0)this.rad -= 0.1;
        else if(diff > 0)this.rad += 0.1;
        if(this.rad < Math.PI)this.rad += Math.PI*2; //keep it between -PI and PI
        if(this.rad > Math.PI)this.rad -= Math.PI*2; //keep it between -PI and PI
        
    };
    
    this.rotate_to = function(x,y){
        //this function uses similar triangles with sides a,b,c and A,B,C where c and C are the hypotenuse
        //the movement of this.x and this.y (a,b) are found with the formulas: A/C = a/c and B/C = b/c
        if(x == null || y == null )return;//no target
        var a,b;
        var c = this.speed;
        var A = x-this.x;
        var B = y-this.y;
        var C = Math.sqrt(A*A+B*B);
        if(C<this.stop_distance){        
            return true; // the object is close enough that it need not move
        }
        a = c*A/C;
        b = c*B/C;
        
        //rotate to face direction of movement
        var newRad = Math.atan2(b,a);
        var diff = newRad - this.rad;
        if(Math.abs(diff) <= 0.1)this.rad = newRad;
        else if(diff > Math.PI)this.rad -= 0.1;
        else if(diff < -Math.PI)this.rad += 0.1;
        else if(diff < 0)this.rad -= 0.1;
        else if(diff > 0)this.rad += 0.1;
        if(this.rad < Math.PI)this.rad += Math.PI*2; //keep it between -PI and PI
        if(this.rad > Math.PI)this.rad -= Math.PI*2; //keep it between -PI and PI
        
    };
    this.rotate_to = function(rad){
    
        //sanitize:
        if(rad >= Math.PI*2)rad = rad%Math.PI*2;
        if(rad <= Math.PI*2)rad = rad%Math.PI*2;
        //console.log('rot from' + Math.round(this.rad*360/(Math.PI*2)) + ' to ' + Math.round(rad*360/(Math.PI*2)));
        
        //rotate to face direction of movement
        var diff = rad - this.rad;
        var rotSpeed = 0.01;
        if(Math.abs(diff) <= rotSpeed*3)this.rad = rad;
        else if(diff > Math.PI)this.rad -= rotSpeed;
        else if(diff < -Math.PI)this.rad += rotSpeed;
        else if(diff < 0)this.rad -= rotSpeed;
        else if(diff > 0)this.rad += rotSpeed;
        if(this.rad < Math.PI)this.rad += Math.PI*2; //keep it between -PI and PI
        if(this.rad > Math.PI)this.rad -= Math.PI*2; //keep it between -PI and PI
        
    };

    
    //instantly rotate to target (not incrementally)
    this.rotate_to_instant = function(x,y){
        //this function uses similar triangles with sides a,b,c and A,B,C where c and C are the hypotenuse
        //the movement of this.x and this.y (a,b) are found with the formulas: A/C = a/c and B/C = b/c
        if(x == null || y == null )return;//no target
        var a,b;
        var c = this.speed;
        var A = x-this.x;
        var B = y-this.y;
        var C = Math.sqrt(A*A+B*B);
        if(C<this.stop_distance){        
            return true; // the object is close enough that it need not move
        }
        a = c*A/C;
        b = c*B/C;
        
        //rotate to face direction of movement
        var newRad = Math.atan2(b,a);
        this.rad = newRad;
        if(this.rad < Math.PI)this.rad += Math.PI*2; //keep it between -PI and PI
        if(this.rad > Math.PI)this.rad -= Math.PI*2; //keep it between -PI and PI
        
    };
    
    this.get_dragged = function(){
        //get_dragged is the same as move_to_target except with extra rotation code
    
        //this function uses similar triangles with sides a,b,c and A,B,C where c and C are the hypotenuse
        //the movement of this.x and this.y (a,b) are found with the formulas: A/C = a/c and B/C = b/c
        if(this.target.x == null || this.target.y == null )return;//no target
        var a,b;
        var c = this.speed;
        var A = this.target.x-this.x;
        var B = this.target.y-this.y;
        var C = Math.sqrt(A*A+B*B);
        if(C<this.stop_distance){        
            return true; // the object is close enough that it need not move
        }
        a = c*A/C;
        b = c*B/C;
        if(this.moving){
            //only move the sprite if they are set to moving, for example when guards see hero they will stop in their tracks
            this.x += a;
            this.y += b;
        }
        //rotate to face direction of movement
        var newRad = Math.atan2(b,a) + Math.PI;
        if(newRad < Math.PI)newRad += Math.PI*2; //keep it between -PI and PI
        if(newRad > Math.PI)newRad -= Math.PI*2; //keep it between -PI and PI
        
        var diff = newRad - this.rad;
        if(Math.abs(diff) <= 0.1)this.rad = newRad;
        else if(diff > Math.PI)this.rad -= 0.1;
        else if(diff < -Math.PI)this.rad += 0.1;
        else if(diff < 0)this.rad -= 0.1;
        else if(diff > 0)this.rad += 0.1;
        if(this.rad < Math.PI)this.rad += Math.PI*2; //keep it between -PI and PI
        if(this.rad > Math.PI)this.rad -= Math.PI*2; //keep it between -PI and PI
        
    }
    
    this.doesSpriteSeeSprite = function(otherSprite){
        //Check if this sprite sees otherSprite
        var visionConeAngleForotherSprite = this.angleBetweenSprites_relativeToThis(otherSprite);
        if(visionConeAngleForotherSprite <= 1.22 && visionConeAngleForotherSprite >= -1.22){
            //if the otherSprite is within the guard's vision cone (1.22 rad ~== 70 degrees)
            //then this sprite will turn red, face otherSprite, and stop moving
            //the otherSprite then only has a few seconds before guard calls backup
            
            //but only if there are no walls between them:
            var raycast = getRaycastPoint(this.x,this.y,otherSprite.x,otherSprite.y);
            if(get_distance(this.x,this.y,raycast.x,raycast.y)>=get_distance(this.x,this.y,otherSprite.x,otherSprite.y)){
                return true;
            }else return false;
        }else return false;
    
    };
    this.prepare_for_draw = function(){
        var draw_coords = camera.relativePoint(this);
        this.sprite.position.x = draw_coords.x;
        this.sprite.position.y = draw_coords.y;
        this.sprite.rotation = this.rad;
    };
    this.getCircleInfoForUtilityLib = function(){
        return {'center': {x:this.x,y:this.y}, 'radius':this.radius};
    };
    this.angleBetweenSprites = function(otherSprite){
        var deltax = otherSprite.x - this.x;
        var deltay = otherSprite.y - this.y;
        //return -Math.atan2(deltay,deltax)*180/3.14159 //in degrees
        return -Math.atan2(deltay,deltax); // in radians
    };
    this.angleBetweenSprites_relativeToThis = function(otherSprite){
        //this function uses the "this" sprite's current rotation as the origin axis for the angle
        var deltax = otherSprite.x - this.x;
        var deltay = otherSprite.y - this.y;
        //return -Math.atan2(deltay,deltax)*180/3.14159 //in degrees
        var result = this.sprite.rotation-Math.atan2(deltay,deltax); // in radians
        if(result > Math.PI)result -= Math.PI*2;
        if(result < -Math.PI)result += Math.PI*2;
        return result;
    };
    //This function will test collision between sprite and coord and 
    //move the sprite accordingly so that it is no longer colliding
    this.collide = function(coord){
        var opp = this.y - coord.y;
        var adj = this.x - coord.x;
        var C = Math.sqrt(opp*opp+adj*adj);
        if ( C >= this.radius)return;
        
        var L = this.radius;
        var Ang = Math.atan2(opp,adj);
        
        
        var x2 = coord.x + (Math.cos(Ang) * L)
        var y2 = coord.y + (Math.sin(Ang) * L)
        
        //set sprite to new coordinates
        this.x = x2;
        this.y = y2;
    };
    this.collide_with_wall_sides = function(wall){
        //check for top/bottom side collision
        //if between left and right side
        if(this.x < wall.v2.x && this.x > wall.v8.x){
            //if colliding with top or bottom wall
            if(this.y + this.radius > wall.v2.y && this.y - this.radius < wall.v4.y){
                //determine which way to push
                var how_far_in_v2 = this.y - wall.v2.y;
                var how_far_in_v4 = wall.v4.y - this.y;
                if(how_far_in_v2 < how_far_in_v4){
                    this.y = wall.v2.y-this.radius;
                }else{
                    this.y = wall.v4.y+this.radius;
                }
                
            }
        }
        
        //check for left/right side collision
        //if between top and bottom side
        if(this.y < wall.v4.y && this.y > wall.v2.y){
            //if colliding with left or right wall
            if(this.x + this.radius > wall.v8.x && this.x - this.radius < wall.v2.x){
                //determine which way to push
                var how_far_in_v8 = this.x - wall.v8.x;
                var how_far_in_v2 = wall.v2.x - this.x;
                if(how_far_in_v8 < how_far_in_v2){
                    this.x = wall.v8.x-this.radius;
                }else{
                    this.x = wall.v2.x+this.radius;
                }
                
            }
        }
    };

}

