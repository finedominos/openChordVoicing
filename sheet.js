const svgNS = 'http://www.w3.org/2000/svg'
const xlinkNS = 'http://www.w3.org/1999/xlink'

const list_notes = ["C", "D", "E", "F", "G", "A", "B"]

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
    n[0] = list_notes.indexOf(n[0])
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
//const chord_to_play1 = [['E',4,0],['A',4,1]]
//const chord_to_play2 = [['E',4,0],['B',4,1]]
//let chord_list = [chord_to_play1, chord_to_play2]
//createChord(chord_to_play1,1)
//createChord(chord_to_play2,2)

//function cleanSheet(){}

//add bar : lots of lines coming