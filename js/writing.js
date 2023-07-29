var dir = 1, id = 0, strpos = 0;
var speed = 150;

var str = new Array(0);
str[0] = "Hello !";
str[1] = "I'm Virgill_e";

window.onload = function () {
    window.setInterval('ParseText()', speed);
}

function ParseText() {
    if (dir == 1) AddChar(); else RemChar();
    ShowItem();
}

function AddChar() {
    strpos++;
    if (strpos > str[id].length) dir = -1;
}

function RemChar() {
    strpos--;
    if (strpos < 0) {
        dir = 1;
        NextItem();
    }
}

function ShowItem() {
    var result = str[id].substring(0, strpos);
    if (result === "") {
        result = "&nbsp;"; // Ajouter un espace réservé
    }
    document.getElementById("write").innerHTML = result;

}

function NextItem() {
    id++;
    if (id > str.length - 1) id = 0;
}