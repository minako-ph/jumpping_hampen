export class Fork{
    constructor(gameWidth,gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById("img_fork");
        this.offset = 20;
        this.r = 60;
        this.width = this.r*2;　//幅
        this.height = this.r*2; //高さ
        this.position = {
            x:this.gameWidth,
            y:this.gameHeight-this.offset-this.height
        };
        this.speed = 8;
    }
    //二つの円：中心座標（x1,y1）、半径r1の円と、中心が（x2,y2）で半径r2の円が接触したかどうかの判定
    checkHit(x1,y1,r1,x2,y2,r2){
        var a = x2-x1;
        var b = y2-y1;
        var r = r1+r2;
        return r*r >= a*a+b*b;

    }
    //フォークの位置が画面外かどうかの判定
    offScreen(){
        if(this.position.x <= -this.width){
            
            return true;
        }else{
            return false;
        }
    }

    update(deltaTime){
        this.position.x -= this.speed;
    }

    draw(ctx){
        ctx.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);
    }
}