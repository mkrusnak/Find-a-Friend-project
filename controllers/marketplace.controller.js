const Item = require('../models/Item.model');

const marketGetController = (req, res, next) => {
    // res.send(req.flash('message'))
    // req.flash('message')
    Item.find()
    .then(foundItems => {
      // console.log(foundItems)
      // res.send(req.flash('message'))
      res.render('marketplace/marketplace.hbs', {foundItems, message: req.flash('message')})
    })
  }

   /////

 const marketAddGetController = (req, res, next) => {
    res.render('marketplace/marketplace-add.hbs')
  }

 /////

const marketAddPostController = (req, res, next) => {
    Item.create({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
      contactEmail: req.session.user.email,
      seller: req.session.user.fullName
  })
  .then(() => {
      res.redirect('/marketplace')
  })
  }

 /////


const marketEditPostController = (req, res, next) => {
    let query;
    if(!req.body.name){
    query = {
      description : req.body.description,
      image: req.body.image,
      price: req.body.price
    }
    } else if(!req.body.image) {
    query = {
      description : req.body.description,
      name: req.body.name,
      price: req.body.price
    }
   } else if(!req.body.description) {
    query = {
      name : req.body.name,
      image: req.body.image,
      price: req.body.price
  } 
   } else if(!req.body.price) {
    query = {
      name : req.body.name,
      image: req.body.image,
      description: req.body.description
  } 
   } else {
    query = {
      name : req.body.name,
      description : req.body.description,
      image: req.body.image,
      price: req.body.price
   }
   }
    Item.findByIdAndUpdate(req.params.id, {
      name : req.body.name,
      description : req.body.description,
      image: req.body.image,
      price: req.body.price
   })
   .then(() => {
    res.redirect('/marketplace')
   })
   .catch(err => console.log(err))
    }


 /////


const marketEditGetController = (req, res, next) => {
    Item.findById(req.params.id)
    .then((foundItem) => {
       res.render('marketplace/marketplace-edit.hbs', {foundItem})
       })
       .catch(err => console.log(err))
      }


 /////      


const marketDeletePostController = (req, res, next) => {
    Item.findById(req.params.id)
      .then((foundItem) => {
          // console.log(foundItem);
          foundItem.delete();
          res.redirect('/marketplace');
      })
      .catch((err) => {
          console.log(err)
      })
  }

  

  module.exports = { marketGetController, marketAddGetController, marketAddPostController, marketEditPostController,
    marketEditGetController, marketDeletePostController}