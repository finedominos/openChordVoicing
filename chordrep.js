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
  
var dchords = {
    'major': [1, 3, 5],
    'minor': [1, 3 ,5]
  };

var chchords = {
    'major': [1, 5, 8],
    'minor': [1, 4, 8]
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
