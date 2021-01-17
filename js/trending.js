const trending_endpoint = 'top/anime/1/airing';

$( window ).on('load', function() {

  loadSpinner();

  fetch(base_url + trending_endpoint)
  .then(response => response.json())
  .then(response => response.top)
  .then(data => processResponseTrending(data));
});

function processResponseTrending(response) {
  response.forEach(result => {
    addCardTrending(result);
  });
  addCardFunction();
  removeSpinner();
}

function addCardTrending(result) {
  $('.cards').append(
    '<div class="card" style="width: 18rem;" id=' + result.mal_id + '> \
      <img class="card-img-top standard" src="' + result.image_url + '" alt=" \
      Card image cap" id=' + result.mal_id + '> \
      <div class="card-body" id=' + result.mal_id + '> \
        <h5 class="card-title large" id=' + result.mal_id + '>' + result.title +
        '</h5> \
        <p class="card-title" id=' + result.mal_id + '> <strong id=' +
        result.mal_id + '>Rank: ' + result.rank + '</strong></p> \
        <p class="card-text" id=' + result.mal_id + '>Score: ' + result.score +
        ' / 10</p> \
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

function loadSpinner() {
  $('.card').css('display', 'none');
  $('.spin-add').append('<img class="spinner" src="../assets/spinner.gif" alt="Spinner">');
}

function removeSpinner() {
  $('.spinner').remove();
  $('.card').css('display', 'flex');
}
