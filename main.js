$(document).ready(function() {
  var data;

  function getData() {
    var quotesAPI = 'https://talaikis.com/api/quotes/random/';
    var getImg = 'https://source.unsplash.com/427x240/?';

    $.getJSON(quotesAPI).done(function (json) {
      data = json;
      
      $('.card-img-top').attr('src', getImg + data.cat);
      $('#quote').text(data.quote);
      $('#author').text(data.author);
    });
  };

  function showCard() {
    $('#spinner').show();
    $('.card-img-top').on('load', function() {
      $('#spinner').hide();
      $('.card').fadeIn(600);
    });
  }

  function getNewQuote() {
    $('.card').fadeOut(600, function() {
      getData();
      showCard();
    });
  }

  getData();
  showCard();

  $(".newQ").on("click", function() {
    getNewQuote();
  });

  $(".tweeter").on('click', function() {
    var win = window.open('','_blank');
    var quote = encodeURIComponent(data.quote);
    var author = encodeURIComponent(data.author);
    var tag = encodeURIComponent(data.cat);
    var url = 'https://twitter.com/intent/tweet?text=' + quote + '%20-' + author + '&hashtags=' + tag;
    console.log(url);
    win.location = url;
  });

});
