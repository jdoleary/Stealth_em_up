/*******************************************************\
Copyright 2014,2015, Jordan O'Leary, All rights reserved.
If you would like to copy or use my code, you may contact
me at jdoleary@gmail.com
/*******************************************************/
function sprite_hero_wrapper(pixiSprite,spriteHead,speed_walk,speed_sprint){
    function sprite_hero(){
        this.speed_walk = speed_walk;
        this.speed_sprint = speed_sprint;
        
        
        this.radius = 14;
        //alert causing bools:
        this.masked = false;
        this.gunOut = false;//TODO: gunOut
        this.inOffLimits = false;
        this.lockpicking = false;
        this.carry = null;
        
        
        this.guns = [
            gun_pistol.make_copy(),
            gun_pistol_silenced.make_copy(),
            gun_shotgun.make_copy(),
            gun_shotgun_sawed_off.make_copy(),
            gun_machine.make_copy()
        ];
        this.gun_index = 0;
        this.gun = this.guns[this.gun_index];
        this.health = upgrades["hero_health"];
        this.ability_kick_doors = upgrades["kick_doors"];
        this.ability_auto_pickup_ammo = upgrades["auto_pickup_ammo"];
        this.ability_num_guns_hold = upgrades["NumOfGunsHold"];//how many guns the player can hold
        this.ability_remote_lockpick = upgrades["RemoteLockpick"];
        if(upgrades["Run_speed"])this.speed_sprint = upgrades["Run_speed"];
        if(upgrades["Drag_body_speed"])this.speed_walk = upgrades["Drag_body_speed"];
        this.lockpick_speed = upgrades["Lockpick_speed"];
        this.reload_speed = upgrades["Reload_speed"];
        this.ability_toggle_mask_speed = upgrades["Toggle_mask"];
        this.ability_choke_speed = upgrades["Choke_speed"];
        this.ability_timed_bomb = upgrades["Timed_bomb"];
        this.ability_remote_bomb = upgrades["Remote_bomb"];
        this.ability_body_armor = upgrades["Body_armor"];
        
        this.willCauseAlert = function(){
            if(this.masked || this.gunOut || this.inOffLimits || this.lockpicking || this.carry !== null || hero_drag_target !== null)return true;
            else return false;
        }
        
        //extra draw components:
        this.sprite_head = spriteHead;
        //center the image:
        this.sprite_head.anchor.x = 0.5;
        this.sprite_head.anchor.y = 0.5;
        display_actors.addChild(this.sprite_head);
        
        this.prepare_for_draw = function(){
            this.sprite.position.x = this.x;
            this.sprite.position.y = this.y;
            this.sprite.rotation = this.rad;
            //head:
            
            this.sprite_head.position.x = this.x;
            this.sprite_head.position.y = this.y;
            this.sprite_head.rotation = this.rad;
        };
        
        this.imgMaskOn = function(putOn){
            if(putOn){
                this.sprite_head.setTexture(img_hero_head_masked);
                
            }else{
                this.sprite_head.setTexture(img_hero_head);
                
            }
        }
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
            setHeroImage();
        }
        
        this.hurt = function(fromX,fromY){
            if(this.ability_body_armor){
                var chance = randomFloatFromInterval(0,1);
                if(chance >=.5){
                    newFloatingMessage("Close Call!",{x:hero.x,y:hero.y},"#FFaa00");
                    return;
                }
            }
            this.health--;
            if(this.health <= 0)this.kill();
            //make blood splatter:
            makeBloodSplatter(this.x,this.y,fromX,fromY);
        }
        this.kill = function(){
            hero_is_dead();
        
            display_actors.removeChild(this.sprite_head);
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