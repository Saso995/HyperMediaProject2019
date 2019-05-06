$(document).ready(() => {
    $.ajax({
      url: '../../cart',
      type: 'GET',
      dataType : 'json',
      success: (data) => {
        console.log('You received some data!', data);
        $('#status').html('Your Cart: ' + JSON.stringify(data));
      },
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
    
  $(document).ajaxError(() => {
    $('#status').html('Error: unknown ajaxError!');
  });
});
