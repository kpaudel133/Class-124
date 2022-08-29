nose_x = "";
nose_y = "";
difference = "";

function setup(){
    video = createCapture(VIDEO);
    video.size(550,550);
    video.position(300, 150);

    canvas = createCanvas(550,550);
    canvas.position(900,150);

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw(){
    background("#87CEEB");

    document.getElementById("square_width_height").innerHTML = "The width and height of the square are " + difference + " px";
    fill("#E6E6FA");
    stroke("#301934")
    square(nose_x, nose_y, difference);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        nose_x = results[0].pose.nose.x;
        nose_y = results[0].pose.nose.y;
        console.log("Nose x = " + nose_x + ", Nose y = " + nose_y);

        right_wrist_x = results[0].pose.rightWrist.x;
        left_wrist_x = results[0].pose.leftWrist.x;
        difference = floor(left_wrist_x - right_wrist_x);
        console.log("The difference between the wrists are " + difference);
    }
}