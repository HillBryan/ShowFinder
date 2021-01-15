$(window).on('load', function() {
  loadCards(JSON.parse(sessionStorage.getItem('response')));
});

function loadCards(response) {
  $('.card').remove();
  console.log(response);
  response.forEach(result => {
    addCardSearch(result);
  });
}

function addCardSearch(result) {
  $('.cards').append(
    '<div class="card" style="width: 18rem;"> \
      <img class="card-img-top standard" src="' + result.image_url + '" alt="Card image cap"> \
      <div class="card-body"> \
        <h5 class="card-title">' + result.title + '</h5> \
        <p class="card-text">' + result.synopsis + '</p> \
      </div> \
      <div class="card-footer"> \
        <a href="' + result.url + '" class="btn btn-primary">More Information</a> \
      </div> \
    </div>');
}
