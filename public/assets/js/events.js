var key = '';
var value = '';
if(window.location.search){
  var queryString = new Array();
  var params = window.location.search.split('?')[1].split('&');
  key = params[0].split('=')[0];
  value = decodeURIComponent(params[0].split('=')[1]);
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
            let img_path = 'https://bova-colombo-hyp2019.herokuapp.com/resources/events/'+data[i].bookid+'.jpg';
            let title = data[i].name;;
            let currentState = i;
            let date= data[i].date;
            let location= data[i].location;
            let linkEvent = 'https://bova-colombo-hyp2019.herokuapp.com/pages/eventPage.html?' + idevent;
            $("#page").append(`
              <tr class="list">
                <td>
                  <figure class="media">
                    <div class="img-wrap"><img src="${img_path}" class="img-sm" width="120" style="padding-right: 5px;" alt="event's cover"></img></div>
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
                    window.location.href = "https://bova-colombo-hyp2019.herokuapp.com/pages/events.html#searchButton"
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
                    window.location.href = "https://bova-colombo-hyp2019.herokuapp.com/pages/events.html#searchButton"
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
                    window.location.href = "https://bova-colombo-hyp2019.herokuapp.com/pages/events.html#searchButton"
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
  }
  else{
    if (key === "city"){
      $.ajax({
        url: '../event/city/' + value,
        type: 'GET',
        dataType : 'json', // this URL returns data in JSON format
        success: (data) => {
            if(data.length>0){
              for (var i in data){
                let idevent = data[i].id;
                let img_path = 'https://bova-colombo-hyp2019.herokuapp.com/resources/events/'+data[i].bookid+'.jpg';
                let title = data[i].name;;
                let currentState = i;
                let date= data[i].date;
                let location= data[i].location;
                let linkEvent = 'https://bova-colombo-hyp2019.herokuapp.com/pages/eventPage.html?' + idevent;
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
              let dialog = new Messi ("Sorry there are no events in this city :(",{
                  animate: { open: 'bounceInLeft', close: 'bounceOutRight' }, modal: true,
                  buttons: [{id: 0, label: 'Ok'}],
                  callback: function() { window.location.replace("https://bova-colombo-hyp2019.herokuapp.com/pages/events.html"); },
                  center:false,
                  position: { top: '300px', left: '500px' }
                }
              );
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
    }
    else if (key === "month"){
      $.ajax({
        url: '../event/month/' + value,
        type: 'GET',
        dataType : 'json', // this URL returns data in JSON format
        success: (data) => {
            if(data.length>0){
              for (var i in data){
                let idevent = data[i].id;
                let img_path = 'https://bova-colombo-hyp2019.herokuapp.com/resources/events/'+data[i].bookid+'.jpg';
                let title = data[i].name;;
                let currentState = i;
                let date= data[i].date;
                let location= data[i].location;
                let linkEvent = 'https://bova-colombo-hyp2019.herokuapp.com/pages/eventPage.html?' + idevent;
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
              let dialog = new Messi ("Sorry there are no events in this month :(",{
                  animate: { open: 'bounceInLeft', close: 'bounceOutRight' }, modal: true,
                  buttons: [{id: 0, label: 'Ok'}],
                  callback: function() { window.location.replace("https://bova-colombo-hyp2019.herokuapp.com/pages/events.html"); },
                  center:false,
                  position: { top: '300px', left: '500px' }
                }
              );
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
    }
    else{
      let dialog = new Messi ("Invalid research!",{
          animate: { open: 'bounceInLeft', close: 'bounceOutRight' }, modal: true,
          buttons: [{id: 0, label: 'Ok'}],
          callback: function() { window.location.replace("https://bova-colombo-hyp2019.herokuapp.com/pages/events.html"); },
          center:false,
          position: { top: '300px', left: '500px' }
        }
      );
    }
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
      });
    }
	
	$('#searchBox').keypress(function(e){
    if(e.keyCode==13){
      $('#searchButton').click();
    }
  });
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
