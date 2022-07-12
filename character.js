const startingX = document.querySelector('#box').getBoundingClientRect().left;
const startingY = document.querySelector('#box').getBoundingClientRect().top;
let currentX = 0;
let currentY = 0;

let ladder_1 = document.getElementById('ladder_1').getBoundingClientRect();
let ladder_2 = document.getElementById('ladder_2').getBoundingClientRect();
let ladder_3 = document.getElementById('ladder_3').getBoundingClientRect();
let ladder_4 = document.getElementById('ladder_4').getBoundingClientRect();
let ladder_5 = document.getElementById('ladder_5').getBoundingClientRect();
let ladder_6 = document.getElementById('ladder_6').getBoundingClientRect();
let ladder_7 = document.getElementById('ladder_7').getBoundingClientRect();
// let ArrayOfStage = Array.from(document.querySelectorAll('.stage'));
// console.log(ArrayOfStage[7].getBoundingClientRect().top);
let element = document.getElementById('box');
element.style.position = 'absolute';
let timerId = document.getElementById('timer-Id');
const gameScreen = document.querySelector('.gameScreen');
let top = parseInt(element.getBoundingClientRect().top);

let leftBound;
let rightBound;

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
    paused: {
        pressed: false,
    },
    start: {
        pressed: false,
    },
};
let paused = false;
let death = false

const getBoundTop = (ind) =>
    document.getElementById(ind).getBoundingClientRect().top;
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
    // top = parseInt(element.getBoundingClientRect().top);
    if (!OnLadder(element.getBoundingClientRect(), CurrentLevel(top))) {
        currentX =
            ((startingX - element.getBoundingClientRect().left) /
                window.innerWidth) *
            100;
        currentX += 0.16;
        element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    }
}

// Move Right
function placeRight() {
    // top = parseInt(element.getBoundingClientRect().top);
    if (!OnLadder(element.getBoundingClientRect(), CurrentLevel(top))) {
        // element.style.position = 'absolute';
        currentX =
            ((startingX - element.getBoundingClientRect().left) /
                window.innerWidth) *
            100;
        currentX < 0 ? 0 : (currentX -= 0.16);
        element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    }
}

function jump(direction = 0) {
    top = parseInt(element.getBoundingClientRect().top);
    if (!OnLadder(element.getBoundingClientRect(), CurrentLevel(top))) {
        if (rightBound > 0.5 && leftBound > 0.5) {
            currentX = currentX + direction;
        }
        element.style.transform = `translate(-${currentX}vw, -${
            currentY + 8
        }vh)`;
        keys.jump.spam = true;
        function down() {
            currentX = currentX + direction;
            element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
        }
        setTimeout(down, 350);
        setTimeout(() => {
            keys.jump.spam = false;
        }, 500);
    }
}

function up() {
    top = parseInt(element.getBoundingClientRect().top);
    if (
        OnLadder(element.getBoundingClientRect(), CurrentLevel(top - 10), 0, 10)
    ) {
        currentY =
            ((startingY - element.getBoundingClientRect().top) /
                window.innerHeight) *
            100;
        currentY += 0.25;
        element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    }
}

function down() {
    top = parseInt(element.getBoundingClientRect().top);
    if (OnLadder(element.getBoundingClientRect(), CurrentLevel(top + 10), 10)) {
        currentY =
            ((startingY - element.getBoundingClientRect().top) /
                window.innerHeight) *
            100;
        currentY < 0 ? 0 : (currentY -= 0.5);
        element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    }
}
let initialPos;
const topPlatform = document.getElementById('6');
const bottomStages = document.querySelector('.bottom-stages');
let dBetweenStages = getBoundTop(0) - getBoundTop(1);
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
    barrel.setAttribute('data-passed', 'false');
    barrel.setAttribute('class', 'barrel');
    //Get the HTMLelement of the top stage crane

    //Put the barrel next to donkey kong

    barrel.style.left = `${bounds.right - (bounds.right - bounds.left)}px`;
    barrel.style.top = `${bounds.bottom - window.innerHeight * 0.0325}px`;
    bottomStages.insertBefore(barrel, topPlatform);
    //Get the initial position of each barrel
    initialPos = barrel.getBoundingClientRect();
}


function barrelPass(barrel, indBarrel) {
    const charBounds = element.getBoundingClientRect();
    const passed = indBarrel.getAttribute('data-passed');
    function pointChecker() {
        if (passed === 'true') {
            indBarrel.setAttribute('data-passed', 'scored');
            return "score";
        } else if (passed === 'false') {
            indBarrel.setAttribute('data-passed', 'true');
        }
    }
    //Check if the bounds of the barrel overlap with the bouns of the character(If they do return "dead")
    //Check if the left and right of the barrel are inside the characters div => if they are check the bottom of the character is less than the top of the barrel

    if (barrel.x < charBounds.x + charBounds.width &&
        barrel.x + barrel.width > charBounds.x &&
        barrel.y < charBounds.y + charBounds.height &&
        barrel.y + barrel.height > charBounds.y
    ) {
        return "collision"
        }

    // console.log(indBarrel.getAttribute("data-passed"));
    if (
        CurrentLevel(barrel.top) ===
        CurrentLevel(charBounds.bottom - (3.5 / 100) * window.innerHeight)
    ) {
        //Check if the left of the barrel is passed the right of the barrel && data-passed === "true" (if so return "score" and set data-passed back to false)
        if ([6, 4, 2, 0].includes(CurrentLevel(barrel.top))) {
            if (
                charBounds.right < barrel.left &&
                !OnLadder(charBounds, CurrentLevel(charBounds.top))
            ) {
                return pointChecker();
            } else if (
                charBounds.right < barrel.left &&
                OnLadder(charBounds, CurrentLevel(charBounds.top))
            ) {
                indBarrel.setAttribute('data-passed', 'onLadder');
            }
        }
        if ([5, 3, 1].includes(CurrentLevel(barrel.top))) {
            if (
                charBounds.left > barrel.right &&
                !OnLadder(charBounds, CurrentLevel(charBounds.top))
            ) {
                return pointChecker();
            } else if (
                charBounds.right < barrel.left &&
                OnLadder(charBounds, CurrentLevel(charBounds.top))
            ) {
                indBarrel.setAttribute('data-passed', 'onLadder');
            }
        }
    }
    if (
        CurrentLevel(barrel.top) !==
        CurrentLevel(charBounds.bottom - (3.5 / 100) * window.innerHeight)
    ) {
        if (passed === 'onLadder')
            indBarrel.setAttribute('data-passed', 'false');
    }
}

function barrelDrop(divCenter, divTop) {
    //1) Get each barrel with the barrel class
    const blackDivs = document.querySelectorAll('.black');
    //2) Go through the list of each black div
    let result = false;
    blackDivs.forEach((div) => {
        //3) If the barrel is on the same level as the div check if the center of the barrel is past the centre of the div if so drop down to next level
        //Calculate the centre point of the current black div
        let blackDivCenter =
            (div.getBoundingClientRect().right +
                div.getBoundingClientRect().left) /
            2;
        let currentLevel = CurrentLevel(divTop);
        if (
            CurrentLevel(div.getBoundingClientRect().bottom) ===
            currentLevel - 1
        ) {
            if (
                currentLevel === 6 ||
                currentLevel === 4 ||
                currentLevel === 2 ||
                currentLevel === 0
            ) {
                if (blackDivCenter < divCenter) result = true;
            }
            if (
                currentLevel === 5 ||
                currentLevel === 3 ||
                currentLevel === 1
            ) {
                if (blackDivCenter > divCenter) result = true;
            }
        }
    });
    return result;
}
let pausedMenu = document.getElementsByClassName('pausedMenu')[0];
function togglePauseMenu() {
    paused = !paused;
    if (paused) {
        pausedMenu.style.display = 'block';
    } else {
        pausedMenu.style.display = 'none';
    }
}

let newB = 0;
function moveBarrel() {
    
        newB++;
        if (newB === 500) {
            newBarrel();
            newB = 0;
        }
        //Get the barrel as an element
        const currBarrel = document.querySelectorAll('.barrel');

        currBarrel.forEach((indBarrel) => {
            const thisBarrel = indBarrel.getBoundingClientRect();
            let currentLevelt = CurrentLevel(thisBarrel.top);
            const XdistMoved =
                ((thisBarrel.left - initialPos.left) / window.innerWidth) * 100;
            const tbCenter = (thisBarrel.right + thisBarrel.left) / 2;
            //If the barrel is at the end remove it
            if (thisBarrel.left > startingX && thisBarrel.bottom > startingY) {
                indBarrel.remove();
            }
            console.log(barrelPass(thisBarrel, indBarrel));
            if (barrelPass(thisBarrel, indBarrel) === 'score') {
                document.querySelector('#score-Id').innerHTML =
                    +document.querySelector('#score-Id').innerHTML + 100;
            } else if (barrelPass(thisBarrel, indBarrel) === "collision") {
                death = true
            }
    
            if (barrelDrop(tbCenter, thisBarrel.top)) {
                let yMove = (dBetweenStages / window.innerHeight) * 100;
                switch (currentLevelt) {
                    case 5:
                        yMove *= 2;
                        break;
                    case 4:
                        yMove *= 3;
                        break;
                    case 3:
                        yMove *= 4;
                        break;
                    case 2:
                        yMove *= 5;
                        break;
                    case 1:
                        yMove *= 6;
                        break;
                }
                indBarrel.style.transform = `translate(${XdistMoved}vw, ${yMove}vh)`;
            } else if (
                currentLevelt === 6 ||
                currentLevelt === 4 ||
                currentLevelt === 2 ||
                currentLevelt === 0
            ) {
                let yMove;
                switch (currentLevelt) {
                    case 6:
                        yMove = 0;
                        break;
                    case 4:
                        yMove =
                            ((dBetweenStages * 2) / window.innerHeight) * 100;
                        break;
                    case 2:
                        yMove =
                            ((dBetweenStages * 4) / window.innerHeight) * 100;
                        break;
                    case 0:
                        yMove =
                            ((dBetweenStages * 6) / window.innerHeight) * 100;
                        break;
                }
                indBarrel.style.transform = `translate(${XdistMoved + 0.2
                    }vw, ${yMove}vh)`;
            } else if (
                currentLevelt === 5 ||
                currentLevelt === 3 ||
                currentLevelt === 1
            ) {
                let yMove;
                switch (currentLevelt) {
                    case 5:
                        yMove = (dBetweenStages / window.innerHeight) * 100;

                        break;
                    case 3:
                        yMove =
                            ((dBetweenStages * 3) / window.innerHeight) * 100;
                        break;
                    case 1:
                        yMove =
                            ((dBetweenStages * 5) / window.innerHeight) * 100;
                        break;
                }
                indBarrel.style.transform = `translate(${XdistMoved - 0.2
                    }vw, ${yMove}vh)`;
            }
        });
    
}
// const characterDrop = () => {
//     // currBarrel.forEach((indBarrel) => {
//     const thisBarrel = element.getBoundingClientRect();
//     let currentLevelt = CurrentLevel(thisBarrel.top);
//     // const XdistMoved =
//     //     ((thisBarrel.left - initialPos.left) / window.innerWidth) * 100;
//     const tbCenter = (thisBarrel.right + thisBarrel.left) / 2;
//     if (barrelDrop(tbCenter, thisBarrel.top)) {
//         console.log('hello', element.style.transform);
//     }
// };
function msToTime(duration) {
    let milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;
    return minutes + ':' + seconds + ':' + milliseconds;
}
// console.log(rightBound);
const gameLoop = (time) => {
    if (!paused && !death) {
        leftBound =
            element.getBoundingClientRect().left -
            gameScreen.getBoundingClientRect().left;
        rightBound =
            gameScreen.getBoundingClientRect().right -
            element.getBoundingClientRect().right;
        if (
            keys.jump.pressed &&
            !keys.jump.switch &&
            !keys.jump.spam &&
            (keys.right.pressed || keys.left.pressed)
        ) {
            if (keys.left.pressed && leftBound > 63) {
                jump(2, time);
            } else if (keys.right.pressed && rightBound > 6) {
                jump(-2, time);
            }
            keys.jump.switch = true;
        }
        if (
            keys.right.pressed &&
            rightBound > 0.5 &&
            !keys.left.pressed &&
            !keys.jump.spam
        ) {
            placeRight();
        }
        if (
            keys.left.pressed &&
            leftBound > 0.5 &&
            !keys.right.pressed &&
            !keys.jump.spam
        ) {
            placeLeft();
        }
        if (keys.up.pressed) {
            up();
        }
        if (keys.down.pressed) {
            down();
        }
        if (keys.jump.pressed && !keys.jump.switch && !keys.jump.spam) {
            jump(0, time);
            keys.jump.switch = true;
        }
        // characterDrop();
        moveBarrel();

        // console.log(MinutesAndSeconds(gameFrame));
        timerId.innerText = msToTime(time);
    }
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
        if (e.key === 'p') {
            togglePauseMenu();
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
        if (key === 'p') {
            keys.paused.pressed = false;
        }
    });
    newBarrel();
    gameLoop();
};
