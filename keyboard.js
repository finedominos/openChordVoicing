
var lastChordPrinted = null;
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
    console.log("canva's new width : "+canvas.width);
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