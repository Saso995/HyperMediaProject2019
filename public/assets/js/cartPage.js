//fills the page
$(document).ready(() => {
    $.ajax({
      url: '../../cart',
      type: 'GET',
      dataType : 'json',
      success: (data) => {
        if(data.text){
          alert(data.text)
        }
        else{
          console.log(data)
          //show all the books in the cart
          for (var j in data.items){
            let img = 'http://localhost:1337/resources/books/' + data.items[j].item.id + '.jpg';
            let linkBook = 'http://localhost:1337/pages/bookPage.html?' + data.items[j].item.id;
            let linkAuthor = 'http://localhost:1337/pages/authorPage.html?' + data.items[j].item.authorid;
            $('#table').append(`
              <tr>
                <td>
                  <figure class="media">
                  	<div class="img-wrap"><img src=${img} class="img-sm" width="120" style="padding-right: 5px;"></img></div>
                  	<figcaption class="media-body">
                      <h5 class="title">
                      <a href=${linkBook}>${data.items[j].item.title}</a>
                  		</h5>
                  		<dl class="param param-inline small">
                  		  <dt>Author: </dt>
                  		  <dd><a href=${linkAuthor}>${data.authors[j].name}</a></dd>
                  		</dl>
                  	</figcaption>
                  </figure>
              	</td>
              	<td>
                  <div class="input-group" style="width: 70%">
                    <button class="btn btn-outline-secondary btn-sm" style="border: none;" id ="less${j}"><i class="fa fa-minus" aria-hidden="true"></i></button>
                    <input class="form-control text-center" value=${data.items[j].qty} readonly></input>
                    <button class="btn btn-outline-secondary btn-sm" style="border: none;" id ="more${j}"><i class="fa fa-plus" aria-hidden="true"></i></button>
                  </div>
              	</td>
              	<td>
                  <div class="price">
                    <span>${data.items[j].item.price}€</span>
                  </div>
              	</td>
                <td>
                  <div class="total">
                    <span>${data.items[j].price}€</span>
                  </div>
              	</td>
              	<td class="text-right">
              	  <button class="btn btn-outline-secondary" id="remove${j}"><i class="fa fa-trash" aria-hidden="true"></i></button>
              	</td>
              </tr>
            `);
          }
          //add subtotal
          $("#price").append(`
            <hr>
          `);
          for (var j in data.items){
            $("#price").append(`
              <div class="inline">
                <span>Subtotal:</span>
                <span class="float-right">${data.items[j].price}€</span>
              </div>
            `);
          }
          $("#price").append(`
            <hr>
          `);
          //add total price of the cart
          $("#total").html(data.totalPrice+'€');
        }
      }
    });

    //to change login button into logout
      if(doesHttpOnlyCookieExist('user_id')){
        $('#status').html('logged');
        $('#loginButton').html('Log out');
        $("#loginButton").attr("id", "logoutButton");

        $("#logoutButton").unbind("click").click(function () {
          $.ajax({
            url: '../../auth/logout',
            type: 'POST',
            dataType : 'json',
            success: (data) => {
              alert((JSON.stringify(data.message)));
              $('#loginButton').html('Login');
              $("#loginButton").attr("id", "loginButton");
              location.reload();
            },
            error: (data) => {
              alert((JSON.stringify(data.message)));
            }
          });
        });
      }
});

$('#empty-btn').click(() => {
  $.ajax({
    url: '../../cart',
    type: 'DELETE',
    dataType : 'json',
    success: (data) => {
      alert(JSON.stringify(data.message));
      location.reload();
    },
    error: (data) => {
      console.log(JSON.stringify(data));
    }
  });
});

//eliminate a whole set of books
$(document).on('click', "[id^=remove]", function(){
    let toDelete = this.id.substr(6,7);
    $.ajax({
      url: '../../cart/' + toDelete,
      type: 'DELETE',
      dataType : 'json',
      success: (data) => {
        alert(data.message);
        location.reload();
      }
    });
});
//increase a book of 1 unit
$(document).on('click', "[id^=more]", function(){
  let toAdd = this.id.substr(4,5);
  $.ajax({
    url: '../../cart',
    type: 'POST',
    data: {
      'id': toAdd
    },
    dataType : 'json',
    success: (data) => {
      alert(JSON.stringify(data.message));
      location.reload();
    },
    error: (data) => {
      console.log(JSON.stringify(data));
    }
  });
});
//decrease a book of 1 unit
$(document).on('click', "[id^=less]", function(){
  console.log(this.id)
  let toModify = this.id.substr(4,5);
  $.ajax({
    url: '../../cart/'+ toModify,
    type: 'PATCH',
    dataType : 'json',
    success: (data) => {
      alert(JSON.stringify(data.message));
      location.reload();
    },
    error: (data) => {
      console.log(JSON.stringify(data));
    }
  });
});

$('#searchButton').click(() => {
  if ($('#searchBox').val()){
    var url = './books.html?' + encodeURIComponent($('.selection').val()) + '=' + encodeURIComponent($('#searchBox').val());
    window.location.href = url;
  } else {
    var url = './books.html';
    window.location.href = url;
  }
});

$('#loginButton').click(()=>{
  window.location.replace("http://localhost:1337/pages/loginPage.html");
});

$('#cartButton').click(()=>{
  window.location.replace("http://localhost:1337/pages/cartPage.html");
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
