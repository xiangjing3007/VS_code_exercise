// 通过id找到元素
function $(id) {
    let el = document.getElementById(id);
    return el;
}

// 创建div,classname是其类名
function creatediv(classname) {
    let div = document.createElement('div');
    div.className = classname;
    return div;
}

// 创建row
function createrow() {
    let row = creatediv("row");
    let con = $("con");
    let arr = createcell();
    let i;
    for (i = 0; i < arr.length; i++) {
        row.appendChild(creatediv(arr[i]));  //为row添加cell
    }

    con.appendChild(row); //row 为con的子元素

    if (con.firstChild == null) {
        con.appendChild(row); //row 为con的子元素
    } else {
        con.insertBefore(row, con.firstChild);
    }

}

//删除con子节点的最后一个节点row
function delrow() {
    var con = $("con");
    if (con.childNodes.length === 6) {
        console.log("===length " + con.childNodes.length);
        con.removeChild(con.lastChild);  //若对应的彩板有鼠标点击，则删除row
    }
}

// 为一行cell添加属性
function createcell() {
    let arr = ["cell", "cell", "cell", "cell"];
    let i = Math.floor(Math.random() * 4);
    arr[i] = "cell black";
    return arr;
}

let timer;
let speed = 6;
let flag = false;
let score = 0;
// 让彩板动起来
function move() {
    // 通过定时器来完成，每30ms动一次，匀速
    var con = document.querySelector("#con");
    var top = parseInt(window.getComputedStyle(con, null)['top']);
    var con = $("con");
    top += 6;
    con.style.top = top + 'px';  //内联样式优先级高

    //彩板被点击：con删除最后一个div#row； 插入一个新的row在firstchild row前；记分
    //白板被点击：游戏结束
    over();
    if (top > 0) {
        createrow();
        con.style.top = '-102px';
        delrow();
    }

}

//判断游戏是否结束
function over() {
    let rows = con.childNodes;
    // let rows = document.querySelector(".row");
    //到最后一行，菜板还未点击, fail
    if ((rows.length === 5) && (rows[rows.length - 1].black !== 1)) {
        console.log("------fail 1------");
        fail();
    }

    //点击了白板，fail
    for (index = 0; index < rows.length; index++) {
        if (rows[index].white == 1) {
            console.log("------fail 2------");
            fail();
            break;
        }
    }
}

//游戏结束：清楚计时器；恢复初始值；显示分数
function fail() {
    window.clearInterval(timer);
    let scr = document.querySelector("#score");
    confirm("游戏结束！得分为 " + parseInt(scr.innerHTML));
    // let score = parseInt(scr);
    flag = false;
    con.innerHTML =  "";
    $('score').innerHTML = 0;
    con.style.top = '-408px';
    count = 0;

}

/*
 *    初始化 init
 */
function init() {
    flag = true;
    for (var i = 0; i < 4; i++) {
        createrow();
    }

    // 添加onclick事件
    $('main').onclick = function (ev) {
        ev = ev || event
        judge(ev);
    }

    // 定时器 每30毫秒调用一次move()
    timer = window.setInterval('move()', 30);
}


// 判断是否点击黑块、白块
function judge(ev) {
    if (ev.target.className.indexOf('black') == -1 && ev.target.className.indexOf('cell') !== -1) {
        ev.target.parentNode.white = 1; //定义属性pass，表示此行row的白块已经被点击
    }

    if (ev.target.className.indexOf('black') !== -1) {//点击目标元素 类名中包含 black 说明是黑块
        ev.target.className = 'cell';
        ev.target.parentNode.black = 1; //定义属性pass，表明此行row的黑块已经被点击
        compute();
    }


}

//游戏开始
function start() {
    if (!flag) {
        init();
        console.log("---游戏开始---");
    } else {
        alert("游戏已经开始");
    }
    // console.log("---游戏开始---");
}

// 记分函数
let count = 0;
function compute() {
    let scr = document.querySelector("#score");
    count++;
    scr.innerHTML = (count + "");
    // console.log("记分");
}
