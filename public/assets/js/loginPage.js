$('#loginForm').submit(function(){
    $.ajax({
      url: $('#loginForm').attr('action'),
      type: 'POST',
      data : $('#loginForm').serialize(),
      success: function(data){
        console.log(data);
        if(data.message){
          alert(data.message);
          window.location.href = "http://localhost:1337/";
        }
        else{
          let error ="";
          for (var i in data){
            error += data[i].msg;
            error +='\n';
          }
          alert(error);
        }
      },
      error: function(error){
        alert(error.responseJSON.message)
      }
    });
    return false;
});
