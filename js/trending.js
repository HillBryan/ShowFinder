const trending_endpoint = 'top/anime/1/airing';

$( window ).on('load', function() {
  fetch(base_url + trending_endpoint)
  .then(response => response.json())
  .then(response => response.top)
  .then(data => processResponseTrending(data));
});

function processResponseTrending(response) {
  removeContentTrending();
  response.forEach(result => {
    addCardTrending(result);
  });
}

function removeContentTrending() {
  $('.card').remove();
}

function addCardTrending(result) {
  $('.cards').append(
    '<div class="card" style="width: 18rem;"> \
      <img class="card-img-top" src="' + result.image_url + '" alt="Card image cap"> \
      <div class="card-body"> \
        <h5 class="card-title">' + result.title + '</h5> \
        <h5 class="card-title"> Rank: ' + result.rank + '</h5> \
        <p class="card-text">Score: ' + result.score + ' / 10</p> \
        <a href="' + result.url + '" class="btn btn-primary">More Information</a> \
      </div> \
    </div>');
}
