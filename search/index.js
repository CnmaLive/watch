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


    fetch(`https://vidsrc.me/embed/tv?tmdb=3432342&season=1&episode=2`)
    .then(response => {
        if (!response.ok) {
          // Check if the response status is not in the range 200-299
          console.error(`Error: ${response.status} - ${response.statusText}`);
        } else {
          console.log('Link is valid.');
        }
      })

    const movieSearchResutls = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${input}`;
    fetch(movieSearchResutls)
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.results.length; i++){
            let id = data.results[i].id;
            let filmTvConatiner = document.getElementById("search-films-container");
            let display = data.results[i].poster_path;
            let name = data.results[i].title;
            let source = `https://image.tmdb.org/t/p/original${display}`;

            //Add Poster
            let image = document.createElement("img");
            image.src = source;
            image.classList.add("poster-image");
            
            //Adding Title On Hover
            let h3 = document.createElement("p");
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
                window.location = `../title/index.html?movie/id/${di}`;
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
        
        //Div Storage
        let imgContainer = document.createElement("div");
        imgContainer.appendChild(image);
        imgContainer.classList.add("poster-div");
        imgContainer.appendChild(h3);
        
        //Saving ID to Image
        imgContainer.dataset.myValue = id;
        imgContainer.addEventListener("click", function(event) {
            let di = this.dataset.myValue;
            window.location = `../title/index.html?tv/id/${di}`;
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
        window.location = `./index.html?keyword=${input}`;
        return;
    }
    searchBar.style.visibility = "hidden";
    searchBar.style.width = "40px";
}

//Add Scrolling Button Left
let leftButtons = document.getElementsByClassName("scroll-left");

for(let i = 0; i < leftButtons.length; i++){
    leftButtons[i].addEventListener("click", function(){
        let container = leftButtons[i].parentNode;
        let slider = container.querySelector(".slider");
        const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index'));
        let div = slider.getElementsByTagName('div');
        let divLen = getComputedStyle(document.querySelector('.slider > div')).getPropertyValue('--nr-of-titles');
        let entriesNr = div.length;
        let maxSliderIndex = entriesNr / divLen - 1;
        if(sliderIndex == 0){
            slider.style.setProperty('--slider-index', maxSliderIndex);
            return;
        }
        slider.style.setProperty('--slider-index', sliderIndex - 1);
    });
}

//Add Scrolling Button Right
let rightButton = document.getElementsByClassName("scroll-right");

for(let i = 0; i < rightButton.length; i++){
    rightButton[i].addEventListener("click", function(){
        let container = rightButton[i].parentNode;
        let slider = container.querySelector(".slider");
        const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index'));
        let div = slider.getElementsByTagName('div');
        let divLen = getComputedStyle(document.querySelector('.slider > div')).getPropertyValue('--nr-of-titles');
        let entriesNr = div.length;
        let maxSliderIndex = entriesNr / divLen - 1;
        if(sliderIndex >= maxSliderIndex){
            slider.style.setProperty('--slider-index', 0);
            return;
        }
        slider.style.setProperty('--slider-index', sliderIndex + 1);
    });
}




