var map1 = {
         "data":[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 3, 3, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         "height":20,
         "width":20
        };

var img_tile_black = PIXI.Texture.fromImage("tile_black.png");
var img_tile_white = PIXI.Texture.fromImage("tile_white.png");
var img_tile_green = PIXI.Texture.fromImage("tile_green.png");
var img_tile_red = PIXI.Texture.fromImage("tile_red.png");

function jo_grid(map){
    //2d array:
    this.width = map.width;
    this.height = map.height;
    this.cell_size = 64

    //this is the map, fill it will walls!
    this.map_data = map.data;
    this.cells = [];
    
    this.getInfoFromIndex = function(index){
        var x_index = index%this.width;
        var y_index = Math.floor(index/this.width);
        return {x_index: x_index, y_index: y_index};
    };
    
    this.getIndexFromGrid = function(row, col){
        return this.cells[width * row + col];
    };
    this.getWallCoords = function(wall_type,x_index,y_index){
        //returns the objective coordinates of a wall based on its type and index.
        //this should work even for non-square walls.
        
        var startx = x_index*this.cell_size;
        var starty = y_index*this.cell_size;
        switch(wall_type){
            case 'square':
                //square
                return [{x:startx,y:starty},{x:startx+this.cell_size,y:starty},{x:startx+this.cell_size,y:starty+this.cell_size},{x:startx,y:starty+this.cell_size}];
                break;
            default:
                //square
                return [{x:startx,y:starty},{x:startx+this.cell_size,y:starty},{x:startx+this.cell_size,y:starty+this.cell_size},{x:startx,y:starty+this.cell_size}];
                break;
        }
    
    };
    
    //create map:
    for(var i = 0; i < this.map_data.length; i++){
        var tile_type = this.map_data[i];
        var info = this.getInfoFromIndex(i);
        var x_index = info.x_index;
        var y_index = info.y_index;
        switch(tile_type) {
        case 1:
            this.cells.push(new jo_wall(img_tile_black,true,this.getWallCoords('square',x_index,y_index)));
            break;
        case 2:
            this.cells.push(new jo_wall(img_tile_white,false,this.getWallCoords('square',x_index,y_index)));
            break;
        case 3:
            this.cells.push(new jo_wall(img_tile_green,false,this.getWallCoords('square',x_index,y_index)));
            break;
        case 4:
            this.cells.push(new jo_wall(img_tile_red,false,this.getWallCoords('square',x_index,y_index)));
            break;
        default:
            this.cells.push(new jo_wall(img_tile_white,false,this.getWallCoords('square',x_index,y_index)));
            break;
        };
    }
        


}