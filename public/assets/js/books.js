var key = '';
var value = '';
if(window.location.search){
  var queryString = new Array();
  var params = window.location.search.split('?')[1].split('&');
  key = params[0].split('=')[0];
  value = decodeURIComponent(params[0].split('=')[1]);
}

$(document).ready(() => {
  $.ajax({
    url: '../book?' + key + '=' + value,
    type: 'GET',
    dataType : 'json', // this URL returns data in JSON format
    success: (data) => {
        for (var i in data){
          let idBook = data[i].id;
          let img_path = 'http://localhost:1337/resources/books/'+idBook+'.jpg';
          let title = data[i].title;
          let price = data[i].price;
          let author = data[i].authorName;
          let theme = data[i].theme;
          let currentState = i;
          let linkBook = 'http://localhost:1337/pages/bookPage.html?' + idBook;
          let linkAuthor = 'http://localhost:1337/pages/authorPage.html?' + data[i].authorid;
          let ranking = "";
          if (key === "bestseller"){
            ranking = data[i].position+'° In best seller, in data: '+data[i].data_rank;
          }
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
              $("#page").append(`
                <tr class="list">
                  <td>
                    <figure class="media">
                      <div class="img-wrap"><img src="${img_path}" class="img-sm" width="120" style="padding-right: 5px;"></img></div>
                      <figcaption class="media-body">
                        <h5 class="title"><a href=${linkBook}>${title}</a></h5>
                        <dl class="param param-inline small">
                          <dd><a href=${linkAuthor}>${author}</a></dd>
                          <dd>${theme}</dd>
                          <dd>${ranking}</dd>
                        </dl>
                        <div class="star-rating">
                          <ul class="list-inline">
                            ${totalYellow+totalBlack}
                          </ul>
                        </div>
                      </figcaption>
                    </figure>
                  </td>
                  <td class="verical-divider" style="width:25%">
                    <div class="price">
                      <span>Price: € ${price}<span>
                    </div>
                    <div class="btn-button">
                      <br><br><br><br><br><br><br><br>
                      <button class="add-prod-btn btn-success" id="add${idBook}"><i class="fa fa-cart-plus" aria-hidden="true"></i> Add to cart</button>
                    </div>
                  </td>
                </tr>
              `);
              if(currentState == (data.length-1)){
                var numberOfItems = data.length;
                var limitPerPage = 5;
                $('#page .list:gt(' + (limitPerPage - 1) + ')').hide(); // Hide all items over page limits (e.g., 5th item, 6th item, etc.)
                if(numberOfItems % 5 == 0){
                  var totalPages = Math.floor(numberOfItems / limitPerPage);
                }
                else{
                  var totalPages = Math.floor(numberOfItems / limitPerPage)+1;
                }


                $(".pagination").append("<li class='page-item active'><a class='page-link' href='javascript:void(0)'>" + 1 + "</a></li>");

                for (var i = 2; i <= totalPages; i++) {
                  $(".pagination").append("<li class='page-item'><a class='page-link' href='javascript:void(0)'>" + i + "</a></li>");
                }

                $(".pagination").append("<li class='ml-auto' id='next-page'><a class='page-link' href='javascript:void(0)'>Next</a></li>");


                $(".pagination li.page-item").click(function() {
                  if ($(this).hasClass('active')) {
                    return false;
                  }
                  else {
                    var currentPage = $(this).index();
                    $(".pagination li").removeClass('active');
                    $(this).addClass('active');
                    $("#page .list").hide();
                    var grandTotal = limitPerPage * currentPage;

                    for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
                      $("#page .list:eq(" + i + ")").show();
                    }
                  }

              });

                $("#next-page").click(function() {
                  var currentPage = $(".pagination li.active").index();
                  if (currentPage === totalPages) {
                    return false;
                  }
                  else {
                    currentPage++;
                    $(".pagination li").removeClass('active');
                    $("#page .list").hide();
                    var grandTotal = limitPerPage * currentPage;

                    for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
                      $("#page .list:eq(" + i + ")").show();
                    }

                    $(".pagination li.page-item:eq(" + (currentPage - 1) + ")").addClass('active');
                  }
                });


                $("#previous-page").click(function() {
                  var currentPage = $(".pagination li.active").index();
                  if (currentPage === 1) {
                    return false;
                  } else {
                    currentPage--;
                    $(".pagination li").removeClass('active');
                    $("#page .list").hide();
                    var grandTotal = limitPerPage * currentPage;

                    for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
                      $("#page .list:eq(" + i + ")").show();
                    }

                    $(".pagination li.page-item:eq(" + (currentPage - 1) + ")").addClass('active');
                  }
                });
              }
            }
          });
        }
    },
    error: (data) => {
      let dialog = new Messi (data.responseJSON.message,{
          animate: { open: 'bounceInLeft', close: 'bounceOutRight' },
          modal: true,
          buttons: [{id: 0, label: 'Ok'}],
          center:false,
          position: { top: '300px', left: '500px' }
        }
      );
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
                callback: function() { location.reload(); },
                center:false,
                position: { top: '300px', left: '500px' }
              }
            );
            $('#loginButton').html('Login');
            $("#loginButton").attr("id", "loginButton");
          },
          error: (data) => {
            let dialog = new Messi (data.message,{
                animate: { open: 'bounceInLeft', close: 'bounceOutRight' },
                modal: true,
                buttons: [{id: 0, label: 'Ok'}],
                center:false,
                position: { top: '300px', left: '500px' }
              }
            );
          }
        });
      });
    }
})

$('#searchButton').click(() => {
  if ($('#searchBox').val()){
    var url = './books.html?' + encodeURIComponent($('.selection').val()) + '=' + encodeURIComponent($('#searchBox').val());
    window.location.href = url;
  } else {
    var url = './books.html';
    window.location.href = url;
  }
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
            modal: true,
            buttons: [{id: 0, label: 'Ok'}],
            center:false,
            position: { top: '300px', left: '500px' }
          }
        );
      },
      error: (data) => {
        console.log(JSON.stringify(data));
      }
    });
});

$('#loginButton').click(()=>{
  window.location.replace("http://localhost:1337/pages/loginPage.html");
});

$('#cartButton').click(()=>{
  window.location.replace("http://localhost:1337/pages/cartPage.html");
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
