import Timer from './timer.js';

const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoButton = document.querySelector('.decrease-tempo');
const increaseTempoButton = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopButton = document.querySelector('.start-stop');
const subtractBeats = document.querySelector('.subtract-beats');
const addBeats = document.querySelector('.add-beats');
const measureCount = document.querySelector('.measure-count');

const click1beat = new Audio('click1.mp3');
const click1headbeat = new Audio('click1head.mp3');

const tempos = [
    { name: "Larghissimo", min: 0, max: 20 },
    { name: "Grave", min: 21, max: 40 },
    { name: "Lento/Largo", min: 41, max: 60 },
    { name: "Larghetto", min: 61, max: 66 },
    { name: "Adagio", min: 67, max: 76 },
    { name: "Adagietto", min: 71, max: 80 },
    { name: "Andante", min: 77, max: 108 },
    { name: "Andantino", min: 81, max: 108 },
    { name: "Marcia Moderato", min: 84, max: 85 },
    { name: "Moderato", min: 109, max: 120 },
    { name: "Allegretto", min: 113, max: 120 },
    { name: "Allegro", min: 121, max: 168 },
    { name: "Vivace", min: 169, max: 176 },
    { name: "Vivacissimo/Allegrissimo/Allegro Vivace", min: 173, max: 176 },
    { name: "Presto", min: 177, max: 200 },
    { name: "Prestissimo", min: 201, max: 280 }
];

function getTempoName(bpm) {
    for (let i = 0; i < tempos.length; i++) {
        if (bpm >= tempos[i].min && bpm <= tempos[i].max) {
            return tempos[i].name;
        }
    }
    return "Unknown tempo";
}

let bpm = 130;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;
tempoSlider.value = bpm;

decreaseTempoButton.addEventListener('click', () => {
    if (bpm <= 20) {return;}
    bpm--;
    updateTempoDisplay();
});

increaseTempoButton.addEventListener('click', () => {
    if (bpm >= 280) {return;}
    bpm++;
    updateTempoDisplay();
});

tempoSlider.addEventListener('input', () => {
    bpm = tempoSlider.value;
    updateTempoDisplay();
});


subtractBeats.addEventListener('click', () => {
    if (beatsPerMeasure <= 2) {return;}
    beatsPerMeasure--;
    count = 0;
    measureCount.textContent = beatsPerMeasure;
});

addBeats.addEventListener('click', () => {
    if (beatsPerMeasure >= 12) {return;}
    beatsPerMeasure++;
    count = 0;
    measureCount.textContent = beatsPerMeasure;
});

startStopButton.addEventListener('click', () => {
    count = 0;
    if (isRunning) {
        metronome.stop();
        startStopButton.textContent = 'START';
    } else {
        metronome.start();
        startStopButton.textContent = 'STOP';
    }
    isRunning = !isRunning;
});

function updateTempoDisplay() {
    metronome.stop();
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    tempoText.textContent = getTempoName(bpm);
    count = 0;
    metronome.timeInterval = 60000/bpm;
    if (isRunning)
    metronome.start();
}

function playClick(){
    if (count === beatsPerMeasure) {
        count = 0;
    }
    if (count === 0) {
        click1headbeat.play();
        click1headbeat.currentTime = 0;
    } else {
        click1beat.play();
        click1beat.currentTime = 0;
    }
    count++;
}

const metronome = new Timer(playClick, 60000/bpm , {immediate: false});

