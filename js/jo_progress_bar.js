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
        this.timePassedSinceStart += deltaTime;
        this.percent = this.timePassedSinceStart/this.timeToFinish;
        if(this.percent >= 1){
            this.callback();
            this.visible = false;
        }
    };
    this.stop = function(){
        this.graphics.clear();
        this.visible = false;
        this.timePassedSinceStart = 0;
        this.percent = 0;
        this.callback = null;
        
    }
    this.reset = function(posx,posy,timeToFinish,callWhenFinished){
        //move the position
        this.x = posx;
        this.y = posy;
        //set timetofinish:
        this.timePassedSinceStart = 0;
        this.timeToFinish = timeToFinish;
        //reset percent
        this.percent = 0;
        //init callback
        this.callback = callWhenFinished;    
        //show
        this.visible = true;
    
    };
    this.draw = function(){
        console.log('percent (formatted) : ' + this.percent*100 + '%');
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

   