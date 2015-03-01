/*******************************************************\
Copyright 2014,2015, Jordan O'Leary, All rights reserved.
If you would like to copy or use my code, you may contact
me at jdoleary@gmail.com
/*******************************************************/
function sprite_hero_wrapper(pixiSprite,speed_walk,speed_sprint){
    function sprite_hero(){
        this.speed_walk = speed_walk;
        this.speed_sprint = speed_sprint;
        this.radius = 14;
        this.masked = false;
        this.guns = [
            gun_pistol_silenced.make_copy(),
            gun_shotgun.make_copy(),
            gun_shotgun_sawed_off.make_copy(),
            gun_machine.make_copy()
        ];
        this.gun_index = 0;
        this.gun = this.guns[this.gun_index];
        this.clips = ["pistol","shells","shells","machine"];
        this.health = 100;
        //this.currentlySeen = false;
        
        //pos where hero was last seen by guards or camera
        this.lastSeenX;
        this.lastSeenY;
        this.setLastSeen = function(observer){
            if(observer){
                //if the observer is still alive after 2 seconds and not being choked out, alert the others
                setTimeout(function(){
                    if(observer.alive && !observer.being_choked_out){
                        if(this.lastSeenX != observer.sawHeroLastAt.x && this.lastSeenY != observer.sawHeroLastAt.y){
                            this.lastSeenX = observer.sawHeroLastAt.x;
                            this.lastSeenY = observer.sawHeroLastAt.y;
                            hero_last_seen.x = observer.sawHeroLastAt.x;
                            hero_last_seen.y = observer.sawHeroLastAt.y;
                            //repath alert guards to hero
                            notifyGuardsOfHeroLocation = true;
                            //newMessage("Last seen " + observer.sawHeroLastAt.x + "," + observer.sawHeroLastAt.y);
                        }
                    };
                }.bind(this), 2000);
            }else{
                //if observer is null, everyone is notified immediately (gunshot or camera or something).
                if(this.lastSeenX != this.x && this.lastSeenY != this.y){
                    this.lastSeenX = this.x;
                    this.lastSeenY = this.y;
                    hero_last_seen.x = this.x;
                    hero_last_seen.y = this.y;
                    //repath alert guards to hero
                    notifyGuardsOfHeroLocation = true;
                    //newMessage("Last seen " + this.x + "," + this.y);
                }
            }
            
        }
        
        this.changeGun = function(index){
            if(this.gun_index === index)return;
            if(index >= this.guns.length)return;
            this.gun_index = index;
            this.gun = this.guns[this.gun_index];
        }
        
        this.hurt = function(fromX,fromY){
            this.health--;
            if(this.health <= 0)this.kill();
            //make blood splatter:
            makeBloodSplatter(this.x,this.y,fromX,fromY);
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
            
            messageGameOver.setText('Press [Esc] to restart!');
            
            //remove key handlers so hero can no longer move around
            removeHandlers(true);//don't remove key handlers when you die (only mouse stuff)
            //add to stats:
            jo_store_inc("loses");
            
            
            addButton("menu.png","menu2.png",startMenu);
        }


        
    }
    sprite_hero.prototype = new jo_sprite(pixiSprite);
    return new sprite_hero();
}