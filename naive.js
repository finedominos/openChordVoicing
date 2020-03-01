
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

var listCombinationsChord = [];
var iterationList = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // we don't want the for in the recursive to always manipulate the same index..

function naive(chordSequence, dropChosen) {
    alert("lets go with a sequence of " + chordSequence.length + " chords")

    // firstChord = chordToKeyList(chordSequence[0], true, dropChosen)
    // after that let's built naivly the other chords and match one by one with a function that compute distances and keep the one with the shortest
    // like : nextChord = keepBest(chordN, allPossibleChordN+1, ?otherParameter)
    // to help better selection of possible chords before computing all distances, a preselection concerning the highest tone of the chord
    // will be performed, as we think a voicing of a chord sequence is nice first of all when the highest tone creates a conjoint melody.

    var chordSequenceNotSpread = [];
    chordSequence.forEach(chord => {
        var keyList = chordToKeyList(chord, false, dropChosen)
        chordSequenceNotSpread.push(keyList)
        console.log("original chord : " + keyList);
    });

    chordSequenceFinalList = []
    chordSequenceNotSpread.forEach(chord => {
        chordSequenceFinalList.push([...compute(chord)])
    });
    console.log("total sequence : ");
    console.log(chordSequenceFinalList)
    
    return (chordSequenceFinalList)

}

function compute(baseKeyListOctave1) {

    listCombinationsChord = [];

    //Let's compute the closed (unspread) chord on the 4 first octaves (after, this is too high for the root...)
    baseKeyListOctage2 = [...baseKeyListOctave1]
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

    // console.log(baseKeyListOctave1)      // First octave is too low
    console.log(baseKeyListOctage2)
    console.log(baseKeyListOctage3)
    console.log(baseKeyListOctage4)

    // listCombinationsFirstChord.push(baseKeyListOctave1);     // First octave is too low
    listCombinationsChord.push(baseKeyListOctage2);
    listCombinationsChord.push(baseKeyListOctage3);
    listCombinationsChord.push(baseKeyListOctage4);


    //Now let's compute all possible combinations keeping the root in one of the 4th first octaves and everything else above this root :

    // recursiveCombinationsCreation(baseKeyListOctave1, 1, 1)     // First octave is too low
    recursiveCombinationsCreation(baseKeyListOctage2, 1, 2)
    recursiveCombinationsCreation(baseKeyListOctage3, 1, 3)
    recursiveCombinationsCreation(baseKeyListOctage4, 1, 4)


    console.log("all possible chords with root as the lower key : ")
    console.log(listCombinationsChord);

    // Filtrating chords that are inaccessible, or accessibles with only one hand, or extremely too much spread :
    var listCombinationsFirstChordAccessibleBothHands = [];
    listCombinationsChord.forEach(chord => {
        if (reasonnableRange(chord)) {
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



function chordToKeyList(chord, firstChord, dropChosen) {
    //returning the chord played in a close way (not spread) on the first octave
    // Let's also built here the first chord
    console.log(chord.print);
    if(!firstChord){
        var root = firstOct[chord.root];
        var keyList = [root];
        keyList.push(chord.color == "M" ? root + 4 : (chord.color == "m" ? root + 3 : root + 7))    //if powerchord, don't play third but play the fifth, that cannot being alterated in principle
        
        if (chord.fifth != "5") {
            keyList.push(chord.fifth == "b5" ? root + 6 : root + 8)
        }else{
            keyList.push(root + 7)
        }
        if (chord.seventh != "/") {
            keyList.push(chord.seventh == "7" ? root + 10 : root + 11)
        }
        if (chord.ninth != "/") {
            keyList.push(chord.ninth == "9" ? root + 14 : (chord.ninth == "b9" ? root + 13 : root + 15))
        }
        if (chord.eleventh != "/") {
            keyList.push(chord.eleventh == "11" ? root + 17 : root + 18)
        }
        if (chord.thirteenth != "/") {
            keyList.push(chord.thirteenth == "13" ? root + 21 : root+20)
        }
        return keyList;
    }
    else{
        return 0;
    }
}

function recursiveCombinationsCreation(baseKeyList, indexBrowsing, rootsOctave) {

    if (indexBrowsing < baseKeyList.length - 1) {
        recursiveCombinationsCreation(baseKeyList, indexBrowsing + 1, rootsOctave)
    }
    //working between octave 1 and octave 6, then tension (9th, 11th, 13th) is already between octave 2 and 7
    //having notes in the last octave is already high, maybe we shouldn't allow it. for the moment, only the tension can go there.
    for (iterationList[indexBrowsing] = 1; iterationList[indexBrowsing] < 7 - rootsOctave; iterationList[indexBrowsing]++) {  // i : index for the 3rd if indexBrowsing = 1, etc...
        var newKeyList = [...baseKeyList]       // cloning the baseKeyList;
        newKeyList[indexBrowsing] += 12 * iterationList[indexBrowsing];
        listCombinationsChord.push(newKeyList);
        if (indexBrowsing < baseKeyList.length - 1) {
            recursiveCombinationsCreation(newKeyList, indexBrowsing + 1, rootsOctave)
        }
    }
}

function reasonnableRange(chord, rangeOneHand = 16, maxRange = 46, maxNote = 61) {
    var min = Math.min(...chord);
    var max = Math.max(...chord);

    //Not accessible with just one hand, we wan't to spread a bit :
    if ((max - min) <= rangeOneHand) {
        return false;
        // console.log("one hand : "+chord)
    }
    if ((max - min) > maxRange) {  //We don't want some extreme spreading
    return false;
        // console.log("too much spread : "+chord)
    }
    // console.log(min+"to"+max+" so "+(max-min))
    chord.forEach(note => {
        if (note > min + rangeOneHand && note < max - rangeOneHand) {
            return false;
        }
        if (note>maxNote){
            return false;
        }
    });
    // console.log(chord+(accessible ? " : yes":" : NOPE"))
    return true;

}

//DRAFT, THIS FUNCTION IS NOT FINISHED...
function notTooLittleIntervalInLowFrequency(chord) {
    var nonDissonnant = true
    var min = Math.min(...chord);
    if (min < 21) {
        chord.forEach(key => {
            if (key > min && key < (min + 9)) {
                nonDissonnant = false;
            }
        });
    }
    else if (min < 30) {
        chord.forEach(key => {
            if (key > min && key < (min + 5)) {
                nonDissonnant = false;
            }
        });
    }
    return nonDissonnant;
}