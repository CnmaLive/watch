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
        let id = data.id;
        let overview = data.overview.split('. ', 1)[0] + ".";
        let source = `https://image.tmdb.org/t/p/original${display}`;
        
        backgroundContaner.backgroundImage = `linear-gradient(to left, rgba(0,20,34,0) 30%, rgba(0,20,34,0.7)), linear-gradient(to bottom, rgba(0,20,34,0) 50%, rgba(0,20,34,1)), linear-gradient(to top, rgba(0,20,34,0) 70%, rgba(0,20,34,0.5)),url('${source}')`;

        let title = document.createTextNode(name);
        document.getElementById("featured-title").appendChild(title);

        let description = document.createTextNode(overview);
        document.getElementById("featured-description").appendChild(description);

        document.getElementById("now-watch-btn").onclick = function(){
            window.location = `./title/index.html?movie/id/${id}`;
        }
    })
    .catch(error => {
        console.log("No Show Found")
    });

    // Set Continue Watcing
    addContinueWatching();


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
            let h3 = document.createElement("h4");
            let title = document.createTextNode(name);
            h3.appendChild(title);
            
            //Div Storage
            let imgContainer = document.createElement("div");
            imgContainer.appendChild(image);
            imgContainer.classList.add("poster-div");
            imgContainer.appendChild(h3);
            
            //Saving ID to Image
            imgContainer.dataset.myValue = id;
            imgContainer.addEventListener("click", function(event) {
                let di = this.dataset.myValue;
                window.location = `./title/index.html?movie/id/${di}`;
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
            let h3 = document.createElement("h4");
            let title = document.createTextNode(name);
            h3.appendChild(title);
            
            //Div Storage
            let imgContainer = document.createElement("div");
            imgContainer.appendChild(image);
            imgContainer.classList.add("poster-div");
            imgContainer.appendChild(h3);
            
            //Saving ID to Image
            imgContainer.dataset.myValue = id;
            imgContainer.addEventListener("click", function(event) {
                let di = this.dataset.myValue;
                window.location = `./title/index.html?tv/id/${di}`;
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

    console.log(storedData)
    

    if(Object.keys(storedData).length === 0){
        document.getElementById("continue-watching").style.display = "none";
        document.getElementById("continue-container").style.display = "none";
        return;
    }

    var dataArray = Object.entries(storedData);
    // Sort the array based on loc property
    dataArray.sort((a, b) => a[1].loc - b[1].loc);
    // Convert array back to object
    var sortedData = Object.fromEntries(dataArray);
    console.log(dataArray);

    for (let key in dataArray) {
        console.log(dataArray[key][0])
        const url = `https://api.themoviedb.org/3/tv/${dataArray[key][0]}?api_key=${apiKey}`;


        if(/^\d+$/.test(key)){
            fetch(url)
            .then(response => response.json())
            .then(data => {
                let trendingFilmsContainer = document.getElementById("continue-container-inside");
                let display = data.poster_path;
                let name = data.original_name;
                let source = `https://image.tmdb.org/t/p/original${display}`;
                let id = data.id;

                let season = dataArray[key][1].s;
                let episode = dataArray[key][1].e;

                //Add Poster
                let image = document.createElement("img");
                image.src = source;
                
                let p = document.createElement("p");
                let progress = document.createTextNode("S:" + season + " E:" + episode);
                p.appendChild(progress);

                //Adding Title On Hover
                let h3 = document.createElement("h4");
                let title = document.createTextNode(name);
                h3.appendChild(p);
                h3.appendChild(title);

                //Div Storage
                let imgContainer = document.createElement("div");
                imgContainer.appendChild(image);
                imgContainer.appendChild(h3);

                //Saving ID to Image
                imgContainer.dataset.myValue = id;
                imgContainer.addEventListener("click", function(event) {
                    let di = this.dataset.myValue;
                    window.location = `./title/index.html?tv/id/${di}`;
                });

                trendingFilmsContainer.appendChild(imgContainer);
            })
            .catch(error => {
                console.log("No Show Found")
            });

        }
        
}
}