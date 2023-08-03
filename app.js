(async function(){
    let response = await fetch("data.json");
    let movies = await response.json();
    //Search bar
    let inputItemElem = document.getElementById("inputItem");
    //btn
    let btn = document.getElementById("recommendationBtn");
    //ul
    let movieList = document.getElementById("movie-list");
    //relaseDateconatiner div
    let movieDetails = document.getElementById("relaseDateconatiner");

    function loadMovies(movie){
       console.log(movie);
       movieDetails.innerHTML = `
       <img src="${movie.Images}" alt="" class="imgs">
       <h2 class="titles">${movie.title}</h2>
       <h4>${movie.tagline}</h4>
       <h5 class="overview">"${movie.overview}"</h5>
       <div class="boxes">
       <p class="para">Release Date: ${movie.release_date}</p>
       <p class="para">Language: ${movie.original_language}</p>
       <p class="para">Rating: ${movie.vote_average}</p>
       </div>
       `
       const video = document.createElement('video');
       video.classList.add("video");
       
       video.src = `${movie.trailer_yt}`;
       video.controls = true;
       video.muted = false;
       video.height = 240; 
       video.width = 320;
       movieDetails.appendChild(video);

    }

    function moviesListDetails(results){  
         movieList.innerHTML = "";
        results.forEach(function(movie){
            let li = document.createElement("li");
            let listItem = `
            <img src="${movie.Images}" alt="" class="img">
            <h2 class="title">${movie.title}</h2>
            <div class="tagline">${movie.tagline}</div>
            <div class="stars">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            </div>
            `;
            li.innerHTML = listItem;
            li.addEventListener("click", function(){
                loadMovies(movie);
            })
            movieList.appendChild(li);
        })
    }

    btn.addEventListener("click", function recommended(){
        let qurey = inputItemElem.value.toLowerCase();
        let results = movies.filter(function(movie){
            return (movie.title.toLowerCase().includes(qurey)|| movie.overview.toLowerCase().includes(qurey))
        });
        moviesListDetails(results);
    })
})();