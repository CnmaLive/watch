var container = document.getElementById("container");
document.addEventListener("DOMContentLoaded", function(){
    let a = location.href;
    let b = a.substring(a.indexOf("?") + 1);
    let id = b.substring(b.indexOf("=") + 1);

    let index = b.charAt(0);
    var source = `https://vidsrc.to/embed/tv/${id}`;

    if(index == "m"){
      source = `https://vidsrc.to/embed/movie/${id}`;
    }

    let iframe = document.getElementById("iFrame");
    iframe.src = source;
    iframe.allow = "fullscreen";
    iframe.allow = "autoplay";


    // Access the video element directly and play it
    setTimeout(() => {
      iframe.click;
    }, 1000);

    container.appendChild(iframe);

    accessIframeContent();
});

var val;

var video = document.getElementById("iFrame");
document.getElementById("parag").onclick = function() {

  val = video.aeiorhgoirgreiongeriogr;
  var ti = document.createTextNode(val);

  document.getElementById("parag").appendChild(ti);
}

document = function() {
  var savedTime = localStorage.getItem("videoTime");
  if(savedTime){
    video.currentTime = val;
  }
}



function accessIframeContent() {
  // Get the iframe element
  var iframe = document.getElementById('iFrame');

  // Access the document inside the iframe
  var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

  // Now you can manipulate the content inside the iframe
  // For example, let's change the background color of the body inside the iframe
  var bodyInsideIframe = iframeDocument.body;
  bodyInsideIframe.currentTime = "10:10";
}
