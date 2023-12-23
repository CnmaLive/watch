var container = document.getElementById("container");
document.addEventListener("DOMContentLoaded", function(){
    let a = location.href;
    let b = a.substring(a.indexOf("?") + 1);
    let id = b.substring(b.indexOf("=") + 1);

    let index = b.charAt(0);
    var source = `https://vidsrc.to/embed/tv/159`;
  console.log(source)

    if(index == "t"){
      source = `https://vidsrc.to/embed/tv/${id}`
  console.log(source)

    }
    else{
      source = `https://vidsrc.to/embed/movie/${id}`
  console.log(source)

    }

    let iframe = document.createElement("iframe");
    iframe.src = source;
    iframe.allow = "fullscreen";
    iframe.allow = "autoplay";
    // Access the video element directly and play it
    setTimeout(() => {
      iframe.click;
    }, 1000);

    container.appendChild(iframe);
});