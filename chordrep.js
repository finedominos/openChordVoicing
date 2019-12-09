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
  

var diatonic = {
    'C': 1,
    'D': 2,
    'E': 3,
    'F': 4,
    'G': 5,
    'A': 6,
    'B': 7
  };
  
var chordTypes = {
    'major': [[1, 3, 5], [1, 5, 8]],
    'minor': [[1, 3, 5], [1, 4, 8]]
  };
  
function find_val(dict, value){
    arr = [];
    for (d in dict){
        if (dict[d]==value){
            arr.push(d);
        } 
    }
    return arr;
}

function find_note(dnote, chpos){
    arr = find_val(chromatic, chpos);
    for (a in arr){
        //console.log(dnote, arr[a], arr[a].charAt(0));    
        if (arr[a].charAt(0)==dnote){
            return arr[a];
        }
    }
}

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
        notesChord[n] = [chord[1][n].charAt(0), 4, alt]
    }
    return notesChord;
}



