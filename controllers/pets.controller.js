
var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({apiKey: process.env.PET_API_KEY, secret: process.env.PET_API_SECRET});


/////


const allPetsGetController = (req, res, next) => {
    client.animal.search({
      limit: 100
    })
    .then((response) => {
      let results = response.data.animals
      // console.log('before', results.slice(10))
      results = results.filter(el => el.primary_photo_cropped?.medium)
      // console.log('after', results.slice(10))
      res.render('search-results.hbs', {results: results, message: req.flash('message')} )
    })
    .catch(err => console.log(err))
  }


  /////


const searchPetsPostController = (req, res, next) => {
    let query;
    if(!req.body.state){
    query = {
      type: req.body.petType,
      breed: req.body.breed,
      limit: 100
    }
    } else if(!req.body.breed) {
    query = {
      type: req.body.petType,
      location: req.body.state,
      limit: 100
    }
   } else {
    query = {
      type: req.body.petType,
      breed: req.body.breed,
      location: req.body.state,
      limit: 100
  } }
  client.animal.search(query)
    .then((response) => {
      let results = response.data.animals
      if (results.length == 0) {
        req.flash('message', "Nothing here. Try again in couple days!")
        res.redirect('/search')
      } 
      res.render('search-results.hbs', { results: results })
    })
    .catch(err => console.log(err))
  }


 /////


const searchAllPetsPostController = (req, res, next) => {
    res.redirect('/search')
  }

 /////


const petByIdController = (req, res, next) => {
    client.animal.show(req.params.id)
    .then(response => {
      let results = response.data.animal
      let hasImage = false;
      if (results.photos.length) {
       hasImage = true;
      }
    //    console.log('HERE IS FOUND PET', results, 'HAS IMAGE', hasImage)
      res.render('pet-profile.hbs', {results: results, postedOn: results.published_at, hasImage})
    })
    .catch(err => console.log(err))
  }





module.exports = { allPetsGetController, searchPetsPostController, searchAllPetsPostController, petByIdController}