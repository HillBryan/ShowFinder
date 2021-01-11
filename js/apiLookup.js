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
  console.log(base_url + query);
  fetch(base_url + query)
  .then(response  => response.json())
  .then(data => console.log(data.results));
}
