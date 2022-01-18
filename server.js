const express = require('express')
const app = express()
const port = process.env.PORT || 80
fs = require('fs')

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({extended: false})

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/Lab3.html")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/saveData', urlencodedParser, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    const content = "numberOfTubs=" + req.body.numberOfTubs
        + ";tubsNamesArray=" + req.body.tubsNamesArray + ";"
        + ";tubsTextArray=" + req.body.tubsTextArray + ";"
        + ";tubsHtml=" + req.body.tubsHtml + ";"
    ;

    fs.writeFile('data.txt', content, function (err) {
        if (err) return console.log(err);
        console.log("File saved successfully");

    });
});

app.get('/getData', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    fs.readFile("data.txt", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        res.send(data);
    });
});

app.post('/saveAnimationData', urlencodedParser, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    const content = "square1X=" + req.body.square1X
        + ";square1Y=" + req.body.square1Y + ";"
        + ";square1Sde=" + req.body.square1Sde + ";"
        + ";square1Color=" + req.body.square1Color + ";"
        + ";square1XSpeed=" + req.body.square1XSpeed + ";"
        + ";square1YSpeed=" + req.body.square1YSpeed + ";"
        + ";square2X=" + req.body.square2X + ";"
        + ";square2Y=" + req.body.square2Y + ";"
        + ";square2Sde=" + req.body.square2Sde + ";"
        + ";square2Color=" + req.body.square2Color + ";"
        + ";square2XSpeed=" + req.body.square2XSpeed + ";"
        + ";square2YSpeed=" + req.body.square2YSpeed + ";"
    ;

    fs.writeFile('data.txt', content, function (err) {
        if (err) return console.log(err);
        console.log("File saved successfully");

    });
});

app.get('/getAnimationData', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    fs.readFile("data.txt", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        res.send(data);
    });
});

app.post('/saveAnimationDivData', urlencodedParser, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    const content = "redSquareX=" + req.body.redSquareX
        + ";redSquareY=" + req.body.redSquareY + ";"
        + ";redSquareSpeed=" + req.body.redSquareSpeed + ";"
        + ";greenSquareSpeed=" + req.body.greenSquareSpeed + ";"
        + ";greenSquareX=" + req.body.greenSquareX + ";"
        + ";greenSquareY=" + req.body.greenSquareY + ";"
    ;

    fs.writeFile('data.txt', content, function (err) {
        if (err) return console.log(err);
        console.log("File saved successfully");

    });
});

app.get('/getAnimationDivData', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    fs.readFile("data.txt", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        res.send(data);
    });
});

app.use(express.static(__dirname));
