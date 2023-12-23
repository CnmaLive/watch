var container = document.getElementById("container");
document.addEventListener("DOMContentLoaded", function(){
    let a = location.href;
    let b = a.substring(a.indexOf("?") + 1);
    let id = b.substring(b.indexOf("=") + 1);
    let source = `https://vidsrc.to/embed/tv/${id}?autoplay=1`

    let iframe = document.createElement("iframe");
    iframe.src = source;
    iframe.allow = "fullscreen";
    iframe.allow = "autoplay";
    
    stopAllYouTubeVideos;

    container.appendChild(iframe);
    iframe.contentWindow.play();
});

var stopAllYouTubeVideos = () => { 
    var iframes = document.querySelectorAll('iframe');
    Array.prototype.forEach.call(iframes, iframe => { 
      iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', 
    func: 'stopVideo' }), '*');
   });
  }