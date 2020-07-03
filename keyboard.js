var lastChordPrinted = null;

//Initializing two canvases: one for the keyboard and another for the marked keys
let canvas = document.getElementById("canvasKeyboard");
let context = canvas.getContext("2d");
let canvas_keys = document.getElementById("canvasKeyboard");
let context_keys = canvas_keys.getContext("2d");
canvas.width = keyboard.offsetWidth - 5;
canvas_keys.width = canvas.width;

//Setting the keyboard image
var img = new Image();

img.onload = function () {
    context.drawImage(img, 0, 0, canvas.width, 240);
}

//Adjusting the size of the keyboard image and the marked keys according to the window size
window.onresize = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 0.782 * window.innerWidth;
    canvas_keys.width = canvas.width;
    //Each time the window gets resized, the keys of the last chord get marked again
    if(this.lastChordPrinted != null){
        printChordOnKeyboard(lastChordPrinted) 
    }
}

img.src = "pianoKeyboard88keys.png";


//Marking the chord notes on the keyboard
function printChordOnKeyboard(chord) {


    var keywidth_white = canvas.width / 52;
    var keywidth_black = keywidth_white / 1.6;
    let whiteKeys = [0, 1, 3, 5, 6, 8, 10];

    //Clearing the canvas and reloading the keyboard image
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, 240);

    chord.forEach(key => {

        x = keywidth_white;
        x += Math.floor(key / 12) * keywidth_white * 7;
        keyInOctave = key % 12;

        context_keys.beginPath();

        //Marking keys to be played with a combination of red rectangles on the keyboard

        //If a key to be marked is a white key
        if (whiteKeys.includes(keyInOctave)){
            keywidth = keywidth_white;
            y = 160;
            y1 = 80;
            if (keyInOctave < 6) {
                if (keyInOctave != 0) {
                    x += (keyInOctave + 1) * keywidth * 0.5;
                }
            }
            else {
                x += 3 * keywidth + (keyInOctave - 4) * keywidth * 0.5;
            }

            //Drawing the upper rectangle of a white key
            //Keys C and F
            if (keyInOctave == 1 || keyInOctave == 6){
                context_keys.rect(x, 0, keywidth_white * 0.53, 160);
            }
            //Keys D and G
            else if (keyInOctave == 3 || keyInOctave == 8){
                context_keys.rect(x + keywidth_white * 0.21, 0, keywidth_white * 0.56, 160);
            }
            //Keys E and B    
            else if (keyInOctave == 5 || keyInOctave == 0){
                context_keys.rect(x + keywidth_white * 0.51, 0, keywidth_white * 0.49, 160);
            }
            //Key A
            else {
                context_keys.rect(x + keywidth_white * 0.36, 0, keywidth_white * 0.45, 160);
            }
            
        }
        //If a key to be marked is a black key
        else {
            keywidth = keywidth_black;
            y = 0;
            y1 = 160;
            console.log(x);
            if (keyInOctave < 6) {
                x += keywidth_black*0.53 + (keyInOctave) * keywidth_black;
            }
            else {
                x += 3 * keywidth_white + keywidth_black*0.65 + (keyInOctave - 5) * keywidth_black*0.91;
            }
        }

        context_keys.rect(x, y, keywidth, y1);
        context_keys.fillStyle = "darkred";
        context_keys.fill();
    });
    //Remembering the last chord
    lastChordPrinted = chord;
}