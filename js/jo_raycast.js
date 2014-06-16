//http://www.permadi.com/tutorial/raycast/rayc7.html
function raycast_horiz(point,angle){
    //returns the points where the line intersects with the horizontal lines
    /*
    (Ax,Ay) are the coordinates of the first intersection between the ray and the horizontal line.
    Xa and Ya are the difference between Ax,Ay and the next point.  So for example the next point is
    (Ax+Xa,Ay+Ya)
    */
    if(angle > Math.PI || angle < -Math.PI){
        console.log("Error, angle must be between 180 and -180 degrees");
        return;
    }
    
    if (angle < 0){
        var Ya = -grid.cell_size;
        var Xa = -grid.cell_size/Math.tan(angle);
        var Ay = Math.floor(point.y/grid.cell_size) * grid.cell_size - 1;
    }else{
        var Ya = grid.cell_size;
        var Xa = grid.cell_size/Math.tan(angle);
        var Ay = Math.floor(point.y/grid.cell_size) * grid.cell_size + grid.cell_size;
    }
    
    var Ax = point.x + (Ay - point.y) / Math.tan(angle);
    return {x:Ax,y:Ay,dx:Xa,dy:Ya};
}
var test;
function nextPointAlongRay(firstPointAlongRay,index){
    //the index'th point
    test = firstPointAlongRay;
    var nextX = firstPointAlongRay.x+firstPointAlongRay.dx*index;
    var nextY = firstPointAlongRay.y+firstPointAlongRay.dy*index;
    return {x:nextX,y:nextY};
}

function raycast_virt(point,angle){
//returns the points where the line intersects with the vertical lines
    if(angle > Math.PI || angle < -Math.PI){
        console.log("Error, angle must be between 180 and -180 degrees");
        return;
    }
    
    if( angle > -Math.PI/2 && angle < Math.PI/2){
        var Bx = Math.floor(point.x/grid.cell_size)*(grid.cell_size)+grid.cell_size;
        var Xa = grid.cell_size;
        var Ya = grid.cell_size*Math.tan(angle);
        
    }else{
        var Bx = Math.floor(point.x/grid.cell_size) * (grid.cell_size) - 1;
        var Xa = -grid.cell_size;
        var Ya = -grid.cell_size*Math.tan(angle);
    
    }
    var By = point.y + (Bx-point.x)*Math.tan(angle);
    
    return {x:Bx,y:By,dx:Xa,dy:Ya};

}