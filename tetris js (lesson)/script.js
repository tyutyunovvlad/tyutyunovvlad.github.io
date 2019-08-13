let tetris = document.createElement('div');
let main = document.querySelector('.main');
tetris.classList.add('tetris');
const scoreBoard = document.querySelector('.score__board');

for (let i = 1; i < 181; i++) {  
    let excel = document.createElement('div');
    excel .classList.add('excel');
    tetris.appendChild(excel);
}
main.appendChild(tetris);

let excel = document.querySelectorAll('.excel');
let i = 0;

for (let y = 18; y > 0; y-- ) {
    for (let x = 1; x < 11; x++) {
        excel[i].setAttribute('posX', x);
        excel[i].setAttribute('posY', y);
        excel[i].innerHTML = `<p>${x};${y}</p>`;
        i++;
    }
}


let mainArr = [
    //палка
    [
        [0,1],
        [0,2],
        [0,3],
        [
            //90
            [-1,1],
            [0,0],
            [1,-1],
            [2,-2]
        ],
        [
            //180
            [1,-1],
            [0,0],
            [-1,1],
            [-2,2]
        ],
        [
            //270 
            [-1,1],
            [0,0],
            [1,-1],
            [2,-2]
        ],
        [
            //360
            [-1,1],
            [0,0],
            [1,-1],
            [2,-2]
        ]
    ],
    //квадрат
    [
        [1,0],
        [0,1],
        [1,1],
        [
            //90
            [0,0],
            [0,0],
            [0,0],
            [0,0]
        ],
        [
            //180
            [0,0],
            [0,0],
            [0,0],
            [0,0]
        ],
        [
            //270 
            [0,0],
            [0,0],
            [0,0],
            [0,0]
        ],
        [
            //360
            [0,0],
            [0,0],
            [0,0],
            [0,0]
        ]
    ],
    // L
    [
        [1,0],
        [0,1],
        [0,2],
        [
            //90
            [0,0],
            [-1,1],
            [1,0],
            [2,-1]
        ],
        [
            //180
            [1,-1],
            [1,-1],
            [-1,0],
            [-1,0]
        ],
        [
            //270 
            [-1,0],
            [0,-1],
            [2,-2],
            [1,-1]
        ],
        [
            //360
            [0,-1],
            [0,-1],
            [-2,0],
            [-2,0]
        ]
    ],
    // L2
    [
        [1,0],
        [1,1],
        [1,2],
        [
            //90
            [0,0],
            [0,0],
            [1,-1],
            [-1,-1]
        ],
        [
            //180
            [0,-1],
            [-1,0],
            [-2,1],
            [1,0]
        ],
        [
            //270 
            [2,0],
            [0,0],
            [1,-1],
            [1,-1]
        ],
        [
            //360
            [-2,0],
            [1,-1],
            [0,0],
            [-1,1]
        ]
    ],
    // z
    [
        [1,0],
        [-1,1],
        [0,1],
        [
            //90
            [0,-1],
            [-1,0],
            [2,-1],
            [1,0]
        ],
        [
            //180
            [0,0],
            [1,-1],
            [-2,0],
            [-1,-1]
        ],
        [
            //270
            [0,-1],
            [-1,0],
            [2,-1],
            [1,0]
        ],
        [
            //360
            [0,0],
            [1,-1],
            [-2,0],
            [-1,-1]
        ]
    ],
    // z2
    [
        [1,0],
        [1,1],
        [2,1],
        [
            //90
            [2,-1],
            [0,0],
            [1,-1],
            [-1,0]
        ],
        [
            //180
            [-2,0],
            [0,-1],
            [-1,0],
            [1,-1]
        ],
        [
            //270
            [2,-1],
            [0,0],
            [1,-1],
            [-1,0]
        ],
        [
            //360
            [-2,0],
            [0,-1],
            [-1,0],
            [1,-1]
        ]
    ],
    //.:.
    [
        [1,0],
        [2,0],
        [1,1],
        [
            //90
            [1,-1],
            [0,0],
            [0,0],
            [0,0]
        ],
        [
            //180
            [0,0],
            [-1,0],
            [-1,0],
            [1,-1]
        ],
        [
            //270
            [1,-1],
            [1,-1],
            [1,-1],
            [0,0]
        ],
        [
            //360
            [-2,0],
            [0,-1],
            [0,-1],
            [-1,-1]
        ]
    ]
]

let currentFigure = 0;
let figureBody = 0;
let rotate = 1;
let x = 5, y = 15;
let score = 0;

function create() {
    function getRandom() {
         return  Math.round(Math.random()*(mainArr.length-1));
    }
    rotate = 1;
    currentFigure = getRandom();

    figureBody = [
        document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`)
    ]

    for (let i = 0; i < figureBody.length; i++){
        figureBody[i].classList.add('figure');
    }
}

create();

function move() {
    scoreBoard.innerHTML = `<p>${score}</p>`;
    let moveFlag = true;
    let coordinates = [
        [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
        [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
        [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
        [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')]
    ];

    for (let i = 0; i < coordinates.length; i++){
        if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1]-1}"]`).classList.contains('set')) {   ////якщо фігура вже на найнижчому рядку у=1 ||або якщо клітинка нижче вже упала (set)
            moveFlag = false;           ////рух забороняється
            break;
        } 
    }

    if (moveFlag == true) {
        for(let i = 0; i <figureBody.length; i++) {
            figureBody[i].classList.remove('figure');
        }
        figureBody = [
            document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1]-1}"]`),
            document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1]-1}"]`),
            document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1]-1}"]`),
            document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1]-1}"]`)
        ];
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('figure');
        }
    } else {
        for(let i = 0; i <figureBody.length; i++) {
            figureBody[i].classList.remove('figure');
            figureBody[i].classList.add('set');
        }
        checkSuccess();
        create();
        checkEndGame();
        

    }
    function checkSuccess() {
        for (let i = 1; i < 15; i++) {
            let count = 0;
            for (let k = 1; k < 11; k++) {
                if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')) {
                    count++;
                }
            }  
            if (count == 10) {
                score++;
                

                for (let k = 1; k < 11; k++) {
                    document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.remove('set');
                }
                let set = document.querySelectorAll('.set');
                let newSet = [];
                for (let s = 0; s < set.length; s++) {
                    let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
                    if (setCoordinates[1] > i) {
                        set[s].classList.remove('set');
                        newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1]-1}"]`))
                    }
                }
                
                for (let a = 0; a < newSet.length; a++) {
                    newSet[a].classList.add('set');
                }
                i--;
            }
            
        } 
    }

    function checkEndGame() {
        for (let k = 1; k < 11; k++) {
            if (document.querySelector(`[posX = "${k}"][posY = "15"]`).classList.contains('set')) {
                
                if (confirm(`end game. your score = ${score}`) == true) {
                    location.reload();
                }
                
            }
        }
    }
            
    
}


let interval = setInterval(() => {
    move();
}, 500);

let flag = true;

window.addEventListener('keydown', function(e){
    let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
        coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
        coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
        coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];
    function getNewState(a) {

        flag = true;

        let figureNew = [
            document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${coordinates1[1]}"]`),
            document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${coordinates2[1]}"]`),
            document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${coordinates3[1]}"]`),
            document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${coordinates4[1]}"]`)
        ];
        for (let i = 0; i < figureNew.length; i++) {
            if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                flag = false;
            }
        }
        if (flag ==true) {
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }
            figureBody = figureNew;

            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }
        }
    }

    function rotateFigure() {
        
        flag = true;

        let figureNew = [
            document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate+2][0][0]}"][posY = "${+coordinates1[1] + mainArr[currentFigure][rotate+2][0][1]}"]`),
            document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate+2][1][0]}"][posY = "${+coordinates2[1] + mainArr[currentFigure][rotate+2][1][1]}"]`),
            document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate+2][2][0]}"][posY = "${+coordinates3[1] + mainArr[currentFigure][rotate+2][2][1]}"]`),
            document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate+2][3][0]}"][posY = "${+coordinates4[1] + mainArr[currentFigure][rotate+2][3][1]}"]`)
        ];
        for (let i = 0; i < figureNew.length; i++) {
            if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                flag = false;
            }
        }
        if (flag ==true) {
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }
            figureBody = figureNew;

            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }

            if(rotate < 4) {
                rotate++;
            }  else {
                rotate = 1;
            }
        }

    }

    if (e.keyCode == 37) {
        getNewState(-1);
    } else if (e.keyCode == 39) {
        getNewState(1);
    } else if (e.keyCode == 40) {
        e.preventDefault();
        move();
    } else if (e.keyCode == 38) {
        e.preventDefault();
        rotateFigure();
    }
});

