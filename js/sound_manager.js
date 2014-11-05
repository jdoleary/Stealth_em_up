var sound_gun_shot = new Audio("sound/gun_shot.mp3");
var sound_guard_choke = new Audio("sound/guard_choke.wav");
var music_masked;
var music_unmasked;
force_buffer_sound("sound/Hidden_Agenda.mp3", 1.0, function(audio){music_unmasked = audio;});
force_buffer_sound("sound/Volatile_Reaction.mp3", 0.0, function(audio){music_masked = audio;});
sound_gun_shot.volume = 0.2;//sound is too loud, reduce volume for this clip


function play_sound(sound){
    sound.load();
    sound.play();
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
        aud.play();
        callback_return(aud);
        
       }
      }

    xhr.send();
}
