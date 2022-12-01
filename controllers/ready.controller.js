
const axios = require('axios')


const readyCatController = (req, res, next) => {
    axios.get('https://meowfacts.herokuapp.com/')
    .then((fact) => {
      console.log('HERE IS CAT FACT', fact.data)
      res.render('ready/readycat.hbs', {fact: fact.data})
    })
  }

  const readyPetController = (req, res, next) => {
    res.render('ready/ready.hbs')
  }


const readyDogController = (req, res, next) => {
    axios.get('http://dog-api.kinduff.com/api/facts?raw=true')
    .then((fact) => {
      // console.log("HERE IS DOG FACT", fact.data)
      res.render('ready/readydog.hbs', {fact: fact.data})
    }) 
    .catch(err => console.log(err))
  }
  

  const readyBirdController = (req, res, next) => {
    res.render('ready/readybird.hbs')
  }

  const readyRabbitController = (req, res, next) => {
    res.render('ready/readyrabbit.hbs')
  }
  


  module.exports = {readyCatController, readyPetController, readyDogController, readyBirdController, readyRabbitController }