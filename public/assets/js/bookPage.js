//extrapolate query parameters
var key = '';
if(window.location.search){
  var queryString = new Array();
  var params = window.location.search.split('?')[1].split('&');
  key = params[0].split(/[a-zA-Z<>%&£:-_;!()|${}?"'.,\/ -]/)[0];

}

//fill page
$(document).ready(() => {
//load stuff about the book
  if (key){
    $.ajax({
      url: '../../book/' + key,
      type: 'GET',
      dataType : 'json', // this URL returns data in JSON format
      success: (data) => {
        $('#book-title').html(data.book[0].title);
        $('#price').html(data.book[0].price+'€');
        $('#description').html(data.book[0].description);
        $('#pages').html(data.book[0].pages);
        $('#genre').html(data.book[0].genre);
        $('#isbn').html(data.book[0].isbn);
        $("#img").attr('src','http://localhost:1337/resources/books/' + data.book[0].id + '.jpg');
        $('#authorName').html(data.authorName);
        $("#authorName").attr('href','http://localhost:1337/pages/authorPage.html?' + data.book[0].authorid);
        var d = data.book[0].publicationdate;
        var onlyD = d.substr(0, 10);
        $('#publicationDate').html(onlyD);
      },
      error: (data) => {
        alert("What the hell are you looking for?!");
        console.log('There is some error');
        window.location.replace("http://localhost:1337");
      }
    });
  }
  else{
    window.location.replace("http://localhost:1337");
  }
  //display reviews
  $.ajax({
    url: '../../book/' + key + '/reviews',
    type: 'GET',
    dataType : 'json', // this URL returns data in JSON format
    success: (data) => {
      var count = Object.keys(data).length;
      console.log(count);
      for(var i in data) {
        //add stars
        let nblack = 5 - data[i].review.rating;
        let yellowStar= "<span class='float-left'><i class='text-warning fa fa-star'></i></span>";
        let blackStar= "<span class='float-left'><i class='text-secondary fa fa-star'></i></span>";
        let totalYellow = ``;
        let totalBlack = ``;
        for (let white = data[i].review.rating; white > 0 ; white--){
          totalYellow += `<span class="float-left"><i class="text-warning fa fa-star"></i></span>`;
        }
        for (nblack; nblack > 0 ; nblack--){
          totalBlack += `<span class="float-left"><i class="text-secondary fa fa-star"></i></span>`
        }
        let hr;
        if (count == 1)
          hr = "";
        else {
          hr = "<hr>";
        }

        //fill reviews
        $('#allReviews').append(`
          <div class="card-body">
    	        <div class="row">
            	    <div class="col-md-2">
            	        <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded rounded mx-auto d-block img-fluid" style="width: 100px; height: 100px";/>
            	        <p class="text-secondary text-center">${data[i].username}</p>
            	    </div>
            	    <div class="col-md-10">
            	        <p>
            	            ${totalYellow+totalBlack}
            	       </p>
            	       <div class="clearfix"></div>
            	        <p>${data[i].review.message}</p>
            	    </div>
    	        </div>
    	    </div>
          ${hr}
        `);
        count--;
      }
    },
    error: (data) => {
      console.log('There is some error');
    }
  });
});
//keep updated the number of stars
let nowStars;
$('#starInput input').on('change', function() {
  nowStars = ($('input[name=rating]:checked', '#starInput').val());
});
//post review
$('#addReviwButton').click(() => {
  if(nowStars){
    $.ajax({
      url: '../../book/' + key + '/reviews',
      type: 'POST',
      data:{
        "message" : $('#textarea').val(),
        "rating": nowStars
      },
      dataType : 'json', // this URL returns data in JSON format
      success: (data) => {
        alert(data.message);
        if (data.message === "Review Successfully inserted!")
          location.reload();
      }
    });
  }
  else{
    alert("You have to select a number of stars");
  }
});
//add to cart
$('#addButton').click(() => {
  $.ajax({
    url: '../../cart',
    type: 'POST',
    data: {
      'id': key
    },
    dataType : 'json',
    success: (data) => {
      alert(JSON.stringify(data.message));
    },
    error: (data) => {
      console.log(JSON.stringify(data));
    }
  });
});
