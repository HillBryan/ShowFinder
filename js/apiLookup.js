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
  sessionStorage.setItem('response', JSON.stringify(response));
  window.location = '../html/results.html';
}

function addActionListeners() {
  //Search navbar event listener
  $('#searchNav').click(function() {
    let queryParam = $('#inputNav').val();
    queryAPI(queryParam);
  });

  //Search main content event listener
  $('#searchMain').click(function() {
    loadSpinnerSearchMain();
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
      loadSpinnerSearchMain();
      event.preventDefault();
      let queryParam = $('#inputMain').val();
      queryAPI(queryParam);
    }
  });
}

//Decide about search mini location

function loadSpinnerSearchMain() {
  $('.spin-remove').css('display', 'none');
  $('.spin-add').append('<img class="spinner" src="../assets/spinner.gif" alt="Spinner" style="height=212px; width=212px;">');
}
