function jo_security_camera(pixiSprite,x,y,maxswivel,minswivel){
    //utility variables, these do not affect the actual sprite, but are used for camera and such, see prepare_for_draw()
    this.x = x;
    this.y = y;
    this.rad = 0;//radians (rotation)
    this.target = {x: null, y:null};//the target that this sprite moves twords
    this.alive = true;
    this.radius = 14;
    this.alarmed = false;
    this.sprite = pixiSprite;
    //center the image:
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
	stage.addChild(this.sprite);
    
    //camera specific stuff:
    this.max = maxswivel;//-Math.PI/2;//max swivel
    this.min = minswivel;//Math.PI/2;//max swivel
    this.wait_time = 2000;
    this.speed = 0.01;
    this.rotation = this.min;
    this.increasing = true;
    this.wait_checker = new Date();
    
    this.swivel = function(){
        var time = new Date();
        if(time.getTime() >= this.wait_checker.getTime()+this.wait_time){
        
            if(this.increasing){
                this.rotation += this.speed;
                //allows rotation to loop around from PI to -PI
                if(this.rotation > Math.PI)this.rotation = -Math.PI;
                //reached limit, wait, then loop back
                if(Math.abs(this.rotation-this.max) <= 0.05){
                    this.wait_checker = new Date();
                    this.increasing = false;
                }
            }else{
                this.rotation -= this.speed;
                //allows rotation to loop around from -PI to PI
                if(this.rotation < -Math.PI)this.rotation = Math.PI;
                //reached limit, wait, then loop back
                if(Math.abs(this.rotation-this.min) <= 0.05){
                    this.wait_checker = new Date();
                    this.increasing = true;
                }

            }
            this.rad = this.rotation;
        }else{
            //console.log(time.getTime() , ' ' , wait_checker.getTime()+wait_time);
        }
    }
    this.kill = function(){
        this.alive = false;
        this.target = {x: null, y:null};
    };
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
    this.becomeAlarmed = function(objectOfAlarm){
        //when a sprite first sees something alarming, they become alarmed but will not spread the alarm for several seconds:
        this.sprite.setTexture(img_security_camera_alerted);
        this.target = {x:objectOfAlarm.x,y:objectOfAlarm.y};
        this.alarmed = true;
        
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
}