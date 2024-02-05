img = "";
objects = [];
status = "";
function preload() {
    img = loadImage("dog_cat.jpg");
}
function setup() {
    canvas = createCanvas(600,400);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";


}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img,gotResult);
}
function gotResult(error,results) {
    if(error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }


}
function draw() {
    image(img,0,0,600,400);
    if (status != "") {
        for(i=0; i < objects.length; i++) {
            fill("red");
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + percentage + "%",objects[i].x,objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }


    

}