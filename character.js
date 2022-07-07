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

const CurrentLevel = (y_pos) => {
    let y = 0;
    const getBoundTop = (ind) =>
        document.getElementById(ind).getBoundingClientRect().top;
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
    console.log(object.left);
    let x_pos = parseInt(object.left);

    console.log('ladder_4 =', ladder_4);
    console.log('ladder_7 =', ladder_7);
    console.log(object);
    console.log('object.bottom', object.bottom - 7);
    console.log(floor);

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
    let element = document.getElementById('box');
    let top = parseInt(element.getBoundingClientRect().top);
    if (!OnLadder(element.getBoundingClientRect(), CurrentLevel(top))) {
        element.style.position = 'absolute';
        currentX = Math.round(
            ((startingX - element.getBoundingClientRect().left) /
                window.innerWidth) *
                100
        );
        currentX += 1;
        element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    }
}
const moveLeft = () => {
    requestAnimationFrame(placeLeft);
};
// Move Right
function placeRight() {
    let element = document.getElementById('box');
    let top = parseInt(element.getBoundingClientRect().top);
    if (!OnLadder(element.getBoundingClientRect(), CurrentLevel(top))) {
        element.style.position = 'absolute';
        currentX = Math.round(
            ((startingX - element.getBoundingClientRect().left) /
                window.innerWidth) *
                100
        );
        currentX < 0 ? 0 : (currentX -= 1);
        element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    }
}
const moveRight = () => {
    requestAnimationFrame(placeRight);
};

function jump() {
    let element = document.getElementById('box');
    console.log(element.getBoundingClientRect().bottom);
    element.style.transform = `translate(-${currentX}vw, -${currentY + 5}vh)`;
    console.log(element.getBoundingClientRect().bottom);
    function down() {
        element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    }
    const updateDown = () => {
        requestAnimationFrame(down);
    };
    setTimeout(updateDown, 250);
}
const updateJump = () => {
    requestAnimationFrame(jump);
};
function up() {
    let element = document.getElementById('box');
    let top = parseInt(element.getBoundingClientRect().top);
    if (
        OnLadder(element.getBoundingClientRect(), CurrentLevel(top - 10), 0, 10)
    ) {
        element.style.position = 'absolute';
        currentY = Math.round(
            ((startingY - element.getBoundingClientRect().top) /
                window.innerHeight) *
                100
        );
        currentY += 1;
        element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    }
    // console.log('currentX ===', currentX, 'currentY', currentY);
}
const updateUp = () => {
    requestAnimationFrame(up);
};
function down() {
    let element = document.getElementById('box');
    let top = parseInt(element.getBoundingClientRect().top);
    if (OnLadder(element.getBoundingClientRect(), CurrentLevel(top + 10), 10)) {
        element.style.position = 'absolute';
        currentY = Math.round(
            ((startingY - element.getBoundingClientRect().top) /
                window.innerHeight) *
                100
        );
        currentY < 0 ? 0 : (currentY -= 1);
        element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    }
}
const updateDown = () => {
    requestAnimationFrame(down);
};
const keys = {
    jump: {
        pressed: false,
    },
};

let initialPos;

function newBarrel() {
    //Create the div to hold the barrel and the image for the barrel
    const barrel = document.createElement('div');
    const barrelImg = document.createElement('img');
    barrelImg.setAttribute('src', './images/background1.png');
    barrelImg.setAttribute('class', 'barrelImg');
    barrel.append(barrelImg);
    barrel.setAttribute('class', 'barrel');
    const bottomStages = document.querySelector('.bottom-stages');
    const topPlatform = document.getElementById('6');
    //Put the barrel next to donkey kong
    const donkeyKong = document.querySelector('.donkey-kong-class');
    const bounds = donkeyKong.getBoundingClientRect();
    barrel.style.left = `${bounds.right}px`;
    barrel.style.top = `${bounds.bottom - window.innerHeight * 0.0325}px`;
    bottomStages.insertBefore(barrel, topPlatform);
    console.log('object');
    //Get the initial position of each barrel
    initialPos = barrel.getBoundingClientRect();
}

let time;
function moveBarrel() {
    // if (time === undefined) time = new Date.now();
    // if (time - Date.now() > 3000) {
    //     newBarrel();
    //     time = new Date.now();
    // }

    let endReached;
    //Get the barrel as an element
    const currBarrel = document.querySelectorAll('.barrel');
    currBarrel.forEach((indBarrel) => {
        const thisBarrel = indBarrel.getBoundingClientRect();
        const XdistMoved =
            ((thisBarrel.left - initialPos.left) / window.innerWidth) * 100;
        // console.log('X Direction Moved -> ', XdistMoved);

        //Move the barrel to the right
        indBarrel.style.transform = `translate(${XdistMoved + 0.1}vw, ${0}vh)`;
        // console.log('RAF');
    });

    if (endReached !== true) window.requestAnimationFrame(moveBarrel);
    //Move the barrel by 1vh each time
}

export const main = () => {
    addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            console.log('right');
            moveRight();
        }
        if (e.key === 'ArrowLeft') {
            console.log('left');
            moveLeft();
        }
        if (e.key === 'ArrowUp') {
            console.log('up');
            updateUp();
        }
        if (e.key === 'ArrowDown') {
            console.log('down');
            updateDown();
        }
        if (e.key === ' ' && !keys.jump.pressed) {
            console.log('jump');
            updateJump();
            keys.jump.pressed = true;
        }
        console.log(keys.jump.pressed);
    });
    addEventListener('keyup', ({ key }) => {
        if (key === ' ') {
            keys.jump.pressed = false;
        }
        console.log(keys.jump.pressed);
    });
    // setInterval(newBarrel, 2 );
    newBarrel();
    requestAnimationFrame(moveBarrel);
    // requestAnimationFrame(newBarrel);
};
