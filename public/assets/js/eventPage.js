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
      url: '../../event/' + key,
      type: 'GET',
      dataType : 'json', // this URL returns data in JSON format
      success: (data) => {
        $('#event-title').html(data[0].name);
        $('#where').html(data[0].location);
        $('#when').html(data[0].date);
        $('#seats').html(data[0].seats);
        $('#description').html(data[0].description);
        $("#book-title").html(data[0].bookTitle);
        $("#book-title").attr('href','http://localhost:1337/pages/bookPage.html?' + data[0].bookid);
        $("#authorName").html(data[0].authorName);
        $("#authorName").attr('href','http://localhost:1337/pages/authorPage.html?' + data[0].authorid);
        $("#img").attr('src','http://localhost:1337/resources/events/' + data[0].bookid + '.jpg');
      },
      error: (data) => {
        let dialog = new Messi ("What the hell are you looking for?!",{
            animate: { open: 'bounceInLeft', close: 'bounceOutRight' }, modal: true,
            buttons: [{id: 0, label: 'Ok'}],
            callback: function() { window.location.replace("http://localhost:1337"); }
          }
        );
      }
    });
  }
  else{
    window.location.replace("http://localhost:1337");
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
