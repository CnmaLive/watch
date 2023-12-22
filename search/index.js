var searchBar = document.getElementById("search-bar");
var searchBtn = document.getElementById("search-btn");
var notificationBtn = document.getElementById("notification-btn");

document.addEventListener("DOMContentLoaded", function(){
    // Set Search Bar hidden
    document.getElementById("search-bar").style.visibility = "hidden";
});

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

// Search Bar On Click
searchBtn.onclick = function() {
    if(searchBar.value != ""){

    }
    if(searchBar.style.visibility == "hidden"){
        searchBar.style.visibility = "visible";
        searchBar.style.width = "350px";
        searchBar.focus;
        return;
    }
    searchBar.style.visibility = "hidden";
    searchBar.style.width = "40px";
}


