//Get mal_id with jquery
//use anime/{id} endppint to get everything
const anime_search_by_id_endpoint = 'anime/'
const week = ['Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays', 'Sundays']

//Error handling, if no selection made.
$(document).ready(function() {
  if (!(sessionStorage.getItem('id'))) {
    window.location = "../html/landingPage.html"
  }
});

//Loading content on
$(window).on('load', function() {
  loadSpinner();
  loadData(sessionStorage.getItem('id'));
});

function loadData(id) {
  fetch(base_url + anime_search_by_id_endpoint + id)
  .then(response => response.json())
  .then(response => {
    removeSpinner();
    fillContainer();
    fillJumbotronBody(response);
    fillJumbotronHeader(response);
  });
}

function loadSpinner() {
  $('.spin-add').append('<img class="spinner" src="../assets/spinner.gif" alt="Spinner">');
}

function removeSpinner() {
  $('.spinner').remove();
}

function fillContainer() {
  $('.containter').append(' \
    <div class="jumbotron d-flex col-md-9 border-custom"> \
      <div class="jumbotron-header d-flex"></div> \
      <div class="jumbotron-body"></div> \
    </div> \
  ');
}

function fillJumbotronHeader(response) {
  $('.jumbotron-header').append(
    '<img class="jumbotron-img class="jumbotron-item"" src=' +
    response.image_url + ' alt="Card image cap">'
  );
}

function fillJumbotronBody(response) {
  $('.jumbotron-body').append(' \
    <h1 class="jumbotron-item"><strong class="title">' + response.title + '</strong></h1><hr></hr> \
    <p class="jumbotron-item">' + response.synopsis + '</p> \
    <h5 class="jumbotron-item">Rank:<strong> ' + response.rank + '</h5> \
    <h5 class="jumbotron-item">Score:<strong> ' + response.score + ' / 10</h5> \
    <h5 class="jumbotron-item">Episodes:<strong> ' + (response.episodes ?
      response.episodes : 'Unknown') + '</h5> \
    <h5 class="jumbotron-item">Duration:<strong> ' + response.duration + '</h5> \
    <h5 class="jumbotron-item">Rating:<strong> ' + response.rating + '</h5> \
    <h5 class="jumbotron-item">Status:<strong> ' + response.status + '</h5> \
    <h5 class="jumbotron-item">Duration:<strong> ' + response.aired.string + '</h5> \
    <h5 class="jumbotron-item">Premiered:<strong> ' + response.premiered + '</h5> \
    <h5 class="jumbotron-item">Broadcast Time:<strong> ' + response.broadcast + '</h5> \
    <h5 class="jumbotron-item">Broadcast Time (EST):<strong> ' + addESTBroadcast(response.broadcast) + '</h5> \
  ');
}

function addESTBroadcast(broadcast) {
  const dateSplit = broadcast.split(' ');
  let index = week.indexOf(dateSplit[1]);
  const timeSplit = dateSplit[2].split(':');

  let timeMin = (parseInt(timeSplit[0]) * 60) + parseInt(timeSplit[1]);
  const difference =  14 * 60;

  let newTime = timeMin - difference;
  index = index - 1 < 0 ? (week.length - 1) : index - 1;

  if (newTime < 0) {
    newTime += (24 * 60);
  }

  let returnString = ((newTime / 60 | 0) + ':' + (newTime % 60));

  return week[index] + ' at ' + returnString;


}
