export class InputHandler{
    constructor(hampen){
        document.addEventListener("keydown",event =>{
            switch(event.keyCode){
                case 38: //キーボードの上↑のボタンが押されたとき
                    hampen.up();
                    break;
               
            }
        })
    }
}