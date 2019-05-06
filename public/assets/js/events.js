$(document).ready(() => {
      $.ajax({
      // all URLs are relative to the current folder
      url: '../../event',
      type: 'GET',
      dataType : 'json', // this URL returns data in JSON format
      success: (data) => {
        console.log('You received some data!', data);
        $('#status').html("Our events: "+ JSON.stringify(data));
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
  // define a generic Ajax error handler:
  $(document).ajaxError(() => {
    $('#status').html('Error: unknown ajaxError!');
  });
});
