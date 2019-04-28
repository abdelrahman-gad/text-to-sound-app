// Init speach synth api
/**
 *  @description this object handles speach matters
 *  @constant
 *  @name synth
 *  @global
 *  @type {Object}
 */
const synth = window.speechSynthesis;

// DOM Elements
/**
 *  @description form DOM
 *  @constant
 *  @name textForm
 *  @global
 *  @type {Object}
 */
const textForm = document.querySelector("form");
/**
 *  @description form text input DOM
 *  @constant
 *  @name textInput
 *  @global
 *  @type {Object}
 */
const textInput = document.querySelector("#text-input");

/**
 *  @description form select option input specifies the pronoucing voice
 *  @constant
 *  @name voiceSelect
 *  @global
 *  @type {Object}
 */
const voiceSelect = document.querySelector("#voice-select");

/**
 *  @description form rating input enables user to select the rate of the voice
 *  @constant
 *  @name rate
 *  @global
 *  @type {Object}
 */
const rate = document.querySelector("#rate");

/**
 *  @description form rating label shows the rate value of the voice
 *  @constant
 *  @name rateValue
 *  @global
 *  @type {Object}
 */
const rateValue = document.querySelector("#rate-value");
/**
 *  @description form rating input enables user to select the pitch of the voice
 *  @constant
 *  @name pitch
 *  @global
 *  @type {Object}
 */
const pitch = document.querySelector("#pitch");
/**
 *  @description form rating label shows the pitch value of the voice
 *  @constant
 *  @name pitchValue
 *  @global
 *  @type {Object}
 */
const pitchValue = document.querySelector("#pitch-value");

/**
 *  @description body html object model
 *  @constant
 *  @name pitchValue
 *  @global
 *  @type {Object}
 */
const body = document.querySelector("body");

/**
 * @description array of all available voices that user can selesct from
 * @global
 * @name voices
 * @type {SpeechSynthesisVoice[]}
 */
let voices = [];

/**
 * @description fetches all voices  from the {@link synth} object and populate the DOM {@link voiceSelect } element
 * @function
 * @name getVoices
 *  */
const getVoices = () => {
  voices = synth.getVoices();
  // loop throw voices
  //   console.log(voices);
  /**
   * @description hieghr order array function loops throw each element in the {@link voices} array and does specific funcion
   * @function
   * @inner
   * @param {funcion}
   */
  voices.forEach(voice => {
    /**
     * @description create option element
     * @constant
     * @inner
     * @name option
     * */

    const option = document.createElement("option");

    /**
     * @description fill the {@link option} with {@link voice} name and language
     * @name option.textContent
     * @attribute -
     */

    option.textContent = voice.name + "(" + voice.lang + ")";

    /**
     * @description set needed option attributes (custom-attribute)
     * @function
     * @name setAttribute
     * @param {string} "data-name" -custom attribute name
     * @param {string}  voice.name - name property of object {@link voice }
     */
    option.setAttribute("data-name", voice.name);
    /**
     * @description set needed {@link option} attributes (custom-attribute)
     * @function
     * @name setAttribute
     * @param {string} "data-name" -custom attribute lang
     * @param {string}  voice.lang - name property of object {@link voice }
     */
    option.setAttribute("data-lang", voice.lang);
    /**
     * @description appending  {@link option }s  child  DOM elements to parent {@link voiceSelect}  DOM element
     * @name voiceSelect.appendChild
     * @param {Object} -HTML DOM  element {@link option}
     * @function
     */

    voiceSelect.appendChild(option);
  });
};

/**
 * @description run {@link getVoices } funcion if {@link synth}.{@link onvoiceschanged} event is not undefined
 */
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

/**
 * @description transform {@link textInput} into {@link voice}
 * @function
 * @name speak
 * @listens event:change,submit
 * @global
 */
const speak = () => {
  if (synth.speaking) {
    /**
     * @description  testing function
     */
    console.log(synth.speaking);
    console.error("Already Speakin ...");

    return;
  }
  //   textInput.value = "hello guys";
  /**
   * @description change css styles during speakin
   */
  if (textInput.value !== "") {
    body.style.background = "#141414 url(src/img/wave.gif)";
    body.style.background.repeat = "repeat-x";
    body.style.backgroundSize = "100% 55%";
    body.style.backgroundPosition = "0 20%";
    /**
     * @description -instantiat an instance from the class {@link SpeechSynthesisUtterance}
     *              -passing string {@link textInput}.value
     *
     * @constant
     * @name speakText
     */

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

/**
 * @description firing {@link speak} function on submitting the form {@link textForm}
 * @name textForm.addEventListener
 * @function
 * @global
 * @event submit
 * @param {string} change  name of event
 * @param {function} anonymous function is fired when the event happend
 *  */
textForm.addEventListener("submit", e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

/**
 * @description firing {@link speak} function on submitting the rate {@link rate} DOM element
 * @name rate.addEventListener
 * @function
 * @global
 * @event change
 * @param {string} change  name of event
 * @param {function} anonymous function is fired when the event happend
 *  */

rate.addEventListener("change", e => (rateValue.textContent = rate.value));

/**
 * @description firing {@link speak} function on submitting the form {@link pitch} DOM element
 * @name rate.addEventListener
 * @function
 * @global
 * @event change
 * @param {string} change  name of event
 * @param {function} anonymous function is fired when the event happend
 *  */

rate.addEventListener("change", e => (pitchValue.textContent = pitch.value));
/**
 * @description firing {@link speak} function on submitting the form {@link voiceSelect} DOM element
 * @name voiceSelect.addEventListener
 * @function
 * @global
 * @event change
 * @param {string} change  name of event
 * @param {function} anonymous function is fired when the event happend
 *  */

voiceSelect.addEventListener("change", e => speak());

// three main critical objects 1-synth.speak(speakText);
//                             2-speakText = new SpeechSynthesisUtterance(textInput.value);
