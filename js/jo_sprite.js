var unit_radius = 15;
function jo_sprite(pixiSprite){
    //utility variables, these do not affect the actual sprite, but are used for camera and such, see prepare_for_draw()
    this.x = 0;
    this.y = 0;
    this.rad = 0;
    this.target = {x: this.x, y:this.y};//the target that this sprite moves twords
    this.speed = 0.5;
    this.alive = true;
    
    this.sprite = pixiSprite;
    //center the image:
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    
    
	stage.addChild(this.sprite);
    
    this.move = function(targx,targy){
        //this function uses similar triangles with sides a,b,c and A,B,C where c and C are the hypotenuse
        //the movement of this.x and this.y (a,b) are found with the formulas: A/C = a/c and B/C = b/c
        var a,b;
        var c = this.speed;
        var A = targx-this.x;
        var B = targy-this.y;
        var C = Math.sqrt(A*A+B*B);
        if(C<this.stop_distance){        
            return; // the object is close enough that it need not move
        }
        a = c*A/C;
        b = c*B/C;
        this.x += a;
        this.y += b;
        this.rad = Math.atan2(b,a);
    };
    this.stop_distance = 1.5; //Distance to stop from target.
    this.move_to_target = function(){
        //this function uses similar triangles with sides a,b,c and A,B,C where c and C are the hypotenuse
        //the movement of this.x and this.y (a,b) are found with the formulas: A/C = a/c and B/C = b/c
        var a,b;
        var c = this.speed;
        var A = this.target.x-this.x;
        var B = this.target.y-this.y;
        var C = Math.sqrt(A*A+B*B);
        if(C<this.stop_distance){        
            return; // the object is close enough that it need not move
        }
        a = c*A/C;
        b = c*B/C;
        this.x += a;
        this.y += b;
        this.rad = Math.atan2(b,a);
    };
    this.prepare_for_draw = function(){
        var draw_coords = camera.relativePoint(this);
        this.sprite.position.x = draw_coords.x;
        this.sprite.position.y = draw_coords.y;
        this.sprite.rotation = this.rad;
    };
    this.getCircleInfoForUtilityLib = function(){
        return {'center': {x:this.x,y:this.y}, 'radius':unit_radius};
    }
    this.angleBetweenSprites = function(otherSprite){
        var deltax = otherSprite.x - this.x;
        var deltay = otherSprite.y - this.y;
        //return -Math.atan2(deltay,deltax)*180/3.14159 //in degrees
        return -Math.atan2(deltay,deltax); // in radians
    }
    this.angleBetweenSprites_relativeToThis = function(otherSprite){
        //this function uses the "this" sprite's current rotation as the origin axis for the angle
        var deltax = otherSprite.x - this.x;
        var deltay = otherSprite.y - this.y;
        //return -Math.atan2(deltay,deltax)*180/3.14159 //in degrees
        var result = this.sprite.rotation-Math.atan2(deltay,deltax); // in radians
        if(result > Math.PI)result -= Math.PI*2;
        if(result < -Math.PI)result += Math.PI*2;
        return result;
    }

}
