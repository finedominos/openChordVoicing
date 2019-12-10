

function printChordOnKeyboard(chord) {
    let canvas = document.getElementById("canvasKeyboard");
    let context = canvas.getContext("2d");

    

    var keywidth = canvas.width / 52;

    var img = new Image();
    img.onload = function () {
        context.drawImage(img, 0, 0, canvas.width, 240);
    }
    img.src = "pianoKeyboard88keys.png";
    
    context.clearRect(0, 240, canvas.width, 10); 

    chord[0].forEach(key => {

        console.log(key)
        x = keywidth*1.5;
        x += Math.floor(key/12)*keywidth*7;
        remaining = key%12;
        if(remaining<6){
            x+= remaining*keywidth*0.5
        }
        else{
            x += 3*keywidth + (remaining-5)*keywidth*0.5
        }

        context.beginPath();
        context.rect(x, 240, keywidth, 10);
        context.fillStyle = "red";
        context.fill();
        console.log(x)
    });

}