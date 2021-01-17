const genre_endpoint = 'schedule/';
const week = ["Monday", "Tuesday", "wednesday", "thursday", "friday",
                "saturday", "sunday", "other", "unknown"];


$(window).on('load', function() {
  addListGroup();
  activateFistGenre();
});


function addListGroup() {
  for (day in week) {
    $('.list-group').append(
      '<a href="#" class="list-group-item list-group-item-action" val='
       + week[day] + '>' + week[day] + '</a>'
    );
  }

  $('.list-group-item').on('click', function() {
    $('.list-group-item').removeClass('active');
    $(event.target).addClass('active');
    loadCards($(event.target).attr('val'));
  });
}

function activateFistGenre() {
  $('.list-group-item:first-of-type').addClass('active');
  loadCards($('.list-group-item:first-of-type').attr('val'));
}

function loadCards(day_id) {
  loadSpinner();

  fetch(base_url + genre_endpoint + day_id)
  .then(response => response.json())
  .then(response => response[day_id.toLowerCase()])
  .then(data => processResponseGenre(data));
}

function processResponseGenre(response) {
  console.log(response);
  removeContentGenre();

  response.forEach(result => {
    addCardGenre(result);
  });

  addCardFunction();
  removeSpinner();
}

function removeContentGenre() {
  $('.card').remove();
}

function addCardGenre(result) {
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
