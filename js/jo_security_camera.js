var cameras_disabled = false;
function security_camera_wrapper(pixiSprite,x,y,maxswivel,minswivel){
function jo_security_camera(x,y,maxswivel,minswivel){
    this.x = x;
    this.y = y;
    this.radius = 14;
    this.alarmed = false;
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
        this.sprite.setTexture(img_skull);
        this.alive = false;
        this.target = {x: null, y:null};
        alarmingObjects.push(this);//add body to alarming objects so if it is see they will sound alarm
                
    };

    this.becomeAlarmed = function(objectOfAlarm){
        //when a sprite first sees something alarming, they become alarmed but will not spread the alarm for several seconds:
        this.sprite.setTexture(img_security_camera_alerted);
        this.target = {x:objectOfAlarm.x,y:objectOfAlarm.y};
        this.alarmed = true;
        
    };

}
    jo_security_camera.prototype = new jo_sprite(pixiSprite);
    return new jo_security_camera(x,y,maxswivel,minswivel);
}