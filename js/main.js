// Init speach synth api
const synth = window.speechSynthesis;
// DOM Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

// init voices array

let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  // loop throw voices
  //   console.log(voices);

  voices.forEach(voice => {
    // create option element
    const option = document.createElement("option");
    // fill the option with voice and language

    option.textContent = voice.name + "(" + voice.lang + ")";
    // set needed option attributes (custom-attribute)
    option.setAttribute("data-name", voice.name);
    option.setAttribute("data-lang", voice.lang);
    // append options to the select
    voiceSelect.appendChild(option);
  });
};
//getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

//  speak

const speak = () => {
  if (synth.speaking) {
    console.error("Already Speakin ...");
    return;
  }
  //   textInput.value = "hello guys";
  if (textInput.value !== "") {
    // add backkground animation
    body.style.background = "#141414 url(img/wave.gif)";
    body.style.background.repeat = "repeat-x";
    body.style.backgroundSize = "100% 55%";
    body.style.backgroundPosition = "0 20%";
    // get Speak text

    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // console.log(speakText);
    // get speak end

    speakText.onend = e => {
      console.log("speaking done ....");
      body.style.background = "#141414";
    };
    speakText.onerror = e => {
      console.err("Error had happened ... ");
    };

    //console.log(voiceSelect[0]);

    // selected voice
    const selectedVoice = voiceSelect[0].getAttribute("data-name");

    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });
    // set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    // speak
    synth.speak(speakText);
  }
};
// EVENT LISTENERS



// text form submit
textForm.addEventListener("submit", e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// rate Changing
rate.addEventListener("change", e => (rateValue.textContent = rate.value));

// pitch Changing
rate.addEventListener("change", e => (pitchValue.textContent = pitch.value));

// voice select change
voiceSelect.addEventListener("change", e => speak());

// three main critical objects 1-synth.speak(speakText);
//                             2-speakText = new SpeechSynthesisUtterance(textInput.value);  


