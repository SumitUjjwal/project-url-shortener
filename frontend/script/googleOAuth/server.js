const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const cookieParser = require('cookie-parser');

const app = express();
// app.use(cookieParser());

// Use express-session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
  }));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());


// Set up Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: "",
    clientSecret: '',
    callbackURL: '/oauth2/redirect/google',
}, (accessToken, refreshToken, profile, done) => {
    // Save user information to database or session
    return done(null, profile);
}));

// Serialize and deserialize user information
passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

// Set up routes
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Redirect the user to Google for authentication
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Handle the response from Google
app.get('/oauth2/redirect/google', passport.authenticate('google', {
    failureRedirect: '/login'
}), (req, res) => {
    // Successful authentication, redirect to protected route
    // res.redirect('/profile');
    res.json({success: true});
});

// Example of a protected route
app.get('/profile', (req, res) => {
    console.log(req.user);
    res.send(`Welcome, ${req.user.displayName}!`);
});

// Start the server
// app.listen(2020, () => {
//     console.log('Server started on port 2020');
// });
