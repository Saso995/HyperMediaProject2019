$(document).ready(() => {
  if(doesHttpOnlyCookieExist("user_id")){
      window.location.replace("https://bova-colombo-hyp2019.herokuapp.com");
  }
})

$('#signUpForm').submit(function(){
    $.ajax({
      url: $('#signUpForm').attr('action'),
      type: 'POST',
      data : $('#signUpForm').serialize(),
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
        let dialog = new Messi (error.responseJSON.message,{
            animate: { open: 'bounceInLeft', close: 'bounceOutRight' },
            modal: true,
            buttons: [{id: 0, label: 'Ok'}]
          }
        );
      }
    });
    return false;
});

function doesHttpOnlyCookieExist(cookiename) {
   var d = new Date();
   d.setTime(d.getTime() + (1000));
   var expires = "expires=" + d.toUTCString();

   document.cookie = cookiename + "=new_value;path=/;" + expires;
   if (document.cookie.indexOf(cookiename + '=') == -1) {
       return true;
    } else {
       return false;
    }
}
