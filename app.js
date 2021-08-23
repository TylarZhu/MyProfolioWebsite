const express = require('express');
const app = express();

const redis = require("redis");
const db = redis.createClient ({
    port : 6379,
    host : "localhost"
});

const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static('dist/MyWebsite'));

app.route('/home').get(function(req, res) { 
    return res.sendFile(path.join(__dirname, 'dist/MyWebsite/index.html')); 
});

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

db.set('myWeb:users', JSON.stringify([]), (err, res) => {
    if(err)  return res.status(500).end(err);
    console.log(res);
});

app.post('/user/', (req, res, next) => {
    let user = {firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, comment: req.body.comment, likes: req.body.likes, unlikes: req.body.unlikes};
    db.get('myWeb:users', (err, res) => {
        if(err)  return res.status(500).end(err);
        let users = JSON.parse(res);
        users.push(user);
        db.set('myWeb:users', JSON.stringify(users), (err, res) => {
            if(err)  return res.status(500).end(err);
        });
    });
});

app.post('/likes/', (req, res, next) => {
    db.get('myWeb:users', (err, res) => {
        if(err) return res.status(500).end(err);
        let users = JSON.parse(res);
        for(let i = 0; i < users.length; i ++) {
            if(users[i].email === req.body.email) {
                users[i].likes = req.body.likes;
                break;
            }
        }
        db.set('myWeb:users', JSON.stringify(users), (err, res) => {
            if(err)  return res.status(500).end(err);
        });
    });
});

app.post('/unlikes/', (req, res, next) => {
    db.get('myWeb:users', (err, res) => {
        if(err) return res.status(500).end(err);
        let users = JSON.parse(res);
        for(let i = 0; i < users.length; i ++) {
            if(users[i].email === req.body.email) {
                users[i].unlikes = req.body.unlikes;
                break;
            }
        }
        db.set('myWeb:users', JSON.stringify(users), (err, res) => {
            if(err)  return res.status(500).end(err);
        });
    });
});

app.get('/users/', (req, res, next) => {
    db.get('myWeb:users', (err, doc) => {
        if(err)  return res.status(500).end(err);
        return res.json(doc);
    });
});

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) return console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});