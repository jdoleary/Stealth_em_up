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
        
        this.kill = function(){
            //play_sound(sound_unit_die);
            this.sprite.setTexture(img_skull);
            this.alive = false;
            //enable moving so they can be dragged
            this.moving = true;
            this.path = [];
            this.target = {x: null, y:null};                    
            alarmingObjects.push(this);//add body to alarming objects so if it is see they will sound alarm
                
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
                this.sprite.setTexture(img_guard_alert);
                this.path = [];//empty path
                this.moving = false;//this sprite stop in their tracks when they see otherSprite.
                
                //in 3 seconds, if this guard is still alive, alert the others.
                setTimeout(function(){
                    if(this.alive){
                        newMessage('All the other guards are on alert!');
                        alert_all_guards();
                    };
                }.bind(this), 2000);
            }
            //guard shouldn't be able to shoot immediately, so it takes 1/2 of reload time to shoot for first time.
            this.can_shoot = false; //so the guards don't shoot way too fast
            setTimeout(function(){
                //allow sprite to shoot again.
                this.can_shoot = true;
            }.bind(this),this.shoot_speed/2);
            
        };
        
        this.hearAlarm = function(){
            //when a guard is told of an alarming event.
            this.sprite.setTexture(img_guard_alert)
            this.speed = 3;//speed up when alarmed.
            this.alarmed = true;
        
        };
        
        
    }
    sprite_guard.prototype = new jo_sprite(pixiSprite);
    return new sprite_guard();
}