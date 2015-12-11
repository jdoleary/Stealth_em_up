/*******************************************************\
Copyright 2014,2015, Jordan O'Leary, All rights reserved.
If you would like to copy or use my code, you may contact
me at jdoleary@gmail.com
/*******************************************************/

function jo_cam(){
    this.x = 0;
    this.y = 0;
    this.following = false;
    this.objScreenCorner = function(){
        return {x: this.x-window_properties.width/2,y: this.y-window_properties.height/2};
    
    };
    this.relativePoint = function(objectivePoint){
        var screenCorner = this.objScreenCorner();
        //pass sprite properties to this method to get the relative point where they are drawn on the screen.
        return {x: objectivePoint.x - screenCorner.x, y: objectivePoint.y - screenCorner.y};
    };
    this.objectivePoint = function(relativePoint){
        //used for mouse translating to obj coords:
        var screenCorner = this.objScreenCorner();
        return {x: relativePoint.x + screenCorner.x, y: relativePoint.y + screenCorner.y};
    }
    this.objScreenCornerWithZoom = function(){
        return {x: this.x-(window_properties.width/stage_child.scale.x)/2,y: this.y-(window_properties.height/stage_child.scale.y)/2};
    
    };
    
    this.objectivePointWithZoom = function(relativePoint){
        
        //used for mouse translating to obj coords:
        var screenCorner = this.objScreenCornerWithZoom();
        return {x: relativePoint.x/stage_child.scale.x + screenCorner.x, y: relativePoint.y/stage_child.scale.y + screenCorner.y};
    }
    
    this.speed = 20;
    this.stop_distance = 10; //Distance to stop from target.
    this.target = {x: null, y:null};//the target that this camera moves twords
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
            this.x = this.target.x;   
            this.y = this.target.y;
            return true; // the target is closer than the distance of a single step, so snap to target.
        }
        a = c*A/C;
        b = c*B/C;
        //only move the sprite if they are set to moving, for example when guards see hero they will stop in their tracks
        this.x += a;
        this.y += b;
        
    };
    this.posBeforeShakex;
    this.posBeforeShakey;
    this.shakeIntensity = 0;
    this.shakeDecay = 0;
    this.startShake = function(intensity,decay){
        this.posBeforeShakex = this.x;
        this.posBeforeShakey = this.y;
        this.shakeIntensity = intensity;
        this.shakeDecay = decay;
    }
    this.shake = function(){
        if(this.shakeIntensity > 0){
            this.x = this.posBeforeShakex +  Math.random() * this.shakeIntensity;
            this.y = this.posBeforeShakey +  Math.random() * this.shakeIntensity;
            this.shakeIntensity -= this.shakeDecay;
        }
    }
}