//***********************************SHEET FUNCTION*****************************************//
/*createSheet(chord_list) printed the notes on the sheet. 
It has to call chord_list = output of chordAliette in chordrep.js*/

const svgNS = 'http://www.w3.org/2000/svg'
const xlinkNS = 'http://www.w3.org/1999/xlink'

const list_notes = ["C", "D", "E", "F", "G", "A", "B"]

function C_to_0(chord) {
    for (var k = 0; k < chord.length; k++) {
        chord[k][0] = list_notes.indexOf(chord[k][0])
    }
    return chord
}

const ctrl = (function(ct) {
    ct = [].slice.call(ct)
    let ctrl = {}
    for (const c of ct) ctrl[c.name] = c
    return ctrl
})(document.querySelectorAll('.ctrl [name]'))

console.log(ctrl)

ctrl.value = notes

const notesElem = document.getElementById('notes')

function createNote(n, i) {
    const note = document.createElementNS(svgNS, 'use')
    let anchor
    if (n.length === 0) anchor = '#double-rest'
    else {
        anchor = '#note'
        if (n[2] > 0) anchor += '-sharp'
        else if (n[2] < 0) anchor += '-flat'
    }

    note.setAttributeNS(xlinkNS, 'href', anchor)
    note.setAttribute('x', i * 100)
    if (n.length) note.setAttribute('y', n[0] * -10 - (n[1] - 4) * 10 * 7)
    notesElem.appendChild(note)
    n.elm = note
    return note
}

function createChord(chord, i) {
    for (var k = 0; k < chord.length; k++) {
        createNote(chord[k], i)
    }
}

function createSheet(chord_list) {
    for (var i = 0; i < chord_list.length; i++) {
        createChord(chord_list[i], i)
    }
}
const chord_to_play1 = [
    ['E', 4, 0],
    ['A', 4, 1]
]
const chord_to_play2 = [
    ['E', 4, 0],
    ['B', 4, 1]
]

createSheet([C_to_0(chord_to_play1), C_to_0(chord_to_play2)])

function cleanSheet() {
    var element = document.getElementById("notes");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

//add bar : lots of lines coming