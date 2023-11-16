const score = document.querySelector('.score');
const startScreen=document.querySelector('.startScreen');
const gameArea=document.querySelector('.gameArea');
let player={speed: 5,score: 0};
startScreen.addEventListener('click',start);
 let keys={
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false 
 }
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e){
    keys[e.key]=true;
    e.preventDefault();
    // console.log(e.key);
    // console.log(keys);
}
function keyUp(e){
    keys[e.key]=false;
    e.preventDefault();
    // console.log(e.key);
    // console.log(keys);
}
 function isCollide(a,b){
    aReact=a.getBoundingClientRect();
    bRect=b.getBoundingClientRect();
     return !((aReact.left>bRect.right) || (aReact.bottom<bRect.top) || (bRect.bottom<aReact.top) || (bRect.left>aReact.right));
 }
function movelines(){
    let lines=document.querySelectorAll('.roadLines');
    lines.forEach(function(item){
        if(item.y>=700)
        item.y-=750;
        item.y+=player.speed;
        item.style.top=item.y+"px";
    })
}
function endgame(){
    player.start=false;
    startScreen.classList.remove("hidden");
    startScreen.innerHTML="Game Over <br> Your final score is "+player.score+" <br>Press here to restart the Game.";
}
function moveEnemy(car){
    
    let enemy=document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        if(isCollide(car,item))
        {
            console.log("Hit");
            endgame();
        }
        if(item.y>=750){
        item.y=-300;
        item.style.left=Math.floor(Math.random()*350)+'px';
        }
        item.y+=player.speed;
        item.style.top=item.y+"px";
    })
}
function gamePlay(){
    // console.log("Hey I am clicked.");
    let car=document.querySelector('.car');
    let road=gameArea.getBoundingClientRect();
    // console.log(road);
    if(player.start){
        movelines();
        moveEnemy(car);
        if(keys.ArrowDown && player.y<(road.bottom-85))player.y+=player.speed;
        if(keys.ArrowUp && player.y>(road.top+70))player.y-=player.speed;
        if(keys.ArrowLeft && player.x>0)player.x-=player.speed;
        if(keys.ArrowRight && player.x<(road.width-50))player.x+=player.speed;
        car.style.top=player.y+"px";
        car.style.left=player.x+"px";
        window.requestAnimationFrame(gamePlay);
        // console.log(player.score++);
        player.score++;
        let ps=player.score-1;
        score.innerText="Score: " + ps;
    }
}
function start(){
    // gameArea.classList.remove("hidden");
    player.score=0;
    score.classList.remove("hidden");
    gameArea.innerHTML="";
    startScreen.classList.add("hidden");
    player.start=true;
    // player.score=0;
    window.requestAnimationFrame(gamePlay);
    
    for(x=0;x<5;x++){
        let roadLines=document.createElement('div');
        roadLines.setAttribute('class','roadLines');
        roadLines.y=(150*x);
        roadLines.style.top=  roadLines.y+"px";
        gameArea.appendChild(roadLines);
    }

    // .....Creates a div element.....
    let car=document.createElement('div');  
    car.setAttribute('class','car');
    // car.innerText="Hey I am ur Car";
    gameArea.appendChild(car); 
    
    
    player.x=car.offsetLeft;
    // console.log(player.x);
    player.y=car.offsetTop;
    for(x=0;x<3;x++){
        let enemyCar=document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.y=((x+1)*350)*-1;
        enemyCar.style.top=  enemyCar.y+"px";
        enemyCar.style.backgroundColor=randomColor();
        enemyCar.style.left=Math.floor(Math.random()*350)+'px';
        gameArea.appendChild(enemyCar);
    }
}
function randomColor(){
    function c(){
        let hex=Math.floor(Math.random()*256).toString(16);
       let val=("0"+ String(hex)).substr(-2);
        return val;
    }
    return "#"+c()+c()+c();
}
