function magicWandFill(Ax,Ay,callback){
    var stop = 0;
    console.log('Fill: ' + Ax + ',' + Ay);
    //console.log(grid.getCellFromIndex(Ax,Ay));
    //getAllOfSameTypeTouchingA
    var cell = grid[Ax][Ay];
    //console.log('Overwrite cells in proximity with type: ' + cell.image_number);
    console.time('magicwand');
    neighbors(Ax,Ay,cell.style);
    console.timeEnd('magicwand');

    var magicSelector = 9;
    function change(indexX,indexY){
        //console.log('try change: ' + indexX + ',' + indexY);
        var cell = grid[indexX][indexY];
        if(cell !== null){
            //console.log('change: ' + indexX + ',' + indexY);
            //cell.style = (newStyle);
            callback(indexX,indexY);
        }
        
            
        
    }
    function neighbors(x,y,type) {
        stop++;
        if(stop>1000000){
            console.log('ERROR, neighbors timeout');
            return;
        }
        var ret = [];
        //console.log('--------------------------------neighbors:');
        change(x,y);
        var west = null;
        var east = null;
        var south = null;
        var north = null;
        if(grid[x])west = grid[x][y-1];
        if(grid[x])east = grid[x][y+1];
        if(grid[x-1])south = grid[x-1][y];
        if(grid[x+1])north = grid[x+1][y];
        /*console.log(west);
        console.log(east);
        console.log(south);
        console.log(north);*/
        
        // West
        if(west != null) {
            //console.log({x:x,y:y-1,data:grid[y-1][x]});
            if(west.style === type)ret.push({x:x,y:y-1,data:west});
        }

        // East
        if(east != null) {
            //console.log({x:x,y:y+1,data:grid[y+1][x]});
            if(east.style === type)ret.push({x:x,y:y+1,data:east});
        }

        // South
        if(south != null) {
            //console.log({x:x-1,y:y,data:grid[x-1][y]});
            if(south.style === type)ret.push({x:x-1,y:y,data:south});
        }

        // North
        if(north != null) {
            //console.log({x:x+1,y:y,data:grid[y][x+1]});
            if(north.style === type)ret.push({x:x+1,y:y,data:north});
        }
        //console.log(ret);
        for(var i = 0; i < ret.length; i++){
            neighbors(ret[i].x,ret[i].y,type);
        }

        return ret;
    };

    
}