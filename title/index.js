var container = document.getElementById("container");

var a = location.href;
var id;

var allEps = [];

document.addEventListener("DOMContentLoaded", function(){
  //TV or Movie
  var index = a.charAt(a.indexOf("?")+1);

  //Get ID
  let urlSplit = a.split("/");
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
  var season = urlSplit[urlSplit.length-2];
  var episode = urlSplit[urlSplit.length-1];

  if(urlSplit.length == 7){
    season = 1;
    episode = 1;
  }

  source = `https://vidsrc.me/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
  //source = `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`

  setTitle(false);
  fillEps();
  }

  let iframe = document.getElementById("iFrame");
  iframe.src = source;

  container.appendChild(iframe);
});

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

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

document.getElementById("next").addEventListener("click", function(){
  let index = allEps.findIndex(arr => arr[0] === parseInt(season) && arr[1] === parseInt(episode));
  let nextSea = allEps[index+1][0];
  let nextEp = allEps[index+1][1];
  console.log(nextSea + " " + nextEp)
  window.location.href = `../title/index.html?tv/id/${id}/${nextSea}/${nextEp}`;
});

document.getElementById("container").addEventListener('mousedown', function() {
  isButtonDown = true;
  console.log('Button pressed!');
});

function fillEps(){
  let url = `https://api.themoviedb.org/3/tv/${id}?api_key=89d3d50b04bf827bde106ef72f4856c3&append_to_response=season/1`
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    var len = data.seasons.length;
    
    for(let i = 0; i < len; i++){
      var eps = data.seasons[i].episode_count;
      for(let j = 0; j < eps; j++){
        //if(j != 0 || i != 0){
          let zSeason = i + 1;
          let zEpisode = j + 1;

          allEps.push([parseInt(zSeason), parseInt(zEpisode)]);
        //}
      }

    }
});
}

function numberToString(num){
  let str;
  if(num < 10){
    str = "0" + num;
    return str;
  }
  str = "" + num;
  return str;
}

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