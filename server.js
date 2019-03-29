var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/store', function(req, res, next){
    console.log('Jestem pośrednikiem przy żądaniu do /store');
    next();
});

app.get('/', function (req, res) {
    res.send('Hello world!');
});

app.get('/store', function (req, res) {
    res.send('To jest sklep');
});

app.get('/first-template', function (req, res) {
    res.render('first-template');
});

app.get('/dynamic-view', function (req, res) {
    res.render('dynamic', {
        name: "Moja dynamiczna strona",
        url: "http://www.google.pl"
    })
});

app.get("/dynamic-user", function (req, res) {
    res.render("dynamic-user", {
       user: {
           name: "David", age: "51"
       }
    })
});

app.get("/content", function (req, res) {
    res.render("content")
});

app.use(function (req, res) {
    res.status(404).send('Sorka, ale chyba dałeś ciała wysyłyjąc tego requesta ;)');
});

const server = app.listen(3000, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Przykładowa aplikacja nasłuchuje na http://' + host + ':' + port);
});