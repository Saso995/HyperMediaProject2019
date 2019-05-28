$(document).ready(() => {
  $.ajax({
    url: '../author',
    type: 'GET',
    dataType : 'json', // this URL returns data in JSON format
    success: (data) => {
        for (var i in data){
          let idAuthor = data[i].id;
          let img_path = 'https://bova-colombo-hyp2019.herokuapp.com/resources/authors/'+idAuthor+'.jpg';
          let name = data[i].name;
          let currentState = i;
          let linkAuthor = 'https://bova-colombo-hyp2019.herokuapp.com/pages/authorPage.html?' + idAuthor;
          let bio = data[i].bio;
          $("#page").append(`
            <tr class="list">
              <td>
                <figure class="media">
                  <div class="img-wrap"><img src="${img_path}" class="img-sm" width="120" style="padding-right: 5px;" alt="author's picture"></img></div>
                  <figcaption class="media-body">
                    <h5 class="title"><a href=${linkAuthor}>${name}</a></h5>
                    <dl class="param param-inline small">
                      <dd>${bio}</dd>
                    </dl>
                  </figcaption>
                </figure>
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
                window.location.href = "https://bova-colombo-hyp2019.herokuapp.com/pages/authors.html#searchButton"
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
                window.location.href = "https://bova-colombo-hyp2019.herokuapp.com/pages/authors.html#searchButton"
              }
            });


            $("#previous-page").click(function() {
              var currentPage = $(".pagination li.active").index();
              if (currentPage === 1) {
                return false;
              }
              else {
                currentPage--;
                $(".pagination li").removeClass('active');
                $("#page .list").hide();
                var grandTotal = limitPerPage * currentPage;

                for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
                  $("#page .list:eq(" + i + ")").show();
                }

                $(".pagination li.page-item:eq(" + (currentPage - 1) + ")").addClass('active');
                window.location.href = "https://bova-colombo-hyp2019.herokuapp.com/pages/authors.html#searchButton"
              }
            });
          }
        }
      },
    error: (data) => {
      //alert(data.responseJSON.message);
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


$('#loginButton').click(()=>{
  window.location.replace("https://bova-colombo-hyp2019.herokuapp.com/pages/loginPage.html");
});

$('#cartButton').click(()=>{
  window.location.replace("https://bova-colombo-hyp2019.herokuapp.com/pages/cartPage.html");
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
