import { Hampen } from "./hampen.js";
import { InputHandler } from "./input.js";
import { Fork } from "./fork.js";

//minからmaxまでの範囲でランダムな整数を生成する関数
export function getRandomInt(min,max){
    return Math.floor(min+Math.random()*(max-min+1));
}

var gamestate = true; //もしfalseならゲーム描写が止まるようにする
var score = 0;

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let backImg = document.getElementById("img_back"); //背景

const GAME_WIDTH = 800; //ゲームキャンバスの幅
const GAME_HEIGHT = 500; //ゲームキャンバスの高さ

let hampen = new Hampen(GAME_WIDTH,GAME_HEIGHT);
new InputHandler(hampen);
let fork = [];

// 初期描画
ctx.drawImage(backImg,0,0,GAME_WIDTH,GAME_HEIGHT); //背景の描写
hampen.draw(ctx);

let lastTime = 0;
let counter = 0;
let interval = 0;

const scoreText = document.getElementById("scoreText");

function gameLoop(timestamp){
    let deltaTime = timestamp -lastTime;
    lastTime = timestamp;

    ctx.drawImage(backImg,0,0,GAME_WIDTH,GAME_HEIGHT); //背景の描写

    hampen.update(deltaTime);
    hampen.draw(ctx);

    counter += deltaTime;
    if(counter > interval){ //800ミリ秒から２秒間隔でフォークを生成
        fork.push(new Fork(GAME_WIDTH,GAME_HEIGHT));
        counter = 0;
        interval = getRandomInt(800,2000); //インターバルを800ミリ秒から２秒までの乱数に設定
    }

    scoreText.innerText = "スコア："+score;

    for(var i = fork.length-1; i>= 0; i--){
        
        fork[i].update(deltaTime);
        fork[i].draw(ctx);

        //フォークがはんぺんと当たったかどうかの判定
        if(fork[i].checkHit(hampen.position.x,hampen.position.y,hampen.r,
            fork[i].position.x,fork[i].position.y,fork[i].r)){

                gamestate=false;

            }
        //フォークの位置がゲーム画面外に出たらフォークの配列を削除
        if(fork[i].offScreen()){
            score++;
            fork.shift();
        }
    }

    //ゲーム状態がfalseだったらゲームをストップ
    if(!gamestate) {
        ctx.fillText("うわああああああああ",70,250);  //スコアの更新
        startBtn.classList.remove("is-disable");
        return;
     }
    requestAnimationFrame(gameLoop);
}

const startBtn = document.getElementById("gameStart");

startBtn.onclick = function() {
    startBtn.classList.add("is-disable");

    gamestate = true; //もしfalseならゲーム描写が止まるようにする
    score = 0;
    fork = [];

    requestAnimationFrame(gameLoop);
};
