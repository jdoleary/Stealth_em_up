function sprite_guard_wrapper(pixiSprite){
    function sprite_guard(){
        this.path = [];//path applies to AI following a path;
        this.alarmed = false;
        this.being_choked_out = false;
        this.blood_trail;
        this.chasingHero = false;
        this.idling = false;//if guard is just standing

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
                //console.log('path:');
                //console.log(this.path);
            }
            this.idling = false;
        
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
        
        this.swivel_max;//max swivel
        this.swivel_min;//min swivel
        this.swivel_wait_time = 2000;
        this.swivel_speed = 0.1;
        this.swivel_increasing = true;
        this.swivel_wait_checker = new Date();
        this.swivel_rotation = this.rad;
        this.setSwivel = function(min,max){
            //sanitize rad:
            
            if(max >= Math.PI*2)max = max%(Math.PI*2);
            if(max < 0)max = Math.abs(max%(Math.PI*2));
            if(min >= Math.PI*2)min = min%(Math.PI*2);
            if(min < 0)min = Math.abs(min%(Math.PI*2));
            if(max != this.swivel_max){
                this.swivel_max = max;
                this.swivel_min = min;
                console.log('swivel: ' + max*360/(Math.PI*2) + ',' + min*360/(Math.PI*2));
            }

        
        }
        this.swivel = function(){
            
        
            var time = new Date();
            if(time.getTime() >= this.swivel_wait_checker.getTime()+this.swivel_wait_time){
            
                if(this.swivel_increasing){
                    this.swivel_rotation += this.swivel_speed;
                    //allows swivel_rotation to loop around from PI to -PI
                    if(this.swivel_rotation > Math.PI)this.swivel_rotation = -Math.PI;
                    //reached limit, wait, then loop back
                    if(Math.abs(this.swivel_rotation-this.swivel_max) <= 0.05){
                        this.swivel_wait_checker = new Date();
                        this.swivel_increasing = false;
                    }
                }else{
                    this.swivel_rotation -= this.swivel_speed;
                    //allows swivel_rotation to loop around from -PI to PI
                    if(this.swivel_rotation < -Math.PI)this.swivel_rotation = Math.PI;
                    //reached limit, wait, then loop back
                    if(Math.abs(this.swivel_rotation-this.swivel_min) <= 0.05){
                        this.swivel_wait_checker = new Date();
                        this.swivel_increasing = true;
                    }

                }
                this.rad = this.swivel_rotation;
            }else{
                //console.log(time.getTime() , ' ' , swivel_wait_checker.getTime()+swivel_wait_time);
            }
        }
        
    }
    sprite_guard.prototype = new jo_sprite(pixiSprite);
    return new sprite_guard();
}