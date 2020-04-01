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

//chordPosList is something like [ [61,88], [13], ... ] 
//convert the sheet previously printed (input : chordPosList in main.js ) with num_to_note(), and play it with play_sheet_formG4()
function play_sheet_button() {
    // TODO : you can't call voicingSequence like that, also because it may not even exist, and is property of main. maybe some functions need to be moved to main ? or some changes in the main dunnow..
    sheet_formG4 = num_to_note(voicingSequence);
    play_sheet_formG4(sheet_formG4);
}
audio_button.onclick = play_sheet_button;

//***************************BANK OF NOTES - 3 seconds each**************************//

//Scales 2-3-4-5-6 - 3 seconds length
const C2 = new Audio('piano_notes/mp3/Piano.ff.C2r.mp3');
const Db2 = new Audio('piano_notes/mp3/Piano.ff.Db2r.mp3');
const D2 = new Audio('piano_notes/mp3/Piano.ff.D2r.mp3');
const E2 = new Audio('piano_notes/mp3/Piano.ff.E2r.mp3');
const Eb2 = new Audio('piano_notes/mp3/Piano.ff.Eb2r.mp3');
const F2 = new Audio('piano_notes/mp3/Piano.ff.F2r.mp3');
const Gb2 = new Audio('piano_notes/mp3/Piano.ff.Gb2r.mp3');
const G2 = new Audio('piano_notes/mp3/Piano.ff.G2r.mp3');
const Ab2 = new Audio('piano_notes/mp3/Piano.ff.Ab2r.mp3');
const A2 = new Audio('piano_notes/mp3/Piano.ff.A2r.mp3');
const Bb2 = new Audio('piano_notes/mp3/Piano.ff.Bb2r.mp3');
const B2 = new Audio('piano_notes/mp3/Piano.ff.B2r.mp3');

const C3 = new Audio('piano_notes/mp3/Piano.ff.C3r.mp3');
const Db3 = new Audio('piano_notes/mp3/Piano.ff.Db3r.mp3');
const D3 = new Audio('piano_notes/mp3/Piano.ff.D3r.mp3');
const E3 = new Audio('piano_notes/mp3/Piano.ff.E3r.mp3');
const Eb3 = new Audio('piano_notes/mp3/Piano.ff.Eb3r.mp3');
const F3 = new Audio('piano_notes/mp3/Piano.ff.F3r.mp3');
const Gb3 = new Audio('piano_notes/mp3/Piano.ff.Gb3r.mp3');
const G3 = new Audio('piano_notes/mp3/Piano.ff.G3r.mp3');
const Ab3 = new Audio('piano_notes/mp3/Piano.ff.Ab3r.mp3');
const A3 = new Audio('piano_notes/mp3/Piano.ff.A3r.mp3');
const Bb3 = new Audio('piano_notes/mp3/Piano.ff.Bb3r.mp3');
const B3 = new Audio('piano_notes/mp3/Piano.ff.B3r.mp3');

const C4 = new Audio('piano_notes/mp3/Piano.ff.C4r.mp3');
const Db4 = new Audio('piano_notes/mp3/Piano.ff.Db4r.mp3');
const D4 = new Audio('piano_notes/mp3/Piano.ff.D4r.mp3');
const E4 = new Audio('piano_notes/mp3/Piano.ff.E4r.mp3');
const Eb4 = new Audio('piano_notes/mp3/Piano.ff.Eb4r.mp3');
const F4 = new Audio('piano_notes/mp3/Piano.ff.F4r.mp3');
const Gb4 = new Audio('piano_notes/mp3/Piano.ff.Gb4r.mp3');
const G4 = new Audio('piano_notes/mp3/Piano.ff.G4r.mp3');
const Ab4 = new Audio('piano_notes/mp3/Piano.ff.Ab4r.mp3');
const A4 = new Audio('piano_notes/mp3/Piano.ff.A4r.mp3');
const Bb4 = new Audio('piano_notes/mp3/Piano.ff.Bb4r.mp3');
const B4 = new Audio('piano_notes/mp3/Piano.ff.B4r.mp3');

const C5 = new Audio('piano_notes/mp3/Piano.ff.C5r.mp3');
const Db5 = new Audio('piano_notes/mp3/Piano.ff.Db5r.mp3');
const D5 = new Audio('piano_notes/mp3/Piano.ff.D5r.mp3');
const E5 = new Audio('piano_notes/mp3/Piano.ff.E5r.mp3');
const Eb5 = new Audio('piano_notes/mp3/Piano.ff.Eb5r.mp3');
const F5 = new Audio('piano_notes/mp3/Piano.ff.F5r.mp3');
const Gb5 = new Audio('piano_notes/mp3/Piano.ff.Gb5r.mp3');
const G5 = new Audio('piano_notes/mp3/Piano.ff.G5r.mp3');
const Ab5 = new Audio('piano_notes/mp3/Piano.ff.Ab5r.mp3');
const A5 = new Audio('piano_notes/mp3/Piano.ff.A5r.mp3');
const Bb5 = new Audio('piano_notes/mp3/Piano.ff.Bb5r.mp3');
const B5 = new Audio('piano_notes/mp3/Piano.ff.B5r.mp3');

const C6 = new Audio('piano_notes/mp3/Piano.ff.C6r.mp3');

//scale 2,3,4,5 with C6, 5 with C6, 5 with C6 (goes from note 13 to 61, and scale 5 is added 3 times temporary)
const note_list_G4_to_61 = [C2, Db2, D2, Eb2, E2, F2, Gb2, G2, Ab2, A2, Bb2, B2, C3,  Db3,  D3,  Eb3,  E3,  F3,  Gb3,  G3,  Ab3,  A3,  Bb3,  B3, C4,  Db4,  D4,  Eb4,  E4,  F4,  Gb4,  G4,  Ab4,  A4,  Bb4,  B4, C5,  Db5,  D5,  Eb5,  E5,  F5,  Gb5,  G5,  Ab5,  A5,  Bb5,  B5, C6, Db5,  D5,  Eb5,  E5,  F5,  Gb5,  G5,  Ab5,  A5,  Bb5,  B5, C6, Db5,  D5,  Eb5,  E5,  F5,  Gb5,  G5,  Ab5,  A5,  Bb5,  B5, C6 ];

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