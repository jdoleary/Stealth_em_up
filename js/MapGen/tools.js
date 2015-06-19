var neighbors_left = [];
var checked = {};
function magicWandFill(Ax,Ay,callback,changeIfTrue){
    neighbors_left = [];
    checked = {};
    var stop = 0;
    console.log('Fill: ' + Ax + ',' + Ay);
    //console.log(grid.getCellFromIndex(Ax,Ay));
    //getAllOfSameTypeTouchingA
    var cell = grid[Ax][Ay];
    var type = cell.style;
    //console.log('Overwrite cells in proximity with type: ' + cell.image_number);
    console.time('magicwand');
    neighbors(Ax,Ay,type);
    while(neighbors_left.length>0){
        console.log('neighbors_left: ' + neighbors_left.length);
        if(neighbors_left.length > 100)debugger;
        var n = neighbors_left.shift();
        neighbors(n.x,n.y,type);
    }
    console.timeEnd('magicwand');

    var magicSelector = 9;
    function change(indexX,indexY){
        //console.log('try change: ' + indexX + ',' + indexY);
        var cell = grid[indexX][indexY];
        if(cell !== null){
            console.log('change: ' + indexX + ',' + indexY);
            console.count('change');
            //cell.style = (newStyle);
            callback(indexX,indexY);
        }
        
            
        
    }
    function neighbors(x,y,type) {
        console.log('type: ' + type);
        stop++;
        if(stop>1000000){
            console.error('ERROR, neighbors timeout');
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
        // West
        if(west != null) {
            console.log(west);
            //console.log({x:x,y:y-1,data:grid[y-1][x]});
            if(west.style === type && changeIfTrue(west.x,west.y)){
                console.log('add to ret');
                ret.push({x:x,y:y-1,data:west});
            }
        }

        // East
        if(east != null) {
            console.log(east);
            //console.log({x:x,y:y+1,data:grid[y+1][x]});
            if(east.style === type && changeIfTrue(east.x,east.y)){
                console.log('add to ret');
                ret.push({x:x,y:y+1,data:east});
            }
        }

        // South
        if(south != null) {
            console.log(south);
            //console.log({x:x-1,y:y,data:grid[x-1][y]});
            if(south.style === type && changeIfTrue(south.x,south.y)){
                console.log('add to ret');
                ret.push({x:x-1,y:y,data:south});
            }
        }

        // North
        if(north != null) {
            console.log(north);
            //console.log({x:x+1,y:y,data:grid[y][x+1]});
            if(north.style === type && changeIfTrue(north.x,north.y)){
                console.log('add to ret');
                ret.push({x:x+1,y:y,data:north});
            }
        }
        //console.log(ret);
        for(var i = 0; i < ret.length; i++){
            //if cell not already checked
            if(!checked[ret[i].x + ',' + ret[i].y]){
                neighbors_left.push(ret[i]);
                checked[ret[i].x + ',' + ret[i].y] = true;
            }
            //neighbors(ret[i].x,ret[i].y,type);
        }

        return ret;
    };

    
}