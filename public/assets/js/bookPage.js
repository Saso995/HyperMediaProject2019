//extrapolate query parameters
var key = '';
if(window.location.search){
  var queryString = new Array();
  var params = window.location.search.split('?')[1].split('&');
  key = params[0].split(/[a-zA-Z<>%&£:-_;!()|${}?"'.,\/ -]/)[0];

}

//fill page
$(document).ready(() => {
//load stuff about the book
  if (key){
  $.ajax({
      url: '../../book/' + key,
      type: 'GET',
      dataType : 'json', // this URL returns data in JSON format
      success: (data) => {
        $('#book-title').html(data.book[0].title);
        $('#price').html(data.book[0].price+'€');
        $('#description').html(data.book[0].description);
        $('#pages').html(data.book[0].pages);
        $('#genre').html(data.book[0].genre);
        $('#isbn').html(data.book[0].isbn);
        $("#img").attr('src','https://bova-colombo-hyp2019.herokuapp.com/resources/books/' + data.book[0].id + '.jpg');
        $('#authorName').html(data.authorName);
        $("#authorName").attr('href','https://bova-colombo-hyp2019.herokuapp.com/pages/authorPage.html?' + data.book[0].authorid);
        var d = data.book[0].publicationdate;
        var onlyD = d.substr(0, 10);
        $('#publicationDate').html(onlyD);
        let similarType = data.book[0].similar_type;
        fillSimilar(similarType);
      },
      error: (data) => {
        let dialog = new Messi ("What the hell are you looking for?!",{
            animate: { open: 'bounceInLeft', close: 'bounceOutRight' }, modal: true,
            buttons: [{id: 0, label: 'Ok'}],
            callback: function() { window.location.replace("https://bova-colombo-hyp2019.herokuapp.com"); }
          }
        );
      }
    });
  }
  else{
    window.location.replace("https://bova-colombo-hyp2019.herokuapp.com");
  }

  //fills book's Events
  $.ajax({
    url: '../../event/book/' + key,
    type: 'GET',
    dataType : 'json', // this URL returns data in JSON format
    success: (data) => {
      console.log(data)
      for(var i in data) {
        let toAppend = "<li><a href='https://bova-colombo-hyp2019.herokuapp.com/pages/eventPage.html?" + data[i].id + "' >" + data[i].location+ "</a>"+ " "+ data[i].date+ "</li>";
        $("ol").append(toAppend);
      }
    },
    error: (data) => {
      $("ol").append(data.responseText);
    }
  });

  //function to display all the similar books
  function fillSimilar(similarType) {
      //fetch info about similar books
      $.ajax({
        url: '../../book/' + key + '/similar/' + similarType,
        type: 'GET',
        dataType : 'json', // this URL returns data in JSON format
        success: (data) => {
          var count = 0;
          for (var i in data){
            let img_path = 'https://bova-colombo-hyp2019.herokuapp.com/resources/books/'+data[i].id+'.jpg';
            let title = data[i].title;
            let price = data[i].price;
            let idBook = data[i].id;
            let linkBook = 'https://bova-colombo-hyp2019.herokuapp.com/pages/bookPage.html?' + idBook;
            //fetch rating about similar books and fills the html page dynamically
            $.ajax({
              url: '../../book/' + data[i].id + '/reviews/score',
              type: 'GET',
              dataType : 'json', // this URL returns data in JSON format
              success: (avg) => {
                let nblack = 5 - avg[0].avg;
                let yellowStar = '<li class="list-inline-item"><i class="text-warning fa fa-star"></i></li>';
                let blackStar = '<li class="list-inline-item"><i class="text-warning fa fa-star-o"></i></li>';
                let totalYellow = ``;
                let totalBlack = ``;
                for (let white = avg[0].avg; white > 0 ; white--){
                  totalYellow += yellowStar;
                }
                for (nblack; nblack > 0 ; nblack--){
                  totalBlack += blackStar
                }
                function similar(id) {
                  $(id).append(`
                    <div class="col-sm-3">
                      <div class="thumb-wrapper">
                        <div class="img-box">
                          <img src="${img_path}" class="img-responsive img-fluid"  alt="">
                        </div>
                        <div class="thumb-content">
                          <h4><a href=${linkBook}>${title}</a></h4>
                          <p class="item-price"><span>${price}€</span></p>
                          <div class="star-rating">
                            <ul class="list-inline">
                            ${totalYellow+totalBlack}
                            </ul>
                          </div>
                          <button class="add-prod-btn btn-success" id="add${idBook}"><i class="fa fa-cart-plus" aria-hidden="true"></i> Add to cart</button>
                        </div>
                      </div>
                    </div>
                  `);
                }
                if (count < 4){
                  similar("#carousel1Row");
                  count++;
                }
                else if(count > 3 && count < 8){
                  similar("#carousel2Row");
                  count++;
                }
                else if(count > 7 && count < 11){
                  similar("#carousel3Row")
                  count++;
                }
              }
            });
          }
        }
      });
  }

  //display reviews
  $.ajax({
    url: '../../book/' + key + '/reviews',
    type: 'GET',
    dataType : 'json', // this URL returns data in JSON format
    success: (data) => {
      var count = Object.keys(data).length;
      for(var i in data) {
        //add stars
        let nblack = 5 - data[i].review.rating;
        let yellowStar= "<span class='float-left'><i class='text-warning fa fa-star'></i></span>";
        let blackStar= "<span class='float-left'><i class='text-secondary fa fa-star'></i></span>";
        let totalYellow = ``;
        let totalBlack = ``;
        for (let white = data[i].review.rating; white > 0 ; white--){
          totalYellow += `<span class="float-left"><i class="text-warning fa fa-star"></i></span>`;
        }
        for (nblack; nblack > 0 ; nblack--){
          totalBlack += `<span class="float-left"><i class="text-secondary fa fa-star"></i></span>`
        }
        let hr;
        if (count == 1)
          hr = "";
        else {
          hr = "<hr>";
        }

        //fill reviews
        $('#allReviews').append(`
          <div class="card-body">
    	        <div class="row">
            	    <div class="col-md-2">
            	        <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded rounded mx-auto d-block img-fluid" style="width: 100px; height: 100px";/>
            	        <p class="text-secondary text-center">${data[i].username}</p>
            	    </div>
            	    <div class="col-md-10">
            	        <p>
            	            ${totalYellow+totalBlack}
            	       </p>
            	       <div class="clearfix"></div>
            	        <p>${data[i].review.message}</p>
            	    </div>
    	        </div>
    	    </div>
          ${hr}
        `);
        count--;
      }
    },
    error: (data) => {
      console.log(data.responseText);
    }
  });

  //to change login button into logout
    if(doesHttpOnlyCookieExist('user_id')){
      $('#status').html('logged');
      $('#loginButton').html('Log out');
      $("#loginButton").attr("id", "logoutButton");

      $("#logoutButton").unbind("click").click(function () {
        $.ajax({
          url: '../../auth/logout',
          type: 'POST',
          dataType : 'json',
          success: (data) => {
            let dialog = new Messi (data.message,{
                animate: { open: 'bounceInLeft', close: 'bounceOutRight' }, modal: true,
                buttons: [{id: 0, label: 'Ok'}],
                callback: function() { location.reload(); }
              }
            );
            $('#loginButton').html('Login');
            $("#loginButton").attr("id", "loginButton");
          },
          error: (data) => {
            let dialog = new Messi (data.message,{
                animate: { open: 'bounceInLeft', close: 'bounceOutRight' },
                buttons: [{id: 0, label: 'Ok'}]
              }
            );
          }
        });
      });
    }
});
//keep updated the number of stars
let nowStars;
$('#starInput input').on('change', function() {
  nowStars = ($('input[name=rating]:checked', '#starInput').val());
});
//post review
$('#adReviwButton').click(() => {
  if(nowStars){
    $.ajax({
      url: '../../book/' + key + '/reviews',
      type: 'POST',
      data:{
        "message" : $('#textarea').val(),
        "rating": nowStars
      },
      dataType : 'json', // this URL returns data in JSON format
      success: (data) => {
        let dialog = new Messi (data.message,{
            animate: { open: 'bounceInLeft', close: 'bounceOutRight' }, modal: true,
            buttons: [{id: 0, label: 'Ok'}],
            callback: function() { if (data.message === "Review Successfully inserted!"){location.reload();}}
          }
        );
      }
    });
  }
  else{
    let dialog = new Messi ("You have to select a number of stars",{
        animate: { open: 'bounceInLeft', close: 'bounceOutRight' },
        buttons: [{id: 0, label: 'Ok'}]
      }
    );
  }
});
//add to cart
$('#adButton').click(() => {
  $.ajax({
    url: '../../cart',
    type: 'POST',
    data: {
      'id': key
    },
    dataType : 'json',
    success: (data) => {
      let dialog = new Messi (data.message,{
          animate: { open: 'bounceInLeft', close: 'bounceOutRight' },
          buttons: [{id: 0, label: 'Ok'}]
        }
      );
    },
    error: (data) => {
      console.log(JSON.stringify(data));
    }
  });
});

$(document).on('click', "[id^=add]", function(){
    let id = this.id.slice(3);
    $.ajax({
      url: '../../cart',
      type: 'POST',
      data: {
        'id': id
      },
      dataType : 'json',
      success: (data) => {
        let dialog = new Messi (data.message,{
            animate: { open: 'bounceInLeft', close: 'bounceOutRight' },
            buttons: [{id: 0, label: 'Ok'}]
          }
        );
      },
      error: (data) => {
        console.log(JSON.stringify(data));
      }
    });
});

$('#loginButton').click(()=>{
  window.location.replace("https://bova-colombo-hyp2019.herokuapp.com/pages/loginPage.html");
});

$('#cartButton').click(()=>{
  window.location.replace("https://bova-colombo-hyp2019.herokuapp.com/pages/cartPage.html");
});

$('#searchButton').click(() => {
  if ($('#searchBox').val()){
    var url = './books.html?' + encodeURIComponent($('.selection').val()) + '=' + encodeURIComponent($('#searchBox').val());
    window.location.href = url;
  } else {
    var url = './books.html';
    window.location.href = url;
  }
});


function doesHttpOnlyCookieExist(cookiename) {
   var d = new Date();
   d.setTime(d.getTime() + (1000));
   var expires = "expires=" + d.toUTCString();

   document.cookie = cookiename + "=new_value;path=/;" + expires;
   if (document.cookie.indexOf(cookiename + '=') == -1) {
       return true;
    } else {
       return false;
    }
}
