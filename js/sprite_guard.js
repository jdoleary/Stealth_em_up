function sprite_guard_wrapper(pixiSprite){
    function sprite_hero(){
        this.radio_for_help = false;
        this.path = [];//path applies to AI following a path;
        this.reaction_time = 3000; //in milis
        this.time_since_alarmed;//this is used to measure how long it takes guard to respond to threat
        

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
            //when a sprite first sees something alarming, they become alarmed but will not spread the alarm for several seconds:
            this.sprite.setTexture(img_guard_alert);
            this.path = [];//empty path
            this.target = {x:objectOfAlarm.x,y:objectOfAlarm.y};
            this.moving = false;//this sprite stop in their tracks when they see otherSprite.
            this.radio_for_help = true;
            this.time_since_alarmed = new Date().getTime();
            
        };
        
        this.hearAlarm = function(){
            //when a guard is told of an alarming event.
            this.sprite.setTexture(img_guard_alert)
            this.speed = 3;//speed up when alarmed.
        
        };
        
        
    }
    sprite_hero.prototype = new jo_sprite(pixiSprite);
    return new sprite_hero();
}