function place(id, x_pos, y_pos) {
    let element = document.getElementById(id);
    element.style.position = "absolute";
    element.style.left = x_pos.left + 'px';
    element.style.right = x_pos.right + 'px';
    // element.style.top = y_pos+'px';
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
    element.style.position = "absolute";
    element.style.top = y_pos + 'px';
}

function down(id, y_pos) {
    let element = document.getElementById(id);
    element.style.position = "absolute";
    element.style.top = y_pos + 'px';
}

let crane = 0

function craneHeight() {
    let character = document.querySelector('#box')

    if (crane % 2 !== 0) {
        //height = tan(5) * left = 0.0875 * left
        
    }
}

export const main = () => {
    document.addEventListener("keydown", (e) => {

        let box = document.getElementById("box").getBoundingClientRect();


        let right = parseInt(box.right);
        let left = parseInt(box.left);
        let top = parseInt(box.top)

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