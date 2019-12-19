//***********************************SHEET FUNCTION*****************************************//
/*createSheet(chord_list) printed the notes on the sheet. 
It has to call chord_list = output of chordAliette in chordrep.js*/

const svgNS = 'http://www.w3.org/2000/svg'
const xlinkNS = 'http://www.w3.org/1999/xlink'

//const list_notes = ["C", "D", "E", "F", "G", "A", "B"]

/*function C_to_0(chord) {
    var copy = JSON.parse(JSON.stringify(chord));
    for (var k = 0; k < chord.length; k++) {
        copy[k][0] = list_notes.indexOf(chord[k][0])
    }
    return copy
} */

const ctrl = (function(ct) {
    ct = [].slice.call(ct)
    let ctrl = {}
    for (const c of ct) ctrl[c.name] = c
    return ctrl
})(document.querySelectorAll('.ctrl [name]'))

console.log(ctrl)

ctrl.value = notes

const notesElem = document.getElementById('notes')

function createElementofNote(n, i, id) {
    const note = document.createElementNS(svgNS, 'use')
    let anchor
    anchor = id
    note.setAttributeNS(xlinkNS, 'href', anchor)
    note.setAttribute('x', 40 + i * 80)
    console.log(n)
    if (n.length) { note.setAttribute('y', -5 * n[0] - (n[1] - 4) * 5 * 7) }
    notesElem.appendChild(note)
}

const bar_m_needed = ['04', '55', '22']
const bar_low_needed = ['05', '55', '22']

function createNote(n, i, shift) {
    let j
    j = i
    if (n[2] == 1) { createElementofNote(n, i, '#sharp') }
    if (n[2] == -1) { createElementofNote(n, i, '#flat') }
    if (shift == "shift") { j = i + 0.14 } else { createElementofNote(n, i, '#going_up_bar') }
    //if (n[1] > 5) { createElementofNote(n, i, '#going_down_bar') } else { createElementofNote(n, i, '#going_up_bar') }
    createElementofNote(n, j, '#note')
    var a = n[0].toString() + n[1].toString()
    if (bar_m_needed.includes(a)) { createElementofNote(n, j, '#bar_mid') }
}


function createChord(chord, i) {
    for (var k = 0; k < chord.length; k++) {
        if (k > 0) {
            if ((chord[k][0] == chord[k - 1][0] + 1 && chord[k][1] == chord[k - 1][1]) || (chord[k][0] == chord[k - 1][0] - 6 && chord[k][1] == chord[k - 1][1] + 1)) {
                createNote(chord[k], i, "shift")
            } else { createNote(chord[k], i, "no_shift") }
        } else { createNote(chord[k], i, "no_shift") }
    }
}

function createSheet(chord_list) {
    for (var i = 0; i < chord_list.length; i++) {
        createChord(chord_list[i], i)
    }
}


const chord_to_play1 = [
    [0, 4, 0],
    [2, 4, 0],
    [4, 4, 0],
    [6, 4, 1],
    [0, 5, 0]
]
const chord_to_play2 = [
    [2, 2, 0],
    [5, 5, 0],
    [4, 1, 0]
]

createSheet([chord_to_play1, chord_to_play2])

function cleanSheet() {
    var element = document.getElementById("notes");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/*****************************************************************************/
/********************************AUDIO PART**********************************/
/*****************************************************************************/


var audioAl1 = new Audio('Piano.ff.F4ready03.wav');
var audioAl2 = new Audio('Piano.ff.G4ready03.wav');

function play2notes() {
    audioAl1.play()
    audioAl2.play()
}