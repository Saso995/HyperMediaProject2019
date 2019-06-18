$(document).ready(() => {
  //fills bestseller sections
  $.ajax({
    url: '../book/get/bestsellerMonth',
    type: 'GET',
    dataType : 'json',
    success: (data) => {
      for(var i in data){
        let img_path = 'https://bova-colombo-hyp2019.herokuapp.com/resources/books/'+data[i].bookid+'.jpg';
        let idImg= "#img"+data[i].position;
        let idTitle= "#title"+data[i].position;
        let idPrice= "#price"+data[i].position;
        let idAuthor= "#author"+data[i].position;
        let idStar= "#star"+data[i].position;
        let idLinkBook= "#linkBook"+data[i].position;
        let idLinkAuthor= "#linkAuthor"+data[i].position;
        let linkBook = 'https://bova-colombo-hyp2019.herokuapp.com/pages/bookPage.html?' + data[i].bookid;
        let linkAuthor = 'https://bova-colombo-hyp2019.herokuapp.com/pages/authorPage.html?' + data[i].authorid;
        $(idLinkBook).attr('href', linkBook);
        $(idLinkAuthor).attr('href', linkAuthor);
        $(idImg).attr('src', img_path);
        $(idTitle).html(data[i].title);
        $(idPrice).html(data[i].price+'€');
        $(idAuthor).html(data[i].name);
        $('#addButton').attr('id', "best"+data[i].bookid);
        $.ajax({
          url: '../../book/' + data[i].bookid + '/reviews/score',
          type: 'GET',
          dataType : 'json', // this URL returns data in JSON format
          success: (avg) => {
            let nblack = 5 - avg[0].avg;
            let yellowStar = '<li class="list-inline-item"><i class="text-warning fa fa-star"></i></li>';
            let blackStar = '<li class="list-inline-item"><i class="text-warning fa fa-star-o"></i></li>';
            let totalYellow = ``;
            let totalBlack = ``;
            for (let white = avg[0].avg; white > 0 ; white--){
              totalYellow += yellowStar;
            }
            for (nblack; nblack > 0 ; nblack--){
              totalBlack += blackStar
            }
            $(idStar).append(totalYellow+totalBlack);
          }
        });
      }
    }
  });

  //fills our readings:
  $.ajax({
    url: '../book?favorite',
    type: 'GET',
    dataType : 'json',
    success: (data) => {
      for(var i in data){
        let img_path = 'https://bova-colombo-hyp2019.herokuapp.com/resources/books/'+data[i].id+'.jpg';
        let id = (parseInt(i)+1);
        let idImg= "#carImg"+id;
        let idTitle= "#carTitle"+id;
        let idPrice= "#carPrice"+id;
        let idAuthor= "#carAuthor"+id;
        let idStar= "#carStar"+id;
        let idLinkBook= "#carLinkBook"+id;
        let idLinkAuthor= "#carLinkAuthor"+id;
        let linkBook = 'https://bova-colombo-hyp2019.herokuapp.com/pages/bookPage.html?' + data[i].id;
        let linkAuthor = 'https://bova-colombo-hyp2019.herokuapp.com/pages/authorPage.html?' + data[i].authorid;
        $(idLinkBook).attr('href', linkBook);
        $(idLinkAuthor).attr('href', linkAuthor);
        $(idImg).attr('src', img_path)
        $(idTitle).html(data[i].title);
        $(idPrice).html(data[i].price+'€');
        $(idAuthor).html(data[i].authorName);
        $('#add').attr('id', "add"+data[i].id)

        $.ajax({
          url: '../../book/' + data[i].id + '/reviews/score',
          type: 'GET',
          dataType : 'json', // this URL returns data in JSON format
          success: (avg) => {
            let nblack = 5 - avg[0].avg;
            let yellowStar = '<li class="list-inline-item"><i class="text-warning fa fa-star"></i></li>';
            let blackStar = '<li class="list-inline-item"><i class="text-warning fa fa-star-o"></i></li>';
            let totalYellow = ``;
            let totalBlack = ``;
            for (let white = avg[0].avg; white > 0 ; white--){
              totalYellow += yellowStar;
            }
            for (nblack; nblack > 0 ; nblack--){
              totalBlack += blackStar
            }
            $(idStar).append(totalYellow+totalBlack);
          }
        });
      }
    }
  })

  //fill events:
  $.ajax({
    url: '../event/this/month',
    type: 'GET',
    dataType : 'json',
    success: (data) => {
      let linkEvent = 'https://bova-colombo-hyp2019.herokuapp.com/pages/eventPage.html?'+data[0].id;
      $('#link1').attr('href',linkEvent)
      $('#name1').html(data[0].name)
      $('#descr1').html(data[0].description)
      for(let i = 1; i < data.length; i++){
        linkEvent = 'https://bova-colombo-hyp2019.herokuapp.com/pages/eventPage.html?'+data[i].id;
        $('#carousel').append(`
          <div class="carousel-item", style="background-image: url(http://www.alleycatbookshop.com/uploads/2/4/3/0/24303957/595086_orig.jpg);">
            <div class = "carousel-caption">
              <a href="${linkEvent}"><h3>${data[i].name}</h3></a>
              <p>${data[i].description}</p>
            </div>
          </div>
        `)
        $('#dataSlide').append(`<li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`)
      }
    }

  })

//to change login button into logout
  if(doesHttpOnlyCookieExist('user_id')){
    $('#loginButton').html('<i class="fa fa-sign-out" aria-hidden="true"></i> Logout');
    $("#loginButton").attr("id", "logoutButton");

    $("#logoutButton").unbind("click").click(function () {
      $.ajax({
        url: '../auth/logout',
        type: 'POST',
        dataType : 'json',
        success: (data) => {
          //alert((JSON.stringify(data.message)));
          let dialog = new Messi (data.message,{
              animate: { open: 'bounceInLeft', close: 'bounceOutRight' }, modal: true,
              buttons: [{id: 0, label: 'Ok'}],
              callback: function() { location.reload(); }
            }
          );
          $('#loginButton').html('Login');
          $("#loginButton").attr("id", "loginButton");
          //location.reload();
        },
        error: (data) => {
          //alert((JSON.stringify(data.message)));
          let dialog = new Messi (data.message,{
              animate: { open: 'bounceInLeft', close: 'bounceOutRight' },
              buttons: [{id: 0, label: 'Ok'}]
            }
          );
        }
      });
    });
  }
  
  $('#searchBox').keypress(function(e){
    if(e.keyCode==13){
      $('#searchButton').click();
    }
  });
});


$('#searchButton').click(() => {
  if ($('#searchBox').val()){
    var url = './pages/books.html?' + encodeURIComponent($('.selection').val()) + '=' + encodeURIComponent($('#searchBox').val());
    window.location.href = url;
  } else {
    var url = './pages/books.html';
    window.location.href = url;
  }
});

$('#loginButton').click(()=>{
  window.location.replace("https://bova-colombo-hyp2019.herokuapp.com/pages/loginPage.html");
});

$('#cartButton').click(()=>{
  window.location.replace("https://bova-colombo-hyp2019.herokuapp.com/pages/cartPage.html");
});

$(document).on('click', "[id^=add]", function(){
    let id = this.id.slice(3);
    let wholeId = this.id;
    $.ajax({
      url: '../cart',
      type: 'POST',
      data: {
        'id': id
      },
      dataType : 'json',
      success: (data) => {
        setTooltip(wholeId, data.message);
        hideTooltip(wholeId);
      },
      error: (data) => {
        console.log(JSON.stringify(data));
      }
    });
});

$(document).on('click', "[id^=best]", function(){
    let id = this.id.slice(4);
    let wholeId = this.id;
    $.ajax({
      url: '../cart',
      type: 'POST',
      data: {
        'id': id
      },
      dataType : 'json',
      success: (data) => {
        setTooltip(wholeId, data.message);
        hideTooltip(wholeId);
      },
      error: (data) => {
        console.log(JSON.stringify(data));
      }
    });
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


//for tooltips
$('button').tooltip({
  trigger: 'click',
  placement: 'right'
});

function setTooltip(id, message) {
  let complId = "#"+id;
  $(complId).tooltip('hide')
    .attr('data-original-title', message)
    .tooltip('show');
}

function hideTooltip(id) {
  setTimeout(function() {
    let complId = "#"+id
    $(complId).tooltip('hide');
  }, 1000);
}
