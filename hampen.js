export class Hampen{
    constructor(gameWidth,gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById("img_hampen");
        this.offset = 20;
        this.r = 60;
        this.width = this.r*2;
        this.height = this.r*2;
        this.position = {
            x:60,
            y:this.gameHeight-this.offset-this.height
        };
        this.speed = 0;
        this.gravity = 0.5;
        this.lift = -12;
        this.jumpFlag = true;
    }
    up(){
        if(this.jumpFlag){
            
            this.speed = this.lift;
            this.jumpFlag = false;
        }
       
    }
    update(detlaTime){
       
        
        this.position.y += this.speed;
        this.speed += this.gravity;

        /*もしはんぺんの位置が初期位置（this.gameHeight-this.offset-this.height）より大きい場合、
        位置を初期位置にする*/
        if(this.position.y >= this.gameHeight-this.offset-this.height){
            this.position.y = this.gameHeight-this.offset-this.height;
            this.speed = 0;
            this.jumpFlag = true;
        }
    }
    draw(ctx){
        ctx.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);

    }
}