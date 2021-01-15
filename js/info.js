//Get mal_id with jquery
//use anime/{id} endppint to get everything
const anime_search_by_id_endpoint = 'anime/'


$(window).on('load', function() {
  deleteOldData();
  console.log(sessionStorage.getItem('id'));
  loadData(sessionStorage.getItem('id'));
});

function deleteOldData() {
  $('jumbotron-item').remove();
}

function loadData(id) {
  fetch(base_url + anime_search_by_id_endpoint + id)
  .then(response => response.json())
  .then(response => {
    fillJumbotronHeader(response);
    fillJumbotronBody(response);
  });
}

function fillJumbotronHeader(response) {
  $('.jumbotron-header').append(
    '<img class="jumbotron-img class="jumbotron-item"" src=' +
    response.image_url + ' alt="Card image cap">'
  );
}

function fillJumbotronBody(response) {
  $('.jumbotron-body').append(' \
    <h1 class="jumbotron-item">' + response.title + '</h1><hr></hr> \
    <p class="jumbotron-item">' + response.synopsis + '</p> \
    <h5 class="jumbotron-item">Episodes: ' + (response.episodes ?
      response.episodes : 'Unknown') + '</h5> \
    <h5 class="jumbotron-item">Rating: ' + response.rating + '</h5> \
    <h5 class="jumbotron-item">Status: ' + response.status + '</h5> \
    <h5 class="jumbotron-item">Duration: ' + response.aired.string + '</h5> \
    <h5 class="jumbotron-item">Score: ' + response.score + '</h5> \
    <h5 class="jumbotron-item">Rank: ' + response.rank + '</h5> \
    <h5 class="jumbotron-item">Broadcast Time: ' + response.broadcast + '</h5> \
  ');
}
