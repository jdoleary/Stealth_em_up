var map1 = {
         "data":[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
        //gets the 2d index from the 1d index
        var x_index = index%this.width;
        var y_index = Math.floor(index/this.width);
        return {x_index: x_index, y_index: y_index};
    };
    
    this.getIndexFromGrid = function(row, col){
        //gets 1d index from 2d index
        return this.cells[width * row + col];
    };
    
    this.getIndexFromCoords_2d = function(x,y){
        //returns the index of the cell that coords are within
        var indexX = Math.floor(x/this.cell_size);
        var indexY = Math.floor(y/this.cell_size);
        return {x: indexX, y: indexY};
    }
    
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
    
    /////////////////////////////
    ////////////A STAR///////////
    /////////////////////////////
    
    this.cells_astar = [];//astar.js requires an actual 2d array so this variable will be made from cells as a 2D array
    //the below for loop turns this.cells into a 2d array and puts it in this.cells_astar
    for(var i = 0; i < this.height; i++){
        var slice = this.cells.slice(i*this.width,i*this.width+this.width);
        for(var j = 0; j < slice.length; j++){
            //convert tile codes into 0 for wall and 1 for floor:
            if(slice[j].solid){
                slice[j] = 0;
            }else{
                slice[j] = 1;
            }
        }
        //console.log('map ' , i , ' ' , slice);
        this.cells_astar.push(slice);
    }
    this.cells_astar = new Graph(this.cells_astar);//convert to astar graph
    this.getPath = function(start,end){
        //start/end in format {x: #,y: #} # representing cell indices.
        //because of how I read 2d arrays I have to treat all the y's as x's and all the x's as y's in the astar lib
        //                      y   x
        var start = this.cells_astar.nodes[start.y][start.x];//remember x and y are switched for the astar lib
        var end = this.cells_astar.nodes[end.y][end.x];//remember x and y are switched for the astar lib
        var result = astar.search(this.cells_astar.nodes, start, end);
        var path = [];
        for(var i = 0; i < result.length; i++){
            path.push({x: result[i].y*this.cell_size+this.cell_size/2, y: result[i].x*this.cell_size+this.cell_size/2});//return path in obj pixel location, index*64-32 will center the pixel on the correct index cell
            //console.log(result[i].y , ',' , result[i].x);
        }
        return path; //path is an array of points
    
    }
        


}