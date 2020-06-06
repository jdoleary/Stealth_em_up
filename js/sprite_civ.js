/*******************************************************\
Copyright 2014,2015, Jordan O'Leary, All rights reserved.
If you would like to copy or use my code, you may contact
me at jdoleary@gmail.com
/*******************************************************/
function sprite_civ_wrapper(pixiSprite){
    function sprite_civ(){
        this.path = [];//path applies to AI following a path;
        this.alarmed = false;
        this.being_choked_out = false;
        var startCellIndex = grid.getRandomNonSolid_NonRestricted_CellIndex();
        this.x = grid.cells[startCellIndex].x + grid.cell_size/2;
        this.y = grid.cells[startCellIndex].y + grid.cell_size/2;
        this.waiting = false;
        
        
        this.kill = function(){
            this.sprite.texture = (img_skull);
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
                var newCellToPatrolTo = grid.getRandomNonSolid_NonRestricted_CellIndex();
                var newCellInfo = grid.getInfoFromIndex(newCellToPatrolTo);
                var newCellIndex = {x: newCellInfo.x_index, y: newCellInfo.y_index};
                var currentIndex = grid.getIndexFromCoords_2d(this.x,this.y);
                this.path = grid.getPath(currentIndex,newCellIndex);
            }
        
        };
        
        this.seeAlarmingObject = function(objectOfAlarm){
            if(!this.alarmed){
                this.alarmed = true;
                //when a sprite first sees something alarming, they become alarmed but will not spread the alarm for several seconds:
                this.sprite.texture = (img_guard_alert);
                this.path = [];//empty path
                this.target = {x:objectOfAlarm.x,y:objectOfAlarm.y};
                this.moving = false;//this sprite stop in their tracks when they see otherSprite.
                
                //in 3 seconds, if this guard is still alive, alert the others.
                setTimeout(function(){
                    if(this.alive){
                        newMessage('A civilian cries out, alerting the guards!');
                        alert_all_guards();
                    };
                }.bind(this), 5000);
            }
            
        };
        

        
        
    }
    pixiSprite.tint = Math.random() * 0x00FFFF;
    sprite_civ.prototype = new jo_sprite(pixiSprite);
    return new sprite_civ();
}