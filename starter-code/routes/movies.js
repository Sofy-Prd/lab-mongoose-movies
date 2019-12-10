const express = require('express');
const router  = express.Router();
const movie = require('../models/movie.js');
const celebrity = require('../models/celebrity.js');

router.get('/', (req, res, next) => {
  movie.find().then(function(movies){
    // console.log('les films de la DB sont :', movies);
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

router.get('/delete', function (req, res, next) {
  const id= req.query.movie_id;
  movie.findById(id).then(function(movieid){
    res.render('movies');
  }).catch(err=>next(err));

});

router.post('/delete', function (req, res, next) {
  movie.findByIdAndRemove({_id:req.query.movie_id})
  .then(function () {
      res.redirect('/movies')
    }).catch(err=> next(err))
})

router.get('/edit', function (req, res, next) {
  const id= req.query.movie_id;

   movie.findById(id)
  .populate('cast')
  .then(function(movie){
    res.render('movies/edit', {
      movie:movie
    });
  }).catch(err=>next(err));

});

router.post('/edit', function (req, res, next) {
   movie.update({_id:req.query.movie_id}, {$set :{
      title: req.body.title,
      genre:req.body.genre,
      plot:req.body.plot,
      cast:req.body.plot
    }}). then(function () {
      res.redirect('/movies')

    }).catch(err=> next(err))
})

router.get('/:movieid', function (req, res, next) {
  movie.findOne({_id: req.params.movieid})
  .populate('cast')
  .then(function (movie) {    
    res.render('movies/movie-details', {
      movie: movie
    });
  }).catch(err => console.error(err));
 
});


module.exports = router;