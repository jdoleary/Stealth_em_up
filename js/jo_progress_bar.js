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
    
    this.visible = false;
    this.timePassedSinceStart = 0;
    this.timeToFinish;//The amount of millis that it takes to finish
    this.callback;
    this.increment = function(deltaTime){
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
        this.graphics.clear();
        this.visible = false;
        this.timePassedSinceStart = 0;
        this.percent = 0;
        this.callback = null;
        
    }
    
    this.targetFollow;
    this.paramForCallback;//pass param to callback
    this.heroMaskProg = function(timeToFinish,callback,param){
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
        this.graphics.clear();
        if(this.visible){
            //draw base circle:
            this.graphics.lineStyle(this.lineWidth,0xababab,1);
            this.graphics.arc(this.drawX, this.drawY, this.radius, 0, Math.PI * 2 * 100, false);
            
            //draw top arc
            percent = Math.min(Math.max(0, this.percent || 1), 1);
            this.graphics.lineStyle(this.lineWidth+2,0x555555,1);
            this.graphics.arc(this.drawX, this.drawY, this.radius, 0, Math.PI * 2 * this.percent, false);
        }
    };
    this.prepare_for_draw = function(){
        var draw_coords = camera.relativePoint(this);
        this.drawX = draw_coords.x;
        this.drawY = draw_coords.y;
    };
}

   