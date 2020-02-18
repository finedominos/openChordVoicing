//drop 2 : the 5th is lowered of one octave
// drop 3 : the 3rd is lowered of one octave
// drop 2+4 : the 5th is lowered and the root is lowered of one octave

// we ignore the 9th, 11th and 13th, even if they're not chosen "/" by the user
//output is [[chord1], [chord2],..]

//challenge : the input of functions drop2() and drop3() and 2+4() must be the chord in their canonic form, with root being octave 4

function drop2(chord) {
    newchord = [chord[0], chord[1], chord[2], chord[3]] //we keep root,3rd, 5th and 7th
    newchord[2][1] = newchord[2][1] - 1 //the 5th is lowered
    return (newchord)
}

function drop3(chord) {
    newchord = [chord[0], chord[1], chord[2], chord[3]] //we keep root, 3rd, 5th and 7th
    newchord[1][1] = newchord[1][1] - 1 //the 3rd is lowered
    return (newchord)
}

function drop24(chord) {
    newchord = [chord[0], chord[1], chord[2], chord[3]] //we keep root, 3rd, 5th and 7th
    newchord[1][1] = newchord[1][1] - 1 //the 5th is lowered
    newchord[0][1] = newchord[0][1] - 1 //the root is lowered
    return (newchord)
}