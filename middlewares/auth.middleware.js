
const Item = require('../models/Item.model')

// const flash = require('connect-flash');

const isLoggedIn = (req, res, nex) => {
    if(!req.session.user) {
        res.redirect('/login')
        return;
      }
      nex();
}

const isAnon = (req, res, nex) => {
    if(req.session.user) {
        res.redirect('/')
        return;
      }
      nex();
}

const isOwner = (req, res, next) => {
  Item.findById(req.params.id)
    .populate("contactEmail")
    .then((results) => {
      // console.log("RESULTS", results);
      // console.log("USER", req.session.user.email);
      // console.log("ITEM SELLER EMAIL", results.contactEmail);
      if (req.session.user.email !== results.contactEmail) {
        req.flash('message', 'Log in as seller to make changes')
        // res.render('marketplace.hbs')
        res.redirect('/marketplace')
        return;
        // return res.redirect('/marketplace', { errorMessage: 'Login as seller to delete!'})
      } 
         next();
    })
    .catch(err => console.log(err))
};

const isNotOwner = (req, res, next) => {
  Item.findById(req.params.id)
  .populate("contactEmail")
  .then((item) => {
      if(item.contactEmail !== req.session.user.email) {
          next()
      } else {
          res.render('marketplace.hbs')
      }
  }) 
  .catch((err) => {
      console.log(err)
  })
}





module.exports = { isLoggedIn, isAnon, isOwner, isNotOwner}
