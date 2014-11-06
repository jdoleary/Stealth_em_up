function sprite_hero_wrapper(pixiSprite,speed_walk,speed_sprint){
    function sprite_hero(){
        this.speed_walk = speed_walk;
        this.speed_sprint = speed_sprint;
        this.radius = 14;
        this.masked = false;

        this.kill = function(){
            this.alive = false;
            //enable moving so they can be dragged
            this.moving = false;
            this.path = [];
            this.target = {x: null, y:null};
            
            this.sprite.setTexture(img_skull);
            
            
            addButton("Menu.png","Menu2.png",startMenu);
        }


        
    }
    sprite_hero.prototype = new jo_sprite(pixiSprite);
    return new sprite_hero();
}