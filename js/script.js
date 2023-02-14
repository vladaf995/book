let bestRating = document.querySelector("#best-rating");
let mostRevievs = document.querySelector("#most-reviews");
let allGenres = [];

let getBooks = async () => {
  const response = await fetch(
    "https://api.jsonbin.io/v3/b/63a0e753dfc68e59d56c71ec/latest",
    {
      method: "GET",
      headers: {
        "X-Master-Key":
          "$2b$10$viPOiL/.5Te1ctsEnmquLuBHKGeK09Vp0SxT2m7wkH68/e1537nUK",
      },
    }
  );

  const data = await response.json();
  getBestRating(data.record.results);
  return data;
};

const promise = getBooks();
promise.then((data) => console.log(data));

const randomIndexGenre = () => {
  return Math.floor(Math.random() * 173);
};

const index = randomIndexGenre();

const getBestRating = (book) => {
  book.forEach((item) => {
    let genres = item.genre.split(",");
    genres.forEach((genre) => {
      if (!allGenres.includes(genre)) {
        allGenres = [...allGenres, genre];
      }
    });
  });

  for (let i = 0; i < 4; i++) {
    let newsDiv = document.createElement("div");
    newsDiv.classList.add("container__wrapper__card");
    let img = document.createElement("img");
    img.setAttribute("src", book[i].img);
    img.setAttribute("alt", book[i].title);
    newsDiv.appendChild(img);

    let title = document.createElement("p");
    title.innerHTML = book[i].title;
    newsDiv.appendChild(title);

    let rating = document.createElement("p");
    rating.innerHTML = book[i].rating;
    newsDiv.appendChild(rating);

    bestRating.appendChild(newsDiv);
  }

  for (let i = 0; i < book.length; i++) {
    if (book[i].genre.includes(allGenres[index])) {
      let newsDiv = document.createElement("div");
      newsDiv.classList.add("container__wrapper__card");

      let img = document.createElement("img");
      img.setAttribute("src", book[i].img);
      img.setAttribute("alt", book[i].title);
      newsDiv.appendChild(img);
      let title = document.createElement("p");
      title.innerHTML = book[i].title;
      newsDiv.appendChild(title);

      let reviews = document.createElement("p");
      reviews.innerHTML = book[i].reviews;
      newsDiv.appendChild(reviews);

      mostRevievs.appendChild(newsDiv);
    }
  }
};
