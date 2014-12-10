function sprite_hero_wrapper(pixiSprite,speed_walk,speed_sprint){
    function sprite_hero(){
        this.speed_walk = speed_walk;
        this.speed_sprint = speed_sprint;
        this.radius = 14;
        this.masked = false;
        this.silenced = true;
        //this.currentlySeen = false;
        
        //pos where hero was last seen by guards or camera
        this.lastSeenX;
        this.lastSeenY;
        this.setLastSeen = function(){
            this.lastSeenX = this.x;
            this.lastSeenY = this.y;
            hero_last_seen.x = this.x;
            hero_last_seen.y = this.y;
           /* if(!currentlySeen){
                //repath alert guards to hero
                for(var g = 0; g < guards.length; g++){
                    //repath to hero pos
                    if(guards[g].alarmed && !guards[g].chasingHero){
                            console.log('repath to hero');
                            guards[g].moving = true;
                            guards[g].pathToCoords(hero.lastSeenX,hero.lastSeenY);
                            guards[g].chasingHero = true;
                    }
                }
            }
            currentlySeen = true;*/
            //newMessage("Last seen " + this.x + "," + this.y);
        }
        this.kill = function(){
            hero_is_dead();
        
            this.alive = false;
            //enable moving so they can be dragged
            this.moving = false;
            this.path = [];
            this.target = {x: null, y:null};
            
            console.log('||||||||||||||||||||||||change hero texture to dead hero');
            this.sprite.setTexture(img_hero_dead);
            
            
            addButton("menu.png","menu2.png",startMenu);
        }


        
    }
    sprite_hero.prototype = new jo_sprite(pixiSprite);
    return new sprite_hero();
}