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
        ninthChosen: '♮',

        //Sequence of chords
        chordSequence: [],
    },
    computed: {
        chordPrint() {
            return this.rootChosen + (this.alterationChosen == "♮" ? "" : this.alterationChosen) + (this.colorChosen == "M" ? "" : this.colorChosen) + (this.sevenChosen == "M" ? "Maj7" : "7") + "9" + (this.ninthChosen == "♮" ? "" : this.ninthChosen);
        }
    },
    methods: {
        addChord() {
            this.chordSequence.push({ root: this.rootChosen + this.alterationChosen, color: this.colorChosen, seven: this.sevenChosen, ninth: this.ninthChosen, print: this.chordPrint });

            this.rootChosen = 'C';
            this.alterationChosen = '♮';
            this.colorChosen = 'M';
            this.sevenChosen = 'm';
            this.ninthChosen = '♮';
        },
        reset() {
            this.chordSequence = [];

            this.rootChosen = 'C';
            this.alterationChosen = '♮';
            this.colorChosen = 'M';
            this.sevenChosen = 'm';
            this.ninthChosen = '♮';
        },
        go() {
            // alert("lets go with a sequence of " + this.chordSequence.length + " chords")
            naive(this.chordSequence); // from script naive.js

        },
    }
});