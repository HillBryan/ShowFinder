const base_url = 'https://api.jikan.moe/v3/search/anime?q=';

//Search navbar event listener
$('#searchNav').click(function() {
  let queryParam = $('#inputNav').val();
  queryAPI(queryParam);
});

//Search main content event listener
$('#searchMain').click(function() {
  let queryParam = $('#inputMain').val();
  queryAPI(queryParam);
});

//Pulling json data from api
function queryAPI(query) {
  fetch(base_url + query)
  .then(response => response.json())
  .then(response => response.results)
  .then(data => processResponse(data));
}

function processResponse(response) {
  removeContent();
  response.forEach(result => {
    addCard(result);
  });
}

function removeContent() {
  $('.landing').remove();
  $('.card').remove();
}

function addCard(result) {
  $('.cards').append('<div class="card" style="width: 18rem;"> \
    <img class="card-img-top" src="' + result.image_url + '" alt="Card image cap"> \
    <div class="card-body"> \
      <h5 class="card-title">' + result.title + '</h5> \
      <p class="card-text">' + result.synopsis + '</p> \
      <a href="' + result.url + '" class="btn btn-primary">More Information</a> \
    </div> \
  </div>');
}
