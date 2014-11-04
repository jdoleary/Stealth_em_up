var sound_gun_shot = new Audio("sound/gun_shot.mp3");
var sound_guard_choke = new Audio("sound/guard_choke.wav");
var sound_unit_die = new Audio("sound/unit_die.wav");
var music_masked = new Audio("sound/Volatile_Reaction.mp3");
var music_unmasked = new Audio("sound/Hidden_Agenda.mp3");
//set so that they will load simultaneously and not wait for the first to finish loading:
music_unmasked.preload = "auto";
music_masked.preload = "auto";
console.log('net state ' + music_masked.networkState);
//music_unmasked.play();
music_unmasked.volume = 0.5;
music_masked.volume = 0.0;
//music_masked.play();
sound_gun_shot.volume = 0.2;//sound is too loud, reduce volume for this clip


function play_sound(sound){
    sound.load();
    sound.play();
}
function pause_sound(sound){
    sound.pause();
}