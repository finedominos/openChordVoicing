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
        go(){
            alert("lets go with a sequence of "+this.chordSequence.length+" chords")
        },
    }
});