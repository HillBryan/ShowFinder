const genre_endpoint = 'genre/anime/';
const genres = {"Action":1,"Adventure":2,"Cars":3,"Comedy":4,
          "Dementia":5,"Demons":6,"Mystery":7,"Drama":8,
          "Fantasy":10,"Game":11,"Historical":13,"Horror":14,
          "Kids":15,"Magic":16,"Martial Arts":17,"Mecha":18,
          "Music":19,"Parody":20,"Samurai":21,"Romance":22,
          "School":23,"Sci Fi":24,"Shoujo":25,"Shounen":27,
          "Space":29,"Sports":30,"Super Power":31,"Vampire":32,
          "Slice Of Life":36,"Supernatural":37,"Military":38,
          "Police":39,"Psychological":40,"Thriller":41
         };


$(window).on('load', function() {
  addListGroup();
  activateFistGenre();
});


function addListGroup() {
  for (genre in genres) {
    $('.list-group').append(
      '<a href="#" class="list-group-item list-group-item-action" val='
       + genres[genre] + '>' + genre + '</a>'
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

function loadCards(genre_id) {
  loadSpinner();

  fetch(base_url + genre_endpoint + genre_id)
  .then(response => response.json())
  .then(response => response.anime)
  .then(data => processResponseGenre(data));
}

function processResponseGenre(response) {
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
  if ($('.spinner').length == 0) {
    $('.card').css('display', 'none');
    $('.spin-add').append('<img class="spinner" src="../assets/spinner.gif" alt="Spinner">');
  }
}

function removeSpinner() {
  $('.spinner').remove();
  $('.card').css('display', 'flex');
}
