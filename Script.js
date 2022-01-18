const httpRequest = new XMLHttpRequest();

window.onload = function () {

    textItalics(localStorage.getItem('blockTwoText'));
    document.getElementById('numericList').innerHTML = localStorage.getItem('numericList');

    let cookie = getCookie('triangle')
    if (cookie != undefined) {
        if (cookie.length > 0) {
            if (confirm("У вас наявні такі кукі - " + cookie + " Після натискання кнопки «ОК» відбудеться видалення даних із куків ")) {
                document.cookie = "triangle=";
                location.reload();
            } else {
                location.reload();
            }
        }

    }

}

function Replacement() {
    let div1 = document.getElementsByClassName('1')[0];
    let div2 = document.getElementsByClassName('6')[0];

    let temp = div1.innerHTML;
    div1.innerHTML = div2.innerHTML;
    div2.innerHTML = temp;
}

function Area() {
    let d1 = 5;
    let d2 = 10;
    let area = (d1 * d2) / 2;
    document.getElementsByClassName('area')[0].innerHTML = 'The rectangle area is (' + d1 + '*' + d2 + ')/2=' + area;
}

function triangleBuild() {
    let a = parseInt(document.forms["triangle"]["firstSide"].value);
    let b = parseInt(document.forms['triangle']['secondSide'].value);
    let c = parseInt(document.forms['triangle']['thirdSide'].value);
    let buildable;
    if (a + b > c & b + c > a & a + c > b) {
        alert('Трикутник із сторонами ' + a + ',' + b + ',' + c + ' побудувати можливо')
        buildable = 'Трикутник із сторонами ' + a + ',' + b + ',' + c + ' побудувати можливо'
        document.cookie = 'triangle=' + buildable
    } else {
        alert('Трикутник із сторонами ' + a + ',' + b + ',' + c + ' побудувати не можливо')
        buildable = 'Трикутник із сторонами ' + a + ',' + b + ',' + c + ' побудувати не можливо'
        document.cookie = 'triangle=' + buildable
    }
    document.getElementById('form').hidden = true;
    return false;
}


function getCookie(name) {
    let cookies = decodeURIComponent(document.cookie);
    let cookiesArray = cookies.split(';')
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookieName = cookiesArray[i].split('=');
        if (name == cookieName[0]) {
            return cookieName[1]
        }
    }
}

function textItalics(a) {
    if (a == 'italics') {
        let text = document.getElementsByClassName('textInBlockTwo')[0];
        text.style.fontStyle = 'italic';
        document.getElementById('italicForm').hidden = false;
    } else {
        let text = document.getElementsByClassName('textInBlockTwo')[0];
        text.style.fontStyle = a;
    }

}

function saveFontStyle(a) {
    if (a == 'yes') {
        localStorage.setItem('blockTwoText', 'italic')
    } else if (a == 'no') {
        localStorage.setItem('blockTwoText', 'normal')
    }
}

function numericForm() {
    document.getElementById("numericForm").hidden = false;
}

function numericListCreator() {
    let numericList = document.getElementById("numericList");
    let elementsArray = document.forms["numericFormCreation"]["list"].value.split(',');
    let listElements = [];
    for (let i = 0; i < elementsArray.length; i++) {
        if (i % 2 == 0) {
            listElements.push("<li class='even'>" + elementsArray[i] + "</li>");
        } else if (i % 2 != 0) {
            listElements.push("<li class='odd'>" + elementsArray[i] + "</li>");
        }
    }

    numericList.innerHTML = listElements.join('');
    document.getElementById("numericForm").hidden = true;
    document.getElementById("saveButton").hidden = false;
    return false;
}

function listSaver() {
    localStorage.setItem('numericList', document.getElementById('numericList').innerHTML)
}

function tabsCreator() {
    let numberOfTubs = document.forms["tabsCreationForm"]["numberOfTubs"].value;
    let tubsNamesArray = document.forms["tabsCreationForm"]["tubsNames"].value.split(',');
    let tubsTextArray = document.forms["tabsCreationForm"]["tubsText"].value.split('%');
    let object = document.getElementById('tabs')
    for (let i = 0; i < numberOfTubs; i++) {
        if (i == 0) {
            object.innerHTML = object.innerHTML + " <input type=\"radio\" name=\"tab-btn\" id=\"tab-btn-" + (i + 1) + "\" value=\"\" checked >\n" +
                " <label for=\"tab-btn-" + (i + 1) + "\">" + tubsNamesArray[i] + "</label>\n"
        } else {
            object.innerHTML = object.innerHTML + " <input type=\"radio\" name=\"tab-btn\" id=\"tab-btn-" + (i + 1) + "\" value=\"\">\n" +
                " <label for=\"tab-btn-" + (i + 1) + "\">" + tubsNamesArray[i] + "</label>\n"
        }
    }
    for (let i = 0; i < numberOfTubs; i++) {
        object.innerHTML = object.innerHTML + " <div id=\"content-" + (i + 1) + "\">" + tubsTextArray[i] + "</div>"
    }
    document.getElementById('tabsCreation').hidden = true;

    httpRequest.onreadystatechange = displayServerResult;
    httpRequest.open('POST', 'saveData');
    httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpRequest.send('numberOfTubs=' + numberOfTubs + '&tubsNamesArray=' + tubsNamesArray + '&tubsTextArray=' + tubsTextArray + '&tubsHtml=' + object.innerHTML);

    return false;
}

function displayServerResult() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);
        } else {
            alert('There was a problem with the request.');
        }
    }
}

// canvas Animation

var square1;
var square2;
var canvas = document.getElementById('anim');
var ctx = canvas.getContext('2d');
var interval;

function animation(task) {

    if (task == 'show') {
        showWork();
        squareCreator();
    } else if (task == 'close') {
        hideWork();
        document.getElementById('animationLogs').innerHTML = localStorage.getItem('animationLogs');
    } else if (task == 'start') {
        document.getElementById('start').hidden = true;
        document.getElementById('stop').hidden = false;
        textMessage('Animation ON');
        playAnimation();
    } else if (task == 'stop') {
        document.getElementById('stop').hidden = true;
        document.getElementById('start').hidden = false;
        textMessage('Animation OFF');
        stopAnimation();
    } else if (task == 'reload') {
        stopAnimation();
        document.getElementById('reload').hidden = true;
        document.getElementById('start').hidden = false;
        textMessage('Animation reloaded')
        square1.x = 5;
        square1.y = (canvas.height - 10) / 2;
        square2.x = (canvas.width - 10) / 2;
        square2.y = 10;
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        square2.draw();
        square1.draw();
    }

    function showWork() {
        document.getElementById('work').style.display = 'inline-flex';
        document.getElementById('BlockThreeContent').hidden = true;
        localStorage.setItem('animationLogs', 'Annimation logs:' + "<br>")
        textMessage('Work opened');
    }

    function hideWork() {
        document.getElementById('work').style.display = 'none';
        document.getElementById('BlockThreeContent').hidden = false;
        textMessage('Work closed');

    }

    function squareCreator() {
        var Square = function (x, y, side, color, xSpeed, ySpeed) {
            this.x = x;
            this.y = y;
            this.side = side;
            this.color = color;
            this.xSpeed = xSpeed;
            this.ySpeed = ySpeed;
        };

        Square.prototype.draw = function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.side, this.side);
        };
        Square.prototype.move = function () {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
        }
        Square.prototype.checkCollision = function () {
            if (this.x < 0 || this.x > canvas.width - 10) {
                this.xSpeed = -this.xSpeed;
                textMessage(this.color + ' square touched wall');
            }
            if (this.y < 0 || this.y > canvas.height - 20) {
                this.ySpeed = -this.ySpeed;
                textMessage(this.color + ' square touched wall');
            }
        };

        square1 = new Square(5, (canvas.height - 10) / 2, 10, 'red', 4, 0);
        square2 = new Square((canvas.width - 10) / 2, 10, 20, 'green', 0, 1);

        httpRequest.onreadystatechange = displayServerResult;
        httpRequest.open('POST', 'saveAnimationData');
        httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        httpRequest.send('square1X=' + square1.x + '&square1Y=' + square1.y + '&square1Sde=' + square1.side
            + '&square1Color=' + square1.color + '&square1XSpeed=' + square1.xSpeed + '&square1YSpeed=' + square1.ySpeed
            + '&square2X=' + square2.x + '&square2Y=' + square2.y + '&square2Sde=' + square2.side + '&square2Color='
            + square2.color + '&square2XSpeed=' + square2.xSpeed + '&square2YSpeed=' + square2.ySpeed );
    }

    function playAnimation() {

        function overlayCheck() {
            if (0 < square1.x - square2.x &&
                square1.x - square2.x < 10 &&
                0 < square1.y - square2.y &&
                square1.y - square2.y < 10) {
                document.getElementById('stop').hidden = true;
                document.getElementById('reload').hidden = false;
                textMessage('Squares overlapped');
                stopAnimation();
            }
        }

        interval = setInterval(function () {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
            square2.draw();
            square1.draw();
            overlayCheck();
            square1.move();
            square2.move();
            square1.checkCollision();
            square2.checkCollision();
        }, 20);
    }

    function stopAnimation() {
        clearInterval(this.interval);
    }

    function textMessage(text) {
        document.getElementById('textMessage').innerHTML = text;
        var logs = localStorage.getItem('animationLogs');
        logs += text + " - " + getDateTime() + "<br>";
        localStorage.setItem('animationLogs', logs);
    }

}


function getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        second = '0' + second;
    }
    var dateTime = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
    return dateTime;
}

// Div Animation

var anim = document.getElementById("animDiv");
var redSquare = document.getElementById("redSquare");
var greenSquare = document.getElementById("greenSquare");
var redSquareX;
var redSquareY;
var redSquareSpeed;
var greenSquareSpeed;
var greenSquareX;
var greenSquareY;
var intervalDiv;

function animationDiv(task) {

    if (task == 'show') {
        document.getElementById('workDiv').style.display = 'inline-flex';
        document.getElementById('BlockThreeContent').hidden = true;
        redSquareX = 0;
        redSquareY = anim.offsetHeight / 2;
        redSquareSpeed = 4;
        greenSquareSpeed = 1 / 2;
        greenSquareX = anim.offsetWidth / 2;
        greenSquareY = 0;
        console.log(anim.offsetHeight / 2)

        httpRequest.onreadystatechange = displayServerResult;
        httpRequest.open('POST', 'saveAnimationDivData');
        httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        httpRequest.send('redSquareX=' + redSquareX + '&redSquareY=' + redSquareY + '&redSquareSpeed=' + redSquareSpeed
            + '&greenSquareSpeed=' + greenSquareSpeed + '&greenSquareX=' + greenSquareX+ '&greenSquareY=' + greenSquareY);


        localStorage.setItem('animationLogs', 'Annimation logs:' + "<br>")
        textMessage('Work opened');
    } else if (task == 'close') {
        document.getElementById('workDiv').style.display = 'none';
        document.getElementById('BlockThreeContent').hidden = false;
        textMessage('Work closed');
        document.getElementById('animationLogs').innerHTML = localStorage.getItem('animationLogs');
    } else if (task == 'start') {
        document.getElementById('startDiv').hidden = true;
        document.getElementById('stopDiv').hidden = false;
        textMessage('Animation ON');
        intervalDiv = setInterval(function () {
            redSquareX += redSquareSpeed;
            redSquare.style.left = redSquareX + "px";
            checkCollisionRed();
            greenSquareY += greenSquareSpeed;
            greenSquare.style.top = greenSquareY + "px";
            checkCollisionGreen();
            overlayCheck();
        }, 10);

    } else if (task == 'stop') {
        document.getElementById('stopDiv').hidden = true;
        document.getElementById('startDiv').hidden = false;
        textMessage('Animation OFF');
        stopAnimation();
    } else if (task == 'reload') {
        document.getElementById('reloadDiv').hidden = true;
        document.getElementById('startDiv').hidden = false;
        textMessage('Animation reloaded')

        redSquareX = 0;
        redSquareY = anim.offsetHeight / 2;
        greenSquareX = anim.offsetWidth / 2;
        greenSquareY = 0;
    }

    function checkCollisionRed() {
        if (redSquareX < 0 || redSquareX > anim.offsetWidth - 25) {
            redSquareSpeed = -redSquareSpeed;
            textMessage('Red square touched wall');
        }
    }

    function checkCollisionGreen() {
        if (greenSquareY < 0 || greenSquareY > anim.offsetHeight - 30) {
            greenSquareSpeed = -greenSquareSpeed;
            textMessage('Green square touched wall');
        }
    }

    function overlayCheck() {
        if (0 < redSquareX - greenSquareX &&
            redSquareX - greenSquareX < 13 &&
            0 < redSquareY - greenSquareY &&
            redSquareY - greenSquareY < 13) {
            document.getElementById('stopDiv').hidden = true;
            document.getElementById('reloadDiv').hidden = false;
            textMessage('Squares overlapped');
            stopAnimation();
        }
    }

    function stopAnimation() {
        clearInterval(intervalDiv);
        positionInfo();
    }

    function positionInfo() {
        console.log('gX = ' + greenSquareX)
        console.log('gY = ' + greenSquareY)
        console.log('rX = ' + redSquareX)
        console.log('eY = ' + redSquareY)
    }

    function textMessage(text) {
        document.getElementById('textMessageDiv').innerHTML = text;
        var logs = localStorage.getItem('animationLogs');
        logs += text + " - " + getDateTime() + "<br>";
        localStorage.setItem('animationLogs', logs);
    }
}

