$(document).ready(() => {
  $('#loginButton').click(() => {
    $.ajax({
      url: '../../auth/login',
      type: 'POST',
      data: {
        'email': $('#email').val(),
        'password': $('#password').val()
      },
      dataType : 'json',
      success: (data) => {
        $('#status').html(JSON.stringify(data));
      },
      error: (data) => {
        $('#status').html(JSON.stringify(data));
      }
    });
  });
  $('#logoutButton').click(() => {
    $.ajax({
      url: '../../auth/logout',
      type: 'POST',
      dataType : 'json',
      success: (data) => {
        $('#status').html(JSON.stringify(data));
      },
      error: (data) => {
        $('#status').html(JSON.stringify(data));
      }
    });
  });
  $('#registerButton').click(() => {
    $.ajax({
      url: '../../auth/signup',
      type: 'POST',
      data: {
        'email': $('#emailReg').val(),
        'password': $('#passwordReg').val(),
        'confirmPassword': $('#confirmPassword').val(),
        'firstName': $('#firstName').val(),
        'lastName': $('#lastName').val(),
        'birthDate': $('#birthDate').val(),
        'address': $('#address').val()
      },
      dataType : 'json',
      success: (data) => {
        $('#status').html(JSON.stringify(data));
      },
      error: (data) => {
        $('#status').html(JSON.stringify(data));
      }
    });
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
