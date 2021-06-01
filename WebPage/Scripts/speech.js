if ('speechSynthesis' in window) {

    var synth = window.speechSynthesis;
    var flag = false;
  
    var voice = synth.getVoices().filter(function(voice) {
        return voice.lang.includes('es');
    })[1];

    var voice = synth.getVoices()[0];

    // console.log("Voz: ");
    // console.log({
    //     name: voice.name,
    //     lang: voice.lang,
    //     uri: voice.voiceURI,
    //     local: voice.localService,
    //     default: voice.default
        
    // });


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    function onPlay(e) {

        e = e || window.event;
        var target = e.target || e.srcElement;
        var text = target.parentNode.parentNode.textContent;
        text = text.slice(text.indexOf('volume_up')+"volume_up".length);

        console.log(target);
        console.log(text);


        if(!flag){

            // Set flag true for speaking, false else
            flag = true;

            // Create an utterance object
            utterance = new SpeechSynthesisUtterance(text);

            // Set first user's system voice
            utterance.voice = synth.getVoices()[0];

            // Set utterance properties
            utterance.voice = voice;
            // utterance.pitch = 1.5;
            // utterance.rate = 1.25;
            // utterance.volume = 0.8;

            // Set flag as false after finish reading the text
            utterance.onend = () => flag = false;

            // Speak the text
            synth.speak(utterance);
        }

        if(synth.paused) { /* unpause/resume narration */
            synth.resume();
        }
    }

    function onPause() {

        if(synth.speaking && !synth.paused){ /* pause narration */
            synth.pause();
        }
    }

    function onStop() {
        if(synth.speaking){ /* stop narration */
                flag = false;
                synth.cancel();
        }
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

} else {
    console.log('Text-to-speech not supported.');
    alert('Text-to-speech not supported.');   
}



