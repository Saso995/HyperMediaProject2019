$('#loginForm').submit(function(){
    $.ajax({
      url: $('#loginForm').attr('action'),
      type: 'POST',
      data : $('#loginForm').serialize(),
      success: function(data){
        if(data.message){
          let dialog = new Messi (data.message,{
              animate: { open: 'bounceInLeft', close: 'bounceOutRight' }, modal: true,
              buttons: [{id: 0, label: 'Ok'}],
              callback: function() { window.location.href = "https://bova-colombo-hyp2019.herokuapp.com/"; }
            }
          );
        }
        else{
          let error ="";
          for (var i in data){
            error += data[i].msg;
            error +='\n';
          }
          let dialog = new Messi (error,{
              animate: { open: 'bounceInLeft', close: 'bounceOutRight' },
              modal: true,
              buttons: [{id: 0, label: 'Ok'}]
            }
          );
        }
      },
      error: function(error){
        let dialog = new Messi (data.responseJSON.message,{
            animate: { open: 'bounceInLeft', close: 'bounceOutRight' },
            modal: true,
            buttons: [{id: 0, label: 'Ok'}]
          }
        );
      }
    });
    return false;
});
