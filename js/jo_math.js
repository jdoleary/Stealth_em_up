
function moveToTarget(x,y,targx,targy,speed){
    //this function uses similar triangles with sides a,b,c and A,B,C where c and C are the hypotenuse
    //the movement of x and y (a,b) are found with the formulas: A/C = a/c and B/C = b/c
    var a,b;
    var c = speed;
    var A = targx-x;
    var B = targy-y;
    var C = Math.sqrt(A*A+B*B);
    if(C<1.5) return {x: x,y: y} // the object is close enough that it need not move
    a = c*A/C;
    b = c*B/C;
    var movement = {x: x+a,y: y+b, ang: Math.atan2(b,a)};
    return movement;

}
function rotate_point_about_axis(axis,angle,p)
{
    //angle is in degrees
    
    //convert from deg to rad:
    angle *= Math.PI/180;
    var orig = {x:p.x,y:p.y};
    //console.log('start: ' + p.x + "," + p.y);
    var s = Math.sin(angle);
    var c = Math.cos(angle);

    // translate point back to origin:
    p.x -= axis.x;
    p.y -= axis.y;

    // rotate point
    var xnew = p.x * c - p.y * s;
    var ynew = p.x * s + p.y * c;

    // translate point back:
    p.x = xnew + axis.x;
    p.y = ynew + axis.y;
    console.log('rotation change: ' + (180/Math.PI)*Math.atan2(get_distance(orig.x,orig.y,p.x,p.y),get_distance(orig.x,orig.y,axis.x,axis.y)));
    //console.log('end: ' + p.x + "," + p.y);
    return p;
}
function randomIntFromInterval(min,max)
{
    //console.log(min + "," + max);
    return Math.floor(Math.random()*(max-min+1)+min);
}