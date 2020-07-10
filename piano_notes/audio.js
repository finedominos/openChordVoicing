//***********************************AUDIO FUNCTION*****************************************//

var time_per_chord = 3100; //ms

//plays the sequence of chords printed on the sheet
function play_sheet_button() {
    console.log("Playing the sheet music... ")
    sequence_englishNotation = num_to_note(voicingSequence);
    play_sequence(sequence_englishNotation);
}

//plays the chord printed on the keyboard
function play_keyboard_button() {
    key_englishNotation = num_to_note([printedChord]);  //printedChord availale from keyboard.js
    console.log("Playing the chord printed on keyboard... ")
    wait_to_push(0);
    play_chord(key_englishNotation[0]);
    setTimeout(wait_to_push, time_per_chord, 1);
}

//takes a sequence of chords in format [[G4,B4,D5], [C4,Bb4,E5]..], and play chords every "time_per_chord" milliseconds
function play_sequence(sequence) {
    wait_to_push(0);
    for (var chord_numero in sequence) {
        chord = sequence[chord_numero];
        setTimeout(play_chord, chord_numero * time_per_chord, chord);
    }
    setTimeout(wait_to_push, (sequence.length) * time_per_chord, 1);
}

//play all notes of a chord at the same time
function play_chord(chord) {
    for (var i in chord) {
        chord[i].play();
    }
}

const button_list = [audio_button1, audio_button2];
//the button must not be pushed again during the playing, so cursor is changed to "waiter"
function wait_to_push(disable) {
    if (disable == 1) {
        for (var i in button_list) {
            button_list[i].classList.remove("can_not_be_pushed");
            button_list[i].classList.add("can_be_pushed");
        }
        console.log("...finished playing.")
    }
    if (disable == 0) {
        for (var i in button_list) {
            button_list[i].classList.remove("can_be_pushed");
            button_list[i].classList.add("can_not_be_pushed");
        }
    }
}

//UTILITY :
//converts numeros of notes into names (ex : 61 into G4) 
function num_to_note(sequence_num) {
    var sequence_formatted = [];
    for (var chord_index in sequence_num) {
        chord = sequence_num[chord_index];
        new_chord = [];
        for (var num in chord) {
            new_chord[num] = note_list_G4_to_61[sequence_num[chord_index][num] - 13];
        }
        sequence_formatted[chord_index] = new_chord;
    }
    return sequence_formatted;
}

//***************************BANK OF NOTES - 3 seconds each**************************//

const path_notes = 'piano_notes/mp3/';

//Scales 2-3-4-5-6 - 3 seconds length
const C2 = new Audio(path_notes + 'Piano.ff.C2r.mp3');
const Db2 = new Audio(path_notes + 'Piano.ff.Db2r.mp3');
const D2 = new Audio(path_notes + 'Piano.ff.D2r.mp3');
const E2 = new Audio(path_notes + 'Piano.ff.E2r.mp3');
const Eb2 = new Audio(path_notes + 'Piano.ff.Eb2r.mp3');
const F2 = new Audio(path_notes + 'Piano.ff.F2r.mp3');
const Gb2 = new Audio(path_notes + 'Piano.ff.Gb2r.mp3');
const G2 = new Audio(path_notes + 'Piano.ff.G2r.mp3');
const Ab2 = new Audio(path_notes + 'Piano.ff.Ab2r.mp3');
const A2 = new Audio(path_notes + 'Piano.ff.A2r.mp3');
const Bb2 = new Audio(path_notes + 'Piano.ff.Bb2r.mp3');
const B2 = new Audio(path_notes + 'Piano.ff.B2r.mp3');

const C3 = new Audio(path_notes + 'Piano.ff.C3r.mp3');
const Db3 = new Audio(path_notes + 'Piano.ff.Db3r.mp3');
const D3 = new Audio(path_notes + 'Piano.ff.D3r.mp3');
const E3 = new Audio(path_notes + 'Piano.ff.E3r.mp3');
const Eb3 = new Audio(path_notes + 'Piano.ff.Eb3r.mp3');
const F3 = new Audio(path_notes + 'Piano.ff.F3r.mp3');
const Gb3 = new Audio(path_notes + 'Piano.ff.Gb3r.mp3');
const G3 = new Audio(path_notes + 'Piano.ff.G3r.mp3');
const Ab3 = new Audio(path_notes + 'Piano.ff.Ab3r.mp3');
const A3 = new Audio(path_notes + 'Piano.ff.A3r.mp3');
const Bb3 = new Audio(path_notes + 'Piano.ff.Bb3r.mp3');
const B3 = new Audio(path_notes + 'Piano.ff.B3r.mp3');

const C4 = new Audio(path_notes + 'Piano.ff.C4r.mp3');
const Db4 = new Audio(path_notes + 'Piano.ff.Db4r.mp3');
const D4 = new Audio(path_notes + 'Piano.ff.D4r.mp3');
const E4 = new Audio(path_notes + 'Piano.ff.E4r.mp3');
const Eb4 = new Audio(path_notes + 'Piano.ff.Eb4r.mp3');
const F4 = new Audio(path_notes + 'Piano.ff.F4r.mp3');
const Gb4 = new Audio(path_notes + 'Piano.ff.Gb4r.mp3');
const G4 = new Audio(path_notes + 'Piano.ff.G4r.mp3');
const Ab4 = new Audio(path_notes + 'Piano.ff.Ab4r.mp3');
const A4 = new Audio(path_notes + 'Piano.ff.A4r.mp3');
const Bb4 = new Audio(path_notes + 'Piano.ff.Bb4r.mp3');
const B4 = new Audio(path_notes + 'Piano.ff.B4r.mp3');

const C5 = new Audio(path_notes + 'Piano.ff.C5r.mp3');
const Db5 = new Audio(path_notes + 'Piano.ff.Db5r.mp3');
const D5 = new Audio(path_notes + 'Piano.ff.D5r.mp3');
const E5 = new Audio(path_notes + 'Piano.ff.E5r.mp3');
const Eb5 = new Audio(path_notes + 'Piano.ff.Eb5r.mp3');
const F5 = new Audio(path_notes + 'Piano.ff.F5r.mp3');
const Gb5 = new Audio(path_notes + 'Piano.ff.Gb5r.mp3');
const G5 = new Audio(path_notes + 'Piano.ff.G5r.mp3');
const Ab5 = new Audio(path_notes + 'Piano.ff.Ab5r.mp3');
const A5 = new Audio(path_notes + 'Piano.ff.A5r.mp3');
const Bb5 = new Audio(path_notes + 'Piano.ff.Bb5r.mp3');
const B5 = new Audio(path_notes + 'Piano.ff.B5r.mp3');

const C6 = new Audio(path_notes + 'Piano.ff.C6r.mp3');

//scale 2,3,4,5 with C6, (goes from note 13 to 61)
const note_list_G4_to_61 = [C2, Db2, D2, Eb2, E2, F2, Gb2, G2, Ab2, A2, Bb2, B2, C3,  Db3,  D3,  Eb3,  E3,  F3,  Gb3,  G3,  Ab3,  A3,  Bb3,  B3, C4,  Db4,  D4,  Eb4,  E4,  F4,  Gb4,  G4,  Ab4,  A4,  Bb4,  B4, C5,  Db5,  D5,  Eb5,  E5,  F5,  Gb5,  G5,  Ab5,  A5,  Bb5,  B5, C6, Db5,  D5,  Eb5,  E5,  F5,  Gb5,  G5,  Ab5,  A5,  Bb5,  B5, C6, Db5,  D5,  Eb5,  E5,  F5,  Gb5,  G5,  Ab5,  A5,  Bb5,  B5, C6 ];
