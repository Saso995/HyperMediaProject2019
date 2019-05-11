$(document).ready(() => {
  var key = '';
  var value = '';
  if(window.location.search){
    var queryString = new Array();
    var params = window.location.search.split('?')[1].split('&');
    key = params[0].split('=')[0];
    value = decodeURIComponent(params[0].split('=')[1]);
    console.log(params)
    console.log(key)
    console.log(value)
  }

  $.ajax({
    url: '../book?' + key + '=' + value,
    type: 'GET',
    dataType : 'json', // this URL returns data in JSON format
    success: (data) => {
      console.log('You received some data!', data);
      $('#status').html("Available books: "+ JSON.stringify(data));
    },
    error: (data) => {
      console.log('You received some data!', data);
      $('#status').html("Error: "+ JSON.stringify(data));
    }
  });

  $('#searchButton').click(() => {
    if ($('#searchBox').val()){
      var url = './books.html?' + encodeURIComponent($('#queryBox').val()) + '=' + encodeURIComponent($('#searchBox').val());
      window.location.href = url;
    } else {
      var url = './books.html';
      window.location.href = url;
    }
  });
});
