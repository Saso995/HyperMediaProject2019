$('#searchButton').click(() => {
  if ($('#searchBox').val()){
    var url = './books.html?' + encodeURIComponent($('#queryBox').val()) + '=' + encodeURIComponent($('#searchBox').val());
    window.location.href = url;
  } else {
    var url = './books.html';
    window.location.href = url;
  }
});