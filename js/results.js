$(window).on('load', function() {
  loadCards(JSON.parse(sessionStorage.getItem('response')));
});

function loadCards(response) {
  $('.card').remove();

  response.forEach(result => {
    addCardSearch(result);
  });

  addCardFunction();
}

function addCardSearch(result) {
  $('.cards').append(
    '<div class="card" style="width: 18rem; id=' + result.mal_id + '"> \
      <img class="card-img-top standard" src="' + result.image_url + '" \
      id=' + result.mal_id + ' alt="Card image cap"> \
      <div class="card-body" id=' + result.mal_id + '> \
        <h5 class="card-title" id=' + result.mal_id + '>' + result.title + '</h5> \
        <p class="card-text" id=' + result.mal_id + '>' + result.synopsis + '</p> \
      </div> \
      <div class="card-footer" id=' + result.mal_id + '> \
        <a href="' + result.url + '" class="btn btn-primary" id=' +
        result.mal_id + '>More Information</a> \
      </div> \
    </div>');
}

function addCardFunction() {
  //Cards click to go to info page
  $('.card').on('click', function() {
    sessionStorage.setItem('id', $(event.target).attr('id'));
    window.location = '../html/info.html';
  });
}
