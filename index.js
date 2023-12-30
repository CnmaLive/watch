var searchBtn = document.getElementById("search-btn");
var notificationBtn = document.getElementById("notification-btn");
var searchBar = document.getElementById("search-bar");
const apiKey = '89d3d50b04bf827bde106ef72f4856c3';  

document.addEventListener("DOMContentLoaded", function(){
    // Set Search Bar hidden
    document.getElementById("search-bar").style.visibility = "hidden";
    
    // Set Feature Title
    let input = '108978';

        //const url = `https://api.themoviedb.org/3/movie/${input}?api_key=${apiKey}`;
    const url = `https://api.themoviedb.org/3/tv/${input}?api_key=${apiKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        let backgroundContaner = document.getElementById("background-container").style;
        let display = data.backdrop_path;
        let name = data.name;
        let overview = data.overview.split('. ', 1)[0] + ".";
        let source = `https://image.tmdb.org/t/p/original${display}`;
        
        backgroundContaner.backgroundImage = `linear-gradient(to left, rgba(0,20,34,0) 30%, rgba(0,20,34,0.7)), linear-gradient(to bottom, rgba(0,20,34,0) 50%, rgba(0,20,34,1)), linear-gradient(to top, rgba(0,20,34,0) 70%, rgba(0,20,34,0.5)),url('${source}')`;

        let title = document.createTextNode(name);
        document.getElementById("featured-title").appendChild(title);

        let description = document.createTextNode(overview);
        document.getElementById("featured-description").appendChild(description);
    })
    .catch(error => {
        console.log("No Show Found")
    });

    //Set Trending Films
    const trendingFilmsUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

    fetch(trendingFilmsUrl)
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.results.length; i++){
            let trendingFilmsContainer = document.getElementById("trending-films-container");
            let display = data.results[i].poster_path;
            let name = data.results[i].title;
            let source = `https://image.tmdb.org/t/p/original${display}`;
            let id = data.results[i].id;

            //Add Poster
            let image = document.createElement("img");
            image.src = source;
            image.classList.add("poster-image");
            
            //Adding Title On Hover
            let h3 = document.createElement("p");
            let title = document.createTextNode(name);
            h3.appendChild(title);
            console.log(h3)
            
            //Div Storage
            let imgContainer = document.createElement("div");
            imgContainer.appendChild(image);
            imgContainer.classList.add("poster-div");
            imgContainer.appendChild(h3);
            
            //Saving ID to Image
            imgContainer.dataset.myValue = id;
            imgContainer.addEventListener("click", function(event) {
                let di = this.dataset.myValue;
                console.log(di)
                window.location = `./title/index.html?movie/id/${di}/1/1`;
            });
    
            trendingFilmsContainer.appendChild(imgContainer);

        }

    })

    //Set Trending Shows
    const trendingShowsUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;

    fetch(trendingShowsUrl)
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.results.length; i++){
            let trendingFilmsContainer = document.getElementById("trending-shows-container");
            let display = data.results[i].poster_path;
            let name = data.results[i].original_name;
            let source = `https://image.tmdb.org/t/p/original${display}`;
            let id = data.results[i].id;

            //Add Poster
            let image = document.createElement("img");
            image.src = source;
            image.classList.add("poster-image");
            
            //Adding Title On Hover
            let h3 = document.createElement("p");
            let title = document.createTextNode(name);
            h3.appendChild(title);
            console.log(h3)
            
            //Div Storage
            let imgContainer = document.createElement("div");
            imgContainer.appendChild(image);
            imgContainer.classList.add("poster-div");
            imgContainer.appendChild(h3);
            
            //Saving ID to Image
            imgContainer.dataset.myValue = id;
            imgContainer.addEventListener("click", function(event) {
                let di = this.dataset.myValue;
                console.log(di)
                window.location = `./title/index.html?tv/id/${di}/1/1`;
            });
    
            trendingFilmsContainer.appendChild(imgContainer);

        }

    })
});

//Add Scrolling Button Left
var leftButtons = document.getElementsByClassName("scroll-left");

for(let i = 0; i < leftButtons.length; i++){
    leftButtons[i].addEventListener("click", function(){
        let container = leftButtons[i].parentNode;
        let slider = container.querySelector(".slider");
        const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index'));
        slider.style.setProperty('--slider-index', sliderIndex-1);
    });
}

//Add Scrolling Button Right
var rightButton = document.getElementsByClassName("scroll-right");

for(let i = 0; i < rightButton.length; i++){
    rightButton[i].addEventListener("click", function(){
        let container = rightButton[i].parentNode;
        let slider = container.querySelector(".slider");
        const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index'));
        slider.style.setProperty('--slider-index', sliderIndex+1);
        console.log(sliderIndex)
    });
}

// Search Notification On Hover
searchBtn.addEventListener('mouseover', function(){
    let icon = document.getElementById("search-icon").style;
    icon.filter = "invert(0%)";
    searchBtn.style.background = "white";
})

searchBtn.addEventListener('mouseout', function(){
    let icon = document.getElementById("search-icon").style;
    if(searchBar.style.visibility === "hidden"){
        icon.filter = "invert(100%)";
        searchBtn.style.background = "transparent";
    }
})

notificationBtn.addEventListener('mouseover', function(){
    let icon = document.getElementById("notification-icon").style;
    icon.filter = "invert(0%)";
    notificationBtn.style.background = "white";
})

notificationBtn.addEventListener('mouseout', function(){
    let icon = document.getElementById("notification-icon").style;
    icon.filter = "invert(100%)";
    notificationBtn.style.background = "transparent";
})

document.getElementById("search-bar").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.getElementById("search-btn").click();
    }
  });

// Search Bar On Click
searchBtn.onclick = function() {
    if(searchBar.style.visibility == "hidden"){
        searchBar.style.visibility = "visible";
        searchBar.style.width = parseInt(getComputedStyle(searchBar).getPropertyValue('--sarch-bar-expand'))+ "px";
        searchBar.value = "";
        setTimeout(() => {
            searchBar.focus();
        }, 300);
        return;
    }
    if(searchBar.value != ""){
        var input = searchBar.value;
        input = input.replace(" ", "+")
        window.location = `./search/index.html?keyword=${input}`;
        return;
    }
    searchBar.style.visibility = "hidden";
    searchBar.style.width = "40px";
}

function addContinueWatching(){
    var storedData = JSON.parse(localStorage.getItem('seriesData')) || {};
  
    if(storedData == null){
        document.getElementById("continue-watching").style.display = "none";
        document.getElementById("continue-container").style.display = "none";
        return;
    }


    for(let i = 0; i < storedData.length; i++){
        let id = storedData[i];

        const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            let continueContainer = document.getElementById("continue-container");
            let display = data.results[i].poster_path;
            let name = data.results[i].original_name;
            let source = `https://image.tmdb.org/t/p/original${display}`;
            let id = data.results[i].id;

            //Add Poster
            let image = document.createElement("img");
            image.src = source;
            image.classList.add("poster-image");
            
            //Adding Title On Hover
            let h3 = document.createElement("p");
            let title = document.createTextNode(name);
            h3.appendChild(title);
            console.log(h3)
            
            //Div Storage
            let imgContainer = document.createElement("div");
            imgContainer.appendChild(image);
            imgContainer.classList.add("poster-div");
            imgContainer.appendChild(h3);
            
            //Saving ID to Image
            imgContainer.dataset.myValue = id;
            imgContainer.addEventListener("click", function(event) {
                let di = this.dataset.myValue;
                console.log(di)
                window.location = `./title/index.html?tv/id/${di}/1/1`;
            });
        })
        .catch(error => {
            console.log("No Show Found")
        });
}
}