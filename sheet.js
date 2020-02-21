//***********************************SHEET FUNCTION*****************************************//
/*the function createSheet(chord_list) printed the notes on the sheet. 
It has to call chord_list = output of chordAliette in chordrep.js*/
//the function cleanSheet() clean the sheet//

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

function createElementofNote(n, i, id) {
    const note = document.createElementNS(svgNS, 'use')
    let anchor
    anchor = id
    note.setAttributeNS(xlinkNS, 'href', anchor)
    note.setAttribute('x', 40 + i * 80)
    if (n.length) { note.setAttribute('y', -5 * n[0] - (n[1] - 4) * 5 * 7) }
    notesElem.appendChild(note)
}

const bar_m_needed = ['04', '55', '22']
const bar_low_needed = ['05', '55', '22']

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

function cleanSheet() {
    var element = document.getElementById("notes");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}