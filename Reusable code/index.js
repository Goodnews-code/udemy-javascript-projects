createAutoComplete({
  root: document.querySelector(".autocomplete"),
  renderOption(photo) {
    // const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    // return `
    // <img src="${imgSrc}"/>
    // ${movie.Title} (${movie.Year})
    // `;
    // const imgSrc = photo.thumbnailUrl === "N/A" ? "" : photo.thumbnailUrl;
    return `
    <img src="imgSrc"/>
    ${photo.title}
    `;
  },
  onOptionSelect(photo) {
    onMovieSelect(photo);
  },

  inputValue(photo) {
    return photo.Title;
  },

  async fetchData(searchTerm) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/photos?albumId=2",
    );

    if (response.data.Error) {
      return [];
    }

    return response.data;
  },
});

const onMovieSelect = async (photo) => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/photos?albumId=2",
    {
      params: {
        apikey: "7f73c4e4",
        i: photo.id,
      },
    },
  );

  document.querySelector("#summary").innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
  return `
  <article class='madia'>
    <figure class='media-left'>
      <p class='image'>
        <img src="${movieDetail.Poster}"/>
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <h1>${movieDetail.Title}</h1>
        <h4>${movieDetail.Genre}</h4>
        <p>${movieDetail.Plot}</p>
      </div>
    </div>
  </article>

  <article class="notification is-primary">
    <p class="title">${movieDetail.Awards}</p>
    <p class="subtitle">Awards</p>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Metascore</p>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieDetail.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieDetail.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
  </article>
  `;
};
