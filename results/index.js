//Set Main Event
document.addEventListener("DOMContentLoaded", function () {
    var a = location.href;
    var b = a.substring(a.indexOf("?") + 1);
    var input = b.substring(b.indexOf("=") + 1);
    input = decodeURIComponent(input.replace(/\+/g, " ")); // Use decodeURIComponent to handle URL encoding
    document.title = input;

    console.log(input);

    const apiKey = '89d3d50b04bf827bde106ef72f4856c3';
    const murl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${input}`;
    const tvurl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${input}`;

    // fetch(murl)
    //     .then(response => response.json())
    //     .then(data => {
    //         document.getElementById("moviesList").innerHTML = ``;
    //         document.getElementById("film-add").innerHTML = `<div class="flex gap-0 h-14 w-4/5 rounded-xl light-blue"><h2 class="m-auto">Films</h2></div>`;
    //         for(let i = 0; i < Object.keys( data.results ).length; i++){
    //             let display = data.results[i].poster_path;
    //             let title = data.results[i].title;
    //             if(display.startsWith("null", 4)){
    //                 console.log("algoth")
    //             }
    //             console.log(display + "Film");
    //             let source = `https://image.tmdb.org/t/p/original/${display}`;
    //              document.getElementById("film-add").innerHTML += `
    //                 <div class="flex justify-center items-center container"> 
    //                     <img src=${source} id="poster" class="zoom rounder h-4/6">
    //                     <div id="nested_text" class="text_hover centered">${title}</div> 
    //                 </div>
    //             `;
    //         }       
    //      })
    //     .catch(error => {
    //         console.log("No Film Found")
    //     });

    fetch(murl)
        .then(response => response.json())
        .then(data => {

            for (let i = 0; i < data.results.length; i++) {
                let display = data.results[i].poster_path;
                let title = data.results[i].title;

                if(!(display == null)){

                    let source = `https://image.tmdb.org/t/p/original/${display}`;
                    console.log(source);

                    var mainElement = document.getElementById("film-add");
                    var element = document.createElement("div");
                    var id = data.results[i].id;
                    element.dataset.myValue = id;
                    element.addEventListener("click", function(event) {
                        var di = this.dataset.myValue;
                        window.location = `../now/index.html?movie/id=${di}`;
                      });
                    var image = document.createElement("img");
                    image.src = source;
                    element.appendChild(image);
                    mainElement.appendChild(element);

                    element.className = "title flex";
                }

            }
        })
        .catch(error => {
            console.log("No Film Found", error);
        });

        fetch(tvurl)
        .then(response => response.json())
        .then(data => {

            for (let i = 0; i < data.results.length; i++) {
                let display = data.results[i].poster_path;
                let title = data.results[i].title;

                if(!(display == null)){

                    let source = `https://image.tmdb.org/t/p/original/${display}`;
                    console.log(source);

                    var mainElement = document.getElementById("show-add");
                    var element = document.createElement("div");
                    var id = data.results[i].id;
                    element.dataset.myValue = id;
                    element.addEventListener("click", function(event) {
                        var di = this.dataset.myValue;
                        window.location = `../now/index.html?tv/id=${di}`;
                      });
                    var image = document.createElement("img");
                    image.classList = "";
                    image.src = source;
                    element.appendChild(image);
                    mainElement.appendChild(element);

                    element.className = "title flex";
                }

            }
        })
        .catch(error => {
            console.log("No Film Found", error);
        });

        
});

var isIn = false;

document.getElementById("search-id").onclick = function() {
    var searchBar = document.getElementById("search-bar");
    var inputValue = document.getElementById("search-bar").value;
    var iconImage = document.getElementById("looking-glass").style;
    var searchId = document.getElementById("search-id").style;
    var expanded = searchBar.style.visibility;
    
    if(expanded == "visible" && inputValue == ""){

        searchBar.style.transform = "translateX(0%) scaleX(1)";
        // Trigger reflow
        searchBar.offsetHeight;
        
        // Apply transition styles
        searchBar.style.transition = "transform 0.3s";
        
        // Set final styles
        searchBar.style.transform = "translateX(41%) scaleX(0)";
        
        // Reset transition property after animation completes
        setTimeout(() => {
            searchBar.style.transition = "";
            searchBar.style.visibility = "hidden";
            console.log(isIn);
            if(!isIn){
                console.log(isIn);
                // Convert the element to a jQuery object
                var $searchId = $(document.getElementById("search-id"));

                // Use addClass to add a class to the element
                $searchId.removeClass("hovered");
            }
        }, 250);
                                
        return;
    } 

    // Set initial styles
    searchBar.style.transform = "translateX(42%) scaleX(0)";
    searchBar.style.visibility = "visible";
    // Trigger reflow
    searchBar.offsetHeight;

    //Remove border
    searchBar.style.border = "none";
    searchBar.style.outline = "none";

    // Apply transition styles
    searchBar.style.transition = "transform 0.3s";

    // Set final styles
    searchBar.style.transform = "translateX(0) scaleX(1)";

    searchBar.focus();
};

document.getElementById("search-id").addEventListener("mouseover", function() {
    if(document.getElementById("search-bar").style.visibility == "hidden"){
        this.classList.add("hovered");
        isIn =true;
    }
  });
  
  document.getElementById("search-id").addEventListener("mouseout", function() {
    if(document.getElementById("search-bar").style.visibility == "visible"){
        this.classList.add("hovered");
        isIn =false;

    }
    else if(document.getElementById("search-bar").style.visibility = "hidden"){
        this.classList.remove("hovered");
        isIn =false;
    }

  });
  
  document.getElementById("search-id").addEventListener("click", function() {
    this.classList.add("hovered");
    if(document.getElementById("search-bar").value != ""){
      var input = document.getElementById("search-bar").value;
      input = input.replace(" ", "+")
      window.location = `../results/index.html?keyword=${input}`;
    }
  });

  //Notification Icon
  document.getElementById("notification-id").addEventListener("mouseover", function() {
        this.classList.add("hovered");
  });
  
  document.getElementById("notification-id").addEventListener("mouseout", function() {
        this.classList.remove("hovered");
  });
  
  document.getElementById("search-bar").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.getElementById("search-id").click();
    }
  });
  
  document.getElementById("back-button").addEventListener("click", function(event){
    document.getElementById('film-add').scrollLeft -= 1500;
  });

  document.getElementById("forward-button").addEventListener("click", function(event){
    document.getElementById('film-add').scrollLeft += 1500;
  });

  document.getElementById("back-button-show").addEventListener("click", function(event){
    document.getElementById('show-add').scrollLeft -= 1500;
  });

  document.getElementById("forward-button-show").addEventListener("click", function(event){
    document.getElementById('show-add').scrollLeft += 1500;
  });
