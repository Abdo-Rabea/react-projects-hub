import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const key = "85c62a61";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("interstellar");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedId, setSelectedId] = useState(null);

  useEffect(
    function () {
      async function getMovies() {
        try {
          setIsLoading(true);
          setError(null);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${key}&s=${query}`
          );

          //! to deal with other kinds of error(ex. 402) other than what fetch throws an error on
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("No movies found");
          }

          setMovies(data.Search);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length <= 3) {
        setMovies([]);
        setError(null);
        return;
      }
      getMovies();
    },
    [query]
  );

  function handleSetQuery(q) {
    setQuery(q);
  }

  function handleToggleSelectedMovie(imdbID) {
    setSelectedId((id) => (id === imdbID ? null : imdbID));
  }

  function handleResetSelectedId() {
    setSelectedId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((movies) => [...movies, movie]);
    handleResetSelectedId();
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== id));
  }
  return (
    <>
      <QueryNav>
        {/* wow no prop drilling */}
        <QueryInput query={query} onSetQuery={handleSetQuery} />
        <NumResults moviesNum={movies.length} />
      </QueryNav>

      <Main>
        <Box>
          {error ? (
            <ErrorMessage message={error} />
          ) : isLoading ? (
            <Loader />
          ) : (
            <MoviesList
              movies={movies}
              onToggleSelectedMovie={handleToggleSelectedMovie}
            />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              id={selectedId}
              onCloseMovieDetails={handleResetSelectedId}
              onAddWatchedMovie={handleAddWatchedMovie}
              // *if there is userRating, the movie is watched
              userRating={watched.reduce(
                (acc, movie) =>
                  movie.imdbID === selectedId ? movie.userRating : acc,
                null
              )}
            />
          ) : (
            <>
              <WatchedMoviesSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

// for test

function MovieDetails({
  id,
  onCloseMovieDetails,
  onAddWatchedMovie,
  userRating = null,
}) {
  const [isLoadingMovie, setIsLoadingMovie] = useState(true);
  const [errorMovie, setErrorMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState({});
  const [rating, setRating] = useState(null);

  function handleAddToList() {
    const movie = {
      imdbID: movieDetails.imdbID,
      Title: movieDetails.Title,
      imdbRating: movieDetails.imdbRating,
      userRating: rating,
      Poster: movieDetails.Poster,
      runtime: movieDetails.Runtime,
    };
    onAddWatchedMovie(movie);
  }
  useEffect(
    function () {
      async function getMovieById() {
        try {
          setIsLoadingMovie(true);
          setErrorMovie(null);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${key}&i=${id}`
          );

          //! to deal with other kinds of error(ex. 402) other than what fetch throws an error on
          if (!res.ok)
            throw new Error("Something went wrong with fetching movie");

          const data = await res.json();

          setMovieDetails(data);
        } catch (err) {
          console.log(err);
          setErrorMovie(err.message);
        } finally {
          setIsLoadingMovie(false);
        }
      }

      getMovieById();
    },
    [id]
  );

  // todo: change the title of the page when a movie is selected (movieDetails changes)
  // it will run when the component mount but the data not arrived yet so nothing will happen
  // it will be called again when the data arrives and the title will be setted
  // * @imp: useEffect has a side effect inside as it syncs. the outer api (dom title) with the instance data
  useEffect(
    function () {
      if (movieDetails.Title) document.title = `MOVIE | ${movieDetails.Title}`;
      return () => {
        document.title = "usePopcorn";
      };
    },
    [movieDetails.Title]
  );

  if (isLoadingMovie) return <Loader />;
  if (errorMovie) return <ErrorMessage message={errorMovie} />;
  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovieDetails}>
          ←
        </button>
        <img src={movieDetails.Poster} alt={movieDetails.Title + " image"} />
        <div className="details-overview">
          <h2>{movieDetails.Title}</h2>
          <p>{`${movieDetails.Released} • ${movieDetails.Runtime}`}</p>
          <p>{movieDetails.Genre}</p>
          <p>
            <span>⭐️</span> {movieDetails.imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {userRating ? (
            <div>You rated movie with {userRating} ⭐</div>
          ) : (
            <>
              <StarRating maxRating={10} size={26} onSetRating={setRating} />
              {rating && (
                <button className="btn-add" onClick={handleAddToList}>
                  + Add to list
                </button>
              )}
            </>
          )}
        </div>
        <p>{movieDetails.Plot}</p>
        <p>Starring {"Starring" + movieDetails.Actors}</p>
        <p>{"Directed by " + movieDetails.Director}</p>
      </section>
    </div>
  );
}
// reuable components

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}
function ToggleButton({ onToggle, isOpen }) {
  return (
    <button className="btn-toggle" onClick={onToggle}>
      {isOpen ? "–" : "+"}
    </button>
  );
}

function QueryNav({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function QueryInput({ query, onSetQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
    />
  );
}

function NumResults({ moviesNum }) {
  return (
    <p className="num-results">
      Found <strong>{moviesNum}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  function handleToggleOpen() {
    setIsOpen((o) => !o);
  }
  return (
    <div className="box">
      <ToggleButton onToggle={handleToggleOpen} isOpen={isOpen} />
      {isOpen && children}
    </div>
  );
}

function MoviesList({ movies, onToggleSelectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieItem
          movie={movie}
          key={movie.imdbID}
          onToggleSelectedMovie={onToggleSelectedMovie}
        />
      ))}
    </ul>
  );
}
function MovieItem({ movie, onToggleSelectedMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => onToggleSelectedMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedMoviesList({ watched, onDeleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieItem
          movie={movie}
          key={movie.imdbID}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}

function WatchedMovieItem({ movie, onDeleteWatchedMovie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime}</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatchedMovie(movie.imdbID)}
        >
          &#x2716;
        </button>
      </div>
    </li>
  );
}

function WatchedMoviesSummary({ watched }) {
  const avgImdbRating = Number(
    average(watched.map((movie) => movie.imdbRating))
  ).toFixed(1);

  const avgUserRating = Number(
    average(watched.map((movie) => movie.userRating))
  ).toFixed(1);

  const avgRuntime = Number(
    average(
      watched.map((movie) =>
        isNaN(parseFloat(movie.runtime)) ? 0 : parseFloat(movie.runtime)
      )
    )
  ).toFixed(1);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
