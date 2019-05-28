$(document).ready(() => {
  var key = '';
  if(window.location.search){
    var queryString = new Array();
    var params = window.location.search.split('?')[1].split('&');
    key = params[0].split(/[a-zA-Z<>%&£:-_;!()|${}?"'.,\/ -]/)[0];
  }
  if (key){
    $.ajax({
      url: '../../author/' + key,
      type: 'GET',
      dataType : 'json', // this URL returns data in JSON format
      success: (data) => {
        $('#author-name').html(data.author[0].name);
        $('#bio').html(data.author[0].bio);
        $("#img").attr('src','https://bova-colombo-hyp2019.herokuapp.com/resources/authors/' + data.author[0].id + '.jpg');
        //to add dinamically the carousel
        var numberOfBooks = data.myBooks.length;
        var limitPerCarousel = 4;
        if(numberOfBooks % 4 == 0){
          var totalPages = Math.floor(numberOfBooks / limitPerCarousel);
        }
        else{
          var totalPages = Math.floor(numberOfBooks / limitPerCarousel)+1;
        }
        $('#myCarousel .carousel-inner').eq(0).append(`
            <div class="item carousel-item active">
              <div class="row" id="carousel1Row">
              </div>
            </div>
        `)
        for (let j= 2; j <= totalPages; j++){
          $('#myCarousel .carousel-inner').eq(0).append(`
            <div class="item carousel-item">
    					<div class="row" id="carousel${j}Row">
    					</div>
    				</div>
          `)
        }
        //to add books
        var count = 0;
        for (var i in data.myBooks){
          let idBook = data.myBooks[i].id;
          let img_path = 'https://bova-colombo-hyp2019.herokuapp.com/resources/books/'+idBook+'.jpg';
          let title = data.myBooks[i].title;
          let price = data.myBooks[i].price;
          let linkBook = 'https://bova-colombo-hyp2019.herokuapp.com/pages/bookPage.html?' + idBook;
          $.ajax({
            url: '../../book/' + idBook + '/reviews/score',
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
                        <img src="${img_path}" class="img-responsive img-fluid"  alt="book's cover">
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
              else if(count > 7 && count <= 11){
                similar("#carousel3Row")
                count++;
              }
            }
          });
        }
      },
      error: (data) => {
        //alert("What the hell are you looking for?!");
        let dialog = new Messi ("What the hell are you looking for?!",{
            animate: { open: 'bounceInLeft', close: 'bounceOutRight' }, modal: true,
            buttons: [{id: 0, label: 'Ok'}],
            callback: function() { window.location.replace("https://bova-colombo-hyp2019.herokuapp.com"); }
          }
        );
      }
    });
  }
  else {
    window.location.replace("https://bova-colombo-hyp2019.herokuapp.com");
  }

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
            //alert((JSON.stringify(data.message)));
            let dialog = new Messi (data.message,{
                animate: { open: 'bounceInLeft', close: 'bounceOutRight' }, modal: true,
                buttons: [{id: 0, label: 'Ok'}],
                callback: function() { location.reload(); }
              }
            );
            $('#loginButton').html('Login');
            $("#loginButton").attr("id", "loginButton");
            //location.reload();
          },
          error: (data) => {
            //alert((JSON.stringify(data.message)));
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

$('#searchButton').click(() => {
  if ($('#searchBox').val()){
    var url = './books.html?' + encodeURIComponent($('.selection').val()) + '=' + encodeURIComponent($('#searchBox').val());
    window.location.href = url;
  } else {
    var url = './books.html';
    window.location.href = url;
  }
});

$('#loginButton').click(()=>{
  window.location.replace("https://bova-colombo-hyp2019.herokuapp.com/pages/loginPage.html");
});

$('#cartButton').click(()=>{
  window.location.replace("https://bova-colombo-hyp2019.herokuapp.com/pages/cartPage.html");
});

$(document).on('click', "[id^=add]", function(){
    let id = this.id.slice(3);
    let wholeId = this.id;
    $.ajax({
      url: '../../cart',
      type: 'POST',
      data: {
        'id': id
      },
      dataType : 'json',
      success: (data) => {
        setTooltip(wholeId, data.message);
        hideTooltip(wholeId);
      },
      error: (data) => {
        console.log(JSON.stringify(data));
      }
    });
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

//for tooltips
$('button').tooltip({
  trigger: 'click',
  placement: 'right'
});

function setTooltip(id, message) {
  let complId = "#"+id;
  $(complId).tooltip('hide')
    .tooltip('enable')
    .attr('data-original-title', message)
    .tooltip('show');
}

function hideTooltip(id) {
  setTimeout(function() {
    let complId = "#"+id
    $(complId).tooltip('hide').tooltip('disable');
  }, 1000);
}
