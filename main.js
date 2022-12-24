song = "";

function preload()
{
	song = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	
	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  
  if(results.length > 0)
  {
	console.log(results);
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function draw() {
	image(video, 0, 0, 600, 500);

	fill("blue");
	stroke("white");

	if(scoreLeftWrist > 0.2 ) {
		circle(leftWristX, leftWristY, 20);
if(leftWristY > 0 && leftWristY <= 100) {
	document.getElementById("speed").innerHTML = "speed : 2.5 x";
	song.rate(2.5);

}
else if (leftWristY > 100 && leftWristY <= 200) {
	document.getElementById("speed").innerHTML = "speed : 2 x";
	song.rate(2);
	
}
else if (leftWristY > 200 && leftWristY <= 300) {
	document.getElementById("speed").innerHTML = "speed : 1.5 x";
	song.rate(1.5);
	
}
else if (leftWristY > 300 && leftWristY <= 400) {
	document.getElementById("speed").innerHTML = "speed : 1 x";
	song.rate(1);
	
}
else if (leftWristY > 400 && leftWristY <= 500) {
	document.getElementById("speed").innerHTML = "speed : 0.5 x";
	song.rate(0.5);
	
}
	}
	if(scoreRightWrist> 0.2){
		circle(rightWristX, rightWristY,20);
		v=Number(rightWristY);
		j=floor(v);
		volume=j/500;
document.getElementById("volume").innerHTML="volume:"+volume;
song.setVolume(volume);

	}
	}

function play()
{
	song.play();
	song.setVolume(0.5);
	song.rate(1);
}