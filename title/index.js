var container = document.getElementById("container");

var a = location.href;
var urlSplit = a.split("/");
var season = urlSplit[urlSplit.length-2];
var episode = urlSplit[urlSplit.length-1];
var id;

var allEps = [[]];
var nextEps = [];

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

  // Moblie resize:
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

});

// Save Season & Episode
function saveToLocalStorage(id, s, e){
  var storedData = JSON.parse(localStorage.getItem('seriesData')) || {};
  
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
    var epList = document.getElementById("eps-container");
    if(epList.style.display != "block"){
      epList.style.display = "block";
    }
    else {
      epList.style.display = "none";
    }

    let btnDiv = document.getElementById("season-buttons");
    let epsDiv = document.getElementById("episodesScroll");
    for(let i = 0; i < allEps.length; i++){
      let currentEp = 0;
      let btn = document.createElement("button");
      let ind = i + 1;
      btn.textContent = `Season ${ind}`;
      btnDiv.appendChild(btn);
      
      btn.addEventListener("click", function(){
        epsDiv.innerHTML = "";
        for(let j = 0; j < allEps[ind].length; j++){
          let div = document.createElement("div");
          div.classList.add("epsDiv")
          
          let sea = ind;
          let ep = j + 1;
          let title = allEps[ind][j][1];
          let display = allEps[ind][j][2];
          let epIndex = allEps[ind][j][3];
          let source = `https://image.tmdb.org/t/p/original${display}`;
          let img = document.createElement("img");
          img.src = source;
          
          let a = document.createElement("a");
          console.log(nextEps[epIndex][0] + " " + nextEps[epIndex][1] + " WHe")
          a.href = `../title/index.html?tv/id/${id}/${nextEps[epIndex][0]}/${nextEps[epIndex][1]}`;
          currentEp++;

          let textNode = document.createTextNode("S:"+sea+" E:"+ep + " " + title);
          a.appendChild(textNode);
          div.appendChild(img);
          div.appendChild(a);
          epsDiv.appendChild(div);
        }
      });
    }
}

// Button Back Home
document.getElementById("back").addEventListener("click", function(){
    window.location = "../index.html";
});


// Play Next Episode
document.getElementById("next").addEventListener("click", function(){
  let index = nextEps.findIndex(arr => arr[0] === parseInt(season) && arr[1] === parseInt(episode));
  let nextSea = nextEps[index+1][0];
  let nextEp = nextEps[index+1][1];
  window.location.href = `../title/index.html?tv/id/${id}/${nextSea}/${nextEp}`;
});

// Fill Array With Show Episodes
function fillEps(){
  let url = `https://api.themoviedb.org/3/tv/${id}?api_key=89d3d50b04bf827bde106ef72f4856c3&append_to_response=season/1`

  fetch(url)
  .then(response => response.json())
  .then(data => {
    var len = data.seasons.length;

    if(data.seasons[0].name == "Specials"){
      for(let i = 0; i < data.seasons.length - 1; i++){
        let epNr = data.seasons[i].episode_count;
        for(let j = 0; j < epNr; j++){
          if(data.seasons[i].name != "Specials"){
            let zSeason = i;
            let zEpisode = j + 1;
            nextEps.push([zSeason, zEpisode]);
          }
        }
      }
    } else{
      for(let i = 0; i < data.seasons.length; i++){
        let epNr = data.seasons[i].episode_count;
        for(let j = 0; j < epNr; j++){
          let zSeason = i + 1;
          let zEpisode = j + 1;
          nextEps.push([zSeason, zEpisode]);
        }
      }
    }

    console.log(nextEps);

    if(data.seasons[0].name == "Specials"){
      let ind = 0;
      for(let i = 0; i < len - 1; i++){
        if(data.seasons[i].name != "Specials"){
          let eps = data.seasons[i].episode_count;
          let InnerUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=89d3d50b04bf827bde106ef72f4856c3&append_to_response=season/${i}`;
          let ary = [];
          fetch(InnerUrl)
          .then(response => response.json())
          .then(data => {
            for(let j = 0; j < eps; j++){
              let zSeason = i;
              let zEpisode = j + 1;
              let epName = data[`season/${i}`].episodes[j].name;
              let still = data[`season/${i}`].episodes[j].still_path;
              
              ary.push([parseInt(zEpisode), epName, still, ind]);
              ind++;
            }
          });
          allEps.push(ary);
        }

      }
      return;
    }

    for(let i = 0; i < len; i++){
      if(data.seasons[i].name != "Specials"){
        let eps = data.seasons[i].episode_count;
        let InnerUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=89d3d50b04bf827bde106ef72f4856c3&append_to_response=season/${i}`;
        fetch(InnerUrl)
        .then(response => response.json())
        .then(data => {
          for(let j = 0; j < eps; j++){
            let zSeason = i;
            let zEpisode = j + 1;
            let epName = data[`season/${i}`].episodes[j].name;
            
            allEps.push([parseInt(zSeason), parseInt(zEpisode), epName]);
          }
        });
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

function getEpisodeName(s, e){
  url = `https://api.themoviedb.org/3/tv/10283?api_key=89d3d50b04bf827bde106ef72f4856c3&append_to_response=season/${s}`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    let epName = data.name;

  })

}