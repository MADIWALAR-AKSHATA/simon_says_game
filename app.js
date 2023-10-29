let gameSeq=[];
let userSeq=[];

let btns = ["yellow", "red", "purple", "green"]

let started = false;
let level = 0;

let max;

let h2 = document.querySelector("h2");
let h3 = document.createElement("h3");




document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    //random btn choose
    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randomBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randomBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}


function btnPress(){
    console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    
    checkAns(userSeq.length-1);

}

function checkAns(idx){
    console.log("current level is ", level);
    // let idx = level-1;
    if(userSeq[idx] == gameSeq[idx]){
        // console.log("Same value");
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any Key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
          document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        h3.innerText = `Highest Score is ${level}`;
        document.querySelector("body").append(h3);
        let prevMax = max;
        if(max < level){
            max = level;
        }
        else{
            max = prevMax;
        }
        reset();
    }

}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

let highestValue = level;