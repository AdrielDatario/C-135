img = ""
flag = ""
object = [];
objectDetector = "";

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function modelLoaded(){
console.log("Model Loaded");
flag = true;
objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object = results;
}

function preload(){
    img = loadImage('dog_cat.jpg');
}

function draw(){
    image(video , 0, 0, 380, 380);

    if(flag != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < object.length; i++){

            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_object").innerHTML = "Number of objects detected are : "+ object.length;
            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
            noFill();
            stroke("#FF0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
    
    /*

    fill("#FF0000")
    text("Cat", 320, 110);
    noFill();
    stroke("#FF0000");
    rect(300, 90, 270, 320);*/
}