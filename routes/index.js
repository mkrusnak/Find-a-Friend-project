
//////IMPORTS HERE///////

var express = require('express');

var router = express.Router();
const { loginGetController, signupGetController, signupPostController,
  loginPostController, logoutGetController} = require('../controllers/auth.controller');

const { readyCatController, readyPetController, readyDogController, readyBirdController,
   readyRabbitController } = require('../controllers/ready.controller');

const { allPetsGetController, searchPetsPostController, searchAllPetsPostController,
  petByIdController} = require ('../controllers/pets.controller');

const { marketGetController, marketAddGetController, marketAddPostController,
  marketEditPostController, marketEditGetController, marketDeletePostController} = require('../controllers/marketplace.controller')

const { allOrgGetController, orgByIdPostController, orgRedirectPostController,
  orgByStatePostController, homeGetController} = require('../controllers/organizations.controller')

const { isLoggedIn, isOwner} = require('../middlewares/auth.middleware');

const Item = require('../models/Item.model');

//// ALL THE ROUTES HERE/////

router.get('/mission', (req, res, next) => {
  res.render('stories.hbs')
})

router.get('/', homeGetController);

router.get('/login',  loginGetController);

router.get('/signup', signupGetController);

router.post('/login', loginPostController);

router.post('/signup', signupPostController);

router.get('/logout', logoutGetController);

router.get('/search', allPetsGetController);

router.post('/search/keys', searchPetsPostController);

router.post('/search/all', searchAllPetsPostController)  ;

router.post('/search/:id', petByIdController);

router.get('/readyforpet', readyPetController );

router.get('/readycat', readyCatController);

router.get('/readydog', readyDogController);

router.get('/readybird', readyBirdController);

router.get('/readyrabbit', readyRabbitController);

router.get('/marketplace', marketGetController);

router.post('/marketplace-add-new', isLoggedIn, marketAddGetController);

router.post('/marketplace-add', marketAddPostController);

router.post("/marketplace/:id/delete-item", isOwner, marketDeletePostController);

router.get("/marketplace/:id/edit-item", isOwner, marketEditGetController);

router.post("/marketplace/:id/edit-item", isOwner, marketEditPostController);

router.get('/organizations', allOrgGetController);

router.post('/search/organizations/:id', orgByIdPostController);

router.post('/organizations/all', orgRedirectPostController);

router.post("/organizations/bystate", orgByStatePostController);


//////EXPORTS//////

module.exports = router;

