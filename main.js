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

        listePositions : [],
        printed : 0,
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
            listePositions = this.shuffle(naive(this.chordSequence)); // from script naive.js
            printChordOnKeyboard([listePositions[this.printed]])
        },
        next() {
            if(listePositions!=[])
            {
                this.printed+=1
                printChordOnKeyboard([listePositions[this.printed]])
            }
        },
        ///// This function is not mine, founded at https://github.com/Daplie/knuth-shuffle     /////
        shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
          
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
              // And swap it with the current element.
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
          
            return array;
          },
    }
});