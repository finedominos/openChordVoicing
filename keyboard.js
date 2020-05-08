var lastChordPrinted = null;
let canvas = document.getElementById("canvasKeyboard");
let context = canvas.getContext("2d");
canvas.width = keyboard.offsetWidth - 5;

let canvas_keys = document.getElementById("canvasKeyboard");
let context_keys = canvas_keys.getContext("2d");

var img = new Image();
img.onload = function () {
    context.drawImage(img, 0, 0, canvas.width, 240);
    if(this.lastChordPrinted != null){
        printChordOnKeyboard(lastChordPrinted) 
    }
}
window.onresize = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 0.782 * window.innerWidth;
    canvas_keys.width = canvas.width;
    // console.log("canva's new width : "+canvas.width);
    if(this.lastChordPrinted != null){
        printChordOnKeyboard(lastChordPrinted) 
    }
}

img.src = "pianoKeyboard88keys.png";

function printChordOnKeyboard(chord) {

    var keywidth_white = canvas.width / 52;
    var keywidth_black = keywidth_white / 1.6;

    let whiteKeys = [0, 1, 3, 5, 6, 8, 10];

    //context_keys.clearRect(0, 140, canvas.width, 10);

    context.drawImage(img, 0, 0, canvas.width, 240);

    chord.forEach(key => {

        x = keywidth_white;
        x += Math.floor(key / 12) * keywidth_white * 7;
        keyInOctave = key % 12;
        
        //console.log("key", key);
        //console.log("keyInOctave", keyInOctave);

        context_keys.beginPath();

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
            if (keyInOctave == 1 || keyInOctave == 6){
                //C and F
                context_keys.rect(x, 0, keywidth_white * 0.53, 160);
            }
            else if (keyInOctave == 3 || keyInOctave == 8){
                //D and G
                context_keys.rect(x + keywidth_white * 0.21, 0, keywidth_white * 0.56, 160);
            }
            else if (keyInOctave == 5 || keyInOctave == 0){
                //E and B
                context_keys.rect(x + keywidth_white * 0.51, 0, keywidth_white * 0.49, 160);
            }
            else {
                //A
                context_keys.rect(x + keywidth_white * 0.36, 0, keywidth_white * 0.45, 160);
            }
            
        }
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
        context_keys.fillStyle = "red";
        context_keys.fill();
    });
    lastChordPrinted = chord;

}




/*var lastChordPrinted = null;
let canvas = document.getElementById("canvasKeyboard");
let context = canvas.getContext("2d");
canvas.width = keyboard.offsetWidth - 5;


var img = new Image();
img.onload = function () {
    context.drawImage(img, 0, 0, canvas.width, 240);
}
window.onresize = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 0.782 * window.innerWidth;
    // console.log("canva's new width : "+canvas.width);
    context.drawImage(img, 0, 0, canvas.width, 240);
    if(this.lastChordPrinted != null){
        printChordOnKeyboard(lastChordPrinted) 
    }
}
img.src = "pianoKeyboard88keys.png";

function printChordOnKeyboard(chord) {

    var keywidth = canvas.width / 52;

    context.clearRect(0, 240, canvas.width, 10);

    chord.forEach(key => {

        x = keywidth;
        x += Math.floor(key / 12) * keywidth * 7;
        remaining = key % 12;
        if (remaining < 6) {
            if (remaining != 0) {
                x += (remaining + 1) * keywidth * 0.5
            }
        }
        else {
            x += 3 * keywidth + (remaining - 4) * keywidth * 0.5
        }

        context.beginPath();
        context.rect(x, 240, keywidth, 10);
        context.fillStyle = "red";
        context.fill();
    });
    lastChordPrinted = chord;

}
*/