const startingX = document.querySelector('#box').getBoundingClientRect().left;
const startingY = document.querySelector('#box').getBoundingClientRect().top;
let currentX = 0;
let currentY = 0;
let livesText = document.getElementById('lives-Id'),
    lives = 3;
livesText.innerText = lives;
let globalTime = 0;
let charDied = 0;
let paused = true;
let death = false;
let ladder_1 = document.getElementById('ladder_1').getBoundingClientRect();
let ladder_2 = document.getElementById('ladder_2').getBoundingClientRect();
let ladder_3 = document.getElementById('ladder_3').getBoundingClientRect();
let ladder_4 = document.getElementById('ladder_4').getBoundingClientRect();
let ladder_5 = document.getElementById('ladder_5').getBoundingClientRect();
let ladder_6 = document.getElementById('ladder_6').getBoundingClientRect();
let ladder_7 = document.getElementById('ladder_7').getBoundingClientRect();
let upperLadder = document.querySelectorAll('.upperstage .ladder');
let upperLadder1 = upperLadder[0].getBoundingClientRect(),
    upperLadder2 = upperLadder[1].getBoundingClientRect();
let winScreenDisplay = document.getElementsByClassName('Win_Screen')[0];
let element = document.getElementById('box');
element.style.position = 'absolute';
let timerId = document.getElementById('timer-Id');
let barrelTimer = 0;
const gameScreen = document.querySelector('.gameScreen');
let top = parseInt(element.getBoundingClientRect().top);
let leftBound;
let rightBound;
let frame = 0;
let youWin = false;

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
    restart: {
        pressed: false,
    },
    continue: {
        pressed: false,
    },
};

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
    if (y_pos < getBoundTop(6) && y_pos > getBoundTop(7)) y = 6;
    if (y_pos < getBoundTop(7)) y = 7;
    return y;
};

const OnLadder = (object, floor, offset = 0, upOffset = 0) => {
    if (floor === 0) {
        if (
            object.left < ladder_1.left &&
            object.left > ladder_1.left - ladder_1.width &&
            ladder_1.y < object.bottom
        ) {
            if (floor === 0) {
                if (
                    object.left < ladder_1.left &&
                    object.left > ladder_1.left - ladder_1.width &&
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
            (object.left < ladder_2.left &&
                object.left > ladder_2.left - ladder_2.width) ||
            (object.left < ladder_3.left &&
                object.left > ladder_3.left - ladder_3.width) ||
            (object.left < ladder_1.left &&
                object.left > ladder_1.left - ladder_1.width) ||
            (object.left < ladder_4.left &&
                object.left > ladder_4.left - ladder_4.width)
        ) {
            if (floor === 1) {
                if (
                    object.left < ladder_1.left &&
                    object.left > ladder_1.left - ladder_1.width &&
                    ladder_1.y + (3 - offset) > object.bottom
                ) {
                    return false;
                }
            }
            if (
                object.left < ladder_2.left &&
                object.left > ladder_2.left - ladder_2.width &&
                ladder_2.y - offset > object.bottom
            ) {
                return false;
            }
            if (
                object.left < ladder_3.left &&
                object.left > ladder_3.left - ladder_3.width &&
                ladder_3.y - offset > object.bottom
            ) {
                return false;
            }
            if (floor === 1) {
                if (
                    object.left < ladder_3.left &&
                    object.left > ladder_3.left - ladder_3.width &&
                    ladder_3.bottom < object.bottom - upOffset
                ) {
                    return false;
                }
                if (
                    object.left < ladder_2.left &&
                    object.left > ladder_2.left - ladder_2.width &&
                    ladder_2.bottom < object.bottom - upOffset
                ) {
                    return false;
                }
            }
            if (floor === 2) {
                if (
                    object.left < ladder_4.left &&
                    object.left > ladder_4.left - ladder_4.width &&
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
            (object.left < ladder_4.left &&
                object.left > ladder_4.left - ladder_4.width) ||
            (object.left < ladder_5.left &&
                object.left > ladder_5.left - ladder_5.width)
        ) {
            if (
                object.left < ladder_4.left &&
                object.left > ladder_4.left - ladder_4.width &&
                ladder_4.y - offset > object.bottom
            ) {
                return false;
            }
            if (floor === 3) {
                if (
                    object.left < ladder_5.left &&
                    object.left > ladder_5.left - ladder_5.width &&
                    ladder_5.bottom < object.bottom - upOffset
                ) {
                    return false;
                }
            }
            if (floor === 2) {
                if (
                    object.left < ladder_4.left &&
                    object.left > ladder_4.left - ladder_4.width
                ) {
                    return false;
                }
            }
            if (floor === 2) {
                if (
                    object.left < ladder_5.left &&
                    object.left > ladder_5.left - ladder_5.width
                ) {
                    return false;
                }
            }
            return true;
        }
    }
    if (floor === 3 || floor === 4) {
        if (
            (object.left < ladder_5.left &&
                object.left > ladder_5.left - ladder_5.width) ||
            (object.left < ladder_6.left &&
                object.left > ladder_6.left - ladder_6.width)
        ) {
            if (
                object.left < ladder_5.left &&
                object.left > ladder_5.left - ladder_5.width &&
                ladder_5.y - offset > object.bottom
            ) {
                return false;
            }
            if (floor === 4) {
                if (
                    object.left < ladder_6.left &&
                    object.left > ladder_6.left - ladder_6.width &&
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
            (object.left < ladder_6.left &&
                object.left > ladder_6.left - ladder_6.width) ||
            (object.left < ladder_7.left &&
                object.left > ladder_7.left - ladder_7.width)
        ) {
            if (
                object.left < ladder_6.left &&
                object.left > ladder_6.left - ladder_6.width &&
                ladder_6.y + (3 - offset) > object.bottom - 2
            ) {
                return false;
            }
            if (floor === 5) {
                if (
                    object.left < ladder_7.left &&
                    object.left > ladder_7.left - ladder_7.width &&
                    ladder_7.bottom < object.bottom - upOffset
                ) {
                    return false;
                }
            }
            if (floor === 4) {
                if (
                    object.left < ladder_7.left &&
                    object.left > ladder_7.left - ladder_7.width
                ) {
                    return false;
                }
            }
            return true;
        }
    }
    if (floor === 5 || floor === 6) {
        if (
            (object.left < ladder_7.left &&
                object.left > ladder_7.left - ladder_7.width) ||
            (object.left < upperLadder[0].left &&
                object.left > upperLadder[0].left - upperLadder[0].width)
        ) {
            if (
                object.left < ladder_7.left &&
                object.left > ladder_7.left - ladder_7.width &&
                ladder_7.y + -offset > object.bottom - 3
            ) {
                return false;
            }

            return true;
        }
    }

    if (floor === 6 || floor === 7) {
        if (
            (object.left < upperLadder1.left - 9 &&
                object.left > upperLadder1.left - upperLadder1.width &&
                upperLadder1.y < object.bottom) ||
            (object.left < upperLadder2.left - 9 &&
                object.left > upperLadder2.left - upperLadder2.width &&
                upperLadder2.y < object.bottom)
        ) {
            if (floor === 6) {
                if (
                    (object.left < upperLadder1.left - 9 &&
                        object.left > upperLadder1.left - upperLadder1.width &&
                        upperLadder1.bottom < object.bottom - upOffset - 3) ||
                    (object.left < upperLadder2.left - 9 &&
                        object.left > upperLadder2.left - upperLadder2.width &&
                        upperLadder2.bottom < object.bottom - upOffset - 3)
                ) {
                    return false;
                }
            }
            return true;
        }
    }
    if (floor === 7) {
        if (
            (object.left < upperLadder1.left - 9 &&
                object.left > upperLadder1.left - upperLadder1.width &&
                upperLadder1.y < object.bottom + offset) ||
            (object.left < upperLadder2.left - 9 &&
                object.left > upperLadder2.left - upperLadder2.width &&
                upperLadder2.y < object.bottom + offset)
        ) {
            return true;
        }
    }
    if (floor === 7) {
    }
};

function checkWin() {
    if (CurrentLevel(element.getBoundingClientRect().top) === 7) {
        paused = true;
        document.getElementById('timer-Id-W').innerText = timerId.innerText;
        document.getElementById('score-Id-W').innerText =
            +document.querySelector('#score-Id').innerHTML + 1000;
        winScreenDisplay.style.display = 'block';
        //  document.querySelector('#score-Id').innerHTML =
        //     +document.querySelector('#score-Id').innerHTML + 1000;
        window.addEventListener('keydown', (e) => {
            if (e.key === 's') {
                currentX = 0.16;
                currentY = 0;
                const currBarrel = document.querySelectorAll('.barrel');
                currBarrel.forEach((ele) => {
                    ele.style.transform = `translate(${0}vw, ${0}vh)`;
                    ele.classList.remove('moveBarrel');
                });
                lives = 3;
                livesText.innerText = lives;
                element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
                up();
                document.querySelector('#score-Id').innerHTML = 0;
                youWin = true;
                paused = false;
                winScreenDisplay.style.display = 'none';
            }
        });
    }
}
//Move Left
function placeLeft() {
    // top = parseInt(element.getBoundingClientRect().top);
    if (!OnLadder(element.getBoundingClientRect(), CurrentLevel(top))) {
        checkWin();
        currentX =
            ((startingX - element.getBoundingClientRect().left) /
                window.innerWidth) *
            100;
        currentX += 0.1;
        element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    }
}

// Move Right
function placeRight() {
    // top = parseInt(element.getBoundingClientRect().top);
    if (!OnLadder(element.getBoundingClientRect(), CurrentLevel(top))) {
        checkWin();
        // element.style.position = 'absolute';
        currentX =
            ((startingX - element.getBoundingClientRect().left) /
                window.innerWidth) *
            100;
        currentX < 0 ? 0 : (currentX -= 0.1);
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
        currentY < 0 ? (currentY = 0) : (currentY -= 0.25);
        element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    }
}

let dBetweenStages = getBoundTop(0) - getBoundTop(1);
const donkeyKong = document.querySelector('.donkey-kong-class');
const bounds = donkeyKong.getBoundingClientRect();

const allBarrel = Array.from(document.querySelectorAll('.barrel'));
//console.log(allBarrel);
allBarrel.forEach((barrel) => {
    barrel.style.left = `${bounds.right - (bounds.right - bounds.left)}px`;
    barrel.style.top = `${bounds.bottom - window.innerHeight * 0.0325}px`;
});

function newBarrel() {
    //Create the div to hold the barrel and the image for the barrel
    let getAllBarrelNotMoving = document.querySelectorAll(
        'div.barrel:not(.moveBarrel)'
    );
    getAllBarrelNotMoving[1].classList.add('moveBarrel');
}
let charBounds, passed;
let barrelPassArr = [6, 4, 2, 0],
    barrelPassArr2 = [5, 3, 1];
function barrelPass(barrel, indBarrel) {
    charBounds = element.getBoundingClientRect();
    passed = indBarrel.getAttribute('data-passed');
    function pointChecker() {
        if (passed === 'true') {
            indBarrel.setAttribute('data-passed', 'scored');
            return 'score';
        } else if (passed === 'false') {
            indBarrel.setAttribute('data-passed', 'true');
        }
    }
    //Check if the bounds of the barrel overlap with the bouns of the character(If they do return "dead")
    //Check if the left and right of the barrel are inside the characters div => if they are check the bottom of the character is less than the top of the barrel
    if (
        barrel.x < charBounds.x + charBounds.width &&
        barrel.x + barrel.width > charBounds.x &&
        barrel.y < charBounds.y + charBounds.height &&
        barrel.y + barrel.height > charBounds.y
    ) {
        return 'collision';
    }
    if (
        CurrentLevel(barrel.top) ===
        CurrentLevel(charBounds.bottom - (3.5 / 100) * window.innerHeight)
    ) {
        //Check if the left of the barrel is passed the right of the barrel && data-passed === "true" (if so return "score" and set data-passed back to false)
        if (barrelPassArr.includes(CurrentLevel(barrel.top))) {
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
        if (barrelPassArr2.includes(CurrentLevel(barrel.top))) {
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
//1) Get each barrel with the barrel class
const blackDivs = document.querySelectorAll('.black');
function barrelDrop(divCenter, divTop) {
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
                if (blackDivCenter < divCenter + 20) result = true;
            }
            if (
                currentLevel === 5 ||
                currentLevel === 3 ||
                currentLevel === 1
            ) {
                if (blackDivCenter > divCenter - 20) result = true;
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

let currBarrel, thisBarrel, currentLevelt, XdistMoved, tbCenter, yMove;
function moveBarrel() {
    // newB++;
    if (barrelTimer === 250) {
        newBarrel();
    }
    //Get the barrel as an element
    currBarrel = document.querySelectorAll('.moveBarrel');
    for (let x = 0; x < currBarrel.length; x++) {
        // currBarrel.forEach((indBarrel) => {
        thisBarrel = currBarrel[x].getBoundingClientRect();
        currentLevelt = CurrentLevel(thisBarrel.top);
        XdistMoved =
            ((thisBarrel.left - gameScreen.getBoundingClientRect().left) /
                window.innerWidth) *
            100;
        tbCenter = (thisBarrel.right + thisBarrel.left) / 2;
        //If the barrel is at the end remove it
        if (thisBarrel.left > startingX && thisBarrel.bottom > startingY) {
            // indBarrel.remove();
            currBarrel[x].style.transform = `translate(${0}vw, ${0}vh)`;
            currBarrel[x].classList.remove('moveBarrel');
        } else {
            barrelPass(thisBarrel, currBarrel[x]);
            if (barrelPass(thisBarrel, currBarrel[x]) === 'score') {
                document.querySelector('#score-Id').innerHTML =
                    +document.querySelector('#score-Id').innerHTML + 100;
            } else if (barrelPass(thisBarrel, currBarrel[x]) === 'collision') {
                death = true;
            }
            if (barrelDrop(tbCenter, thisBarrel.top)) {
                yMove = (dBetweenStages / window.innerHeight) * 100;
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
                currBarrel[
                    x
                ].style.transform = `translate(${XdistMoved}vw, ${yMove}vh)`;
            } else if (
                currentLevelt === 6 ||
                currentLevelt === 4 ||
                currentLevelt === 2 ||
                currentLevelt === 0
            ) {
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
                currBarrel[x].style.transform = `translate(${
                    XdistMoved + 0.2
                }vw, ${yMove}vh)`;
            } else if (
                currentLevelt === 5 ||
                currentLevelt === 3 ||
                currentLevelt === 1
            ) {
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
                currBarrel[x].style.transform = `translate(${
                    XdistMoved - 0.2
                }vw, ${yMove}vh)`;
            }
        }
    }

    if (death) {
        paused = true;
        Reset();
    }
}

let GameOverMenu = document.getElementsByClassName('GameOver')[0];
function gameover() {
    paused = true;
    document.getElementById('timer-Id-GO').innerText = timerId.innerText;
    document.getElementById('score-Id-GO').innerText =
        document.querySelector('#score-Id').innerHTML;
    GameOverMenu.style.display = 'block';

    setTimeout(() => {
        GameOverMenu.style.display = 'none';
        youWin = true;
        paused = false;
    }, 2000);
    document.querySelector('#score-Id').innerHTML = 0;
    lives = 3;
    livesText.innerText = lives;
}

// Reset the game if the character touch a barrel
const resetMenu = document.querySelector('.death');

function Reset() {
    currentX = 0;
    currentY = 0;
    if (lives !== 1) {
        resetMenu.style.display = 'block';
        setTimeout(() => {
            resetMenu.style.display = 'none';
            paused = false;
        }, 2000);
    }

    currBarrel = document.querySelectorAll('.barrel');
    currBarrel.forEach((ele) => {
        // ele.remove();
        ele.style.transform = `translate(${0}vw, ${0}vh)`;
        ele.classList.remove('moveBarrel');
    });
    lives = lives - 1;
    livesText.innerText = lives;
    element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    up();
    if (lives === 0) {
        gameover();
        youWin = false;
    }
    globalTime = globalTime - globalTime;
    death = false;
}

// let RetryButton = document.getElementsByClassName('RetryButton')[0];

// RetryButton.onclick = function Playagain() {
//     currentX = 0.16;
//     currentY = 0;
//     const currBarrel = document.querySelectorAll('.barrel');
//     currBarrel.forEach((ele) => {
//         ele.style.transform = `translate(${0}vw, ${0}vh)`;
//         ele.classList.remove('moveBarrel');
//     });
//     lives = 3;
//     livesText.innerText = lives;
//     element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
//     up();
//     document.querySelector('#score-Id').innerHTML = 0;
//     youWin = true;
//     paused = false;
//     winScreenDisplay.style.display = 'none';
// };

let StartMenu = document.getElementsByClassName('StartMenu')[0];

const characterDrop = () => {
    currentLevelt = CurrentLevel(element.getBoundingClientRect().top);
    tbCenter =
        (element.getBoundingClientRect().right +
            element.getBoundingClientRect().left) /
        2;
    //If the barrel is at the end remove it
    if (barrelDrop(tbCenter, element.getBoundingClientRect().top)) {
        currentY = (dBetweenStages / window.innerHeight) * 100;
        switch (currentLevelt) {
            case 6:
                currentY *= 5;
                break;
            case 5:
                currentY *= 4;
                break;
            case 4:
                currentY *= 3;
                break;
            case 3:
                currentY *= 2;
                break;
            case 2:
                currentY *= 1;
                break;
            case 1:
                currentY = 0;
                break;
        }
        element.style.transform = `translate(${-currentX}vw,${-currentY}vh)`;
        top = parseInt(element.getBoundingClientRect().top);
        // currentY =
        //     ((startingY - element.getBoundingClientRect().top) /
        //         window.innerHeight) *
        //     100;
        // currentY -= 0.25;
        // element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    }
};
let seconds, minutes;
function msToTime(duration) {
    seconds = duration;
    minutes = Math.floor(duration / 60);
    if (seconds > 59) {
        seconds = seconds - minutes * 60;
    }
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return minutes + ':' + seconds;
}
let lastTime = new Date().getTime();
let numSeconds = 0;
let currentTime = new Date().getTime();
const timer = () => {
    requestAnimationFrame(timer);
    if (!paused) {
        currentTime = new Date().getTime();
        if (currentTime - lastTime >= 1000) {
            lastTime = currentTime;
            numSeconds++;
            if (youWin) {
                numSeconds = 0;
                youWin = false;
            }
            timerId.innerText = msToTime(numSeconds);
        }
    }
};
timer();
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
        if (keys.continue.pressed) {
            togglePauseMenu();
        }
        if (keys.restart.pressed) {
            gameover();
            pausedMenu.style.display = 'none';
        }
        if (keys.start.pressed) {
            StartMenu.style.display = 'none';
            paused = false;
        }
        characterDrop();
        moveBarrel();

        if (barrelTimer == 250) {
            barrelTimer = 0;
        } else {
            barrelTimer++;
        }
    }
    frame++;
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
        if (e.key === 'p' && winScreenDisplay.style.display === 'none') {
            console.log(winScreenDisplay.style.display);
            togglePauseMenu();
        }
        if (
            e.key === 'r' &&
            paused &&
            winScreenDisplay.style.display === 'none'
        ) {
            lives = 1;
            Reset();
            pausedMenu.style.display = 'none';
        }
        if (
            e.key === 's' &&
            (StartMenu.style.display === 'block' ||
                winScreenDisplay.style.display === 'block')
        ) {
            StartMenu.style.display = 'none';
            paused = false;
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
