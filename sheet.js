//***********************************SHEET FUNCTION*****************************************//
/*createSheet(chord_list) printed the notes on the sheet. 
It has to call chord_list = output of chordAliette in chordrep.js*/

//cleanSheet() clean the sheet//

//note representation : [0,4,+1] is a C, of octave 4, with a sharp
//sheet = [chord1, chord2] = [ [[0,4,1],[2,4,0]] , [[0,5,1],[3,4,0]] ] for example

//TO COMPLETE (bars) FOR 4 OCTAVE, from C2 TO C6

const svgNS = 'http://www.w3.org/2000/svg'
const xlinkNS = 'http://www.w3.org/1999/xlink'

const ctrl = (function(ct) {
    ct = [].slice.call(ct)
    let ctrl = {}
    for (const c of ct) ctrl[c.name] = c
    return ctrl
})(document.querySelectorAll('.ctrl [name]'))

ctrl.value = notes

const notesElem = document.getElementById('notes')

//create, for a note n in position i, the graphic element corresponding to id: id can be sharp, bar..//
function createElementofNote(n, i, id) {
    const note = document.createElementNS(svgNS, 'use')
    let anchor
    anchor = id
    note.setAttributeNS(xlinkNS, 'href', anchor)
    note.setAttribute('x', 40 + i * 80)
    if (n.length) { note.setAttribute('y', -5 * n[0] - (n[1] - 4) * 5 * 7) }
    notesElem.appendChild(note)
}

//notes where other bars are needed (04 is C of octave 4)
const bar_m_needed = ['04', '55', '22', '06', '02'] //C4, A5, E2, C6, C2

//prints the note n = [0,4,+1] for ex, at position i, with a shift for adjacents notes
function createNote(n, i, shift) {
    let j
    j = i
    if (n[2] == 1) { createElementofNote(n, i, '#sharp') }
    if (n[2] == 2) {
        createElementofNote(n, i - 0.10, '#sharp')
        createElementofNote(n, i, '#sharp')
    }
    if (n[2] == -1) { createElementofNote(n, i, '#flat') }
    if (n[2] == -2) {
        createElementofNote(n, i, '#flat')
        createElementofNote(n, i - 0.10, '#flat')
    }
    if (shift == "shift") { j = i + 0.14 } else { createElementofNote(n, i, '#going_up_bar') }
    createElementofNote(n, j, '#note')
    var a = n[0].toString() + n[1].toString()
    if (bar_m_needed.includes(a)) { createElementofNote(n, j, '#bar_mid') }
    if (a == '65' || a == '06') { createElementofNote([5, 5, 0], j, '#bar_mid') }
    if (a == '12' || a == '02') { createElementofNote([2, 2, 0], j, '#bar_mid') }
}

//prints the chord in position i
function createChord(chord, i) {
    for (var k = 0; k < chord.length; k++) {
        if (k > 0) {
            if ((chord[k][0] == chord[k - 1][0] + 1 && chord[k][1] == chord[k - 1][1]) || (chord[k][0] == chord[k - 1][0] - 6 && chord[k][1] == chord[k - 1][1] + 1)) {
                createNote(chord[k], i, "shift")
            } else { createNote(chord[k], i, "no_shift") }
        } else { createNote(chord[k], i, "no_shift") }
    }
}
//print the sheet
function createSheet(chord_list) {
    for (var i = 0; i < chord_list.length; i++) {
        createChord(chord_list[i], i)
    }
}

function cleanSheet() {
    var element = document.getElementById("notes");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}