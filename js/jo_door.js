function sprite_door_wrapper(pixiSprite,horizontal,parent){
    function sprite_door(){

        this.sprite.anchor.x = 0.125;
        this.sprite.anchor.y = 0;
        this.unlocked = false;
        this.opened = false;
        this.openerNear = false;//true if a person able to open it is near
        
        this.horizontal = horizontal;
        this.rotClosed;
        this.rotOpen;
        if(!horizontal){
            this.x += 32;
            this.rotClosed = 0;
            this.rotOpen = 90 * Math.PI/180;
        }else{
            this.x += 64;
            this.y += 32;
            this.rotClosed = 90 * Math.PI/180;
            this.rotOpen = 0;
        }
        //set initial rotation
        this.rad = this.rotClosed;
        
        this.open = function(){
            if(!this.opened){
                this.opened = true;
                play_sound(sound_door_open);
                this.rad = this.rotOpen;
            }
        
        }
        this.close = function(){
            if(this.opened){
                play_sound(sound_door_close);
                this.opened = false;
                this.rad = this.rotClosed;
            }
        
        }
        this.unlock = function(){
            console.log('unlock');
            this.unlocked = true;
        }
   


        
    }
    sprite_door.prototype = new jo_sprite(pixiSprite,parent);
    return new sprite_door();
}