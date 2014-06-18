function sprite_hero_wrapper(pixiSprite){
    function sprite_hero(){

        this.radius = 14;
        this.masked = false;

        this.kill = function(){
            this.alive = false;
            //enable moving so they can be dragged
            this.moving = true;
            this.path = [];
            this.target = {x: null, y:null};
        }


        
    }
    sprite_hero.prototype = new jo_sprite(pixiSprite);
    return new sprite_hero();
}