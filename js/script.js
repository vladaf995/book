let bestRating = document.querySelector("#best-rating");
let mostRevievs = document.querySelector("#most-reviews");
let showPageBook = document.querySelector("#show-page-book");
let pageBookItem = document.querySelector(".page-book__item");
let pageBookGenre = document.querySelector(".page-book__genre");
let pageBook = document.querySelector(".page-book");
let showBookID = document.querySelector(".show-book-id__wrapper");
let showBookIDPage = document.querySelector(".show-book-id");
let homePage = document.querySelectorAll(".container");
let backToHomePage = document.querySelector("#show-home-page");
let genreName = document.querySelector("#genre-name");
let searchBar = document.querySelector(".header__search-bar");
let showBookCardIdInfo = document.querySelector(
  ".show-book-id__wrapper__card-info"
);
let showBookIdDesc = document.querySelector(".show-book-id__description");
let input = document.querySelector("#input");
let searchBookbyName = document.querySelector("#search-button");
let checkBox = document.querySelector("#checkbox");
let checkBoxContainer = document.querySelector(".menu__checkbox");
let allGenres = [];
let adultGenres = ["Adult", "Erotic", "LGTB"];
let allBooksFromAPI;
let sumRating = 0;

// let getBooks = async () => {
//   return (
//     await fetch("https://api.jsonbin.io/v3/b/63a0e753dfc68e59d56c71ec/latest", {
//       method: "GET",
//       headers: {
//         "X-Master-Key":
//           "$2b$10$viPOiL/.5Te1ctsEnmquLuBHKGeK09Vp0SxT2m7wkH68/e1537nUK",
//       },
//     })
//   ).json();
// };

let getBooks = async () => {
  return (await fetch("./js/data.json")).json();
};

window.addEventListener("load", async () => {
  try {
    allBooksFromAPI = await getBooks();
  } catch (error) {
    console.log(error);
  }

  allBooksFromAPI.results.forEach((item) => {
    sumRating += item.rating;
    let genres = item.genre.split(",");
    genres.forEach((genre) => {
      if (!allGenres.includes(genre)) {
        allGenres = [...allGenres, genre];
      }
    });
  });

  const showBook = (type, i) => {
    let container;

    if (type === "most-reviews") {
      container = mostReviewsSorted;
    } else if (type === "best-rating") {
      container = bestRatingSorted;
    } else {
      container = allBooksFromAPI.results;
    }

    let showImg = document.createElement("img");

    if (container[i].img) {
      showImg.setAttribute("src", container[i].img);
      showImg.setAttribute("alt", container[i].title);
    } else {
      showImg.setAttribute("src", "https://shmector.com/_ph/6/708614587.png");
    }

    let showBookIdInfoWrapper = document.createElement("div");
    showBookIdInfoWrapper.classList.add("show-book-id__wrapper");
    showBookIdInfoWrapper.appendChild(showImg);
    showBookIDPage.appendChild(showBookIdInfoWrapper);

    let showBookIdInfo = document.createElement("div");
    showBookIdInfo.classList.add("show-book-id__wrapper__card-info");
    let titleid = document.createElement("h2");
    titleid.innerHTML = container[i].title;
    showBookIdInfo.appendChild(titleid);

    let author = document.createElement("p");
    author.innerHTML = `Author: ${container[i].author}`;
    showBookIdInfo.appendChild(author);

    let genre = document.createElement("p");
    genre.innerHTML = `Genre: ${container[i].genre}`;
    showBookIdInfo.appendChild(genre);

    let pages = document.createElement("p");
    pages.innerHTML = `Pages: ${container[i].pages}`;
    showBookIdInfo.appendChild(pages);

    let rat = document.createElement("span");
    rat.innerHTML = `Rating: ${container[i].rating}`;
    let averageRating = sumRating / allBooksFromAPI.results.length;

    if (container[i].rating > averageRating) {
      rat.style.backgroundColor = "green";
    } else {
      rat.style.backgroundColor = "red";
    }

    showBookIdInfo.appendChild(rat);

    showBookIdInfoWrapper.appendChild(showBookIdInfo);
    showBookIDPage.appendChild(showBookIdInfoWrapper);

    let showBookIdDescription = document.createElement("div");
    showBookIdDescription.classList.add("show-book-id__description");

    let description = document.createElement("p");
    let titleDescription = document.createElement("h3");
    titleDescription.innerHTML = "Description";
    description.innerHTML = container[i].desc;

    showBookIdDescription.appendChild(titleDescription);
    showBookIdDescription.appendChild(description);

    showBookIDPage.appendChild(showBookIdDescription);
  };

  let bestRatingSorted = [...allBooksFromAPI.results].sort((x, y) => {
    return x.rating < y.rating ? 1 : x.rating > y.rating ? -1 : 0;
  });

  for (let i = 0; i < 4; i++) {
    let newsDiv = document.createElement("div");
    newsDiv.classList.add("container__wrapper__card");

    let showImg = document.createElement("img");

    if (bestRatingSorted[i].img) {
      showImg.setAttribute("src", bestRatingSorted[i].img);
      showImg.setAttribute("alt", bestRatingSorted[i].title);
    } else {
      showImg.setAttribute("src", "https://shmector.com/_ph/6/708614587.png");
    }
    newsDiv.appendChild(showImg);

    let title = document.createElement("p");
    title.innerHTML = bestRatingSorted[i].title;
    newsDiv.appendChild(title);

    let rating = document.createElement("p");
    rating.innerHTML = `Rating: ${bestRatingSorted[i].rating}`;
    newsDiv.appendChild(rating);

    newsDiv.addEventListener("click", () => {
      homePage[0].classList.add("hidden");
      homePage[1].classList.add("hidden");
      showBookIDPage.classList.remove("hidden");
      showBookIDPage.innerHTML = "";

      showBook("best-rating", i);
    });

    bestRating.appendChild(newsDiv);
  }

  const index = Math.floor(Math.random() * allGenres.length - 1);

  let randomGenreBooks = [];
  genreName.innerHTML += `"${allGenres[index]}"`;
  allBooksFromAPI.results.forEach((e) => {
    if (e.genre.includes(allGenres[index]))
      randomGenreBooks = [...randomGenreBooks, e];
  });
  let mostReviewsSorted = [...randomGenreBooks].sort((x, y) => {
    return x.reviews < y.reviews ? 1 : x.reviews > y.reviews ? -1 : 0;
  });

  for (let i = 0; i < 4; i++) {
    if (mostReviewsSorted[i] !== undefined) {
      let newsDiv = document.createElement("div");
      newsDiv.classList.add("container__wrapper__card");

      let showImg = document.createElement("img");

      if (mostReviewsSorted[i].img) {
        showImg.setAttribute("src", mostReviewsSorted[i].img);
        showImg.setAttribute("alt", mostReviewsSorted[i].title);
      } else {
        showImg.setAttribute("src", "https://shmector.com/_ph/6/708614587.png");
      }
      newsDiv.appendChild(showImg);

      let title = document.createElement("p");
      title.innerHTML = mostReviewsSorted[i].title;
      newsDiv.appendChild(title);

      let rating = document.createElement("p");
      rating.innerHTML = `Rating: ${bestRatingSorted[i].rating}`;
      newsDiv.appendChild(rating);

      newsDiv.addEventListener("click", () => {
        homePage[0].classList.add("hidden");
        homePage[1].classList.add("hidden");
        showBookIDPage.classList.remove("hidden");
        showBookIDPage.innerHTML = "";
        showBook("most-reviews", i);
      });
      mostRevievs.appendChild(newsDiv);
    }
  }

  showPageBook.addEventListener("click", () => {
    pageBook.classList.remove("hidden");
    homePage[0].classList.add("hidden");
    homePage[1].classList.add("hidden");
    searchBar.classList.remove("visibility");
    showBookIDPage.classList.add("hidden");
    checkBoxContainer.classList.remove("visibility");
    pageBookItem.innerHTML = "";

    allBooksFromAPI.results.forEach((item, index) => {
      let newsDiv = document.createElement("div");
      newsDiv.classList.add("page-book__item__card");

      let showImg = document.createElement("img");

      if (item.img) {
        showImg.setAttribute("src", item.img);
        showImg.setAttribute("alt", item.title);
      } else {
        showImg.setAttribute("src", "https://shmector.com/_ph/6/708614587.png");
      }
      newsDiv.appendChild(showImg);

      let title = document.createElement("p");
      title.innerHTML = item.title;
      newsDiv.appendChild(title);

      let rating = document.createElement("p");
      rating.innerHTML = `Rating: ${item.rating}`;
      newsDiv.appendChild(rating);

      newsDiv.addEventListener("click", () => {
        pageBook.classList.add("hidden");
        showBookIDPage.classList.remove("hidden");
        showBookIDPage.innerHTML = "";
        showBook("all-books", index);
      });

      pageBookItem.appendChild(newsDiv);
    });

    checkBox.addEventListener("change", () => {
      pageBookGenre.innerHTML = "";
      allGenres.forEach((item) => {
        if (checkBox.checked) {
          displayGenre(item);
        } else if (!adultGenres.includes(item)) {
          displayGenre(item);
        }
      });
    });

    allGenres.sort();
    allGenres.forEach((item) => {
      if (!adultGenres.includes(item)) {
        displayGenre(item);
      }
    });

    searchBookbyName.addEventListener("click", () => {
      pageBookItem.innerHTML = "";
      searchBar.classList.add("visibility");
      checkBoxContainer.classList.add("visibility");

      let inputValue = input.value;

      allBooksFromAPI.results.forEach((item, index) => {
        if (
          item.title.toString().toLowerCase().includes(inputValue.toLowerCase())
        ) {
          let newsDiv = document.createElement("div");
          newsDiv.classList.add("page-book__item__card");

          let showImg = document.createElement("img");

          if (item.img) {
            showImg.setAttribute("src", item.img);
            showImg.setAttribute("alt", item.title);
          } else {
            showImg.setAttribute(
              "src",
              "https://shmector.com/_ph/6/708614587.png"
            );
          }
          newsDiv.appendChild(showImg);

          let title = document.createElement("p");
          title.innerHTML = item.title;
          newsDiv.appendChild(title);

          let rating = document.createElement("p");
          rating.innerHTML = `Rating: ${item.rating}`;
          newsDiv.appendChild(rating);

          newsDiv.addEventListener("click", () => {
            pageBook.classList.add("hidden");
            showBookIDPage.classList.remove("hidden");
            showBookIDPage.innerHTML = "";
            showBook("all-books", index);
          });

          pageBookItem.appendChild(newsDiv);
        }
      });
    });
  });
});

backToHomePage.addEventListener("click", () => {
  pageBook.classList.add("hidden");
  homePage[0].classList.remove("hidden");
  homePage[1].classList.remove("hidden");
  showBookIDPage.classList.add("hidden");
  searchBar.classList.add("visibility");
  checkBoxContainer.classList.add("visibility");
});

let displayGenre = (item) => {
  let genreList = document.createElement("p");
  genreList.innerHTML = item;
  genreList.addEventListener("click", () => {
    pageBookItem.innerHTML = "";

    allBooksFromAPI.results.forEach((itemm, index) => {
      if (itemm.genre.includes(item)) {
        let newsDiv = document.createElement("div");
        newsDiv.classList.add("page-book__item__card");

        let showImg = document.createElement("img");

        if (itemm.img) {
          showImg.setAttribute("src", itemm.img);
          showImg.setAttribute("alt", itemm.title);
        } else {
          showImg.setAttribute(
            "src",
            "https://shmector.com/_ph/6/708614587.png"
          );
        }
        newsDiv.appendChild(showImg);

        let title = document.createElement("p");
        title.innerHTML = itemm.title;
        newsDiv.appendChild(title);

        let rating = document.createElement("p");
        rating.innerHTML = `Rating: ${itemm.rating}`;
        newsDiv.appendChild(rating);

        newsDiv.addEventListener("click", () => {
          pageBook.classList.add("hidden");
          showBookIDPage.classList.remove("hidden");
          showBookIDPage.innerHTML = "";
          showBook("all-books", index);
        });

        pageBookItem.appendChild(newsDiv);
      }
    });
  });
  pageBookGenre.appendChild(genreList);
};
