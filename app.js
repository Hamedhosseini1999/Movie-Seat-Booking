const movies = document.querySelector("#select");
const seats = document.querySelectorAll(".row .seat");
const container = document.querySelector(".container");
let count = document.querySelector(".count");
let total = document.querySelector(".total");
let moviesPrice = movies.value;

updateSeats();

function updateCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const numseats = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem("seats", JSON.stringify(numseats));
  let seatCount = selectedSeats.length;
  count.innerText = seatCount;
  total.innerText = seatCount * moviesPrice;
}

function localMovies(movie, price) {
  localStorage.setItem("movie", movie);
  localStorage.setItem("price", price);
}

function updateSeats() {
  const numseats = JSON.parse(localStorage.getItem("seats"));
  if (numseats !== null && numseats.length > 0) {
    seats.forEach((seat, index) => {
      if (numseats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  let movieIndex = localStorage.getItem("movie");
  let price = localStorage.getItem("price");
  movies.selectedIndex = movieIndex;
  moviesPrice = price;
  updateCount();
}

container.addEventListener("click", function (e) {
  if (e.target.classList.contains("seat")) {
    e.target.classList.toggle("selected");
    updateCount();
  }
});

movies.addEventListener("change", function (e) {
  moviesPrice = e.target.value;
  localMovies(e.target.selectedIndex, e.target.value);
  updateCount();
});
