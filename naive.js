
//let's just work in 7 octave of 12 semitons on the piano. so from C1(do0) to C8(do7) included. then we have 85 values for a key. 1=C0, 85=C7

var firstOct = {
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
  

function naive(chordSequence){
    alert("lets go with a sequence of " + chordSequence.length + " chords")
    chordSequence.forEach(chord => {
        var keyList = chordToKeyList(chord)
        console.log(keyList);
    });
}

function chordToKeyList(chord){
    console.log(chord.print);
    var root = firstOct[chord.root];
    var keyList = [root];
    keyList.push(chord.color == "M" ? root+4 : root+3)
    keyList.push(chord.seven == "M" ? root+11 : root+10)
    keyList.push(chord.ninth == "♮" ? root+14 : (chord.ninth == "b" ? root+13 : root+15))
    return keyList;
}