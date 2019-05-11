$(document).ready(() => {
  var key = '';
  var value = '';
  if(window.location.search){
    var queryString = new Array();
    var params = window.location.search.split('?')[1].split('&');
    key = params[0].split('=')[0];
    value = decodeURIComponent(params[0].split('=')[1]);


  $.ajax({
    url: '../../book/?' + value,
    type: 'GET',
    dataType : 'json', // this URL returns data in JSON format
    success: (data) => {
      $('#book-title').html(data.book[0].title);
      $('#price').html(data.book[0].price+'€');
      $('#description').html(data.book[0].description);
      $('#pages').html(data.book[0].pages);
      $('#genre').html(data.book[0].genre);
      $('#isbn').html(data.book[0].isbn);
      $("#img").attr('src','https://bova-colombo-hyp2019.herokuapp.com/resources/books/' + data.book[0].id + '.jpg');
      $('#authorName').html(data.authorName);
      var d = data.book[0].publicationdate;
      var onlyD = d.substr(0, 10);
      $('#publicationDate').html(onlyD);
    },
    error: (data) => {
      console.log('There is some error');
    }
  });
});

$('#addButton').click(() => {
  $.ajax({
    url: '../../cart',
    type: 'POST',
    data: {
      'id': 1
    },
    dataType : 'json',
    success: (data) => {
      alert(JSON.stringify(data.message));
    },
    error: (data) => {
      console.log(JSON.stringify(data));
    }
  });
});
