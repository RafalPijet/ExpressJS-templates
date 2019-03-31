var express = require('express');
var app = express();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('./config');
var googleProfile = {};

app.set('view engine', 'pug');
app.set('views', './myViews');
app.use(express.static('images'));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {

    done(null, user);
});

passport.deserializeUser(function (obj, done) {

    done(null, obj);
});

passport.use(new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, cb) {
        googleProfile = {
            id: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value
        };
        cb(null, profile);
    }
));

function isEmpty(obj) {
    for (var key in obj) {
        
        if (obj.hasOwnProperty(key))
            return false;    
    }
    return true
};

app.get('/login', function (req, res) {
    res.render('login', {user: req.user})
});

app.get('/main', function (req, res) {
    const response = {
        user_email: req.query.email,
        user_password: req.query.password
    };
    
    let check = isEmpty(googleProfile);

    res.render('main', {
        user_name: "Wladimir Putin",
        user_email: response.user_email,
        first: "Jaroslaw Kaczynski",
        thirdh: "Tadeusz Rydzyk",
        user: googleProfile,
        check: check
    });
    console.log(check);
    googleProfile = {};
});

app.get('/auth/google',
    passport.authenticate('google', {
        scope : ['profile', 'email']
    }));


app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/main',
        failureRedirect: '/'
    }));

app.use(function (req, res) {
    res.status(404).send('Sorka, ale chyba dałeś ciała wysyłyjąc tego requesta ;)');
});

const server = app.listen(3000);