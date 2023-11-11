const score = document.querySelector('.score');
const startScreen=document.querySelector('.startScreen');
const gameArea=document.querySelector('.gameArea');

startScreen.addEventListener('click',start);
 let keys={
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false 
 }
 let player={speed: 5};
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e){
    keys[e.key]=true;
    e.preventDefault();
    console.log(e.key);
    console.log(keys);
}
function keyUp(e){
    keys[e.key]=false;
    e.preventDefault();
    console.log(e.key);
    console.log(keys);
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
function gamePlay(){
    console.log("Hey I am clicked.");
    let car=document.querySelector('.car');
    let road=gameArea.getBoundingClientRect();
    console.log(road);
    if(player.start){
        movelines();
        if(keys.ArrowDown && player.y<(road.bottom-70))player.y+=player.speed;
        if(keys.ArrowUp && player.y>(road.top+70))player.y-=player.speed;
        if(keys.ArrowLeft && player.x>0)player.x-=player.speed;
        if(keys.ArrowRight && player.x<(road.width-50))player.x+=player.speed;
        car.style.top=player.y+"px";
        car.style.left=player.x+"px";
    window.requestAnimationFrame(gamePlay);
    }
}
function start(){
    gameArea.classList.remove("hidden");
    startScreen.classList.add("hidden");
    player.start=true;
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
    console.log(player.x);
    player.y=car.offsetTop;
}
