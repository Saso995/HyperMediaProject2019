$(document).ready(() => {
  $.ajax({
    url: '../../book/1',
    type: 'GET',
    dataType : 'json', // this URL returns data in JSON format
    success: (data) => {
      $('#book-title').html(data.book[0].title);
      $('#price').html(data.book[0].price+'€');
      $('#description').html(data.book[0].description);
      $('#pages').html(data.book[0].pages);
      $('#genre').html(data.book[0].genre);
      $('#isbn').html(data.book[0].isbn);
      $("#img").attr('src','http://localhost:1337/resources/books/' + data.book[0].id + '.jpg');
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
