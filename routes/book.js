var express = require('express');
var router = express.Router();
var queries = require('../other/queriesBook.js');
var reviews = require('../other/reviewQueries.js')

router.get('/', queries.getBooks);

router.get('/:id', queries.getBooksByID);

router.get('/:id/reviews', queries.myReviews);

router.post('/:id/reviews', (req, res, next) => {
  req.sanitize('message').whitelist(['a-zA-Z0-9 !?:,.']);
  req.check('message', 'Review too short!').isLength({min: 40});
  var errors = req.validationErrors();
  if(!errors && req.signedCookies.user_id){
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
        next(new Error("You already reviewed this book!"))
      }
    });
  } else {
    res.json(errors);
  }
});

module.exports = router;
