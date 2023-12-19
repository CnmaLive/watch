document.addEventListener("DOMContentLoaded", function () {
    var a = location.href;
    var b = a.substring(a.indexOf("?") + 1);
    var id = b.substring(b.indexOf("=") + 1);

    console.log(id);

    const apiKey = '89d3d50b04bf827bde106ef72f4856c3';

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

    console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(data => {
        var thing = data.title;
        document.title = thing;


        var frame = document.getElementById(`player`);
        if(b.charAt(0) == "m"){
            frame.src = `https://vidsrc.me/embed/movie?tmdb=${id}`;
        }
        else{
            frame.src = `https://vidsrc.me/embed/tv?tmdb=${id}`;

        }
        
    }) 
    .catch(error => {
        console.log("No Show Found")
    });
});



