/*******************************************************\
Copyright 2014,2015, Jordan O'Leary, All rights reserved.
If you would like to copy or use my code, you may contact
me at jdoleary@gmail.com
/*******************************************************/
function sprite_guard_wrapper(pixiSprite){
    function sprite_guard(){
        this.path = [];//path applies to AI following a path;
        this.alarmed = false;
        this.being_choked_out = false;
        this.blood_trail;
        this.chasingHero = false;
        this.idling = false;//if guard is just standing
        this.startedIdling = false;
        this.idleRotateRad;//radians to rotate to while idling (changes each time)
        this.ammo = 6;
        this.sawHeroLastAt = {x:null,y:null};
        this.accuracy = 50;
        this.knowsHerosFace = false;//if guard knows hero's face, mask becomes irrelevant
        this.currentlySeesHero = false;//updated every loop;
        this.gun_shot_line.graphics.visible = false;
        
        this.kill = function(){
            //play_sound(sound_unit_die);
            this.sprite.setTexture(img_guard_dead);
            this.alive = false;
            //enable moving so they can be dragged
            this.moving = true;
            this.path = [];
            this.target = {x: null, y:null};                    
            alarmingObjects.push(this);//add body to alarming objects so if it is see they will sound alarm
            
            
            //make sure the dead body sprite is on top of the blood trail and below other people
            display_actors.removeChild(this.sprite);
            display_effects.addChild(this.sprite);
            
            //drop gun
            drop_gun(this.gun,this.x,this.y);
                
        }
        
        this.getRandomPatrolPath = function(){
            //finds a path to patrol
        
            //if the sprite is able to move
            if(this.moving){
                //find new patrol path:
                var newCellToPatrolTo = grid.getRandomNonSolidCellIndex();
                var newCellInfo = grid.getInfoFromIndex(newCellToPatrolTo);
                var newCellIndex = {x: newCellInfo.x_index, y: newCellInfo.y_index};
                var currentIndex = grid.getIndexFromCoords_2d(this.x,this.y);
                this.path = grid.getPath(currentIndex,newCellIndex);
                //note: if a path is not found and this.path == [], the guard will idle again.
                //console.log('path:');
                //console.log(this.path);
            }
            this.idling = false;
            this.startedIdling = false;
        
        };
        
        this.pathToCoords = function(x,y){
            //finds a path to patrol
        
            //if the sprite is able to move
            if(this.moving){
                //find new patrol path:
                var newCellToPatrolTo = grid.getIndexFromCoords_2d(x,y);
                newCellToPatrolTo = grid.get1DIndexFrom2DIndex(newCellToPatrolTo.x,newCellToPatrolTo.y);
                var newCellInfo = grid.getInfoFromIndex(newCellToPatrolTo);
                var newCellIndex = {x: newCellInfo.x_index, y: newCellInfo.y_index};
                var currentIndex = grid.getIndexFromCoords_2d(this.x,this.y);
                this.path = grid.getPath(currentIndex,newCellIndex);
            }
        
        };
        
        this.becomeAlarmed = function(objectOfAlarm){
            if(!this.alarmed){
                this.alarmed = true;
                //when a sprite first sees something alarming, they become alarmed but will not spread the alarm for several seconds:
                if(this.knowsHerosFace)this.sprite.setTexture(img_guard_knows_hero_face);//show that this guard knows your face:
                else this.sprite.setTexture(img_guard_alert);
                
                this.path = [];//empty path
                this.moving = false;//this sprite stop in their tracks when they see otherSprite.
                
                //in 3 seconds, if this guard is still alive, alert the others.
                setTimeout(function(){
                    if(this.alive && !this.being_choked_out){
                        newMessage('All the other guards are on alert!');
                        alert_all_guards();
                    };
                }.bind(this), 2000);
            }

            
        };
        
        this.hearAlarm = function(){
            if(this.alive){
                //when a guard is told of an alarming event.
                if(this.knowsHerosFace)this.sprite.setTexture(img_guard_knows_hero_face);//show that this guard knows your face:
                else this.sprite.setTexture(img_guard_alert);
                this.speed = 3;//speed up when alarmed.
                this.alarmed = true;
            }
        
        };
        
        this.get_dragged_parent = this.get_dragged;
        //modify and call parent function
        this.get_dragged = function(){
            //if not being choked out, set texture to drag
            if(this.being_choked_out && this.alive)this.sprite.setTexture(img_guard_choke);
            else this.sprite.setTexture(img_guard_drag);
            this.get_dragged_parent();
   
        
        }
        this.stop_dragging = function(){
            console.log('stop dragging' + this.alive);
            if(!this.alive)this.sprite.setTexture(img_guard_dead);
        }
        
        
    }
    
    sprite_guard.prototype = new jo_sprite(pixiSprite);
    return new sprite_guard();
}