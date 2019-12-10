
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

var listCombinationsFirstChord = [];
var iterationList = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // we don't want the for in the recursive to always manipulate the same index..

function naive(chordSequence) {
    alert("lets go with a sequence of " + chordSequence.length + " chords")
    var chordSequenceAsList = [];
    chordSequence.forEach(chord => {
        var keyList = chordToKeyList(chord)
        chordSequenceAsList.push(keyList)
        console.log("original chord : " + keyList);
    });
    //lets work only with the last chord :

    //Let's compute the closed (unspread) chord on the 4 first octaves (after, this is too high for the root...)

    baseKeyListOctage1 = chordSequenceAsList[0];
    baseKeyListOctage2 = [...baseKeyListOctage1]
    for (var i = 0; i < baseKeyListOctage2.length; i++) {
        baseKeyListOctage2[i] += 12;
    }
    baseKeyListOctage3 = [...baseKeyListOctage2]
    for (var i = 0; i < baseKeyListOctage3.length; i++) {
        baseKeyListOctage3[i] += 12;
    }
    baseKeyListOctage4 = [...baseKeyListOctage3]
    for (var i = 0; i < baseKeyListOctage4.length; i++) {
        baseKeyListOctage4[i] += 12;
    }

    // console.log(baseKeyListOctage1)      // First octave is too low
    console.log(baseKeyListOctage2)
    console.log(baseKeyListOctage3)
    console.log(baseKeyListOctage4)

    // listCombinationsFirstChord.push(baseKeyListOctage1);     // First octave is too low
    listCombinationsFirstChord.push(baseKeyListOctage2);
    listCombinationsFirstChord.push(baseKeyListOctage3);
    listCombinationsFirstChord.push(baseKeyListOctage4);


    //Now let's compute all possible combinations keeping the root in one of the 4th first octaves and everything else above this root :

    // recursiveCombinationsCreation(baseKeyListOctage1, 1, 1)     // First octave is too low
    recursiveCombinationsCreation(baseKeyListOctage2, 1, 2)
    recursiveCombinationsCreation(baseKeyListOctage3, 1, 3)
    recursiveCombinationsCreation(baseKeyListOctage4, 1, 4)


    console.log("all possible chords with root as the lower key : ")
    console.log(listCombinationsFirstChord);

    // Filtrating chords that are inaccessible, or accessibles with only one hand, or extremely too much spread :
    var listCombinationsFirstChordAccessibleBothHands = [];
    listCombinationsFirstChord.forEach(chord => {
        if (accessibleBothHands(chord)) {
            listCombinationsFirstChordAccessibleBothHands.push(chord);
        }
    });
    console.log("accessible both hands : ")
    console.log(listCombinationsFirstChordAccessibleBothHands)


    var listCombinationsNotDissonantInLowFreq = [];
    listCombinationsFirstChordAccessibleBothHands.forEach(chord => {
        if (notTooLittleIntervalInLowFrequency(chord)) {
            listCombinationsNotDissonantInLowFreq.push(chord);
        }
    });
    console.log("Not dissonant in low freq : ")
    console.log(listCombinationsNotDissonantInLowFreq)

    return listCombinationsNotDissonantInLowFreq;

}



function chordToKeyList(chord) {
    //returning the chord played in a close way (not spread) on the first octave
    console.log(chord.print);
    var root = firstOct[chord.root];
    var keyList = [root];
    keyList.push(chord.color == "M" ? root + 4 : root + 3)
    keyList.push(chord.seven == "M" ? root + 11 : root + 10)
    keyList.push(chord.ninth == "♮" ? root + 14 : (chord.ninth == "b" ? root + 13 : root + 15))
    return keyList;
}

function recursiveCombinationsCreation(baseKeyList, indexBrowthing, rootsOctave) {

    if (indexBrowthing < baseKeyList.length - 1) {
        recursiveCombinationsCreation(baseKeyList, indexBrowthing + 1, rootsOctave)
    }
    //working between octave 1 and octave 6, then tension (9th, 11th, 13th) is already between octave 2 and 7
    //having notes in the last octave is already high, maybe we shouldn't allow it. for the moment, only the tension can go there.
    for (iterationList[indexBrowthing] = 1; iterationList[indexBrowthing] < 7 - rootsOctave; iterationList[indexBrowthing]++) {  // i : index for the 3rd if indexBrowthing = 1, etc...
        var newKeyList = [...baseKeyList]       // cloning the baseKeyList;
        newKeyList[indexBrowthing] += 12 * iterationList[indexBrowthing];
        listCombinationsFirstChord.push(newKeyList);
        if (indexBrowthing < baseKeyList.length - 1) {
            recursiveCombinationsCreation(newKeyList, indexBrowthing + 1, rootsOctave)
        }
    }
}

function accessibleBothHands(chord, rangeOneHand = 16, maxRange = 46) {
    var min = Math.min(...chord);
    var max = Math.max(...chord);
    var accessible = true;

    //Not accessible with just one hand, we wan't to spread a bit :
    if ((max - min) <= rangeOneHand) {
        accessible = false;
        // console.log("one hand : "+chord)
    }
    if ((max - min) > maxRange) {  //We don't want some extreme spreading
        accessible = false;
        // console.log("too much spread : "+chord)
    }
    // console.log(min+"to"+max+" so "+(max-min))
    chord.forEach(note => {
        if (note > min + rangeOneHand && note < max - rangeOneHand) {
            accessible = false;
        }
    });
    // console.log(chord+(accessible ? " : yes":" : NOPE"))
    return accessible;

}

//DRAFT, THIS FUNCTION IS NOT FINISHED...
function notTooLittleIntervalInLowFrequency(chord) {
    var nonDissonnant = true
    var min = Math.min(...chord);
    if (min < 25) {
        chord.forEach(key => {
            if (key > min && key < (min + 9)) {
                nonDissonnant = false;
            }
        });
    }
    return nonDissonnant;
}