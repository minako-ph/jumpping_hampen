import { Hampen } from "./hampen.js";
import { InputHandler } from "./input.js";
import { Fork } from "./fork.js";

export function getRandomInt(min,max) {
    return Math.floor(min+Math.random()*(max-min+1));
}

let gamestate = true;
let score = 0;

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let backImg = document.getElementById("img_back");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;

let hampen = new Hampen(GAME_WIDTH,GAME_HEIGHT);
new InputHandler(hampen);
let fork = [];

ctx.drawImage(backImg,0,0,GAME_WIDTH,GAME_HEIGHT);
hampen.draw(ctx);

let lastTime = 0;
let counter = 0;
let interval = 0;

const scoreText = document.getElementById("scoreText");

function gameLoop(timestamp) {
    let deltaTime = timestamp -lastTime;
    lastTime = timestamp;

    ctx.drawImage(backImg,0,0,GAME_WIDTH,GAME_HEIGHT);

    hampen.update(deltaTime);
    hampen.draw(ctx);

    counter += deltaTime;
    if(counter > interval) {
        fork.push(new Fork(GAME_WIDTH,GAME_HEIGHT));
        counter = 0;
        interval = getRandomInt(800,2000);
    }

    scoreText.innerText = "スコア："+score;

    for(let i = fork.length-1; i>= 0; i--) {
        
        fork[i].update(deltaTime);
        fork[i].draw(ctx);

        if(fork[i].checkHit(hampen.position.x,hampen.position.y,hampen.r,
            fork[i].position.x,fork[i].position.y,fork[i].r)) {

                gamestate=false;

            }
        if(fork[i].offScreen()) {
            score++;
            fork.shift();
        }
    }

    if(!gamestate) {
        ctx.fillText("うわああああああああ",70,250);
        startBtn.classList.remove("is-disable");
        return;
     }
    requestAnimationFrame(gameLoop);
}

const startBtn = document.getElementById("gameStart");

startBtn.onclick = function() {
    startBtn.classList.add("is-disable");

    gamestate = true;
    score = 0;
    fork = [];

    requestAnimationFrame(gameLoop);
};
