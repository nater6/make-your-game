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

const OnLadder = (object, floor) => {
    console.log(object.left);
    let x_pos = parseInt(object.left);

    console.log('ladder_1 =', ladder_1);
    console.log(object);
    console.log(floor);

    if (floor === 0) {
        return (
            x_pos < ladder_1.left &&
            x_pos > ladder_1.left - ladder_1.width &&
            ladder_1.y < object.bottom
        );
    }
    if (floor === 1 || floor === 2) {

        return (
            (x_pos < ladder_2.left && x_pos > ladder_2.left - ladder_2.width) ||
            (x_pos < ladder_3.left && x_pos > ladder_3.left - ladder_3.width) ||
            (x_pos < ladder_1.left && x_pos > ladder_1.left - ladder_1.width)
        );
    }
    if (floor === 2 || floor === 3) {
        return (
            (x_pos < ladder_4.left && x_pos > ladder_4.left - ladder_4.width) ||
            (x_pos < ladder_5.left && x_pos > ladder_5.left - ladder_5.width)
        );
    }
    if (floor === 3 || floor === 4) {
        return (
            (x_pos < ladder_5.left && x_pos > ladder_5.left - ladder_5.width) ||
            (x_pos < ladder_6.left && x_pos > ladder_6.left - ladder_6.width)
        );
    }
    if (floor === 4 || floor === 5) {
        return (
            (x_pos < ladder_6.left && x_pos > ladder_6.left - ladder_6.width) ||
            (x_pos < ladder_7.left && x_pos > ladder_7.left - ladder_7.width)
        );
    }
    if (floor === 5 || floor === 6) {
        return x_pos < ladder_7.left && x_pos > ladder_7.left - ladder_7.width;
    }
};

function placeLeft() {
    let element = document.getElementById('box');
    element.style.position = 'absolute';
    currentX = Math.round(
        ((startingX - element.getBoundingClientRect().left) /
            window.innerWidth) *
            100
    );
    currentX += 1;
    element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    console.log(
        'StartingX ==',
        ((startingX - element.getBoundingClientRect().left) /
            window.innerWidth) *
            100
    );
    console.log('currentX ===', currentX, 'currentY', currentY);
}

function placeRight() {
    let element = document.getElementById('box');
    element.style.position = 'absolute';
    currentX = Math.round(
        ((startingX - element.getBoundingClientRect().left) /
            window.innerWidth) *
            100
    );
    currentX -= 1;
    currentX < 0 ? 0 : (currentX -= 1);

    element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    console.log('currentX ===', currentX, 'currentY', currentY);
}
function jump(id) {
    let element = document.getElementById('box');
    element.style.transform = `translate(-${currentX}, -${currentY - 5}vh)`;
    function down() {
        element.style.transform = `translate(-${currentX}, -${currentY}vh)`;
    }
    setTimeout(down, 100);
}

function up(y_pos) {
    let element = document.getElementById('box');
    if (OnLadder(element.getBoundingClientRect(), CurrentLevel(y_pos))) {
        element.style.position = 'absolute';
        currentY = Math.round(
            ((startingY - element.getBoundingClientRect().top) /
                window.innerHeight) *
                100
        );
        currentY += 1;
        element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    }
    console.log('currentX ===', currentX, 'currentY', currentY);
}

function down(y_pos) {
    let element = document.getElementById('box');
    element.style.position = 'absolute';
    currentY = Math.round(
        ((startingY - element.getBoundingClientRect().top) /
            window.innerHeight) *
            100
    );
    currentY < 0 ? 0 : (currentY -= 1);
    element.style.transform = `translate(-${currentX}vw, -${currentY}vh)`;
    console.log('currentX ===', currentX, 'currentY', currentY);
}
const donkeyKongCharacter = () => {
    const leftGameScreen = document
        .querySelectorAll('.bottom-stages')[0]
        .getBoundingClientRect().left;
    const character = document.getElementsByClassName('donkey-kong-class')[0];
    character.style.left = leftGameScreen + 'px';
    console.log(character.style.left, leftGameScreen);
};
export const main = () => {
    document.addEventListener('keydown', (e) => {
        let box = document.getElementById('box').getBoundingClientRect();

        let top = parseInt(box.top);

        if (e.key === 'ArrowRight') {
            placeRight();
        }
        if (e.key === 'ArrowLeft') {
            placeLeft();
        }
        if (e.key === 'ArrowUp') {
            up(top - 10);
        }
        if (e.key === 'ArrowDown') {
            down(top + 10);
        }
        if (e.key === ' ') {
            jump();
        }
    });
    donkeyKongCharacter();
};
