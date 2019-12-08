console.log("loaded");

new Vue({
    el: "#sequenceOfChordsBuilding",
    data: {
        //To select
        roots: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        alterations: ['b', '♮', '#'],
        colors: ['M', 'm'],

        //Selected
        rootChosen: 'C',
        alterationChosen: '♮',
        colorChosen: 'M',
        sevenChosen: 'm',

        //Sequence of chords
        chordSequence: [],
    },
    computed: {
        chordPrint() {
            return this.rootChosen + (this.alterationChosen == "♮" ? "" : this.alterationChosen) + (this.colorChosen == "M" ? "" : this.colorChosen) + (this.sevenChosen == "M" ? "7M" : "7");
        }
    },
    methods: {
        addChord() {
            this.chordSequence.push({ root: this.rootChosen + this.alterationChosen, color: this.colorChosen, seven: this.sevenChosen, print: this.chordPrint });

            this.rootChosen = 'C';
            this.alterationChosen = '♮';
            this.colorChosen = 'M';
            this.sevenChosen = 'm';
        },
        reset() {
            this.chordSequence = [];

            this.rootChosen = 'C';
            this.alterationChosen = '♮';
            this.colorChosen = 'M';
            this.sevenChosen = 'm';
        },
        go() {
            alert("lets go with a sequence of " + this.chordSequence.length + " chords")
        },
    }
});


//*************************************************************SHEET SECTION*************************************************************//
const svgNS = 'http://www.w3.org/2000/svg'
const xlinkNS = 'http://www.w3.org/1999/xlink'

const ctrl = (function(ct) {
    ct = [].slice.call(ct)
    let ctrl = {}
    for (const c of ct) ctrl[c.name] = c
    return ctrl
})(document.querySelectorAll('.ctrl [name]'))

// const notes = "1234567+1;-(135)(246)(357)(461)(572)(613)(724)+(135)"
const notes = '1[351],4565[247],2-7+12[136],11-7#+1-[7#25]+,-7#5'
    // const rythm = "1-4444888811"
console.log(ctrl)

ctrl.cmd.value = notes

function parseNote(str) {
    // str = str.replace(/\(([^)*|]*)\)/img, (...$) => `[${$[1]}]`)
    let r
    do {
        r = 0
        str = str.replace(/\(([^\(\)]*)\*([0-9]+)\)/gim, (...$) =>
            $[1].repeat($[2], r++),
        )
    } while (r)
    let octave = 4
    const notes = []
    let chord = null
    let octaveGlob
    let lastNote
    for (let n of str) {
        if (n === '+') octave++
            else if (n === '-' && !chord) octave--
                else if (n === '[') {
                    chord = []
                    octaveGlob = octave
                    notes.push(chord)
                } else if (n === ']') {
            chord = null
            lastNote = null
            octave = octaveGlob
        } else if (n === 'b') {
            if (notes.length) {
                const lastChord = notes[notes.length - 1]
                const lastNote = lastChord[lastChord.length - 1]
                lastNote[2] -= 1
            }
        } else if (n === '#') {
            if (notes.length) {
                const lastChord = notes[notes.length - 1]
                const lastNote = lastChord[lastChord.length - 1]
                lastNote[2] += 1
            }
        } else if (n === ',') {
            notes.push([
                []
            ])
        } else if (/[1-7]/.test(n)) {
            n--
            if (chord) {
                if (lastNote && lastNote[0] >= n) octave++
                    lastNote = [n, octave, 0]
                chord.push(lastNote)
            } else {
                notes.push([
                    [n, octave, 0]
                ])
            }
        }
    }
    // console.log(JSON.stringify(notes,null,4))
    return notes
}

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
    note.setAttribute('x', i * 120)
    if (n.length) note.setAttribute('y', n[0] * -10 - (n[1] - 4) * 10 * 7)
    notesElem.appendChild(note)
    n.elm = note
    return note
}
let sheet = []

function change() {
    for (const c of sheet) {
        for (const n of c) {
            n.elm.remove()
        }
    }
    let width = 0
    sheet = parseNote(ctrl.cmd.value)
    let i = 0
    for (const c of sheet) {
        for (const n of c) {
            createNote(n, i)
            width = Math.max(width, +n.elm.getAttribute('x'))
        }
        i++
    }
    document.querySelector('.svg>svg').style.width = `${width + 200}px`
}
ctrl.cmd.addEventListener('input', change)
change()

//************************************************************END OF SHEET SECTION*************************************************************//