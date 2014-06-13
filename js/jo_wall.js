function jo_wall(v8,v2,v4,v6){
    /*
    To be able to build walls dynamically they will be made of points
    Grid cells around the cell that the wall is in will only check against 
    the specific point which applies to that particular cell.
    8 1 2
    7 w 3
    6 5 4
    For example, cell 2 will only need to check against vertex 2
    
    */
    this.v2 = v2;
    this.v4 = v4;
    this.v6 = v6;
    this.v8 = v8;
    if(v2.x < 0 || v2.y < 0) throw new Error("Walls cannot be placed in negative space!");
    if(v4.x < 0 || v4.y < 0) throw new Error("Walls cannot be placed in negative space!");
    if(v6.x < 0 || v6.y < 0) throw new Error("Walls cannot be placed in negative space!");
    if(v8.x < 0 || v8.y < 0) throw new Error("Walls cannot be placed in negative space!");
    
    
    this.graphics = new PIXI.Graphics();
    stage.addChild(this.graphics);
    this.draw = function(){
        //draw wall with debug lines
        var v2_ob = camera.relativePoint(this.v2);
        var v4_ob = camera.relativePoint(this.v4);
        var v6_ob = camera.relativePoint(this.v6);
        var v8_ob = camera.relativePoint(this.v8);
        
        
        this.graphics.clear();//without clear it wont erase the debug shape from previous frame.
        this.graphics.lineStyle(2, 0xFF0000, 1);
		this.graphics.moveTo(v2_ob.x, v2_ob.y);
		this.graphics.lineTo(v4_ob.x, v4_ob.y);
		this.graphics.lineTo(v6_ob.x, v6_ob.y);
		this.graphics.lineTo(v8_ob.x, v8_ob.y);
		this.graphics.lineTo(v2_ob.x, v2_ob.y);
    
    };
    
}