//The notes are being represented starting from number 1!

//rename
var chromatic = {
    'B#': 1,
    'C♮': 1,
    'C#': 2,
    'Db': 2,
    'D♮': 3,
    'D#': 4,
    'Eb': 4,
    'E♮': 5,
    'Fb': 5,
    'E#': 6,
    'F♮': 6,
    'F#': 7,
    'Gb': 7,
    'G♮': 8,
    'G#': 9,
    'Ab': 9,
    'A♮': 10,
    'A#': 11,
    'Bb': 11,
    'B♮': 12,
    'Cb': 12,
  };
  
//rename
var diatonic = {
    'C': 1,
    'D': 2,
    'E': 3,
    'F': 4,
    'G': 5,
    'A': 6,
    'B': 7
  };


function chordToTemplate(chord) {
    //console.log(chord.print);
    //var root = firstOct[chord.root];
    //figure out how to use the info about root here as well
    var template = [[1],[1]];
    if (chord.ninth != "/"){
        template[1].push(chord.ninth == "♮" ? 2 : (chord.ninth == "b" ? 1 : 3));
        template[0].push(2);
    }
    if (chord.color != "pow"){
        template[0].push(3);
        template[1].push(chord.color == "M" ? 5 : 4);
    }
    if (chord.eleventh != "/"){
        template[0].push(4);
        template[1].push(chord.eleventh == 11 ? 6 : 7);
    }
    
    if (chord.fifth != 5){
        template[0].push(5);
        template[1].push(chord.fifth == "b5" ? 7 : 9);
    }
    if (chord.thirteenth != "/"){
        template[0].push(6);
        template[1].push(chord.thirteenth == 13 ? 10 : 9);

    }
    if (chord.seventh != "/"){
        template[0].push(7)
        template[1].push(chord.seven == "M" ? 12 : 11);
    }
    return template;
}
 
function find_val(dict, value){
    arr = [];
    for (d in dict){
        if (dict[d]==value){
            arr.push(d);
        } 
    }
    return arr;
}

//finding the chromatic name of note (A# or Bb)
function find_note(dnote, chpos){
    arr = find_val(chromatic, chpos);
    for (a in arr){
        //console.log(dnote, arr[a], arr[a].charAt(0));    
        if (arr[a].charAt(0)==dnote){
            return arr[a];
        }
    }
}

//representing the notes in the sheet according to numbers [1-85]
//chTemplate is a 2d array [diatonic][chromatic] e.g. [1,3,5][1,4,8]
function makeChord(positions1_85, root, chTemplate){
    chord = [];
    for (i=0; i<positions1_85.length; i++){
        newChromatic = (positions1_85[i]) % 12;
        if (newChromatic == 0) newChromatic = 12;
        
        for(j=0;j<(chTemplate[0]).length; j++){
            chNote = (chTemplate[1][j] + chromatic[root] - 1) % 12;
            if (chNote == 0) chNote = 12;
            if (chNote == newChromatic){
                newDiatonic = (chTemplate[0][j]+diatonic[root.charAt(0)] - 1) % 7;
                if (newDiatonic == 0) newDiatonic = 7;
            }
        }
        OctNumber = Math.floor(positions1_85[i]/12);

        newNote = find_note(find_val(diatonic, newDiatonic), newChromatic);
        newNote+=OctNumber;
        chord[i] = newNote;
    }
    return chord;
}

function ChordToSheet(chord){
    notesChord = [[]];
    console.log(notesChord);
    for (n in chord){
        alt='';
        console.log(chord[n]);
        switch (chord[n].charAt(1)){
            case '#': alt = '+1'; break;
            case 'b': alt = '-1'; break; 
            default: alt = '0';
        }
        notesChord[n] = [diatonic[chord[n].charAt(0)] - 1, parseInt(chord[n].charAt(2)) + 1, alt]
    }
    return notesChord;
}

function ChordListToSheet(chordList, chordPositionsList){
    finalChordList=[];
    for (var i=0; i<chordList.length; i++){
        template = chordToTemplate(chordList[i]);
        console.log("template", template);
        console.log("chordList: ", chordList);
        console.log("chordPositionsList: ", chordPositionsList);
        
        finalChordList.push(ChordToSheet(makeChord(chordPositionsList[i], chordList[i].root, template)));
    }    
    createSheet(finalChordList); 
}



/*old
function make_chord(root, type){
    chord = [[]];
    chord[0]=chordTypes[type][0];
    chord[1]=[];
    for (pos in chord[0]){
        newDiatonic = (diatonic[root.charAt(0)] + chord[0][pos] - 1) % 7;
        if (newDiatonic == 0) newDiatonic = 7;
        console.log(pos, newDiatonic, find_val(diatonic, newDiatonic));
        newChromatic = (chromatic[root] + chordTypes[type][1][pos] - 1) % 12;
        if (newChromatic == 0) newChromatic = 12;
        newNote = find_note(find_val(diatonic, newDiatonic), newChromatic);
        console.log(find_val(diatonic, newDiatonic), newChromatic, newNote);
        chord[1][pos] = newNote;
    }
    return chord;
}

function chordAliette(chord){
    notesChord = [[]];
    console.log(notesChord);
    for (n in chord[1]){
        alt='';
        switch (chord[1][n].charAt(1)){
            case '#': alt = '+1'; break;
            case 'b': alt = '-1'; break; 
            default: alt = '0';
        }
        notesChord[n] = [diatonic[chord[1][n].charAt(0)], 4, alt]
        console.log(notesChord);
    }
    return notesChord;
}*/

