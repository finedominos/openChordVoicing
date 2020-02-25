//drop 2 : the 5th is lowered of one octave
// drop 3 : the 3rd is lowered of one octave
// drop 2+4 : the 5th is lowered and the root is lowered of one octave

//chord representation same as sheet.js: [0,4,+1] is a C, of octave 4, with a sharp

// we ignore the 9th, 11th and 13th, even if they're not chosen "/" by the user
//input is [root, 3rd, 5th, 7th]
//output is [root, lowered_3rd, 5th, 7th]  with ex : 3rd = [0, 4, +1] and lowered_3rd=[0,3,+1]

//****************DRAFT***************//

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