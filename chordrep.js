//The notes are being represented starting from number 1!

//Numeric representation of chromatic notes within one octave
//Possible to add C## and similar combinations. In that case, adjust the functions below
var chromaticNoteRepresentation = {
    'B#': 1,
    'C♮': 1,
    'Dbb': 1,
    'B##': 2,
    'C#': 2,
    'Db': 2,
    'C##': 3,
    'D♮': 3,
    'Ebb': 3,
    'D#': 4,
    'Eb': 4,
    'Fbb': 4,
    'D##': 5,
    'E♮': 5,
    'Fb': 5,
    'E#': 6,
    'F♮': 6,
    'Gbb': 6,
    'E##': 7,
    'F#': 7,
    'Gb': 7,
    'F##': 8,
    'G♮': 8,
    'Abb': 8,
    'G#': 9,
    'Ab': 9,
    'G##': 10,
    'A♮': 10,
    'Bbb': 10,
    'A#': 11,
    'Bb': 11,
    'Cbb': 11,
    'A##': 12,
    'B♮': 12,
    'Cb': 12,
};

//Numeric representation of diatonic notes within one octave
var diatonicNoteRepresentation = {
    'C': 1,
    'D': 2,
    'E': 3,
    'F': 4,
    'G': 5,
    'A': 6,
    'B': 7
};

//Building a numeric template for the type of chord chosen - in both chromatic and diatonic representation
//The structure of a template is a 2D array: [diatonicNotePosition][chromaticNotePosition], e.g. for major chord [1,3,5][1,4,8]
function chordTypeToTemplate(chord) {
    //console.log(chord.print);
    //figure out how to use the info about root here as well    //var root = firstOct[chord.root];
    var template = [
        [1],
        [1]
    ];
    if (chord.ninth != "/") {
        template[0].push(2);
        template[1].push(chord.ninth == "9" ? 3 : (chord.ninth == "b9" ? 2 : 4));
    }
    if (chord.color != "pow") {
        template[0].push(3);
        template[1].push(chord.color == "M" ? 5 : 4);
    }
    if (chord.eleventh != "/") {
        template[0].push(4);
        template[1].push(chord.eleventh == 11 ? 6 : 7);
    }
    if (chord.fifth != 5) {
        template[0].push(5);
        template[1].push(chord.fifth == "b5" ? 7 : 9);
    }
    if (chord.fifth == 5) {
        template[0].push(5);
        template[1].push(8);
    }
    if (chord.thirteenth != "/") {
        template[0].push(6);
        template[1].push(chord.thirteenth == 13 ? 10 : 9);
    }
    if (chord.seventh != "/") {
        template[0].push(7)
        template[1].push(chord.seventh == "7Maj" ? 12 : 11);
    }
    return template;
}

//Generic function for finding a value in a dictionary
//For now, used within the find_note function to return all possible chromatic representations of a numeric value
//Example: for the input of value 11 and the chromatic dictionary, the function will return ['A#', 'Bb']
function find_val(dictionary, value) {
    var arr = [];
    for (d in dictionary) {
        if (dictionary[d] == value) {
            arr.push(d);
        }
    }
    return arr;
}

//Finding the chromatic name of note from its numeric representation (is it A# or Bb?)
function find_note(diatonicNote, chromaticPosition) {
    var arr = find_val(chromaticNoteRepresentation, chromaticPosition); //returns the 
    for (a in arr) {
        //console.log(dnote, arr[a], arr[a].charAt(0));    
        if (arr[a].charAt(0) == diatonicNote) {
            return arr[a];
        }
    }
}

//To be changed when we restrict the range of possible notes!
//Building a chord suitable for the sheet representation,from having its full range numeric representation, its root and the according chord type template
//The structure of a chord template is a 2D array: [diatonicNotePosition][chromaticNotePosition], e.g. for major chord [1,3,5][1,4,8]
//ChordNotesFullRange: chord notes represented in numbers of the whole considered range (currently from 1 to 85, where 1 stands for C1, while 85 stands for C5)
function makeChord(chordNotesFullRange, chordRoot, chordTypeTemplate) {
    var chord = [];
    for (i = 0; i < chordNotesFullRange.length; i++) {

        //Computing the numeric position of the note within one octave
        newChromatic = (chordNotesFullRange[i]) % 12;
        if (newChromatic == 0) newChromatic = 12;

        //Computing the diatonic note numerical representation by comparing with the chord root and the note's position (role) in a chord type template
        for (j = 0; j < (chordTypeTemplate[1]).length; j++) {
            chNote = (chordTypeTemplate[1][j] + chromaticNoteRepresentation[chordRoot] - 1) % 12; //checking for all notes in a template whether they fit
            if (chNote == 0) chNote = 12;
            if (chNote == newChromatic) {
                newDiatonic = (chordTypeTemplate[0][j] + diatonicNoteRepresentation[chordRoot.charAt(0)] - 1) % 7;
                if (newDiatonic == 0) newDiatonic = 7;
            }
        }
        //Computing the octave in which the note is - TO BE CHANGED IF THE OCTAVES ARE RESTRICTED?
        if (newDiatonic == 7 && (newChromatic == 1 || newChromatic == 2)) {
            OctNumber = Math.floor((chordNotesFullRange[i] - 1) / 12) - 1;
        } else if (newDiatonic == 1 && (newChromatic == 12 || newChromatic == 11)) {
            OctNumber = Math.floor((chordNotesFullRange[i] - 1) / 12) + 1;
        } else {
            OctNumber = Math.floor((chordNotesFullRange[i] - 1) / 12);
        }
        //console.log("chordNotesFullRange[i]", chordNotesFullRange[i], "OctNumber", OctNumber);

        //console.log("newDiatonic, newChromatic", newDiatonic, newChromatic);
        newNote = find_note(find_val(diatonicNoteRepresentation, newDiatonic), newChromatic);
        newNote += OctNumber;
        chord[i] = newNote;
    }
    return chord;
}

//Representing the chord in a way suitable for the music sheet
function ChordToSheet(chord) {
    var notesChord = [
        []
    ];
    for (n in chord) {
        alt = '';
        //console.log("this is the string of the chord", chord[n]);
        switch (chord[n].charAt(1)) {
            case '#':
                if (chord[n].charAt(2) == '#') {
                    alt = '+2';
                } else alt = '+1';
                break;
            case 'b':
                if (chord[n].charAt(2) == 'b') {
                    alt = '-2';
                } else alt = '-1';
                break;
            default:
                alt = '0';
        }
        if (chord[n].charAt(2) == '#' || chord[n].charAt(2) == 'b') {
            notesChord[n] = [diatonicNoteRepresentation[chord[n].charAt(0)] - 1, parseInt(chord[n].charAt(3)) + 1, alt];
        } else {
            notesChord[n] = [diatonicNoteRepresentation[chord[n].charAt(0)] - 1, parseInt(chord[n].charAt(2)) + 1, alt];
        }
    }
    return notesChord;
}

//Represeting the total array of chords in a way suitable for the music sheet
//ChordsList is an array of chords as generic objects, while chordsNotePositionsList is an array of numerical representations of specific voicings
function ChordListToSheet(chordsList, chordsNotePositionsList) {
    var finalChordList = [];

    //console.log("chordsList: ", chordsList);
    //console.log("chordsNotePositionsList: ", chordsNotePositionsList);

    for (var i = 0; i < chordsList.length; i++) {
        var template = chordTypeToTemplate(chordsList[i]);

        //console.log("error searching 2:", chordsNotePositionsList[i], chordsList[i].root, template);
        var builtChord = makeChord(chordsNotePositionsList[i], chordsList[i].root, template);
        finalChordList.push(ChordToSheet(builtChord));

        //console.log("chordTypeTemplate", template);
    }
    createSheet(finalChordList);
    console.log("Final Chords List:", finalChordList);
}