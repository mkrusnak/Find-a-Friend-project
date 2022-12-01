
var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({apiKey: "TixMLTQk62JaZYlQUpy21cRiWZEMYTbLDjwDUINrsPVKDaiZOc", secret: "eTdZni6tWT3FSUKKpU19dFlTwAlHhxSbqZdNBgPM"});

const allOrgGetController = (req, res, next) => {
    client.organization.search({
        limit: 100
    })
    .then((response) => {
      let results = response.data.organizations
      res.render('organizations.hbs', {results})
    });
  }

  const orgByIdPostController = (req, res, next) => {
    client.organization.show(req.params.id)
    .then(response => {
      let results = response.data
      let hasImage = false;
      if (results.organization.photos.length) {
       hasImage = true;
      }
      res.render('organization-profile.hbs', {results, hasImage})
    })
    .catch(err => console.log(err))
  }

  const orgRedirectPostController = (req, res, next) => {
    res.redirect('/organizations')
  }

const orgByStatePostController = (req, res, next) => {
    client.organization.search({
      location: req.body.state,
      limit: 100
  })
    .then((response) => {
      // console.log(response.data)
      let results = response.data.organizations
      res.render('organizations.hbs', {results})
    });
  }

  const homeGetController = (req, res, next) => {
    res.render('index');
  }

  module.exports = { allOrgGetController, orgByIdPostController, orgRedirectPostController,
    orgByStatePostController, homeGetController}