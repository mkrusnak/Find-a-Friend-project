var express = require('express');
var router = express.Router();
const { loginGetController, signupGetController, signupPostController,
  loginPostController, logoutGetController} = require('../controllers/auth.controller')

const {isLoggedIn, isAnon} = require('../middlewares/auth.middleware')

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
//   type: "Cat",
//   breed: "Domestic Short Hair",
//   location: "Tampa, FL"
// })
// .then((response) => {
//   let dogs = response.data.animals
//   // res.render(dogs)
//   res.send(dogs)
//   console.log(dogs)
// })
//     .catch((err) => {
//        console.log(err)
//     });
// })

router.get('/search', (req, res, next) => {
  res.render('search.hbs')
})

router.post('/search', (req, res, next) => {
  client.animal.search({
    type: req.body.petType,
    breed: req.body.breed,
    location: req.body.state
  })
  .then((response) => {
  
    let results = response.data.animals
    // console.log('LOOK HERE', results)
    res.render('search-results.hbs', {results} )
  })
  .catch(err => console.log(err))
})

router.get('/organizations', (req, res, next) => {
  client.organization.search()
  .then((response) => {
    let results = response.data.organizations
    res.render('organizations.hbs', {results})
  });
})

router.post('/search/:id', (req, res, next) => {
  client.animal.show(req.params.id)
  .then(response => {
    // console.log(req.params.id)
    let results = response.data.animal
    //  console.log('HERE IS FOUND PET', results)
    res.render('pet-profile.hbs', {results: results, postedOn: results.published_at.toLocaleString("en-US")})
  })
  .catch(err => console.log(err))
})

router.post('/search/organizations/:organization_id', (req, res, next) => {
  client.organization.show(req.params.organization_id)
  .then(response => {
    // console.log(req.params.organization_id)
    let results = response.data.organization
     console.log('HERE IS FOUND ORGANIZATION', results.photos[0].full)
    res.render('organization-profile.hbs', {results})
  })
  .catch(err => console.log(err))
})


// router.get('/test', (req, res, next) => {
//   client.animalData.breeds('cat')
//   .then(response => {
//     let results = response.data.breeds
//     console.log(results)
//     res.send(results)
//   })
//   .catch(err => console.log(err))
// })

// router.get('/about', (req, res, next) => { 
//   petfinder.getBreedList( "Cat", (err, result) => {
//    console.log(result)
//    return result
//   })
//   .then((result) => {
//     res.send('ok')
//     console.log(result)
//   })
//   .catch(err => console.log(err))
// })
 



module.exports = router;
