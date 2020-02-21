console.log("loaded");

var vueCollection = [];
var chordCollection = [];
printed = 0;

function computeLabel() {
    label = '';
    vueCollection.forEach(element => {
        if (element.print != '/' && element.print != '5' && element.print != 'M')
            label += element.print.replace('♮', '').replace('#5', 'aug').replace('b5', 'dim');

    });
    document.getElementById("labelPrinting").innerHTML = "chosen chord : " + label;
}

//Temporary needed function
//// This function is not mine, founded at https://github.com/Daplie/knuth-shuffle
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

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
}

function computeChord() {
    label = '';
    chord = {};
    vueCollection.forEach(element => {
        if (element.print != '/' && element.print != '5' && element.print != 'M')
            label += element.print.replace('♮', '').replace('#5', 'aug').replace('b5', 'dim');

        prop = element.type;
        chord = Object.assign(chord, { prop: element.print });
        chord[element.type] = element.print;

    });
    document.getElementById("labelPrinting").innerHTML = "chosen chord : " + label;
    delete chord.prop;
    chord["print"] = label;
    console.log(chord);
    return chord;
}



// CREATING THE VUE WITH TEMPLATE

const LinearPillbar = {
    el: ".row",
    template: `
      <div class="linear-pillbar">
        <button class="option" v-for="option of options" :class="{selected:option.selected, equal: equalWidth}" @click="select(option)">
          <i class="material-icons" v-if="option.icon">{{option.icon}}</i>
          <div v-else>{{option.name}}</div>
        </button>
      </div>
    `,
    props: {
        options: {
            type: Array,
            default: () => []
        },
        equalWidth: {
            type: Boolean,
            default: false
        },
        mainColor: {
            type: String,
            default: '#106cc8'
        },
        highlightColor: {
            type: String,
            default: '#1e86ed'
        },
    },
    computed: {
        print() {
            value = '';
            this.options.forEach(element => {
                if (element.selected) {
                    value += element.name;
                }
            });
            return value;
        },
        type() {
            return this.options[0].group;
        }
    },
    methods: {
        select(option) {
            if (option.group && !option.selected) {
                Vue.set(option, 'selected', !option.selected);
                for (let otherOption of this.options) {
                    if (otherOption.name !== option.name && option.group === otherOption.group) {
                        Vue.set(otherOption, 'selected', false);
                    }
                }
            } else if (!option.group) {
                Vue.set(option, 'selected', !option.selected);
            }
        },
    },
    propsData: {
        options: [
            { name: 'C', group: 'root', selected: true },
            { name: 'D', group: 'root' },
            { name: 'E', group: 'root' },
            { name: 'F', group: 'root' },
            { name: 'G', group: 'root' },
            { name: 'A', group: 'root' },
            { name: 'B', group: 'root' },
            { name: '♮', group: 'alt', selected: true },
            { name: '#', group: 'alt' },
            { name: 'b', group: 'alt' },
        ],
        equalWidth: true,
    }
};

// BUILDING VUEs WITH DATA

vue = new Vue(LinearPillbar);
vueCollection.push(vue);

LinearPillbar.propsData.options = [
    { name: 'M', group: 'color', selected: true },
    { name: 'm', group: 'color' },
    { name: 'pow', group: 'color' }
]
vue = new Vue(LinearPillbar);
vueCollection.push(vue);

LinearPillbar.propsData.options = [
    { name: '5', group: 'fifth', selected: true },
    { name: 'b5', group: 'fifth' },
    { name: '#5', group: 'fifth' }
]
vue = new Vue(LinearPillbar);
vueCollection.push(vue);


LinearPillbar.propsData.options = [
    { name: '/', group: 'seventh' },
    { name: '7', group: 'seventh', selected: true },
    { name: '7Maj', group: 'seventh' }
]
vue = new Vue(LinearPillbar);
vueCollection.push(vue);

LinearPillbar.propsData.options = [
    { name: '/', group: 'ninth', selected: true },
    { name: 'b9', group: 'ninth' },
    { name: '9', group: 'ninth' },
    { name: '#9', group: 'ninth' }
]
vue = new Vue(LinearPillbar);
vueCollection.push(vue);

LinearPillbar.propsData.options = [
    { name: '/', group: 'eleventh', selected: true },
    { name: '11', group: 'eleventh' },
    { name: '#11', group: 'eleventh' }
]
vue = new Vue(LinearPillbar);
vueCollection.push(vue);

LinearPillbar.propsData.options = [
    { name: '/', group: 'thirteenth', selected: true },
    { name: '13', group: 'thirteenth' },
    { name: 'b13', group: 'thirteenth' },
]
vue = new Vue(LinearPillbar);
vueCollection.push(vue);

document.getElementById("addButton").onclick = function() {
    chordCollection.push(computeChord())
    var string = "";
    chordCollection.forEach(element => {
        string += element.print + " ; ";
    });
    document.getElementById("contentSequencePrinting").innerHTML = string;
};

document.getElementById("resetButton").onclick = function() {
    cleanSheet()
    chordCollection = []
    document.getElementById("contentSequencePrinting").innerHTML = '';
};

//Andriana changed this
document.getElementById("goButton").onclick = function() {
    positionsList = (naive(chordCollection)); // from script naive.js
    shuffledPosList = [];
    chordsPosList = [];
    for (var i = 0; i < positionsList.length; i++) {
        shuffledPosList[i] = shuffle(positionsList[i]);
        chordsPosList[i] = shuffledPosList[i][0];
    }
    printChordOnKeyboard([shuffledPosList[0][printed]]);

    console.log("shuffledPosList: ", shuffledPosList);
    console.log("chordPosList: ", chordsPosList);

    cleanSheet();
    ChordListToSheet(chordCollection, chordsPosList);
};

document.getElementById("nextButton").onclick = function() {
    if (positionsList) {
        printed += 1
        printChordOnKeyboard([positionsList[printed]])
    }
};


setInterval(() => {
    computeLabel()
}, 300);