
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
