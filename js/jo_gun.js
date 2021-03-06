/*******************************************************\
Copyright 2014,2015, Jordan O'Leary, All rights reserved.
If you would like to copy or use my code, you may contact
me at jdoleary@gmail.com
/*******************************************************/
function jo_gun(name,clip_size, silenced, automatic, bullets_per_shot, spread){
    this.name = name;
    //Clip_size is the amount of ammo per clip
    this.clip_size = clip_size;
    //ammo is how much ammo is in the current clip
    this.ammo = clip_size;
    //
    this.silenced = silenced;
    //automatic: if you can hold down to fire
    this.automatic = automatic;
    //bullets_per_shot: a shotgun has many bullets per shot, a pistol does not.
    this.bullets_per_shot = bullets_per_shot;
    //spread: how far apart the bullets per shot are.
    this.spread = spread;
    
    this.make_copy = function(){
        return new jo_gun(this.name, this.clip_size, this.silenced, this.automatic, this.bullets_per_shot, this.spread);
    }
    this.reload = function(unit){
        unit.reloading = true;
        var reload_speed = 2000;
        if(unit.reload_speed)reload_speed = unit.reload_speed;
        //reload the gun in 2 seconds
        circProgBar.reset(hero.x,hero.y,reload_speed,function(){ 
            //add ammo to gun's ammo
            this.ammo = this.clip_size;
            //set reloadingn to false so unit can reload again if they need to
            unit.reloading = false;
        }.bind(this));
        circProgBar.follow = hero;
    }
    //unit is the unit doing the shooting:
    this.shoot = function(unit){
        for(var b = 0; b < this.bullets_per_shot; b++){
            
            //make bullet (all assets in main.js):
            var bullet = new jo_sprite(new PIXI.Sprite(img_bullet));
            bullet.ignore = unit;//don't kill the shooter with own bullet
            bullet.x = unit.x;
            bullet.y = unit.y;
            //if spread is 30 deg, the randomRot will be between -15 and 15
            var randomRot = randomIntFromInterval(-this.spread/2,this.spread/2);
            //console.log('random rot: ' + randomRot);
            var endPoint = rotate_point_about_axis({x:unit.x,y:unit.y},randomRot,{x:unit.aim.end.x,y:unit.aim.end.y});
            bullet.target = getRaycastPoint(unit.x,unit.y,endPoint.x,endPoint.y);
            bullet.rotate_to_instant(bullet.target.x,bullet.target.y);
            if(this.automatic == true)bullet.speed = randomIntFromInterval(30,80);
            else bullet.speed = 75;
            //bullet.speed = 10;//slow motion bullets!
            bullet.stop_distance = bullet.speed;
            bullets.push(bullet);
            
            //end make bullet
            
            
            unit.rotate_to_instant(bullet.target.x,bullet.target.y);
        }
    
    }
   
}
//these are prefabs only, instances should be made with make_copy();
var gun_shotgun = new jo_gun("Shotgun", 6,false,false,8,30);
var gun_shotgun_sawed_off = new jo_gun("Sawed-Off Shotty", 6,false,false,8,90);
var gun_pistol = new jo_gun("Handgun",8,false,false,1,0);
var gun_pistol_silenced = new jo_gun("Silenced Handgun",8,true,false,1,0);
var gun_machine = new jo_gun("Machine Gun", 600,false,true,1,3);
var all_gun_prefabs = [gun_shotgun,gun_shotgun_sawed_off,gun_pistol,gun_pistol_silenced,gun_machine];
var all_gun_prefabs_without_sawed = [gun_shotgun,gun_pistol,gun_pistol_silenced,gun_machine];

