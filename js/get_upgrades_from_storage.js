//sets the upgrades as a global variable so that the game can init from the player's upgrades
//These values are loaded into sprite_hero.js
var upgrades = {
    "hero_health":jo_store_get("hero_health"),//implemented
    "kick_doors":jo_store_get("kick_doors"),
    "auto_pickup_ammo":jo_store_get("auto_pickup_ammo"),
    "NumOfGunsHold":jo_store_get("NumOfGunsHold"),
    "RemoteLockpick":jo_store_get("RemoteLockpick"),
    "Run_speed":jo_store_get("Run_speed"),//implemented
    "Lockpick_speed":jo_store_get("Lockpick_speed"),//implemented
    "Reload_speed":jo_store_get("Reload_speed"),//implemented
    "Toggle_mask":jo_store_get("Toggle_mask"),//implemented
    "Choke_speed":jo_store_get("Choke_speed"),//implemented
    "Drag_body_speed":jo_store_get("Drag_body_speed"),//implemented
    "Timed_bomb":jo_store_get("Timed_bomb"),
    "Remote_bomb":jo_store_get("Remote_bomb"),
    "Body_armor":jo_store_get("Body_armor"),
    "Plastic_surgery":jo_store_get("Plastic_surgery")
}
//convert sting to bool if bool string
for(var key in upgrades){
    if(upgrades[key]==="false")upgrades[key]=false;
    if(upgrades[key]==="true")upgrades[key]=true;
}