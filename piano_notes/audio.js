//***********************************AUDIO FUNCTION*****************************************//
// TO DO : adapt the function num_to_note() so it gives the right note

//play all notes of a chord at the same time
function play_chord(chord) {
    for (var i in chord) {
        chord[i].play();
    }
}
//the button must not be pushed again during the playing, so we change the cursor (see style.css)
function wait_to_push() {
    audio_button.classList.remove("can_not_be_pushed");
    audio_button.classList.add("can_be_pushed");
}

//play a given a sheet in format [[G4,B4], [G4,E3]..], with chords every 3.5 sec
function play_sheet_formG4(sheet) {
    audio_button.classList.remove("can_be_pushed");
    audio_button.classList.add("can_not_be_pushed");
    for (var chord_numero in sheet) {
        chord = sheet[chord_numero];
        setTimeout(play_chord, chord_numero * 3500, chord);
    }
    setTimeout(wait_to_push, (sheet.length - 1) * 3500);
}

//convert the sheet previously printed (input : chordPosList in main.js ) with num_to_note(), and play it with play_sheet_formG4()
function play_sheet_button() {
    sheet_formG4 = num_to_note(chordsPosList);
    play_sheet_formG4(sheet_formG4);
}
audio_button.onclick = play_sheet_button;

//***************************BANK OF NOTES - 3 seconds each**************************//

const G4 = new Audio('piano_notes/Piano.ff.G4ready03.wav');
const Gb4 = new Audio('piano_notes/Piano.ff.Gb4ready03.wav');
const F4 = new Audio('piano_notes/Piano.ff.F4ready03.wav');
const E4 = new Audio('piano_notes/Piano.ff.E4.wav');
//const Eb4 = new Audio('piano_notes/Piano.ff.Eb4.wav');
const D4 = new Audio('piano_notes/Piano.ff.D4.wav');
const Db4 = new Audio('piano_notes/Piano.ff.Db4.wav');

note_list_G4_to_61 = [Db4, D4, E4, F4, Gb4, G4];

//TO MAKE RIGHT ONCE WE KNOW EXACTLY OUR RANGE//
//TO FINALIZE : 37_to_C4//

//convert chordsPosList (61,88..) into "E4", "G4"..
function num_to_note(num) {
    var new_vec = [];
    for (var ch in num) {
        chord = num[ch];
        new_vec = [new_vec, []];
        for (var no in chord) {
            new_vec[ch][no] = note_list_G4_to_61[num[ch][no] % 6];
        }
    }
    return new_vec;
}