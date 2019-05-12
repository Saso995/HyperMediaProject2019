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
          console.log(data.myBooks[i]);
          let toAppend = "<li><a href='http://localhost:1337/pages/bookPage.html?" + data.myBooks[i].id + "' >" + data.myBooks[i].title+ "</a></li>";
          console.log(toAppend);
          $("ol").append(toAppend);
        }
        $("#img").attr('src','http://localhost:1337/resources/authors/' + data.author[0].id + '.jpg');

      },
      error: (data) => {
        alert("What the hell are you looking for?!");
        console.log('There is some error');
        window.location.replace("http://localhost:1337");
      }
    });
  }
  else {
    window.location.replace("http://localhost:1337");
  }
});
