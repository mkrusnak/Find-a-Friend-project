var express = require('express');
var router = express.Router();
const { loginGetController, signupGetController, signupPostController,
  loginPostController, logoutGetController} = require('../controllers/auth.controller')

const {isLoggedIn, isAnon, isOwner} = require('../middlewares/auth.middleware')

const axios = require('axios')

const Item = require('../models/Item.model')

var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({apiKey: "TixMLTQk62JaZYlQUpy21cRiWZEMYTbLDjwDUINrsPVKDaiZOc", secret: "eTdZni6tWT3FSUKKpU19dFlTwAlHhxSbqZdNBgPM"});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login',  loginGetController)

router.get('/signup', signupGetController)

router.post('/login', loginPostController)

router.post('/signup', signupPostController)

router.get('/logout', logoutGetController);

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
  client.animal.search({
    limit: 100
  })
  .then((response) => {
  
    let results = response.data.animals
    console.log('LOOK HERE', results)
    res.render('search-results.hbs', {results: results} )
  })
  .catch(err => console.log(err))
})

router.post('/search/keys', (req, res, next) => {
  client.animal.search({
    type: req.body.petType,
    breed: req.body.breed,
    location: req.body.state,
    limit: 100
  })
  .then((response) => {
  
    let results = response.data.animals
    // console.log('LOOK HERE', results.contact.address.state)
    res.render('search-results.hbs', {results: results} )
  })
  .catch(err => console.log(err))
})

router.post('/search/all', (req, res, next) => {
  res.redirect('/search')
})



router.get('/organizations', (req, res, next) => {
  client.organization.search()
  .then((response) => {
    // console.log(response.data)
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
    res.render('pet-profile.hbs', {results: results, postedOn: results.published_at})
  })
  .catch(err => console.log(err))
})

// router.post('/search/organizations/:organization_id/pet', (req, res, next) => {
//   client.organization.show(req.params.organization_id)
//   .then(response => {
//     // console.log( 'HEREHEREHERE' , req.params.organization_id)
//     let results = response.data.organization
//     let hasImage = false;
//    if (results.organization.photos.length) {
//     hasImage = true;
//    }
//     //  console.log('HERE IS FOUND ORGANIZATION', results)
//     res.render('organization-profile.hbs', {results, hasImage})
//   })
//   .catch(err => console.log(err))
// })


router.post('/search/organizations/:id', (req, res, next) => {
  client.organization.show(req.params.id)
  .then(response => {
    // console.log('HEREHERE', req.params.organization_id)
    let results = response.data
    let hasImage = false;
    if (results.organization.photos.length) {
     hasImage = true;
    }
// console.log(results, hasImage)

    //  console.log('HERE IS ORGANIZATION', results.animals)
    res.render('organization-profile.hbs', {results, hasImage})
  })
  .catch(err => console.log(err))
})



router.get('/readyforpet', (req, res, next) => {
  res.render('ready/ready.hbs')
})

router.get('/readycat', (req, res, next) => {
  axios.get('https://meowfacts.herokuapp.com/')
  .then((fact) => {
    console.log('HERE IS CAT FACT', fact.data)
    res.render('ready/readycat.hbs', {fact: fact.data})
  })
  
})

router.get('/readydog', (req, res, next) => {
  axios.get('http://dog-api.kinduff.com/api/facts?raw=true')
  .then((fact) => {
    console.log("HERE IS DOG FACT", fact.data)
    res.render('ready/readydog.hbs', {fact: fact.data})
  }) 
  .catch(err => console.log(err))
})

router.get('/readybird', (req, res, next) => {
  res.render('ready/readybird.hbs')
})

router.get('/readyrabbit', (req, res, next) => {
  res.render('ready/readyrabbit.hbs')
})

router.get('/marketplace', (req, res, next) => {
  Item.find()
  .then(foundItems => {
    console.log(foundItems)
    res.render('marketplace.hbs', {foundItems})
  })
})



router.post('/marketplace-add-new', isLoggedIn, (req, res, next) => {
  res.render('marketplace-add.hbs')
})


router.post('/marketplace-add', (req, res, next) => {
  Item.create({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price,
    contactEmail: req.session.user.email,
    seller: req.session.user.fullName
})
.then((results) => {
    res.redirect('/marketplace')
})
})


router.post("/marketplace/:id/delete-item", isOwner, (req, res, next) => {
  Item.findById(req.params.id)
    .then((foundItem) => {
        console.log(foundItem);
        foundItem.delete();
        res.redirect('/marketplace');
    })
    .catch((err) => {
        console.log(err)
    })
})


router.post("/organizations/bystate", (req, res, next) => {
  client.organization.search({
    location: req.body.state
})
  .then((response) => {
    console.log(response.data)
    let results = response.data.organizations
    res.render('organizations.hbs', {results})
  });
})




// router.get('/test', (req, res, next) => {
//   client.animalData.breeds('rabbit')
//   // client.animal.search()
//   .then(response => {
//     let results = response.data.breeds
//     console.log("HEREHEREHERE", {results})
//     res.render('test.hbs', {results})
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
