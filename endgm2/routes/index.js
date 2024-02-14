var express = require('express');
var router = express.Router();

const userModel = require("./users");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/failed', function(req, res, next) {
  req.flash("age", 12);
  req.flash("name", "Ansh Singh Sonkhia");
  res.send("Bangayaa");
});

router.get('/check', function(req, res, next) {
  console.log(req.flash("age"), req.flash("name"));
  res.send("Check kr lo backend terminal pr");
});

module.exports = router;