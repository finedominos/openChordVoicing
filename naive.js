
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
    // alert("lets go with a sequence of " + chordSequence.length + " chords with the following drop for the first chord : " + dropChosen)

    
    console.log("\n************************** NAIVE script : **************************");

    // We create the first chord with the chosen voicing, and then compute all possibilities of voicing for the other chords of the sequence.
    // From here, after different filters, we try to find, for each chord of the sequence (except the first one),
    // the voicing that is the clothest one from the previous voicing (determined the iteration before)

    var firstChord = chordToKeyList(chordSequence[0], true, dropChosen);
    var finalSequence = [firstChord];
    
    console.log("First chord : " + firstChord);

    //we need chordSequence without the first chord to treat différently the other chords
    chordSequenceFollowing = chordSequence.slice();
    chordSequenceFollowing.shift();


    var chordSequenceNotSpread = [];
    chordSequenceFollowing.forEach(chord => {
        var keyList = chordToKeyList(chord, false, dropChosen)
        chordSequenceNotSpread.push(keyList)
        console.log("following chord not spread : " + keyList);
    });

    chordSequenceFollowingFinalList = []
    chordSequenceNotSpread.forEach(chord => {
        chordSequenceFollowingFinalList.push([...compute(chord)])
    });
    console.log("\nAll possibilities (a bit) filtered for each following chord of the sequence : ");
    console.log(chordSequenceFollowingFinalList)

    // Here we have, for each chord of the sequence (except the first), all the possibilities of voicing matching our feasibility constraints (see filters in compute() )

    // we need, for each chord of the voicing, to pick the best voicing among all possibilities still running.
    // example : nextChord = keepBest(chordN, allPossibleChordN+1, ?otherParameter) //then add to finalSequence
    // to help better selection of possible chords before computing all distances, a preselection concerning the highest tone of the chord
    // will be performed, as we think a voicing of a chord sequence is nice first of all when the highest tone creates a conjoint melody.

    console.log("\n************* Research of the best sequence : *************");

    var chordPointed = firstChord;
    chordSequenceFollowingFinalList.forEach(listPossibilitiesNextChord => {
        chordPointed = keepBestVoicing(chordPointed, listPossibilitiesNextChord);
        finalSequence.push(chordPointed);
    });

    console.log("\nfinal sequence : ");
    console.log(finalSequence);
    console.log("*************** End of the Research ***************\n\n");
    console.log("********************** End of NAIVE script : **********************\n\n");
    return (finalSequence)
}

function keepBestVoicing(chordN, allPossibilitiesNextChord){
    console.log("\n************ (one chord)")
    console.log("initial number possibilities : "+ allPossibilitiesNextChord.length);
    // First, no need to keep a possibility if its higher tone is far from the higher one of ChordN. Voicings create melody.
    var allKeptPossibilities = [];
    allPossibilitiesNextChord.forEach(possibility => {
        if(Math.abs(Math.max(...chordN)-Math.max(...possibility))<=3){  // There will always be a possibility who's max is at maximum 3 semitones from the max of the previous chord (chordN)
            allKeptPossibilities.push(possibility);
        }
    });
    if(allKeptPossibilities.length==0){
        console.log("nothing very close");
        allPossibilitiesNextChord.forEach(possibility => {
            if(Math.abs(Math.max(...chordN)-Math.max(...possibility))<=6){  // There will always be a possibility who's max is at maximum 3 semitones from the max of the previous chord (chordN)
                allKeptPossibilities.push(possibility);
            }
        });
    }
    console.log("number of possibilities after melody filter(focusing only on the highest note of the chord) : "+ allKeptPossibilities.length);

    chordN.sort().reverse();
    // console.log("Chord N sorted : " + chordN);

    chordN_mid_part = chordN.slice(2,chordN.length-1);
    // console.log("mid-low part of Chord N : " + chordN_mid_part);

    // Init of the best candidate
    var distance = 9999;
    var bestCandidate = null;

    allKeptPossibilities.forEach(candidate => {
        candidate.sort().reverse();
        // console.log("Candidate sorted : " + candidate);
        distanceCandidate = Math.abs(chordN[0]-candidate[0])*50+Math.abs(chordN[1]-candidate[1])*30+Math.abs(chordN[chordN.length-1]-candidate[candidate.length-1])*15;
        if(candidate[0]>chordN[0]){ // we prefer the melody created by the successive voicings to be descending.
            distanceCandidate+=55;
        }
        chordN_mid_part.forEach(note => {
            distanceCandidate += distanceCorrespondingNote(note, candidate); // 2 successive chords don't have necessarly the same number or notes. Comparing notes of the same rank in the medium wouldn't be logical.
        });

        // console.log("its dist : "+distanceCandidate);
        // console.log("actual best dist : "+distance);
        if(distanceCandidate < distance){
            bestCandidate = candidate;
            distance = distanceCandidate;
        }
    });
    console.log("BEST VOICING : " + bestCandidate );
    return(bestCandidate)
}

function distanceCorrespondingNote(noteN, chord){    //return the distance between a note and its logical "resolution" in the next chord
    var distance = 100;
    chord.forEach(note =>{
        // console.log(distance);
        distance = Math.min(distance, Math.abs(note-noteN));
    });
    return distance
}


function chordToKeyList(chord, firstChord, dropChosen) {
    //returning the chord played in a close way (not spread) on the first octave
    // Let's also built here the first chord

    var root = firstOct[chord.root];

    //we are going to check a lot of time if we selected a power chord, so let's create a boolean
    var powerchord = false;
    if (chord.color == 'pow') {
        powerchord = true;
    }
    if (firstChord) {
        do {
            root += 12
        } while (root < 24)
    }
    var keyList = [root];
    if (!powerchord) {         //if not powerchord, we put the 3rd
        keyList.push(chord.color == "M" ? root + 4 : root + 3)
    }

    //normal 5th is more current, so we keep it for the default case (root+7).
    keyList.push(chord.fifth == "#5" ? root + 8 : (chord.fifth == "b5" ? root + 6 : root + 7))


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
        keyList.push(chord.thirteenth == "13" ? root + 21 : root + 20)
    }

    if (firstChord) {
        switch (dropChosen) {
            case 'drop2':           // drop2 : lower the 5th
                if (!powerchord) {    // if not powerchord, the 5th is at the 3rd position in keyList
                    keyList[2] -= 12
                }
                else {               // otherwise in 2nd position (1st being the root)
                    keyList[1] -= 12
                }
                break;
            case 'drop3':           // drop3 : lower the 3rd
                if (!powerchord) {
                    keyList[1] -= 12
                }
                else {   // if powerchord, there is no 3rd
                    alert("drop 3 on a powerchord make no sense, you have no third.. :'(")
                }
                break;
            case 'drop24':          // drop 24 : lower the root and the 5th.
                if (!powerchord) {
                    keyList[0] -= 12
                    keyList[2] -= 12
                }
                else {
                    keyList[0] -= 12
                    keyList[1] -= 12
                }
                break;
            default:
                console.log('Sorry, unknown drop : "' + dropChosen + '"');
        }
        if(Math.max(...keyList)<49){        // In particulary if the first chord has no tension, it's played a bit too low without that.
            for (var i = 0; i < keyList.length; i++) {
                keyList[i] += 12;
            }
        }
    }
    return keyList;
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
    // console.log(baseKeyListOctage2)
    // console.log(baseKeyListOctage3)
    // console.log(baseKeyListOctage4)

    // listCombinationsChord.push(baseKeyListOctave1);     // First octave is too low
    listCombinationsChord.push(baseKeyListOctage2);
    listCombinationsChord.push(baseKeyListOctage3);
    listCombinationsChord.push(baseKeyListOctage4);


    //Now let's compute all possible combinations keeping the root in one of the 4th first octaves and everything else above this root :

    // recursiveCombinationsCreation(baseKeyListOctave1, 1, 1)     // First octave is too low
    recursiveCombinationsCreation(baseKeyListOctage2, 1, 2)
    recursiveCombinationsCreation(baseKeyListOctage3, 1, 3)
    recursiveCombinationsCreation(baseKeyListOctage4, 1, 4)

    console.log("\n\nNext chord : ")

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

    return listCombinationsNotDissonantInLowFreq;   // Final filtered list of possible voicings for the input chord.

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
        if (note > maxNote) {
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