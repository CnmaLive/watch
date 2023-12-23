var searchBar = document.getElementById("search-bar");
var searchBtn = document.getElementById("search-btn");
var notificationBtn = document.getElementById("notification-btn");
const apiKey = '89d3d50b04bf827bde106ef72f4856c3';

document.addEventListener("DOMContentLoaded", function(){
    //Set Search Films
        //Get Searched For
    var a = location.href;
    var b = a.substring(a.indexOf("?") + 1);
    var input = b.substring(b.indexOf("=") + 1);
    input = decodeURIComponent(input.replace(/\+/g, " ")); // Use decodeURIComponent to handle URL encoding
    document.title = input;

    const movieSearchResutls = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${input}`;
    fetch(movieSearchResutls)
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.results.length; i++){
            let filmTvConatiner = document.getElementById("search-films-container");
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
                window.location = `./watch/title/index.html?movie/id=${di}`;
            });
    
            filmTvConatiner.appendChild(imgContainer);
        }

})

const tvSearchResutls = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${input}`;
fetch(tvSearchResutls)
.then(response => response.json())
.then(data => {
    for(let i = 0; i < data.results.length; i++){
        let searchTvConatiner = document.getElementById("search-shows-container");
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
            window.location = `./watch/title/index.html?movie/id=${di}`;
        });

        searchTvConatiner.appendChild(imgContainer);
    }

})
});

document.addEventListener("DOMContentLoaded", function(){
    // Set Search Bar hidden
    document.getElementById("search-bar").style.visibility = "hidden";
});

// Search Notification On Hover
searchBtn.addEventListener('mouseover', function(){
    let icon = document.getElementById("search-icon").style;
    icon.filter = "invert(0%)";
    searchBtn.style.background = "white";
});

searchBtn.addEventListener('mouseout', function(){
    let icon = document.getElementById("search-icon").style;
    if(searchBar.style.visibility === "hidden"){
        icon.filter = "invert(100%)";
        searchBtn.style.background = "transparent";
    }
});

notificationBtn.addEventListener('mouseover', function(){
    let icon = document.getElementById("notification-icon").style;
    icon.filter = "invert(0%)";
    notificationBtn.style.background = "white";
});

notificationBtn.addEventListener('mouseout', function(){
    let icon = document.getElementById("notification-icon").style;
    icon.filter = "invert(100%)";
    notificationBtn.style.background = "transparent";
});

// Search Bar On Click
searchBtn.onclick = function() {
    if(searchBar.style.visibility == "hidden"){
        searchBar.style.visibility = "visible";
        searchBar.style.width = "350px";
        searchBar.value = "";
        setTimeout(() => {
            searchBar.focus();
        }, 300);
        return;
    }
    if(searchBar.value != ""){
        var input = searchBar.value;
        input = input.replace(" ", "+")
        window.location = `./watch/search/index.html?keyword=${input}`;
    }
    searchBar.style.visibility = "hidden";
    searchBar.style.width = "40px";
}

var leftButtons = document.getElementsByClassName("scroll-left");

for(let i = 0; i < leftButtons.length; i++){
    leftButtons[i].addEventListener("click", function(){
        let container = leftButtons[i].parentNode;
        let slider = container.querySelector(".slider");
        const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index'));
        slider.style.setProperty('--slider-index', sliderIndex-1);
    });
}

document.getElementById("search-bar").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.getElementById("search-btn").click();
    }
  });

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




