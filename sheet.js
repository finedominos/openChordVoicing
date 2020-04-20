//***********************************SHEET FUNCTION*****************************************//
//createSheet(chord_list) prints the sheet//
//cleanSheet() clean the sheet//

//note representation : n = [0,4,+1] is a C, of octave 4, with a sharp
//sheet = [chord1, chord2] = [ [[0,4,1],[2,4,0]] , [[0,5,1],[3,4,0]] ] for example

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

//create the graphic element corresponding to "id" for a note n in position i (on x_axis) //
function createElementofNote(n, i, id) {
    const note = document.createElementNS(svgNS, 'use')
    let anchor
    anchor = id
    note.setAttributeNS(xlinkNS, 'href', anchor)
    note.setAttribute('x', 40 + i * 80)
    if (n.length) { note.setAttribute('y', -5 * n[0] - (n[1] - 4) * 5 * 7) }
    notesElem.appendChild(note)
}

//notes for which horizontal bars are needed : C4, A5, E2, C6, C2
const bar_m_needed = ['04', '55', '22', '06', '02']

//print the note n at position i, with a shift for adjacents notes
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

//print the chord in position i
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
    console.log("******************** SHEET *********************")
    console.log("printing sheet : ")
    for (var i = 0; i < chord_list.length; i++) {
        createChord(chord_list[i], i)
    }
    console.log(chord_list[0])
    console.log("**************** end of sheet printing *****************")

}

function cleanSheet() {
    var element = document.getElementById("notes");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    console.log("Sheet clean")
}