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
    iframe.
    // Access the video element directly and play it
    setTimeout(() => {
      iframe.click;
    }, 1000);

    container.appendChild(iframe);
});