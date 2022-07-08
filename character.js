let startingX = document.querySelector('#box').getBoundingClientRect().left;
let startingY = document.querySelector('#box').getBoundingClientRect().top;
let currentX = 0;
let currentY = 0;

let ladder_1 = document.getElementById('ladder_1').getBoundingClientRect();
let ladder_2 = document.getElementById('ladder_2').getBoundingClientRect();
let ladder_3 = document.getElementById('ladder_3').getBoundingClientRect();
let ladder_4 = document.getElementById('ladder_4').getBoundingClientRect();
let ladder_5 = document.getElementById('ladder_5').getBoundingClientRect();
let ladder_6 = document.getElementById('ladder_6').getBoundingClientRect();
let ladder_7 = document.getElementById('ladder_7').getBoundingClientRect();

let element = document.getElementById('box');

const gameScreen = document.querySelector('.gameScreen');
const keys = {
    jump: {
        pressed: false,
        switch: false,
        spam: false,
    },
    right: {
        pressed: false,
    },
    left: {
        pressed: false,
    },
    up: {
        pressed: false,
    },
    down: {
        pressed: false,
    },
};
let jumpSpam = false;

const getBoundTop = (ind) => document.getElementById(ind).getBoundingClientRect().top;
let y = 0;
const CurrentLevel = (y_pos) => {

    //If cline y is between 0 top and 1 top y = 0
    if (y_pos < getBoundTop(0) && y_pos > getBoundTop(1)) y = 0;
    if (y_pos < getBoundTop(1) && y_pos > getBoundTop(2)) y = 1;
    if (y_pos < getBoundTop(2) && y_pos > getBoundTop(3)) y = 2;
    if (y_pos < getBoundTop(3) && y_pos > getBoundTop(4)) y = 3;
    if (y_pos < getBoundTop(4) && y_pos > getBoundTop(5)) y = 4;
    if (y_pos < getBoundTop(5) && y_pos > getBoundTop(6)) y = 5;
    if (y_pos < getBoundTop(6)) y = 6;
    return y;
};

const OnLadder = (object, floor, offset = 0, upOffset = 0) => {
    let x_pos = parseInt(object.left);
    if (floor === 0) {
        if (
            x_pos < ladder_1.left &&
            x_pos > ladder_1.left - ladder_1.width &&
            ladder_1.y < object.bottom
        ) {
            if (floor === 0) {
                if (
                    x_pos < ladder_1.left &&
                    x_pos > ladder_1.left - ladder_1.width &&
                    ladder_1.bottom < object.bottom - upOffset
                ) {
                    return false;
                }
            }
            return true;
        }
    }
    if (floor === 1 || floor === 2) {
        if (
            (x_pos < ladder_2.left && x_pos > ladder_2.left - ladder_2.width) ||
            (x_pos < ladder_3.left && x_pos > ladder_3.left - ladder_3.width) ||
            (x_pos < ladder_1.left && x_pos > ladder_1.left - ladder_1.width) ||
            (x_pos < ladder_4.left && x_pos > ladder_4.left - ladder_4.width)
        ) {
            if (floor === 1) {
                if (
                    x_pos < ladder_1.left &&
                    x_pos > ladder_1.left - ladder_1.width &&
                    ladder_1.y + (3 - offset) > object.bottom
                ) {
                    return false;
                }
            }
            if (
                x_pos < ladder_2.left &&
                x_pos > ladder_2.left - ladder_2.width &&
                ladder_2.y - offset > object.bottom
            ) {
                return false;
            }
            if (
                x_pos < ladder_3.left &&
                x_pos > ladder_3.left - ladder_3.width &&
                ladder_3.y - offset > object.bottom
            ) {
                return false;
            }
            if (floor === 1) {
                if (
                    x_pos < ladder_3.left &&
                    x_pos > ladder_3.left - ladder_3.width &&
                    ladder_3.bottom < object.bottom - upOffset
                ) {
                    return false;
                }
                if (
                    x_pos < ladder_2.left &&
                    x_pos > ladder_2.left - ladder_2.width &&
                    ladder_2.bottom < object.bottom - upOffset
                ) {
                    return false;
                }
            }
            if (floor === 2) {
                if (
                    x_pos < ladder_4.left &&
                    x_pos > ladder_4.left - ladder_4.width &&
                    ladder_4.bottom < object.bottom - upOffset
                ) {
                    return false;
                }
            }
            return true;
        }
    }
    if (floor === 2 || floor === 3) {
        if (
            (x_pos < ladder_4.left && x_pos > ladder_4.left - ladder_4.width) ||
            (x_pos < ladder_5.left && x_pos > ladder_5.left - ladder_5.width)
        ) {
            if (
                x_pos < ladder_4.left &&
                x_pos > ladder_4.left - ladder_4.width &&
                ladder_4.y - offset > object.bottom
            ) {
                return false;
            }
            if (floor === 3) {
                if (
                    x_pos < ladder_5.left &&
                    x_pos > ladder_5.left - ladder_5.width &&
                    ladder_5.bottom < object.bottom - upOffset
                ) {
                    return false;
                }
            }
            if (floor === 2) {
                if (
                    x_pos < ladder_4.left &&
                    x_pos > ladder_4.left - ladder_4.width
                ) {
                    return false;
                }
            }
            if (floor === 2) {
                if (
                    x_pos < ladder_5.left &&
                    x_pos > ladder_5.left - ladder_5.width
                ) {
                    return false;
                }
            }
            return true;
        }
    }
    if (floor === 3 || floor === 4) {
        if (
            (x_pos < ladder_5.left && x_pos > ladder_5.left - ladder_5.width) ||
            (x_pos < ladder_6.left && x_pos > ladder_6.left - ladder_6.width)
        ) {
            if (
                x_pos < ladder_5.left &&
                x_pos > ladder_5.left - ladder_5.width &&
                ladder_5.y - offset > object.bottom
            ) {
                return false;
            }
            if (floor === 4) {
                if (
                    x_pos < ladder_6.left &&
                    x_pos > ladder_6.left - ladder_6.width &&
                    ladder_6.bottom < object.bottom - upOffset
                ) {
                    return false;
                }
            }
            return true;
        }
    }
    if (floor === 4 || floor === 5) {
        if (
            (x_pos < ladder_6.left && x_pos > ladder_6.left - ladder_6.width) ||
            (x_pos < ladder_7.left && x_pos > ladder_7.left - ladder_7.width)
        ) {
            if (
                x_pos < ladder_6.left &&
                x_pos > ladder_6.left - ladder_6.width &&
                ladder_6.y + (3 - offset) > object.bottom - 2
            ) {
                return false;
            }
            if (floor === 5) {
                if (
                    x_pos < ladder_7.left &&
                    x_pos > ladder_7.left - ladder_7.width &&
                    ladder_7.bottom < object.bottom - upOffset
                ) {
                    return false;
                }
            }
            if (floor === 4) {
                if (
                    x_pos < ladder_7.left &&
                    x_pos > ladder_7.left - ladder_7.width
                ) {
                    return false;
                }
            }
            return true;
        }
    }
    if (floor === 5 || floor === 6) {
        if (x_pos < ladder_7.left && x_pos > ladder_7.left - ladder_7.width) {
            if (
                x_pos < ladder_7.left &&
                x_pos > ladder_7.left - ladder_7.width &&
                ladder_7.y + -offset > object.bottom - 3
            ) {
                return false;
            }
            return true;
        }
    }
};
//Move Left
function placeLeft() {
    let top = parseInt(element.getBoundingClientRect().top);
    if (!OnLadder(element.getBoundingClientRect(), CurrentLevel(top))) {
        element.style.position = 'absolute';
        currentX =
            ((startingX - element.getBoundingClientRect().left) /
                window.innerWidth) *
            100;
        currentX += 0.5;
        element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    }
}
// const moveLeft = () => {
//     requestAnimationFrame(placeLeft);
// };
// Move Right
function placeRight() {
    let top = parseInt(element.getBoundingClientRect().top);
    if (!OnLadder(element.getBoundingClientRect(), CurrentLevel(top))) {
        element.style.position = 'absolute';
        currentX =
            ((startingX - element.getBoundingClientRect().left) /
                window.innerWidth) *
            100;
        currentX < 0 ? 0 : (currentX -= 0.5);
        element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    }
}
// const moveRight = () => {
//     requestAnimationFrame(placeRight);
// };

function jump() {
    let top = parseInt(element.getBoundingClientRect().top);
    if (!OnLadder(element.getBoundingClientRect(), CurrentLevel(top))) {
        element.style.transform = `translate(-${currentX}vw, -${
            currentY + 5
        }vh)`;
        keys.jump.spam = true;
        function down() {
            element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
        }
        // const updateDown = () => {
        //     requestAnimationFrame(down);
        // };
        setTimeout(down, 250);
        setTimeout(() => {
            keys.jump.spam = false;
        }, 500);
    }
}
// const updateJump = () => {
//     requestAnimationFrame(jump);
// };
function up() {
    let top = parseInt(element.getBoundingClientRect().top);
    if (
        OnLadder(element.getBoundingClientRect(), CurrentLevel(top - 10), 0, 10)
    ) {
        element.style.position = 'absolute';
        currentY =
            ((startingY - element.getBoundingClientRect().top) /
                window.innerHeight) *
            100;
        currentY += 0.5;
        element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    }
}
// const updateUp = () => {
//     requestAnimationFrame(up);
// };

function down() {
    let top = parseInt(element.getBoundingClientRect().top);
    if (OnLadder(element.getBoundingClientRect(), CurrentLevel(top + 10), 10)) {
        element.style.position = 'absolute';
        currentY =
            ((startingY - element.getBoundingClientRect().top) /
                window.innerHeight) *
            100;
        currentY < 0 ? 0 : (currentY -= 0.5);
        element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    }
}
// const updateDown = () => {
//     requestAnimationFrame(down);
// };

let initialPos;


let dBetweenStages = getBoundTop(0) - getBoundTop(1)
const donkeyKong = document.querySelector('.donkey-kong-class');
const bounds = donkeyKong.getBoundingClientRect();
function newBarrel() {
    //Create the div to hold the barrel and the image for the barrel
    const barrel = document.createElement('div');
    //Create an img elem to go inside
    const barrelImg = document.createElement('img');
    barrelImg.setAttribute('src', './images/background1.png');
    barrelImg.setAttribute('class', 'barrelImg');
    barrel.append(barrelImg);
    barrel.setAttribute('class', 'barrel');
    //Get the HTMLelement of the top stage crane
    const bottomStages = document.querySelector('.bottom-stages');
    const topPlatform = document.getElementById('6');
    //Put the barrel next to donkey kong
    
    barrel.style.left = `${bounds.right- (bounds.right-bounds.left)}px`;
    barrel.style.top = `${(bounds.bottom) - window.innerHeight * 0.0325}px`;
    bottomStages.insertBefore(barrel, topPlatform);
    //Get the initial position of each barrel
    initialPos = barrel.getBoundingClientRect();
}

//Get the distance between two stages in pixels
function barrelDrop(divCenter, divTop) {
    // console.log('Checking');
    //1) Get each barrel with the barrel class
    const blackDivs = document.querySelectorAll('.black');
    //2) Go through the list of each black div
    let result = false
    blackDivs.forEach((div) => {
        //3) If the barrel is on the same level as the div check if the center of the barrel is past the centre of the div if so drop down to next level
        //Calculate the centre point of the current black div
        let blackDivCenter = (div.getBoundingClientRect().right + div.getBoundingClientRect().left) / 2
        // console.log('BlackDivCenter', blackDivCenter);
        // console.log(
        //     'blackdiv curr level = ',
        //     CurrentLevel(div.top),
        //     'barrel curr level',
        //     CurrentLevel(divTop)
        // );
        // console.log('div CurrentLEvel', CurrentLevel(div.getBoundingClientRect().bottom));
        // console.log(
        //     'BLACK DIV LEFT RIGHT TOP BOTTOM',
        //     div.getBoundingClientRect().left,
        //     div.getBoundingClientRect().right,
        //     div.getBoundingClientRect().top,
        //     div.getBoundingClientRect().bottom
        // );
        // console.log('Test', CurrentLevel(div.getBoundingClientRect().bottom));
        if (CurrentLevel(div.getBoundingClientRect().bottom) === CurrentLevel(divTop)-1 && blackDivCenter < divCenter) {
            result = true
        }
    });
    return result
}

let newB = 0
function moveBarrel() {
    
    // newB++
    // if (newB === 500) {
    //     newBarrel()
    //     newB = 0
    // }
    //Get the barrel as an element
    const currBarrel = document.querySelectorAll('.barrel');
    
    currBarrel.forEach((indBarrel) => {
        const thisBarrel = indBarrel.getBoundingClientRect();
        // console.log(CurrentLevel(thisBarrel.top));
        console.log('Barrels current level =====', CurrentLevel(thisBarrel.top));
        
        const XdistMoved =
            ((thisBarrel.left - initialPos.left) / window.innerWidth) * 100;
        const tbCenter = (thisBarrel.right + thisBarrel.left) /2
        //Move the barrel
        // console.log('tbCenter', tbCenter, 'Barrel Top', thisBarrel.top);
        // let run = barrelDrop(tbCenter, thisBarrel.top);
        barrelDrop(tbCenter, thisBarrel.top);
        if (barrelDrop(tbCenter, thisBarrel.top)) {
            // console.log('DROP HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1')
            let yMove = dBetweenStages / window.innerHeight * 100;
            indBarrel.style.transform = `translate(${XdistMoved}vw, ${yMove}vh)`;
        } else if (
                CurrentLevel(thisBarrel.top) === 6 ||
                CurrentLevel(thisBarrel.top) === 4 ||
                CurrentLevel(thisBarrel.top) === 2 ||
                CurrentLevel(thisBarrel.top) === 0
            ) {
                // console.log('BLACKDIV ====', barrelDrop(tbCenter, thisBarrel.top));
                // console.log('BarrelLevel', CurrentLevel(thisBarrel.top));
                let yMove;

                switch (CurrentLevel(thisBarrel.top)) {
                    case 6:
                        yMove = 0;
                        break;
                    case 4:
                        yMove = -dBetweenStages * 2;
                        break;
                    case 2:
                        yMove = -dBetweenStages * 4;
                        break;
                    case 0:
                        yMove = -dBetweenStages * 6;
                        break;
                }
                // console.log('YMOVE=====', yMove);

                indBarrel.style.transform = `translate(${XdistMoved + 0.1
                    }vw, ${yMove}vh)`;
            }else if (
                CurrentLevel(thisBarrel.top) === 5 ||
                CurrentLevel(thisBarrel.top) === 3 ||
                CurrentLevel(thisBarrel.top) === 1
            ) {
                let yMove
                console.log('current Level=====================================================', CurrentLevel(thisBarrel.top));
                switch (CurrentLevel(thisBarrel.top)) {
                    case 5:
                        yMove = -dBetweenStages;
                        console.log('Case 5!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                        break;
                    case 3:
                        yMove = -(dBetweenStages * 3);
                        break;
                    case 1:
                        yMove = -(dBetweenStages * 5);
                        break;
                }
                console.log('Ymove====================================', yMove);
                indBarrel.style.transform = `translate(${XdistMoved - 0.1
                    }vw, ${yMove}vh)`;
            }
            
    });

   
}
// console.log(rightBound);
const gameLoop = () => {
    const leftBound =
        element.getBoundingClientRect().left -
        gameScreen.getBoundingClientRect().left;
    const rightBound =
        gameScreen.getBoundingClientRect().right -
        element.getBoundingClientRect().right;
    if (keys.right.pressed && rightBound > 0.5 && !keys.left.pressed) {
        placeRight();
    }
    if (keys.left.pressed && leftBound > 0.5 && !keys.right.pressed) {
        placeLeft();
    }
    if (keys.up.pressed) {
        up();
    }
    if (keys.down.pressed) {
        down();
    }
    if (keys.jump.pressed && !keys.jump.switch && !keys.jump.spam) {
        jump();
        keys.jump.switch = true;
    }
    moveBarrel();
    requestAnimationFrame(gameLoop);
};
export const main = () => {
    addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            keys.right.pressed = true;
        }
        if (e.key === 'ArrowLeft') {
            keys.left.pressed = true;
        }
        if (e.key === 'ArrowUp') {
            keys.up.pressed = true;
        }
        if (e.key === 'ArrowDown') {
            keys.down.pressed = true;
        }
        if (e.key === ' ') {
            keys.jump.pressed = true;
        }
    });
    addEventListener('keyup', ({ key }) => {
        if (key === ' ') {
            keys.jump.pressed = false;
            keys.jump.switch = false;
        }
        if (key === 'ArrowRight') {
            keys.right.pressed = false;
        }
        if (key === 'ArrowLeft') {
            keys.left.pressed = false;
        }
        if (key === 'ArrowUp') {
            keys.up.pressed = false;
        }
        if (key === 'ArrowDown') {
            keys.down.pressed = false;
        }
    });
    newBarrel();
    gameLoop();
};