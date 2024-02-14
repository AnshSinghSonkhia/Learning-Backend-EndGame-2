# Backend - EndGame (Part 2) - NodeJS

Learning what matters

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

## How do I find documents where an array field contains all of a set of values?

## How can I search for documents with a specific date range in Mongoose?

## How can I filter documents based on the existence of a field in Mongoose?

## How can I filter documents based on a specific field's length in Mongoose?

# Time-stamp: 41:10