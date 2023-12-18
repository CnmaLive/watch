//Set Main Event
document.addEventListener("DOMContentLoaded", function(){
    let input = '60059';

    const apiKey = '89d3d50b04bf827bde106ef72f4856c3';
    //const url = `https://api.themoviedb.org/3/movie/${input}?api_key=${apiKey}`;
    const url = `https://api.themoviedb.org/3/tv/${input}?api_key=${apiKey}`;
    console.log(url);

    fetch(url)
    .then(response => response.json())
    .then(data => {
        let backgroundContaner= document.getElementById("background-container").style;
        let display = data.backdrop_path;
        let name = data.name;
        let overview = data.overview.split('. ', 1)[0] + ".";
        let source = `https://image.tmdb.org/t/p/original${display}`;
        
        backgroundContaner.backgroundImage = `linear-gradient(to left, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7)), linear-gradient(to top, rgba(0,0,0,0) 70%, rgba(0,0,0,0.5)),url('${source}')`;
        backgroundContaner.position = "relative";
        backgroundContaner.height = "100vh"; // Set a non-zero height
        backgroundContaner.paddingBottom = "calc(100% / (16/9))";
        backgroundContaner.backgroundSize = "cover";
        backgroundContaner.backgroundPosition = "center";

        let title = document.createElement('h1');
        title.appendChild(document.createTextNode(name))
        document.getElementById("main-title").appendChild(title);

        let description = document.createElement('p');
        description.appendChild(document.createTextNode(overview));
        document.getElementById("main-description").appendChild(description);
        
        
    }) 
    .catch(error => {
        console.log("No Show Found")
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
  });

  //Notification Icon
  document.getElementById("notification-id").addEventListener("mouseover", function() {
        this.classList.add("hovered");
  });
  
  document.getElementById("notification-id").addEventListener("mouseout", function() {
        this.classList.remove("hovered");
  });
  
  document.getElementById("search-id").addEventListener("click", function() {

  });
