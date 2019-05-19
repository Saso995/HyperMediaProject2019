var express = require('express');
var router = express.Router();
var queries = require('../other/queriesBook.js');
var reviews = require('../other/reviewQueries.js')

router.get('/', queries.getBooks);

router.get('/:id', queries.getBooksByID);

router.get('/:id/reviews', queries.myReviews);

router.get('/:id/reviews/score', queries.myReviewScore);

router.post('/:id/reviews', (req, res, next) => {
  req.sanitize('message').whitelist(['a-zA-Z0-9 !?:,.']);
  req.check('message', 'Review too short!').isLength({min: 40});
  var errors = req.validationErrors();
  if(req.signedCookies.user_id){
    if(!errors){
      reviews
      .getReview(req.params.id, req.signedCookies.user_id)
      .then(review => {
        console.log('review', review);
        if(!review){
          const review = {
            userid: req.signedCookies.user_id,
            bookid: req.params.id,
            message: req.body.message,
            rating: req.body.rating
          };
          reviews.create(review).then(id => {
            res.json({
              id,
              message: "Review Successfully inserted!"
            });
          });
        } else {
          res.json({
            message: "You already reviewed this book!"
          });
        }
      });
    } else {
      res.json({
        message: errors[0].msg
      });
    }
  }
  else {
    res.json({
      message: "You are not logged! You have to log in if you want to add a review."
    });
  }

});

router.get('/:id/similar/:idSimilar', queries.mySimilar);

router.get('/get/bestsellerMonth', queries.getBestSeller);

module.exports = router;
