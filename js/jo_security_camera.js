/*******************************************************\
Copyright 2014,2015, Jordan O'Leary, All rights reserved.
If you would like to copy or use my code, you may contact
me at jdoleary@gmail.com
/*******************************************************/
function security_camera_wrapper(pixiSprite,x,y,maxswivel,minswivel){
    function jo_security_camera(x,y,maxswivel,minswivel){
        
        //TODO remove the -20, for testing LOS:
        this.x = x-20;
        this.y = y-20;
        this.radius = 14;
        this.alarmed = false;
        this.losPath = [];
        this.losPoints = [];
        //change anchor:
        this.sprite.anchor.x = 0.35;
        
        //camera specific stuff:
        this.max = maxswivel;//-Math.PI/2;//max swivel
        this.min = minswivel;//Math.PI/2;//max swivel
        this.wait_time = 2000;
        this.speed = 0.01;
        this.rotation = this.min;
        this.increasing = true;
        this.wait_checker = new Date();
        
        this.rad = this.min;//set rotation to min swivel
        
        /*
        The range of motion of rotation is 0 - 360
        
        */
        this.swivel = function(){
            var time = new Date();
            if(time.getTime() >= this.wait_checker.getTime()+this.wait_time){
            
                if(this.increasing){
                    this.rotation += this.speed;
                    //allows rotation to loop around from 360deg to 0
                    if(this.rotation > 2*Math.PI)this.rotation = 0;
                    //reached limit, wait, then loop back
                    if(Math.abs(this.rotation-this.max) <= 0.05){
                        this.wait_checker = new Date();
                        this.increasing = false;
                    }
                }else{
                    this.rotation -= this.speed;
                    //allows rotation to loop around from 0 to 360deg
                    if(this.rotation < 0)this.rotation = 2*Math.PI;
                    //reached limit, wait, then loop back
                    if(Math.abs(this.rotation-this.min) <= 0.05){
                        this.wait_checker = new Date();
                        this.increasing = true;
                    }

                }
                this.rad = this.rotation;
            }else{
                //console.log(time.getTime() , ' ' , wait_checker.getTime()+wait_time);
            }
        }
        this.kill = function(){
            this.sprite.texture = (img_cam_broken);
            this.alive = false;
            this.target = {x: null, y:null};
            alarmingObjects.push(this);//add body to alarming objects so if it is see they will sound alarm
                    
        };

        this.becomeAlarmed = function(objectOfAlarm){
            //when a sprite first sees something alarming, they become alarmed but will not spread the alarm for several seconds:
            if(!this.alarmed){
                    this.alarmed = true;
                    //when a sprite first sees something alarming, they become alarmed but will not spread the alarm for several seconds:
                    this.sprite.texture = (img_security_camera_alerted);
                    this.target = {x:objectOfAlarm.x,y:objectOfAlarm.y};
                    
                    //in 3 seconds, if this guard is still alive, alert the others.
                    setTimeout(function(){
                        if(this.alive){
                            newMessage('All the other guards are on alert!');
                            alert_all_guards();
                        };
                    }.bind(this), 2000);
                }
            
        };
        this.setupLOS = function(){
            var true_corners = 0;
            for(var c = 0; c < grid.cells.length; c++){
                /*var array = [grid.cells[c].v2,grid.cells[c].v4,grid.cells[c].v6,grid.cells[c].v8];
                for(var a = 0; a < array.length; a++){
                    //get all 4 cells on the corner of this point:
                }*/
                //i should only have to use v2 to avoid duplication:
                var cell = grid.cells[c];
                
                var index = grid.getIndexFromCoords_2d(cell.v2.x-1,cell.v2.y-1);
                var northwest = grid.getCellFromIndex(index.x,index.y);
                
                index = grid.getIndexFromCoords_2d(cell.v2.x+1,cell.v2.y+1);
                var southeast = grid.getCellFromIndex(index.x,index.y);
                
                index = grid.getIndexFromCoords_2d(cell.v2.x-1,cell.v2.y+1);
                var southwest = grid.getCellFromIndex(index.x,index.y);
                
                index = grid.getIndexFromCoords_2d(cell.v2.x+1,cell.v2.y-1);
                var northeast = grid.getCellFromIndex(index.x,index.y);
                
                var corner_cells = [northwest,northeast,southwest,southeast];
                var number_of_blocks_vision = 0;
                var corner = -1;
                var touching_door = false;
                for(var i = 0; i < corner_cells.length; i++){
                    if(corner_cells[i] != undefined){
                        if(corner_cells[i].blocks_vision){
                            number_of_blocks_vision++;
                            //determines which block is blocking vision, only applicable if there is only one blocking block
                            //mark the corner if it isn't a door:
                            if(!corner_cells[i].door)corner = i;
                        }
                        if(corner_cells[i].door){
                            touching_door = true;
                        }
                    }
                }
                //allows for corner on closed doors
                if(number_of_blocks_vision == 2 && touching_door)number_of_blocks_vision--;
                //if not even, it is a true corner point used for vision masking:
                if(number_of_blocks_vision%2!=0){
                    if(draw_starburst){
                        var circle = new debug_circle();
                        circle.alpha = 1.0;
                    }
                    //later,circle.color = 0x00ff00;
                    //later, to account for offset: circle.draw(cell.v2.x,cell.v2.y,5);
                    /*        
                    {
                        true_point: {x,y},
                        angle: 234
                    }*/
                    //if it is an outer corner, add two points, one that will cast a ray, and another that uses the true corner
                    if(number_of_blocks_vision == 1){
                        var offsetx = 0;
                        var offsety = 0;
                        switch(corner){
                            case 0:
                                //NW
                                offsetx = 1;
                                offsety = 1;
                                break;
                            case 1:
                                offsetx = -1;
                                offsety = 1;
                                //NE
                                break;
                            case 2:
                                offsetx = 1;
                                offsety = -1;
                                //SW
                                break;
                            case 3:
                                offsetx = -1;
                                offsety = -1;
                                //SE
                                break;
                        }
                        this.losPoints.push({noray:true,true_point:{x:cell.v2.x-offsetx,y:cell.v2.y-offsety},angle:0});//for rendering LOS
                        this.losPoints.push({true_point:{x:cell.v2.x+offsetx,y:cell.v2.y+offsety},angle:0});//for rendering LOS
                        if(draw_starburst){
                            circle.color = 0x00ff00;
                            circle.draw(cell.v2.x+offsetx,cell.v2.y+offsety,4);
                        }
                    }else{
                        this.losPoints.push({true_point:{x:cell.v2.x,y:cell.v2.y},angle:0});//for rendering LOS
                        if(draw_starburst){
                            circle.color = 0xff0000;
                            circle.draw(cell.v2.x,cell.v2.y,4);
                        }
                    }
                    true_corners++;
                    /*
                    True corners are decided once when the game starts.  Relevant corners are decided at runtime and are using to draw the LOS polygon
                    */
                }
            }

            console.log("Security Camera true corners for vision masking: " + true_corners);
            console.error("Need to optimize this ^ Should be much less: " + true_corners);
        }

    }
    jo_security_camera.prototype = new jo_sprite(pixiSprite);
    return new jo_security_camera(x,y,maxswivel,minswivel);
}