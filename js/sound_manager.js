var sound_gun_shot = new Audio("../sound/gun_shot.mp3");
var sound_guard_choke = new Audio("../sound/guard_choke.wav");
var sound_unit_die = new Audio("../sound/unit_die.wav");
sound_gun_shot.volume = 0.2;

function play_sound(sound){
    sound.load();
    sound.play();
}
function pause_sound(sound){
    sound.pause();
}