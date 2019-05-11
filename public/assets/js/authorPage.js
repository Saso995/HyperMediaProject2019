$(document).ready(() => {
  $.ajax({
    url: '../../author/1',
    type: 'GET',
    dataType : 'json', // this URL returns data in JSON format
    success: (data) => {
      $('#author-name').html(data.author[0].name);
      $('#bio').html(data.author[0].bio);
      for(var i in data.myBooks) {
        console.log(data.myBooks[i]);
        let toAppend = "<li><a href='https://bova-colombo-hyp2019.herokuapp.com/pages/bookPage.html?" + data.myBooks[i].id + "' >" + data.myBooks[i].title+ "</a></li>";
        console.log(toAppend);
        $("ol").append(toAppend);
      }
      $("#img").attr('src','https://bova-colombo-hyp2019.herokuapp.com/resources/authors/' + data.author[0].id + '.jpg');

    },
    error: (data) => {
      console.log('There is some error');
    }
  });
});
