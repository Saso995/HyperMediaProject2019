$(document).ready(() => {
  if(doesHttpOnlyCookieExist('user_id')){
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
