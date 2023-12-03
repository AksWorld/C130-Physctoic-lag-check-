song1="";
song2="";
song_status="";
rsong_status="";
scorerightWrist=0;
scoreleftWrist=0;
leftWristX=0;
leftWristY=0;
rightWristX=0;
leftWristY=0;
function preload(){
    song=loadSound("Bang.mp3");
    song2=loadSound("That's An Idiom.mp3");
}
function setup(){
    canvas=createCanvas(500,400);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses)
}
function modelLoaded(){
    console.log("McModel Ready For Customer")
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scorerightWrist=results[0].pose.keypoints[10].score;
        scoreleftWrist=results[0].pose.keypoints[9].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
    }
}

function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    
    
    if(scorerightWrist>0.2){
        song_status="true";
        circle(leftWristX,leftWristY,20);
        song2.stop();
    }
    if(song_status=="true"){
        song.play();
        document.getElementById("song").innerHTML="Song:Bang";
    }
   

    if(scoreleftWrist>0.2){
        rsong_status="true";
        circle(rightWristX,rightWristY,20);
        song.stop();
    }
    if(rsong_status=="true"){
        song2.play();
    
        document.getElementById("song").innerHTML="Song:That's an Idiom";
    }

}
function play(){
    song.play();
    song.setVolume();
    song.rate(1);
}
