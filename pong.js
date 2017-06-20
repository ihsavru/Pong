var paddle = {x:0,y:230};
var ai = {x:780, y:230};
var ball = {x: 40, 
	y :30,
	speedx:20,
	speedy:15
	 }
var draw;

function startGame(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(paddle.x,paddle.y,20,140);
	paddle = {x:0,y:230};
    ai = {x:780, y:230};
    ball = {x: 40, 
	y :30,
	speedx:20,
	speedy:15
	 }
	clearInterval(draw);
	ctx.strokeStyle = "white";
	ctx.setLineDash([30, 20]);
	ctx.beginPath();
	ctx.moveTo(400,0);
	ctx.lineTo(400, 600);
	ctx.stroke();
	drawAi();
	drawPaddle();
	draw = setInterval(moveBall,50);
}

function drawPaddle(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "white";
    ctx.clearRect(paddle.x,paddle.y,20,140);
    ctx.fillRect(paddle.x,paddle.y,20,140);
}

function drawAi(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "white";
    ctx.fillRect(ai.x,ai.y,20,140);
}

function drawBall(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "white";
    ctx.setLineDash([30, 20]);
	ctx.beginPath();
	ctx.moveTo(400,0);
	ctx.lineTo(400, 600);
	ctx.stroke();
    ctx.fillRect(ball.x,ball.y,20,20);
}

function movePaddle(dir){
    if(dir === -1){
    	paddle.y-=20;
    	drawPaddle();
    }

    else if(dir === 1){
    	paddle.y+=20;
    	drawPaddle();
    }
}

function moveAi(){
	var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    ctx.clearRect(ai.x,ai.y,20,140);
    ai.y = ball.y-70;
    drawAi();
}

function moveBall(){
	var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    ctx.clearRect(ball.x,ball.y,20,20);
    if(ball.x === paddle.x + 20 && ball.y > paddle.y && ball.y<paddle.y+140)
    	ball.speedx=-ball.speedx;
    if(ball.x === ai.x - 20 && ball.y > ai.y && ball.y<ai.y+140)
    	ball.speedx=-ball.speedx;
    if(ball.y>=580)
    	ball.speedy=-ball.speedy
    if(ball.y<=0)
    	ball.speedy=-ball.speedy;  
    if(ball.x<0) {
    	alert('Game Over!');
    	startGame();
    } 
    ball.x+=ball.speedx;
    ball.y+=ball.speedy;
    drawBall();
    moveAi();


}

$(function(){
    startGame();
    document.onkeydown = function(e){
        switch(e.keyCode){
	    	case 38:
	    	    if(paddle.y>0){
	    	    	var canvas = document.getElementById("canvas");
                    var ctx = canvas.getContext('2d');
                    ctx.clearRect(paddle.x,paddle.y,20,140);
	    	        movePaddle(-1);
	    	    }
	    	    return

	    	case 40:
	    	    if(paddle.y<=460){
	    	    	var canvas = document.getElementById("canvas");
                    var ctx = canvas.getContext('2d');
                    ctx.clearRect(paddle.x,paddle.y,20,140);
	    	        movePaddle(1);
	    	    }
	    }	    return    
    };
})