var key = '';
if(window.location.search){
  var queryString = new Array();
  var params = window.location.search.split('?')[1].split('&');
  key = params[0].split('=')[0];
}

$(document).ready(() => {
  if(!key){
    $.ajax({
      url: '../event',
      type: 'GET',
      dataType : 'json', // this URL returns data in JSON format
      success: (data) => {
          console.log(data)
          for (var i in data){
            let idevent = data[i].id;
            let img_path = 'http://localhost:1337/resources/events/'+data[i].bookid+'.jpg';
            let title = data[i].name;;
            let currentState = i;
            let date= data[i].date;
            let location= data[i].location;
            let linkEvent = 'http://localhost:1337/pages/eventPage.html?' + idevent;
            $("#page").append(`
              <tr class="list">
                <td>
                  <figure class="media">
                    <div class="img-wrap"><img src="${img_path}" class="img-sm" width="120" style="padding-right: 5px;"></img></div>
                    <figcaption class="media-body">
                      <h5 class="title"><a href=${linkEvent}>${title}</a></h5>
                      <dl class="param param-inline small">
                        <dd>${location}</dd>
                        <dd>${date}</dd>
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
                  }
                });

                $("#next-page").click(function() {
                  var currentPage = $(".pagination li.active").index();
                  console.log(currentPage)
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
          },
      error: (data) => {
        alert(data.responseJSON.message);
      }
    });
  }
  else{
    $.ajax({
      url: '../event/city/' + key,
      type: 'GET',
      dataType : 'json', // this URL returns data in JSON format
      success: (data) => {
          console.log(data)
          if(data.length>0){
            for (var i in data){
              let idevent = data[i].id;
              let img_path = 'http://localhost:1337/resources/events/'+data[i].bookid+'.jpg';
              let title = data[i].name;;
              let currentState = i;
              let date= data[i].date;
              let location= data[i].location;
              let linkEvent = 'http://localhost:1337/pages/eventPage.html?' + idevent;
              $("#page").append(`
                <tr class="list">
                  <td>
                    <figure class="media">
                      <div class="img-wrap"><img src="${img_path}" class="img-sm" width="120" style="padding-right: 5px;"></img></div>
                      <figcaption class="media-body">
                        <h5 class="title"><a href=${linkEvent}>${title}</a></h5>
                        <dl class="param param-inline small">
                          <dd>${location}</dd>
                          <dd>${date}</dd>
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
                    }
                  });

                  $("#next-page").click(function() {
                    var currentPage = $(".pagination li.active").index();
                    console.log(currentPage)
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
          }
          else{
            alert("Sorry there are no events in this city :(")
            window.location.replace("http://localhost:1337/pages/events.html");
          }
          },
      error: (data) => {
        alert(data.responseJSON.message);
      }
    });
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
            alert((JSON.stringify(data.message)));
            $('#loginButton').html('Login');
            $("#loginButton").attr("id", "loginButton");
            location.reload();
          },
          error: (data) => {
            alert((JSON.stringify(data.message)));
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
