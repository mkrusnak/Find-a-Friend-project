

const bcryptjs = require('bcryptjs')

const User = require('../models/User.model');



const signupGetController = (req, res, next) => {
    res.render('signup.hbs');
};

const loginGetController = (req, res, next) => {
    res.render('login.hbs');
};

const signupPostController = (req, res, next) => {
    console.log(req.body)
 if (!req.body.email || !req.body.password || !req.body.fullName) {
    res.render('signup.hbs', {errorMessage : "Sorry you can't have empty fields!"});
    return;
 }

 User.findOne({email: req.body.email})
 .then(foundUser => {
    if (foundUser) {
        res.render('signup.hbs', { errorMessage : 'Sorry, user with this email already exists'})
        return;
    }
    const hashedPassword = bcryptjs.hashSync(req.body.password)

    return User.create({
        email: req.body.email,
        password: hashedPassword,
        fullName: req.body.fullName
    })
 })
  .then((user) => {
    console.log('New user was created', user);
    res.render('login.hbs', {errorMessage : "You can now log in to your new account!"});
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
};

const loginPostController = (req, res, next) => {
    if(!req.body.email || ! req.body.password) {
        res.render('login.hbs', { errorMessage: 'Sorry you forgot email or password.'});
        return;
    }

    User.findOne({email: req.body.email})
    .then( foundUser => {
        if(!foundUser) {
            res.render('login.hbs', { errorMessage: 'Sorry user does not exist!'})
                return;
        }
         
        const isPasswordCorrect = bcryptjs.compareSync(req.body.password, foundUser.password)

        if(!isPasswordCorrect) {
            res.render('login.hbs', { errorMessage : "Sorry, wrong password. Try again!"})
            return;
        }

        req.session.user = foundUser;

        console.log('HERE', foundUser)

        res.redirect('/')
    })
    .catch(err => {
        console.log(err)
        // res.send(err)
    })
};


const logoutGetController = (req, res, next) => {
    req.session.destroy()
    // console.log(foundUser)
    res.redirect('/')
}


module.exports = { loginGetController, signupGetController, signupPostController,
     loginPostController, logoutGetController}