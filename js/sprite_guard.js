function sprite_guard_wrapper(pixiSprite){
    function sprite_guard(){
        this.path = [];//path applies to AI following a path;
        this.alarmed = false;

        this.kill = function(){
            this.sprite.setTexture(img_skull);
            this.alive = false;
            //enable moving so they can be dragged
            this.moving = true;
            this.path = [];
            this.target = {x: null, y:null};                    
            alarmingObjects.push(this);//add body to alarming objects so if it is see they will sound alarm
                
        }
        
        this.getRandomPatrolPath = function(){
            //if the sprite is able to move
            if(this.moving){
                //find new patrol path:
                var newCellToPatrolTo = grid.getRandomNonSolidCellIndex();
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
                this.target = {x:objectOfAlarm.x,y:objectOfAlarm.y};
                this.moving = false;//this sprite stop in their tracks when they see otherSprite.
                
                //in 3 seconds, if this guard is still alive, alert the others.
                setTimeout(function(){
                    if(this.alive){
                        newMessage('All the other guards are on alert!');
                        alert_all_guards();
                    };
                }.bind(this), 2000);
            }
            
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