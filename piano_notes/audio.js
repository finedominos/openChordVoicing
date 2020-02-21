//***********************************AUDIO FUNCTION*****************************************//
//Countains :
// - sleep() to insert delay between playing the chords
// - play_sheet() that is linked to the button
// - audio files of the piano notes

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function play_sheet(sheet) {
    for (var c in sheet) {
        chord = sheet[c];
        for (var n in chord) {
            note = chord[n];
            note.play();
        }
        sleep(3030);
        for (var n in chord) {
            note = chord[n];
            note.pause();
            note.currentTime = 0;
        }
    }
}

function play_testSequence() {
    play_sheet([
        [D4],
        [F4, D4],
    ])
}

audio_button.onclick = play_testSequence;

//***************************BANK OF NOTES - 3 seconds each**************************//

var G4 = new Audio('piano_notes/Piano.ff.G4ready03.wav');
var Gb4 = new Audio('piano_notes/Piano.ff.Gb4ready03.wav');
var F4 = new Audio('piano_notes/Piano.ff.F4ready03.wav');
var E4 = new Audio('piano_notes/Piano.ff.E4.wav');
var D4 = new Audio('piano_notes/Piano.ff.D4.wav');
var Db4 = new Audio('piano_notes/Piano.ff.Db4.wav');