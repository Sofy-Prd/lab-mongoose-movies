const express = require('express');
const router  = express.Router();
const celebrity= require('../models/celebrity.js');


router.get('/', (req, res, next) => {
  celebrity.find().then(function(celebrities){
    console.log('les celebrités de la DB sont :', celebrities);
    res.render('celebrities', {
      celebrities:celebrities
    });

  }).catch(function (err) {
    console.error(err);
    next(err);
  })
 
});

router.get('/new', (req, res, next) => {
  res.render("celebrityNew");
});


router.post('/new', (req, res, next) => {
  // je recupère les données reçues
  const name=req.body.name; //on peut utiliser req.body pcq on a intallé body parser
  const occupation=req.body.occupation;
  const catchPhrase=req.body.catchPhrase;
  
  // je crée un nouveau document avec les données grace au modele
  celebrity.create ({
    name,
    occupation,
    catchPhrase
  }).then(function (celebrity){
    res.redirect('/celebrities');
    console.log('enregistrement effectué');

  }).catch(function (err) {
    console.error(err);
    next(err);
  })
  
});

router.get('/delete', function (req, res, next) {
  const id= req.query.celebrity_id;
  celebrity.findById(id).then(function(celebrity){
    res.render('celebrities');
  }).catch(err=>next(err));

});

router.post('/delete', function (req, res, next) {
 
  celebrity.findByIdAndRemove({_id:req.query.celebrity_id})
    .then(function () {
      res.redirect('/celebrities')

    }).catch(err=> next(err))


})

router.get('/edit', function (req, res, next) {
  const id= req.query.celebrity_id;
  celebrity.findById(id).then(function(celebrity){
    res.render('celebrityEdit', {
      celebrity:celebrity
    });
  }).catch(err=>next(err));

});

router.post('/edit', function (req, res, next) {
 
  celebrity.update({_id:req.query.celebrity_id}, {$set :{
      name: req.body.name,
      occupation:req.body.occupation,
      catchPhrase:req.body.catchPhrase
    
    }}). then(function () {
      res.redirect('/celebrities')

    }).catch(err=> next(err))


})


  

router.get('/:celebrityId', function (req, res, next) {
  celebrity.findOne({_id: req.params.celebrityId}).then(function (celebrity) {

    res.render('celebrity-details', {
      celebrity:celebrity
    });
  }).catch(err => console.error(err));

  
});

module.exports = router;