//Need to get mal_id then get recommendations from seperate api call.
const endpoint_anime = 'anime/'
const endpoint_rec = '/recommendations';
addActionListeners();

function searchAPI(queryParam) {
  $('.error').remove();
  fetch(base_url + search_endpoint + queryParam)
  .then(response => response.json())
  .then(response => response.results)
  .then(data => searchRecommendations(data));
}

function searchRecommendations(data) {
  fetch(base_url + endpoint_anime + data[0].mal_id + endpoint_rec)
  .then(response => response.json())
  .then(response => response.recommendations)
  .then(data => displayRecommendations(data));
}

function displayRecommendations(data) {
  $('.card').remove();

  data.forEach(result => {
    addCardRecommendations(result);
  });

  appendErrorMessage(data);
  addCardFunction();
  removeSpinner();
}

function addCardRecommendations(result) {
  $('.cards').append(
    '<div class="card" style="width: 18rem;" id=' + result.mal_id + '> \
      <img class="card-img-top standard" src="' + result.image_url + '" \
      alt="Card image cap" id=' + result.mal_id + '> \
      <div class="card-body" id=' + result.mal_id + '> \
        <h5 class="card-title large" id=' + result.mal_id + '>' + result.title + '</h5> \
        <p class="card-title" id=' + result.mal_id + '> Episodes: ' + result.episodes + '</p> \
        <p class="card-text" id=' + result.mal_id + '>Score: ' + result.score + ' / 10</p> \
      </div> \
      <div class="card-footer" id=' + result.mal_id + '> \
        <a href="' + result.url + '" class="btn btn-primary" id=' +
        result.mal_id + '>More Information</a> \
      </div> \
    </div>');
}

function appendErrorMessage(data) {
  if (data.length == 0) {
    $('.cards').append(' \
      <h1 class="text-white row justify-content-center mb-3 text-center error"> \
      No Recommendations Found :(</h1> \
    ');
  }
}

function addActionListeners() {
  //Search main content event listener
  $('#search-rec').click(function() {
    loadSpinner();
    let queryParam = $('#input-rec').val();
    searchAPI(queryParam);
  });

  //Nav Search bar 'enter' key functionality.
  $('#input-rec').keypress(function() {
    if (event.which == 13) {
      event.preventDefault();
      let queryParam = $('#input-rec').val();
      searchAPI(queryParam);
    }
  });
}

function addCardFunction() {
  //Cards click to go to info page
  $('.card').on('click', function() {
    sessionStorage.setItem('id', $(event.target).attr('id'));
    window.location = '../html/info.html';
  });
}

function loadSpinner() {
  if ($('.spinner').length == 0) {
    $('.card').css('display', 'none');
    $('.spin-add').append('<img class="spinner" src="../assets/spinner.gif" alt="Spinner">');
  }
}

function removeSpinner() {
  $('.spinner').remove();
  $('.card').css('display', 'flex');
}
