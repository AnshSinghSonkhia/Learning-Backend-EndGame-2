# Backend - EndGame (Part 2) - NodeJS

Learning what matters

## Tech-Stack:
<!-- Refer: https://simpleicons.org/ -->

  <code><img height="30" src="https://img.shields.io/badge/JavaScript-111111?style=for-the-badge&logo=javascript&logoColor=F7DF1E"></code>
  <code><img height="30" src="https://img.shields.io/badge/MongoDB-111111?style=for-the-badge&logo=mongodb&logoColor=09f515"></code>
  <code><img height="30" src="https://img.shields.io/badge/Express%20JS-111111?style=for-the-badge&logo=express&logoColor=F7DF1E"></code>
  <code><img height="30" src="https://img.shields.io/badge/Node%20JS-111111?style=for-the-badge&logo=node.js&logoColor=09f515"></code>
  <code><img height="30" src="https://img.shields.io/badge/EJS-111111?style=for-the-badge&logo=ejs&logoColor=00caff"></code>
  <code><img height="30" src="https://img.shields.io/badge/Bootstrap-111111?style=for-the-badge&logo=bootstrap&logoColor=00caff"></code>
  <code><img height="30" src="https://img.shields.io/badge/Backend-111111?style=for-the-badge&logo=backend&logoColor=00caff"></code>
  <code><img height="30" src="https://img.shields.io/badge/Authentication-111111?style=for-the-badge&logo=authentication&logoColor=00caff"></code>
  <code><img height="30" src="https://img.shields.io/badge/Authorization-111111?style=for-the-badge&logo=authorization&logoColor=00caff"></code>
  <code><img height="30" src="https://img.shields.io/badge/Passport%20JS-111111?style=for-the-badge&logo=passport&logoColor=34E27A"></code>
  <code><img height="30" src="https://img.shields.io/badge/Mongoose%20JS-111111?style=for-the-badge&logo=mongoose&logoColor=880000"></code>
  <code><img height="30" src="https://img.shields.io/badge/Flash%20Messages-111111?style=for-the-badge&logo=flash&logoColor=880000"></code>

# Run app

```shell
npx nodemon
```

# Flash Messages

Whenever, we want to give some information on EJS Page - Good Looking `Alerts`, `warnings` and `Descriptions`.. It is known as flash messages.

## Steps to give Flash Messages:

0. Make sure, you setup `express-session`

```shell
express project_name --view=ejs

npm i
npm i express-session
```

1. Install Package - `connect-flash`

```shell
npm i connect-flash
```

- In `app.js`

```js
const expressSession = require("express-session");
```

- In `app.js`, after `app.set('view engine', 'ejs');` and before `app.use(logger('dev'));`

```js
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "kuch bhi string as a secret code"
}))
```

2. Make sure you put connect flash in a `app.use` function. As it runs before running any route.

```js
const flash = require("connect-flash");
```

- after `app.use(expressSession({`...

```js
app.use(flash());
```

3. Create flash in any route.

```js
router.get('/failed', function(req, res, next) {
  req.flash("age", 12);
});

router.get('/check', function(req, res, next) {
  req.flash("age");
});
```

4. Try to run `app.use` in any other 2nd route.

```js
router.get('/failed', function(req, res, next) {
  req.flash("age", 12);
  req.flash("name", "Ansh Singh Sonkhia");
  res.send("Bangayaa");
});

router.get('/check', function(req, res, next) {
  console.log(req.flash("age"), req.flash("name"));
  res.send("Check kr lo backend terminal pr");
});
```

> You can NOT use `FLASH` without `Express-session`.

- Flash message means to create a data in any route of server and use that data in 2nd route. 

- Using Global Variables is a BAD Wrong practice in this industry. It's so risky and less secure.

- Flash Messages helps us to use a data created in 1  route in 2nd route.

## Use-case application of `connect-flash`

When user is not able to login,
user enters wrong email password.
The, we have to forward him to another route.
where, we will show him the error message, of wrong email.

But, we can not send data directly from one route to another.

As, using global data is not secure.

Here, flash messages helps us in sending data created in one route to another route.

# Intermediate - MongoDB

- install Mongoose

```shell
npm i mongoose
```

- Setup Mongoose in `users.js`

```js
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/testingendgame2");

const userSchema = mongoose.Schema({
  username: String,
  nickname: String,
  description: String,
  categories: {
    type: Array,
    default: []
  },
  datecreated: {
    type: Date,
    default: Date.now()
  },
})

mongoose.model("uesr", userSchema);
```

- in `index.js`

```js
const userModel = require("./users");
```

## How can I perform a case-insensitive search in Mongoose?

`Case-insensitive` --> whether the user wants to find `Ansh` or `ansh`, the result should arrive. 

> `index.js` with `Case-Sensitive` Search

```js
router.get("/create", async function (req, res, next) {
  let userdata = await userModel.create({
    username: "Ansh Singh Sonkhia",
    nickname: "Nimmi",
    description: "A Passonate SDE from INDIA.",
    categories: ['JS', 'TS', 'Tailwind', 'Kotlin'],
  });
  res.send(userdata);
});

router.get("/find", async function(req, res){
  let user = await userModel.find({username: "Ansh Singh Sonkhia"});
  res.send(user);
});
```

> `index.js` with `Case-Insensitive` Search

```js
router.get("/create", async function (req, res, next) {
  let userdata = await userModel.create({
    username: "Ansh Singh Sonkhia",
    nickname: "Nimmi",
    description: "A Passonate SDE from INDIA.",
    categories: ['JS', 'TS', 'Tailwind', 'Kotlin'],
  });
  res.send(userdata);
});

router.get("/find", async function(req, res){
  var regex = new RegExp("Ansh Singh Sonkhia", "i")
  let user = await userModel.find({username: regex});
  res.send(user);
});
```

- `^` - Shows the start
- `$` - Shows the end

```js
router.get("/find", async function(req, res){
  var regex = new RegExp("^Ansh$", "i")
  let user = await userModel.find({username: regex});
  res.send(user);
});
```

## How do I find documents where an array field contains all of a set of values?

> To find all data documents with people with category - `JS`

```js
router.get("/find", async function(req, res){
  let user = await userModel.find({categories: {$all: ['JS']}});
  res.send(user);
});
```

## How can I search for documents with a specific date range in Mongoose?

- `$gte` --> greater than equal to
- `$lte` --> less than equal to

```js
router.get("/find", async function(req, res){
  var date1 = new Date('2024-02-14');
  var date2 = new Date('2024-02-16');
  let user = await userModel.find({datecreated: {$gte: date1, $lte: date2}});
  res.send(user);
});
```

## How can I filter documents based on the existence of a field in Mongoose?

> All the documents which have field - `categories`

```js
router.get("/find", async function(req, res){
  let user = await userModel.find({categories: {$exists: true}});
  res.send(user);
});
```

## How can I filter documents based on a specific field's length in Mongoose?

> Find all people, within a specific field length

- $strLenCP --> String Length Compare


```js
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
```

# Authentication and Authorization

> passportjs - passportjs.org

## Follow these Steps

1. Install these packages:

```shell
npm i passport passport-local passport-local-mongoose mongoose express-session
```

2. Write app.js code in `app.js` file --> after `view engine` and before `logger`

```js
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "kuch bhi string as a secret code"
}))

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());
```

3. In `index.js` --> write this to require..

```js
const passport = require('passport');
const localStrategy = require("passport-local").Strategy;
passport.use(new localStrategy(userModel.authenticate()));
```

4. setup `users.js` properly

```js
const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/testingendgame2");

const userSchema = mongoose.Schema({
  username: String,
  nickname: String,
  description: String,
  categories: {
    type: Array,
    default: []
  },
  datecreated: {
    type: Date,
    default: Date.now()
  },
})

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);
```

5. In `index.js` try register first, and then other codes as well

## Protected Routes

- These are routes, which can not be accessed if the user is not login.
