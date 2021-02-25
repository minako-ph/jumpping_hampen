export class InputHandler {
    constructor(hampen) {
        document.addEventListener("keydown",event => {
            switch(event.keyCode) {
                case 38:
                    hampen.up();
                    break;
            }
        })
    }
}