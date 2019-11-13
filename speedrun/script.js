const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');

    car.classList.add('car');

const keys = {
    arrowUp: false,
    arrowDown: false,
    arrowRight: false,
    arrowLeft: false
}

const setting = {
    start: false,
    score: 0,
    speed: 3
}

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

function startGame() {
    start.classList.add('hide');
    setting.start = true;

    gameArea.appendChild(car);
    setting.x = car.offsetLeft;

    requestAnimationFrame(playGame);
}

function playGame() {
    if ( setting.start) {
        if (keys.arrowLeft) {
            setting.x--;
        }
        if (keys.arrowRight) {
            setting.x++;
        }
        car.style.left = setting.x + 'px';
        requestAnimationFrame(playGame);
    }

}
function startRun() {
    event.preventDefault();
    keys[event.key] = true;
 }

function stopRun() {
    event.preventDefault();
    keys[event.key] = false;
}