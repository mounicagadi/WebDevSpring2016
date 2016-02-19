(function(){
    $(init);

    var $movieTitle;
    var $searchBtn;
    var $searchResults;

    var $detailsTitle;
    var $detailsDirector;
    var $detailsPoster;
    var $detailsPlot;
    var $detailsActors;

    var $currentPage;
    var $previousPage;
    var $nextPage;
    var $totalResults;

    var $favoriteBtn;

    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE&page=PAGE";
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID";

    var currentPage = 1;

    function init() {
        $movieTitle = $("#movieTitle");
        $searchBtn  = $("#searchBtn");
        $searchResults = $("#searchResults tbody");

        $detailsTitle = $("#detailsTitle");
        $detailsDirector = $("#detailsDirector");
        $detailsPoster = $("#detailsPoster");
        $detailsPlot = $("#detailsPlot");
        $detailsActors = $("#detailsActors");

        $currentPage = $("#currentPage");
        $previousPage = $("#previousPage");
        $nextPage = $("#nextPage");
        $totalResults = $("#totalResults");
        $favoriteBtn = $("#favoriteBtn");

        $previousPage.click(previousPage);
        $nextPage.click(nextPage);
        $searchBtn.click(searchMovie);
        $favoriteBtn.click(favoriteMovie);
    }

    function favoriteMovie() {
        if($favoriteBtn.hasClass("btn-default")) {
            $favoriteBtn.attr("class", "btn btn-primary");
        } else {
            $favoriteBtn.attr("class", "btn btn-default");
        }
    }

    function previousPage() {
        currentPage--;
        $currentPage.html(currentPage);
        searchMovie();
    }

    function nextPage() {
        currentPage++;
        $currentPage.html(currentPage);
        searchMovie();
    }

    function searchMovie() {
        var title = $movieTitle.val();
        var url = SEARCH_URL.replace("TITLE", title);
        url = url.replace("PAGE", currentPage);

        $.ajax({
            url: url,
            success: renderSearchResults
        });
    }

    function renderSearchResults(response) {

        $searchResults.empty();

        console.log(response);
        var totalResults = response.totalResults;
        $totalResults.html(totalResults);
        var movies = response.Search;
        for(var m=0; m<movies.length; m++) {
            var movie = movies[m];
            var title = movie.Title;
            var year = movie.Year;
            var imdbID = movie.imdbID;
            var posterUrl = movie.Poster;

            var $tr = $("<tr>");

            var $img = $("<img>")
                .attr("id", imdbID)
                .attr("src", posterUrl)
                .addClass("thumb-poster")
                .click(fetchMovieDetails);

            var $td = $("<td>");
            $td.append($img);
            $tr.append($td);

            $td = $("<td>")
                .append(title)
                .appendTo($tr);

            $td = $("<td>")
                .append(year)
                .appendTo($tr);

            $td = $("<td>")
                .append(imdbID)
                .appendTo($tr);

            $searchResults.append($tr);
        }
    }

    function fetchMovieDetails(event) {
        var $img = $(event.currentTarget);
        var imdbid = $img.attr("id");
        var url = DETAILS_URL.replace("IMDBID", imdbid);
        $.ajax({
            url: url,
            success: renderMovieDetails
        });
    }

    function renderMovieDetails(response) {
        console.log(response);

        var title = response.Title;
        var director = response.Director;
        var plot = response.Plot;
        var posterUrl = response.Poster;
        var actors = response.Actors;
        var actorArray = actors.split(",");

        $detailsTitle.html(title);
        $detailsDirector.html(director);
        $detailsPlot.html(plot);
        $detailsPoster.attr("src", posterUrl);

        $detailsActors.empty();

        for(var a in actorArray) {
            var actorName = actorArray[a];

            var $li = $("<li>")
                .append(actorName)
                .appendTo($detailsActors);
        }
    }
})();