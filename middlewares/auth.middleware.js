
const Item = require('../models/Item.model')

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
        res.render('marketplace.hbs')
      }
      next();
    });
};





module.exports = { isLoggedIn, isAnon, isOwner}
