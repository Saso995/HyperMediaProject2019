$(document).ready(() => {
  $('#searchButton').click(() => {
    if ($('#searchBox').val()){
      var url = './pages/books.html?' + encodeURIComponent($('#queryBox').val()) + '=' + encodeURIComponent($('#searchBox').val());
      window.location.href = url;
    } else {
      var url = './pages/books.html';
      window.location.href = url;
    }
  });
  $(document).ajaxError(() => {
    $('#status').html('Error: unknown ajaxError!');
  });
});
