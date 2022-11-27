var express = require('express');
var router = express.Router();
const { loginGetController, signupGetController, signupPostController,
  loginPostController, logoutGetController} = require('../controllers/auth.controller')

const {isLoggedIn, isAnon} = require('../middlewares/auth.middleware')

var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
const fp = require('lodash/fp');

// Load method categories.
const array = require('lodash/array');
const object = require('lodash/fp/object');



var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({apiKey: "TixMLTQk62JaZYlQUpy21cRiWZEMYTbLDjwDUINrsPVKDaiZOc", secret: "eTdZni6tWT3FSUKKpU19dFlTwAlHhxSbqZdNBgPM"});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', isAnon, loginGetController)

router.get('/signup', isAnon, signupGetController)

router.post('/login', isAnon, loginPostController)

router.post('/signup', isAnon, signupPostController)

router.get('/logout', isLoggedIn, logoutGetController);

// router.get('/about', (req, res, next) => { 
// client.animal.search({
//   type: "Dog",
//   breed: "Shepherd",
//   // location: "NY",
//   contact: {address: "NY"},
//   limit: 5
// })
// .then((response) => {
//   let dogs = response.data.animals
//   res.render('cats.hbs', {dogs} )
//   res.send(dogs)
//   console.log(dogs)
// })
//     .catch((err) => {
//        console.log(err)
//     });
// })

router.get('/about', (req, res, next) => { 
  client.animalData.type("Cat")
  .then(response => {
    console.log(response.data)
    res.send(response.data)
  })
   .catch(err => console.log(err))
})



module.exports = router;
