// Your code here
console.log("JS is running")
const moviePoster = document.getElementById("poster")
const movieTitle = document.getElementById("title")
const movieRuntime = document.getElementById("runtime")
const movieDescription = document.getElementById("film-info")
const movieShowtime = document.getElementById("showtime")
const movieTickets = document.getElementById("ticket-num")


const extraContent = document.getElementById("extra")

let filmId = 1;

const fetchDB = () => {
    fetch("http://localhost:3000/films")
    .then((res) => res.json())
    .then((data) => {
        data.forEach((item) => renderMovie(item))
        moviePoster.src = data[0].poster;
        movieTitle.textContent = data[0].title;
        movieRuntime.textContent = data[0].runtime;
        movieDescription.textContent = data[0].description;
        movieShowtime.textContent = data[0].showtime;
        movieTickets.textContent = data[0].capacity - data[0].tickets_sold;
        filmId = data[0].id;
        
    })
}


const movieTitleList = document.getElementById("films")
const renderMovie = (movieObj) => {
    const movieListItem = document.createElement("li");
    movieListItem.setAttribute("class", "film-item");
    movieListItem.setAttribute("id", `film-${movieObj.id}`)
    movieListItem.textContent = movieObj.title
    movieTitleList.append(movieListItem);

    movieListItem.addEventListener("click", () => {
        moviePoster.src = movieObj.poster;
        movieTitle.textContent = movieObj.title;
        movieDescription.textContent = movieObj.description;
        movieRuntime.textContent = movieObj.runtime;
        movieShowtime.textContent = movieObj.showtime;
        movieTickets.textContent = movieObj.capacity - movieObj.tickets_sold;
        filmId = movieObj.id;
    })

    
}

const buyButton = document.getElementById("buy-ticket")
const filmItem = document.getElementById(`film-${filmId}`)
buyButton.addEventListener("click", () => {

    let availableTickets = parseInt(movieTickets.textContent)
    if (availableTickets > 0) {
        availableTickets = availableTickets - 1;
        movieTickets.textContent = availableTickets;
        
    } else {
        buyButton.textContent = "SOLD OUT";
        filmItem.classList.add("sold-out"); 
    }
})


fetchDB()
