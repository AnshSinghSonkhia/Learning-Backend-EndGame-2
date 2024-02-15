var express = require("express");
var router = express.Router();

const userModel = require("./users");

// const { route } = require("../app");
const passport = require('passport');
const localStrategy = require("passport-local").Strategy;

passport.use(new localStrategy(userModel.authenticate())); 


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/profile", IsLoggedIn, function (req, res, next) {
  res.render('profile');
});

router.get("/failed", function (req, res, next) {
  req.flash("age", 12);
  req.flash("name", "Ansh Singh Sonkhia");
  res.send("Bangayaa");
});

router.get("/check", function (req, res, next) {
  console.log(req.flash("age"), req.flash("name"));
  res.send("Check kr lo backend terminal pr");
});

router.get("/create", async function (req, res, next) {
  let userdata = await userModel.create({
    username: "Modiii",
    nickname: "pmpmpmpm",
    description: "PMPMPMPM from INDIA.",
    categories: ['PM', 'Politics', 'Global-Affairs', 'Relations', 'Policies', 'JS'],
  });
  res.send(userdata);
});

router.get("/find", async function(req, res){
  let user = await userModel.find({
    $expr: {
      $and: [
        {$gte: [{$strLenCP: '$nickname'}, 0]},
        {$lte: [{$strLenCP: '$nickname'}, 6]}
      ],
    }
  })
  res.send(user);
  // Array inside another object [{}]
  // We will get All the strings with nickname's length 0 to 6
});

router.post('/register', function(req,res){
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body,secret,
  });

  userModel.register(userdata, req.body.password)
    .then(function(registereduser){
      passport.authenticate("local")(req,res,function(){
        res.redirect('/profile');
      })
    })
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",    // Where to redirect on success
  failureRedirect: "/"       // Where to redirect on failure
}), function(req,res) {})

// here, passport.authenticate is written in middleware --> i.e., before reaching to function

router.get("/logout", function (req, res, next) {
  req.logout(function(err){       // passing a function to accept error
    if (err) { return next(err); }
    res.redirect('/');    // on logout, it is redirected to '/' route
  });
});

// Taking Protection by IsLoggedIn Middleware

function IsLoggedIn(req,res,next) {
  if (req.isAuthenticated()){
    return next();      // if you're loggedin --> go to next()
  }
  res.redirect('/');    // else, if not loggedin --> redirect to '/' route
}

module.exports = router;