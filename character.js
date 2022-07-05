let crane = 0


let ladder_1 =  document.getElementById("ladder_1").getBoundingClientRect()
let ladder_2 =  document.getElementById("ladder_2").getBoundingClientRect()
let ladder_3 =  document.getElementById("ladder_3").getBoundingClientRect()
let ladder_4 =  document.getElementById("ladder_4").getBoundingClientRect()
let ladder_5 =  document.getElementById("ladder_5").getBoundingClientRect()
let ladder_6 =  document.getElementById("ladder_6").getBoundingClientRect()
let ladder_7 =  document.getElementById("ladder_7").getBoundingClientRect()

const FindFloor = (y_pos)=> {
   let y = 0
    const getBoundTop = (ind) => document.getElementById(ind).getBoundingClientRect().top
console.log(y_pos)
    //If cline y is between 0 top and 1 top y = 0
    if (y_pos < getBoundTop(0) && y_pos > getBoundTop(1)) y = 0
    if (y_pos < getBoundTop(1) && y_pos > getBoundTop(2)) y = 1
    if (y_pos < getBoundTop(2) && y_pos > getBoundTop(3)) y = 2
    if (y_pos < getBoundTop(3) && y_pos > getBoundTop(4)) y = 3
    if (y_pos < getBoundTop(4) && y_pos > getBoundTop(5)) y = 4
    if (y_pos < getBoundTop(5) && y_pos > getBoundTop(6)) y = 5
    if (y_pos < getBoundTop(6)) y = 6

    return y
}

const OnLadder = ( x_pos, y_pos, floor)=> {
    x_pos = parseInt(x_pos)

    if(floor === 0 ) {

        return (x_pos < ladder_1.left && x_pos > (ladder_1.left - ladder_1.width))
    }
    if(floor === 1 || floor === 2 ) {
        return (x_pos < ladder_2.left && x_pos > (ladder_2.left - ladder_2.width)) || (x_pos < ladder_3.left && x_pos > (ladder_3.left - ladder_3.width)) || (x_pos < ladder_1.left && x_pos > (ladder_1.left - ladder_1.width))
    }
    if(floor === 2 || floor === 3) {
        return (x_pos < ladder_4.left && x_pos > (ladder_4.left - ladder_4.width)) || (x_pos < ladder_5.left && x_pos > (ladder_5.left - ladder_5.width))
    }
    if(floor === 3 || floor === 4) {
        return (x_pos < ladder_5.left && x_pos > (ladder_5.left - ladder_5.width)) ||  (x_pos < ladder_6.left && x_pos > (ladder_6.left - ladder_6.width))
    }
    if(floor === 4 || floor === 5) {
        return (x_pos < ladder_6.left && x_pos > (ladder_6.left - ladder_6.width)) || (x_pos < ladder_7.left && x_pos > (ladder_7.left - ladder_7.width))
    }
    if(floor === 5 || floor === 6 ) {
        return (x_pos < ladder_7.left && x_pos > (ladder_7.left - ladder_7.width))
    }


}



function place(id, x_pos, y_pos) {
    let element = document.getElementById(id);
    element.style.position = "absolute";
    element.style.left = x_pos.left + 'px';
    element.style.right = x_pos.right + 'px';
    let y = FindFloor(y_pos) 

    
  /*  console.log('0 ===', getBoundTop(0));
    console.log('1 ===', getBoundTop(1));
    console.log('2 ===', getBoundTop(2));
    console.log('3 ===', getBoundTop(3));
    console.log('4 ===', getBoundTop(4));
    console.log('5 ===', getBoundTop(5));
    console.log('6 ===', getBoundTop(6));
*/

   // console.log(y_pos);
  //  console.log(y);
 // console.log(element.style.left)
  //console.log(element.getBoundingClientRect().width)
 // console.log(document.getElementById("ladder_1").getBoundingClientRect().left)
 // console.log(document.getElementById("ladder_1").getBoundingClientRect().width)
    element.style.top = `${document.getElementById(y).getBoundingClientRect().top - element.getBoundingClientRect().height + 5}px`

}

function jump(id, top, bottom) {
    let element = document.getElementById(id);
    element.style.position = "absolute";
    element.style.top = top + 'px';
    function down() {
        element.style.top = bottom + "px"
        console.log("here")
    }
    setTimeout(down, 100);
}

function up(id, y_pos) {
    let element = document.getElementById(id);
    if(OnLadder(element.style.left,"",FindFloor(y_pos))){
    element.style.position = "absolute";
    element.style.top = y_pos + 'px';
    }
    console.log(OnLadder(element.style.left,"",0))
}

function down(id, y_pos) {
    let element = document.getElementById(id);
    element.style.position = "absolute";
    element.style.top = y_pos + 'px';
}


export const main = () => {

    document.addEventListener("keydown", (e) => {

        let box = document.getElementById("box").getBoundingClientRect();


        let right = parseInt(box.right);
        let left = parseInt(box.left);
        let top = parseInt(box.top)
        console.log('top======', top);
        // console.log('Crane 1)', document.getElementById("1").getBoundingClientRect().top);
        // console.log('Crane 0)', document.getElementById("0").getBoundingClientRect().top);


        if (e.key === "ArrowRight") {
            place('box', { "right": right + 10, "left": left + 10 }, top)
        }
        if (e.key === "ArrowLeft") {

            place('box', { "right": right - 12, "left": left - 12 }, top)
        }
        if (e.key === "ArrowUp") {

            up('box', top - 10)
        }
        if (e.key === "ArrowDown") {
            down('box', top + 10)

        }
        if (e.key === " ") {
            jump('box', top - 40, top)
        }
    })
}
