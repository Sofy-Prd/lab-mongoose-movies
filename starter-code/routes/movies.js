const express = require('express');
const router  = express.Router();
const movie = require('../models/movie.js');
const celebrity = require('../models/celebrity.js');

router.get('/', (req, res, next) => {
  movie.find().then(function(movies){
    console.log('les films de la DB sont :', movies);
    res.render('movies/movies', {
      movies: movies
    });

  }).catch(function (err) {
    console.error(err);
    next(err);
  })
 
});

router.get('/new', (req, res, next) => {
  
  celebrity.find().then(function (celebrities) {

  res.render("movies/new", {celebrities});
  }).catch(function (err) {
    console.error(err);
    next(err);
  })
});


router.post('/new', (req, res, next) => {
  // je recupère les données reçues
  const title=req.body.title; //on peut utiliser req.body pcq on a intallé body parser
  const genre=req.body.genre;
  const plot=req.body.plot;
  const cast=req.body.cast;
  
  // je crée un nouveau document avec les données grace au modele
  movie.create ({
    title,
    genre,
    plot,
    cast
  }).then(function (movie){
    res.redirect('/movies');
    console.log('enregistrement effectué');

  }).catch(function (err) {
    console.error(err);
    next(err);
  })
});

router.get('/:movieid', function (req, res, next) {
  movie.findOne({_id: req.params.movieid})
  .populate('celebrity')
  .then(function (movie) {    
    res.render('movies/movie-details', {
      movie: movie
    });
  }).catch(err => console.error(err));

  
});


module.exports = router;