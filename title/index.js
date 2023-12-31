var container = document.getElementById("container");

var a = location.href;
var urlSplit = a.split("/");
var season = urlSplit[urlSplit.length-2];
var episode = urlSplit[urlSplit.length-1];
var id;

var allEps = [];

document.addEventListener("DOMContentLoaded", function(){

  //TV or Movie
  var index = a.charAt(a.indexOf("?")+1);

  //Get ID
  let indexOfId = urlSplit.indexOf("id");

  //Set ID
  let idIndex = urlSplit[indexOfId+1];
  id = idIndex;

  if(index == "m"){
    var source = `https://vidsrc.me/embed/movie?tmdb=${id}`;
    //var source = `https://vidsrc.to/embed/movie/${id}`

    setTitle(true);
  } else {
  //Get Season and Episode

  //Check if Episode is Defineds
  if(indexOfId+2 == urlSplit.length){
    let saved = getFromLocalStorage(id);
    if(saved == null){
      season = 1;
      episode = 1;
    }
    else{
      season = saved["s"];
      episode = saved["e"];
    }

    window.location = `../title/index.html?tv/id/${id}/${season}/${episode}`;
    return;

  }

  source = `https://vidsrc.me/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
  //source = `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`

  //Set Tab Title
  setTitle(false);

  //Fill episode array
  fillEps();

  saveToLocalStorage(id, season, episode);
  }

  //Add iFrame to Body
  let iframe = document.getElementById("iFrame");
  iframe.src = source;

  container.appendChild(iframe);

});

// Save Season & Episode
function saveToLocalStorage(id, s, e){
  var storedData = JSON.parse(localStorage.getItem('seriesData')) || {};
  
  console.log(storedData)

    let savedLoc = Object.keys(storedData).length;
  for(let key in storedData){
   if(!(/^\d+$/.test(key))){
      delete storedData[key];
    }

    if(key === id){
      savedLoc = storedData[key].loc;
      delete storedData[key];
    }
  }

    console.log(savedLoc)


  for(let key in storedData){
    // if (savedLoc == 0){
    //   break;
    // }
    if(storedData[key].loc < savedLoc){
      storedData[key].loc += 1;
    }
  }

  let loc = 0;
  storedData[id] = {s, e, loc};

  console.log(storedData)



  
  localStorage.setItem('seriesData', JSON.stringify(storedData));
}

// Get Saved Season & Episode
function getFromLocalStorage(id){
  var storedData = JSON.parse(localStorage.getItem('seriesData')) || {};
  
  return storedData[id];
}

// Toggle Fullscreen
function toggleFullscreen() {
  var iframe = document.getElementById('myIframe');

  if (iframe) {
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { // Firefox
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari and Opera
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // IE/Edge
      iframe.msRequestFullscreen();
    }
  }
}

// Episode List
document.getElementById("eps").onclick = function(){
  let url = `https://api.themoviedb.org/3/tv/${id}?api_key=89d3d50b04bf827bde106ef72f4856c3&append_to_response=season/1`
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    var epList = document.getElementById("eps-container");
    if(epList.style.display != "block"){
      epList.style.display = "block";
    }
    else {
      epList.style.display = "none";
    }

    for(let i = 0; i < allEps.length; i++){
      let a = document.createElement("a");
      a.href = `../title/index.html?tv/id/${id}/${allEps[i][0]}/${allEps[i][1]}`;

      let sea = numberToString(allEps[i][0]);
      let ep = numberToString(allEps[i][1]);

      let textNode = document.createTextNode("S:"+sea+" E:"+ep);
      a.appendChild(textNode);
      epList.appendChild(a);
    }
    let index = allEps.findIndex(arr => arr[0] === parseInt(season) && arr[1] === parseInt(episode));
    epList.scrollTop = 20 * index;
  });


}

// Button Back Home
document.getElementById("back").addEventListener("click", function(){
    window.location = "../index.html";
});


// Play Next Episode
document.getElementById("next").addEventListener("click", function(){
  let index = allEps.findIndex(arr => arr[0] === parseInt(season) && arr[1] === parseInt(episode));
  let nextSea = allEps[index+1][0];
  let nextEp = allEps[index+1][1];
  window.location.href = `../title/index.html?tv/id/${id}/${nextSea}/${nextEp}`;
});

// Fill Array With Show Episodes
function fillEps(){
  let url = `https://api.themoviedb.org/3/tv/${id}?api_key=89d3d50b04bf827bde106ef72f4856c3&append_to_response=season/1`
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    var len = data.seasons.length;
    
    if(data.seasons[0].name == "specials"){
      for(let i = 1; i < len; i++){
        var eps = data.seasons[i].episode_count;
        for(let j = 0; j < eps; j++){
            let zSeason = i;
            let zEpisode = j + 1;
  
            allEps.push([parseInt(zSeason), parseInt(zEpisode)]);
        }
  
      }
      return;
    }


    for(let i = 0; i < len; i++){
      var eps = data.seasons[i].episode_count;
      for(let j = 0; j < eps; j++){
          let zSeason = i + 1;
          let zEpisode = j + 1;

          allEps.push([parseInt(zSeason), parseInt(zEpisode)]);
      }

    }
});
}

// Make number format (00)
function numberToString(num){
  let str;
  if(num < 10){
    str = "0" + num;
    return str;
  }
  str = "" + num;
  return str;
}

// Set Tab Title
function setTitle(film){
  var url = `https://api.themoviedb.org/3/tv/${id}?api_key=89d3d50b04bf827bde106ef72f4856c3`;

  if(film == true){
    url = `https://api.themoviedb.org/3/movie/${id}?api_key=89d3d50b04bf827bde106ef72f4856c3`;
  }

    fetch(url)
    .then(response => response.json())
    .then(data => {
      if(film == true){
        let name = data.original_title;
        document.title = name;
        return;
      }

        let name = data.name;
        document.title = name;


    })
    .catch(error => {
        console.log("No Show Found")
    });
}