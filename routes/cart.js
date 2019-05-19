var express = require('express');
var router = express.Router();
var db = require('../other/connectionDB');
var authorQueries = require('../other/authorQueries.js');

router.get('/', function(req, res) {
  if(req.session.cart){
    res.send(req.session.cart);
  } else{
    res.json({ text: "Cart empty, add a book!" })
  }
});

router.get('/checkout', function(req, res, next){
  res.json({ text: "You are checking out!" })
});


router.post('/', function(req, res, next){
  if(req.signedCookies.user_id){
    var productId = req.body.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    db.select('id','title','authorid','price').from('books').where('id', productId).then(function(book){  //modificato a lezione CONTROLLARLO
      authorQueries.getName(book[0].authorid).then(function(authorName){
        if(Object.keys(book).length > 0){
          var product = book[0];
          cart.add(product, product.id, authorName);
          req.session.cart = cart;
          res.json({
            message: "Added!"
          });
        } else {
          next(new Error("No book found"));
        }
      });
    });
  } else {
    res.json({
      message: "You are not logged! You have to log in if you want to add something to the cart."
    });
  }
});


router.delete('/', function(req, res, next){
  if(req.session.cart){
      req.session.destroy();
      res.json({
        message: "Cart emptied!"
      });
    } else {
      res.json({
        message: "There are no books in your cart"
      });
    }
});

router.delete('/:id', function(req, res, next){
  var toRemove = req.params.id;
  if(req.session.cart){
    var cart = new Cart(req.session.cart);
    if (toRemove in cart.items){
      cart.removeAllItem(toRemove);
      req.session.cart = cart;
      if(req.session.cart.totalQty === 0)
        req.session.destroy();
      res.json({
        message: "Successfully removed!"
      });
    } else {
      res.json({
        message: "This book is not in your cart"
      });
    }
  } else{
    res.json({
      message: "cart empty!"
    });
  }
});

router.patch('/:id', function(req, res, next){
  var toRemove = req.params.id;
  if(req.session.cart){
    var cart = new Cart(req.session.cart);
    if (toRemove in cart.items){
      cart.removeItem(toRemove);
      req.session.cart = cart;
      if(req.session.cart.totalQty === 0)
        req.session.destroy();
      res.json({
        message: "Successfully removed!"
      });
    } else {
      res.json({
        message: "This book is not in your cart"
      });
    }
  } else{
    res.json({
      message: "cart empty!"
    });
  }
});



//module.exports =
function Cart(oldCart){
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;
  this.authors = oldCart.authors || {};

  this.add = function(item, id, authorName){
    var storedItem = this.items[id];
    var storedAuthor = this.items[id];
    if (!storedItem){
      storedItem = this.items[id] = {item: item, qty: 0, price: 0};
      storedAuthor = this.authors[id] = {name: authorName}
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
  };

  this.removeAllItem = function(id){
    var storedItem = this.items[id];
    this.totalQty -= storedItem.qty;
    this.totalPrice -= storedItem.item.price * storedItem.qty;

    delete this.items[id];
  }

  this.removeItem = function(id){
    var storedItem = this.items[id];
    if (storedItem.qty > 1){
      var oldQuantity = storedItem.qty;
      var oldPrice = storedItem.price;
      storedItem.qty--;
      storedItem.price = storedItem.item.price *storedItem.qty;
      this.totalQty = this.totalQty - (oldQuantity - storedItem.qty);
      this.totalPrice -= (oldPrice-storedItem.price);
    }
    else{
      this.removeAllItem(id);
    }
  }

  this.generateArray = function(){
    var arr = [];
    for (var id in this.items){
      arr.push(this.items[id]);
    }
    return arr;
  };
};

module.exports = router;
