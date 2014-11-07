var sound_gun_shot = new Audio("sound/gun_shot.mp3");

var sound_gun_shots = {"index": 0,"array":[]};
sound_gun_shots["array"].push(new Audio("sound/gun_shot.mp3"));
sound_gun_shots["array"].push(new Audio("sound/gun_shot.mp3"));
sound_gun_shots["array"].push(new Audio("sound/gun_shot.mp3"));
sound_gun_shots["array"].push(new Audio("sound/gun_shot.mp3"));
sound_gun_shots["array"].push(new Audio("sound/gun_shot.mp3"));
sound_gun_shots["array"].push(new Audio("sound/gun_shot.mp3"));
sound_gun_shots["array"].push(new Audio("sound/gun_shot.mp3"));

var sound_gun_shot_silenced = new Audio("sound/gun_shot_silenced.mp3");
var sound_guard_choke = new Audio("sound/guard_choke.wav");
var sound_door_open = new Audio("sound/door-2-open.mp3");
var sound_door_close = new Audio("sound/door-3-close.wav");
var music_masked;
var music_unmasked;
force_buffer_sound("sound/Hidden_Agenda.mp3", 1.0, function(audio){music_unmasked = audio;});
force_buffer_sound("sound/Volatile_Reaction.mp3", 0.0, function(audio){music_masked = audio;});

sound_door_open.volume = 0.2;
sound_door_close.volume = 0.2;
sound_gun_shot.volume = 0.2;//sound is too loud, reduce volume for this clip
for(var i = 0; i < sound_gun_shots["array"].length; i++)sound_gun_shots["array"].volume = 0.2;

function play_sound(sound){
    //chrome / firefox discrepancy:
    if (window.chrome) sound.load()
    sound.play()
}

function play_sound_many(sound_array){
    //if a sound has .play() called while its still playing it will start over.  But if I use an array of the same sound
    //and cycle it whenever I want a sound to play, it is likely that the sound will finish by the time a new one is started.
    if(sound_array["index"] >= sound_array["array"].length)sound_array["index"] = 0;
    play_sound(sound_array["array"][sound_array["index"]++]);
    console.log('play index ' + sound_array["index"] + ' size: ' + sound_array["array"].length);
}

function pause_sound(sound){
    sound.pause();
}

function force_buffer_sound(url, vol, callback_return){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
      if (this.status == 200) {
        //got it
        var myBlob = this.response;
        var sound = (window.webkitURL ? webkitURL : URL).createObjectURL(myBlob);

        var aud = new Audio();
        aud.src = sound;
        aud.volume = vol;
        //repeat music
        aud.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }.bind(aud));
        aud.play();
        callback_return(aud);
        
       }
      }

    xhr.send();
}
