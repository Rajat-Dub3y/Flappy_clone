let board;
let boardwidth=360;
let boardheight=640;
let context;
let birdheight=60;
let birdwidth=60;
let birdx=boardwidth/8;
let birdy=boardheight/2;
let birdimg;
let vx=-2;
let vy=0;
let bird={
    x:birdx,
    y:birdy,
    width:birdwidth,
    height:birdheight
}
let pipearr=[];
let pipew=80;
let pipeh=600;
let pipex=boardwidth;
let pipey=0;
let gravity=0.2;
let go=false;
let score=0;
window.onload=()=>{
    board=document.getElementById("board");
    board.height=boardheight;
    board.width=boardwidth;
    context=board.getContext("2d");
    birdimg=new Image();
    birdimg.src="bird.png";
    birdimg.onload=()=>{
        context.drawImage(birdimg,bird.x,bird.y,bird.width,bird.height);
    }
    topimg=new Image()
    topimg.src="downpipe.png"
    bottomimg=new Image()
    bottomimg.src="uppipe.png"
    requestAnimationFrame(update);
    setInterval(placepipe,1500);
    document.addEventListener("keydown",moveBird);
}
function update(){
    requestAnimationFrame(update);
    if (go){
        return;
    }
    context.clearRect(0,0,board.width,board.height);
    
    vy+=gravity;
    bird.y=Math.max(bird.y+vy,0);
    context.drawImage(birdimg,bird.x,bird.y,bird.width,bird.height);
    if (bird.y>board.height){
        go=ture;
    }

    for(let i=0;i<pipearr.length;i++){
        let pipe=pipearr[i];
        pipe.x+=vx;
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);
        if (!pipe.passed && bird.x>pipe.x+pipe.width){
            score+=0.5;
            pipe.passed=true;
        }
        if (collision(bird,pipe)){
            go=true;
        }
    }
    while(pipearr.lenght>0 && pipearr[0].x<-pipe.width){
        pipearr.shift();
    }
    context.fillStyle="white";
    context.font="45px sans-serif";
    context.fillText(score,5,45);
    if(go){
        context.fillText("GAME OVER",10,90)
    }
}
function placepipe(){
    if (go){
        return;
    }
    let randpipey=pipey-pipeh/4-Math.random()*(pipeh/2);
    let open=boardheight/4;
    let top={
        img:topimg,
        x:pipex,
        y:randpipey,
        width:pipew,
        height:pipeh,
        passed:false
    }

    pipearr.push(top);
    let bottom={
        img:bottomimg,
        x:pipex,
        y: randpipey + pipeh + open,
        width:pipew,
        height:pipeh,
        passed:false
    }
    pipearr.push(bottom);
}
function moveBird(e){
    if (e.code=="Space"|| e.code=="ArrowUp" || e.code=="KeyX"){
        vy=-4;
    }
    if (go){
        bird.y=birdy;
        pipearr=[];
        score=0;
        go=false;
    }
}
function collision(a,b){
    return a.x<b.x+b.width && 
           a.x+a.width>b.x &&
           a.y<b.y +b.height &&
           a.y+a.height>b.y;
}