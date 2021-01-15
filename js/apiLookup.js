const base_url = 'https://api.jikan.moe/v3/';
const search_endpoint = 'search/anime?q=';
addActionListeners();

//Pulling json data from api
function queryAPI(query) {
  fetch(base_url + search_endpoint + query)
  .then(response => response.json())
  .then(response => response.results)
  .then(data => processResponseSearch(data));
}

function processResponseSearch(response) {
  removeContentSearch();
  response.forEach(result => {
    addCardSearch(result);
  });
}

function removeContentSearch() {
  $('.landing').remove();
  $('.card').remove();

  if ($('.genres')) {
    $('.genres').remove();
    $('.cards').removeClass('border');
    $('.cards').removeClass('border-primary');
  }
}

function addCardSearch(result) {
  $('.cards').append(
    '<div class="card" style="width: 18rem;"> \
      <img class="card-img-top" src="' + result.image_url + '" alt="Card image cap"> \
      <div class="card-body"> \
        <h5 class="card-title">' + result.title + '</h5> \
        <p class="card-text">' + result.synopsis + '</p> \
      </div> \
      <div class="card-footer"> \
        <a href="' + result.url + '" class="btn btn-primary">More Information</a> \
      </div> \
    </div>');
}

function addActionListeners() {
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

  //Nav Search bar 'enter' key functionality.
  $('#inputNav').keypress(function() {
    if (event.which == 13) {
      event.preventDefault();
      let queryParam = $('#inputNav').val();
      queryAPI(queryParam);
    }
  });

  //Main search bar 'enter' functionality
  $('#inputMain').keypress(function() {
    if (event.which == 13) {
      event.preventDefault();
      let queryParam = $('#inputMain').val();
      queryAPI(queryParam);
    }
  });
}
