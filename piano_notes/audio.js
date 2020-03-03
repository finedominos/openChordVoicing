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
        console.log(chord);
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

//Scales 2-3-4-5-6 - 3 seconds length
const C2 = new Audio('piano_notes/Piano.ff.C2r.wav');
const Db2 = new Audio('piano_notes/Piano.ff.Db2r.wav');
const D2 = new Audio('piano_notes/Piano.ff.D2r.wav');
const E2 = new Audio('piano_notes/Piano.ff.E2r.wav');
const Eb2 = new Audio('piano_notes/Piano.ff.Eb2r.wav');
const F2 = new Audio('piano_notes/Piano.ff.F2r.wav');
const Gb2 = new Audio('piano_notes/Piano.ff.Gb2r.wav');
const G2 = new Audio('piano_notes/Piano.ff.G2r.wav');
const Ab2 = new Audio('piano_notes/Piano.ff.Ab2r.wav');
const A2 = new Audio('piano_notes/Piano.ff.A2r.wav');
const Bb2 = new Audio('piano_notes/Piano.ff.Bb2r.wav');
const B2 = new Audio('piano_notes/Piano.ff.B2r.wav');

const C3 = new Audio('piano_notes/Piano.ff.C3r.wav');
const Db3 = new Audio('piano_notes/Piano.ff.Db3r.wav');
const D3 = new Audio('piano_notes/Piano.ff.D3r.wav');
const E3 = new Audio('piano_notes/Piano.ff.E3r.wav');
const Eb3 = new Audio('piano_notes/Piano.ff.Eb3r.wav');
const F3 = new Audio('piano_notes/Piano.ff.F3r.wav');
const Gb3 = new Audio('piano_notes/Piano.ff.Gb3r.wav');
const G3 = new Audio('piano_notes/Piano.ff.G3r.wav');
const Ab3 = new Audio('piano_notes/Piano.ff.Ab3r.wav');
const A3 = new Audio('piano_notes/Piano.ff.A3r.wav');
const Bb3 = new Audio('piano_notes/Piano.ff.Bb3r.wav');
const B3 = new Audio('piano_notes/Piano.ff.B3r.wav');

const C4 = new Audio('piano_notes/Piano.ff.C4r.wav');
const Db4 = new Audio('piano_notes/Piano.ff.Db4r.wav');
const D4 = new Audio('piano_notes/Piano.ff.D4r.wav');
const E4 = new Audio('piano_notes/Piano.ff.E4r.wav');
const Eb4 = new Audio('piano_notes/Piano.ff.Eb4r.wav');
const F4 = new Audio('piano_notes/Piano.ff.F4r.wav');
const Gb4 = new Audio('piano_notes/Piano.ff.Gb4r.wav');
const G4 = new Audio('piano_notes/Piano.ff.G4r.wav');
const Ab4 = new Audio('piano_notes/Piano.ff.Ab4r.wav');
const A4 = new Audio('piano_notes/Piano.ff.A4r.wav');
const Bb4 = new Audio('piano_notes/Piano.ff.Bb4r.wav');
const B4 = new Audio('piano_notes/Piano.ff.B4r.wav');

const C5 = new Audio('piano_notes/Piano.ff.C5r.wav');
const Db5 = new Audio('piano_notes/Piano.ff.Db5r.wav');
const D5 = new Audio('piano_notes/Piano.ff.D5r.wav');
const E5 = new Audio('piano_notes/Piano.ff.E5r.wav');
const Eb5 = new Audio('piano_notes/Piano.ff.Eb5r.wav');
const F5 = new Audio('piano_notes/Piano.ff.F5r.wav');
const Gb5 = new Audio('piano_notes/Piano.ff.Gb5r.wav');
const G5 = new Audio('piano_notes/Piano.ff.G5r.wav');
const Ab5 = new Audio('piano_notes/Piano.ff.Ab5r.wav');
const A5 = new Audio('piano_notes/Piano.ff.A5r.wav');
const Bb5 = new Audio('piano_notes/Piano.ff.Bb5r.wav');
const B5 = new Audio('piano_notes/Piano.ff.B5r.wav');

const C6 = new Audio('piano_notes/Piano.ff.C6r.wav');


const note_list_G4_to_61 = [C2, Db2, D2, Eb2, E2, F2, Gb2, G2, Ab2, A2, Bb2, B2, C3,  Db3,  D3,  Eb3,  E3,  F3,  Gb3,  G3,  Ab3,  A3,  Bb3,  B3, C4,  Db4,  D4,  Eb4,  E4,  F4,  Gb4,  G4,  Ab4,  A4,  Bb4,  B4, C5,  Db5,  D5,  Eb5,  E5,  F5,  Gb5,  G5,  Ab5,  A5,  Bb5,  B5, C6, Db5,  D5,  Eb5,  E5,  F5,  Gb5,  G5,  Ab5,  A5,  Bb5,  B5, C6, Db5,  D5,  Eb5,  E5,  F5,  Gb5,  G5,  Ab5,  A5,  Bb5,  B5, C6 ];
// to add : C3, Db3, D3, Eb3, E3, F3, Gb3, G3, Ab3, A3, Bb3, B3, C4, Db4, D4, Eb4, E4, F4, Gb4, G4, Ab4, A4, Bb4, B4,C5, Db5, D5, Eb5, E5, F5, Gb5, G5, Ab5, A5, Bb5, B5,C6, Db6, D6, Eb6, E6, F6, Gb6, G6, Ab6, A6, Bb6, B6]

//Converting chordsPosList = [ [61,88], [13] ] into [ [E4,G4], [C2] ]
function num_to_note(num) {
    var new_vec = [];
    for (var ch in num) {
        chord = num[ch];
        new_chord = [];
        for (var no in chord) {
            new_chord[no] = note_list_G4_to_61[num[ch][no] - 13];
        }
        new_vec[ch] = new_chord;
    }
    return new_vec;
}