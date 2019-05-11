var express = require('express');
var router = express.Router();
var db = require('../other/connectionDB');

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
    db.select().from('books').where('id', productId).then(function(book){
      if(Object.keys(book).length > 0){
        var product = book[0];
        cart.add(product, product.id);
        req.session.cart = cart;
        res.json({
          message: "Added!"
        });
      } else {
        next(new Error("No book found"));
      }
    });
  } else {
    res.json({
      message: "You are not logged! You have to log in if you want to add something to the cart."
    });
  }




});

router.delete('/', function(req, res, next){
  var toRemove = req.body.id;
  if(req.session.cart){
    var cart = new Cart(req.session.cart);
    if (toRemove in cart.items){
      cart.removeItem(toRemove);
      req.session.cart = cart;
      res.send("Item removed");
    } else {
      next(new Error("This book is not in your cart"));
    }
  } else{
    next(new Error("Cart empty"));
  }
});



//module.exports =
function Cart(oldCart){
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function(item, id){
    var storedItem = this.items[id];
    if (!storedItem){
      storedItem = this.items[id] = {item: item, qty: 0, price: 0};
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
  };

  this.removeItem = function(id){
    var storedItem = this.items[id];
    this.totalQty -= storedItem.qty;
    this.totalPrice -= storedItem.item.price * storedItem.qty;

    delete this.items[id];
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
