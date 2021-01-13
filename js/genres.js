const genre_endpoint = 'genre/anime/'
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

function loadCards(genre_id) {
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
}

function removeContentGenre() {
  $('.card').remove();
}

function addCardGenre(result) {
  $('.cards').append(
    '<div class="card" style="width: 18rem;"> \
      <img class="card-img-top" src="' + result.image_url + '" alt="Card image cap"> \
      <div class="card-body"> \
        <h5 class="card-title">' + result.title + '</h5> \
        <h5 class="card-title"> Episodes: ' + result.episodes + '</h5> \
        <p class="card-text">Score: ' + result.score + ' / 10</p> \
        <a href="' + result.url + '" class="btn btn-primary">More Information</a> \
      </div> \
    </div>');
}
