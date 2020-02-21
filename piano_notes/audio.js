//***********************************AUDIO FUNCTION*****************************************//
//Countains :
// - sleep() to insert delay between playing the chords
// - play_sheet() 
// - all the variable linked to their audio file

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

test_sequence = [
    [F4],
    [G4, F4],
    [G4]
];

function play_sheet(sheet) {
    for (var c in sheet) {
        chord = sheet[c];
        for (var n in chord) {
            note = chord[n];
            note.currentTime = 0;
            note.play();
        }
        sleep(3010);
    }
}

audio_button.onclick = play_sheet;

//***************************BANK OF NOTES - 3 seconds each**************************//

var G4 = new Audio('piano_notes/Piano.ff.G4ready03.wav');
var Gb4 = new Audio('piano_notes/Piano.ff.Gb4ready03.wav');
var F4 = new Audio('piano_notes/Piano.ff.F4ready03.wav');
var E4 = new Audio('piano_notes/Piano.ff.E4.wav');
var D4 = new Audio('piano_notes/Piano.ff.D4.wav');
var Db4 = new Audio('piano_notes/Piano.ff.Db4.wav');