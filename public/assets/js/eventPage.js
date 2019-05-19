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
        $("#book-title").attr('href','https://bova-colombo-hyp2019.herokuapp.com/pages/bookPage.html?' + data[0].bookid);
        $("#authorName").html(data[0].authorName);
        $("#authorName").attr('href','https://bova-colombo-hyp2019.herokuapp.com/pages/authorPage.html?' + data[0].authorid);
        $("#img").attr('src','https://bova-colombo-hyp2019.herokuapp.com/resources/events/' + data[0].bookid + '.jpg');
      },
      error: (data) => {
        alert("What the hell are you looking for?!");
        console.log('There is some error');
        window.location.replace("https://bova-colombo-hyp2019.herokuapp.com");
      }
    });
  }
  else{
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
