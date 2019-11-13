const gameSettings = {
    size: 4,
    cellSize: 100
};

function createGame() {
    const frame = document.querySelector('.frame');
    frame.style.width = gameSettings.cellSize*4 + 20 + 'px';
    for(let i = 0; i< Math.pow(gameSettings.size,2); i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        frame.appendChild(cell);
        cell.style.width = gameSettings.cellSize + 'px';
        cell.style.height = gameSettings.cellSize + 'px';
        cell.dataset.cell = i+1;
    }
    startGame();
}


function startGame() {
    for (let i = 1; i <= 2; i++) {
        let cell = document.querySelector(`div[data-cell="${getRandom(0, Math.pow(gameSettings.size,2))}"]`);
        cell.classList.add('number2');
        cell.classList.add('number');
        cell.innerHTML = `<span>2</span>`;
    }
}
 

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}




  createGame();