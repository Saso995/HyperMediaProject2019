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
        for(var i in data.myBooks) {
          let toAppend = "<li><a href='http://localhost:1337/pages/bookPage.html?" + data.myBooks[i].id + "' >" + data.myBooks[i].title+ "</a></li>";
          $("ol").append(toAppend);
        }
        $("#img").attr('src','http://localhost:1337/resources/authors/' + data.author[0].id + '.jpg');

      },
      error: (data) => {
        //alert("What the hell are you looking for?!");
        let dialog = new Messi ("What the hell are you looking for?!",{
            animate: { open: 'bounceInLeft', close: 'bounceOutRight' }, modal: true,
            buttons: [{id: 0, label: 'Ok'}],
            callback: function() { window.location.replace("http://localhost:1337"); }
          }
        );
      }
    });
  }
  else {
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
