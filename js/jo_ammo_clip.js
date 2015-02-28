/*******************************************************\
Copyright 2014,2015, Jordan O'Leary, All rights reserved.
If you would like to copy or use my code, you may contact
me at jdoleary@gmail.com
/*******************************************************/
function jo_gun(clip_size, ammo_type, silenced, automatic, bullets_per_shot, spread){
    //Clip_size is the amount of ammo per clip
    this.clip_size = clip_size;
    //ammo is how much ammo is in the current clip
    this.ammo = clip_size;
    //
    this.ammo_type = ammo_type;
    //
    this.silenced = silenced;
    //automatic: if you can hold down to fire
    this.automatic = automatic;
    //bullets_per_shot: a shotgun has many bullets per shot, a pistol does not.
    this.bullets_per_shot = bullets_per_shot;
    //spread: how far apart the bullets per shot are.
    this.spread = spread;
    
    this.make_copy = function(){
        return new jo_gun(this.clip_size, this.ammo_type, this.silenced, this.automatic, this.bullets_per_shot, this.spread);
    }
   
}
//these are prefabs only, instances should be made with make_copy();
var gun_shotgun = new jo_gun(6,'shells',false,false,8,30);
var gun_pistol = new jo_gun(8,'pistol',false,false,1,0);
var gun_pistol_silenced = new jo_gun(8,'pistol',true,false,1,0);

