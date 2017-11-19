/*******************************************************\
Copyright 2014,2015, Jordan O'Leary, All rights reserved.
If you would like to copy or use my code, you may contact
me at jdoleary@gmail.com
/*******************************************************/
function circularProgressBar(posx,posy,size,lineWidth){
    this.graphics = new PIXI.Graphics();
    
    //add to scene:
    display_actors.addChild(this.graphics);
    
    this.x = posx;
    this.y = posy;
    this.drawX;
    this.drawY;
    this.size = size;
    this.radius = (this.size - lineWidth)/2;
    this.percent = 0;//1.00 is 100%
    this.lineWidth = lineWidth;
    
    this.follow = null;//unit to follow
    
    this.visible = false;
    this.timePassedSinceStart = 0;
    this.timeToFinish;//The amount of millis that it takes to finish
    
    //be careful to set this after the reset function or else it will be cleared!
    this.distanceCancelTarget;//if player moves away from this target while the prog bar is incrementing, it self cancels
    this.callback;
    this.increment = function(deltaTime){
        console.trace('increment prog bar');
        //abort progressbar if hero moves too far away from distanceCancelTarget
        if(this.distanceCancelTarget && get_distance(hero.x,hero.y,this.distanceCancelTarget.x,this.distanceCancelTarget.y) > hero.radius*dragDistance*(3/2)){
            console.log("cancel: " + get_distance(hero.x,hero.y,this.distanceCancelTarget.x,this.distanceCancelTarget.y) + " " + hero.radius*dragDistance);
            this.stop();
            if(hero.lockpicking)hero.lockpicking = false;
        }
        if(this.targetFollow){
            //if the progress bar should follow an object:
            this.x = this.targetFollow.x;
            this.y = this.targetFollow.y;
        }
    
        this.timePassedSinceStart += deltaTime;
        this.percent = this.timePassedSinceStart/this.timeToFinish;
        if(this.percent >= 1){
            if(this.paramForCallback){
                this.callback(this.paramForCallback);
            }else{
                this.callback();
            }
            this.visible = false;
            this.targetFollow = null;
            this.paramForCallback = null;
        }
    };
    this.stop = function(){
      console.trace('stop prog');
        this.graphics.clear();
        this.visible = false;
        this.timePassedSinceStart = 0;
        this.percent = 0;
        this.callback = null;
        
    }
    
    this.targetFollow;
    this.paramForCallback;//pass param to callback
    this.heroMaskProg = function(timeToFinish,callback,param){
        //clear distanceCancelTarget
        this.distanceCancelTarget = null;//set null from the last one
        
        this.targetFollow = hero;
        //set timetofinish:
        this.timePassedSinceStart = 0;
        this.timeToFinish = timeToFinish;
        //reset percent
        this.percent = 0;
        //init callback
        this.callback = callback;    
        this.paramForCallback = param;
        //show
        this.visible = true;
        
        
        
    }
    this.reset = function(posx,posy,timeToFinish,callback){
      console.log('reset prog');
        //clear distanceCancelTarget
        this.distanceCancelTarget = null;
        //clear follow
        this.follow = null;
        //move the position
        this.x = posx;
        this.y = posy;
        //set timetofinish:
        this.timePassedSinceStart = 0;
        this.timeToFinish = timeToFinish;
        //reset percent
        this.percent = 0;
        //init callback
        this.callback = callback;     
        //show
        this.visible = true;
    
    };
    this.draw = function(){
      console.log('draw prog');
        this.graphics.clear();
        if(this.visible){
            //draw base circle:
            this.graphics.lineStyle(this.lineWidth,0xababab,1);
            this.graphics.moveTo(this.drawX+this.radius,this.drawY);
            this.graphics.arc(this.drawX, this.drawY, this.radius, 0, Math.PI * 2 * 100, false);
            
            //draw top arc
            percent = Math.min(Math.max(0, this.percent || 1), 1);
            this.graphics.lineStyle(this.lineWidth+2,0x555555,1);
            this.graphics.moveTo(this.drawX+this.radius,this.drawY);
            this.graphics.arc(this.drawX, this.drawY, this.radius, 0, Math.PI * 2 * this.percent, false);
        }
    };
    this.prepare_for_draw = function(){
        if(this.follow){
            this.x = this.follow.x;
            this.y = this.follow.y;
        }
        this.drawX = this.x;
        this.drawY = this.y;
    };
}

   