slow_down_song="";
alone_song="";
leftwristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist =0;
scoreRightWrist=0;
song_slow_down = "";

function preload() {
    alone_song = loadSound('Alone.mp3');
    slow_down_song = loadSound('SlowDown.mp3');
}

function setup() {
    
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is Intialized');
}

function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftwrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftwrist);

        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftwristX + "leftWristY = " + leftwristY );

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightwristX + "rightWristY = " + rightwristY );
    }
}

function draw() 
{
    image(video, 0,0,600,500);

    alone_song1 = alone_song.play();
    console.log(alone_song1);

    fill ("E63946");
    stroke("E63946");

    if(scoreRightWrist > 0.2) 
    {
    circle(rightwristX, rightwristY,20);
    if(rightWristY >0 && rightWristY <=100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY > 100 && rightwristY <=200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY > 200 && rightwristY <=300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
}
}


function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}