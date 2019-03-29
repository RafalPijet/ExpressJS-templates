var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', './myViews');
app.use(express.static('images'));

app.get('/login', function (req, res) {
    res.render('login')
});

app.get('/main', function (req, res) {
    const response = {
        user_email: req.query.email,
        user_password: req.query.password
    };
    
    res.render('main', {
        user_name: "Wladimir Putin",
        user_email: response.user_email,
        first: "Jaroslaw Kaczynski",
        thirdh: "Tadeusz Rydzyk"
    })
});

app.get('/auth/google', function (req, res) {
    res.render('main', {
        user_name: "Wladimir Putin",
        user_email: "putin@russiandevil.ru",
        first: "Jaroslaw Kaczynski",
        thirdh: "Tadeusz Rydzyk"
    })
});

app.use(function (req, res) {
    res.status(404).send('Sorka, ale chyba dałeś ciała wysyłyjąc tego requesta ;)');
});

const server = app.listen(3000);