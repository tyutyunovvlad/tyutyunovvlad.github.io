let xSize = 26, ySize = 13;
let score = 1;
const gameWindow = document.createElement('div');
const gameWindowContent = document.createElement('div');
gameWindow.classList.add('game__window');
gameWindowContent.classList.add('game__window__content');
document.querySelector('main').appendChild(gameWindow);
gameWindow.appendChild(gameWindowContent);
let x = 1, y = 13;
for (let i = 0; i < 338; i++) {
    let excel =  document.createElement('div');
    excel.classList.add('excel');
    gameWindowContent.appendChild(excel);
    excel.innerHTML = `<p>${x};${y}</p>`;
    excel.setAttribute('posX', x);
    excel.setAttribute('posY', y);
    x++;
    if (x == 27 ) {
        x = 1;
        y--;
    }
}

createApple();

let intervalMove = setInterval(() => {
    move();
}, 200);

let snakeStart = document.querySelector(`[posX="7"][posY="7"]`);
snakeStart.classList.add('snake__start');


//test snake tail
let snake2 = document.querySelector(`[posX="${snakeStart.getAttribute('posX') - 1}"][posY="${snakeStart.getAttribute('posY')}"]`)
snake2.classList.add('snake');
snake2.classList.add('snake__tail');





let moveDirection = 2;
function move() {
    let curX = snakeStart.getAttribute('posX');
    let curY = snakeStart.getAttribute('posY');
    snakeStart.classList.remove('snake__start');

    if(moveDirection == 1){
        snakeStart = document.querySelector(`[posX="${+curX}"][posY="${+curY+1}"]`);
    } else if (moveDirection == 2) {
        snakeStart = document.querySelector(`[posX="${+curX + 1}"][posY="${+curY}"]`);
    } else if (moveDirection == 3) {
        snakeStart = document.querySelector(`[posX="${+curX}"][posY="${+curY-1}"]`);
    } else  {
        snakeStart = document.querySelector(`[posX="${+curX-1}"][posY="${+curY}"]`);
    }
    snakeStart.classList.add('snake__start');


        

    

    if(document.querySelector('.snake__start').classList.contains('apple')) {          // ate an apple
        document.querySelector('.snake__start').classList.remove('apple');
        score++;
        createApple();
        console.log(score);
        //snakeIncrease();
    } else {
        return;
    }



    // function snakeIncrease() {
    //     if(moveDirection == 1){
    //         document.querySelector('.snake__end').classList.add('snake');
    //     } else if (moveDirection == 2) {
    //         document.querySelector(`[posX="${+curX - 1}"][posY="${+curY}"]`);
    //     } else if (moveDirection == 3) {
    //         document.querySelector(`[posX="${+curX}"][posY="${+curY+1}"]`);
    //     } else  {
    //         document.querySelector(`[posX="${+curX+1}"][posY="${+curY}"]`);
    //     }
        
    // }
    
}

window.addEventListener('keydown', function(e){


    if (e.keyCode == 37) {
        if(moveDirection == 2) {
            return;
        }
        moveDirection = 4;
        snakeStart.setAttribute('turn', "left");
        e.preventDefault();
    } else if (e.keyCode == 39) {
        if(moveDirection == 4) {
            return;
        }
        moveDirection = 2;
        snakeStart.setAttribute('turn', "right");
        e.preventDefault();
    } else if (e.keyCode == 40) {
        if(moveDirection == 1) {
            return;
        }
        moveDirection = 3;
        snakeStart.setAttribute('turn', "bot");
        e.preventDefault();
    } else if (e.keyCode == 38) {
        if(moveDirection == 3   ) {
            return;
        }
        moveDirection = 1;
        snakeStart.setAttribute('turn', "top");
        e.preventDefault();
    }
});

// let intervaApple = setInterval(() => {
//     createApple();
// }, 10000);

function createApple() {
    function getRandom(a) {
        return Math.round(Math.random()*a+1);
    }
    let randomX = getRandom(xSize-1);
    let randomY = getRandom(ySize-1);
    document.querySelector(`[posX="${randomX}"][posY="${randomY}"]`).classList.add('apple');
}