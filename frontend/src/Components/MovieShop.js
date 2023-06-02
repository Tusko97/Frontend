import React, { useState, useEffect } from 'react';
import './MovieShop.css';


const MovieShop = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    genre: '',
    image_url: '',
    actor: '',
    user_id: 1,
  });
  const [updatedMovie, setUpdatedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/movies');
      if (!response.ok) {
        throw new Error('Error fetching movies');
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.log('Error fetching movies:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
      });
      if (!response.ok) {
        throw new Error('Error adding movie');
      }
      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies, data]);
      setNewMovie({
        title: '',
        description: '',
        genre: '',
        image_url: '',
        actor: '',
        user_id: 1,
      });
    } catch (error) {
      console.log('Error adding movie:', error.message);
    }
  };

  const handleUpdateMovie = async (movieId) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/movies/${movieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovie),
      });
      if (!response.ok) {
        throw new Error('Error updating movie');
      }
      const data = await response.json();
      setMovies((prevMovies) =>
        prevMovies.map((movie) => (movie.id === movieId ? data : movie))
      );
      setUpdatedMovie(null);
    } catch (error) {
      console.log('Error updating movie:', error.message);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/movies/${movieId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting movie');
      }
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== movieId)
      );
    } catch (error) {
      console.log('Error deleting movie:', error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="bg-gray-100 p-4 mb-6">
      <h1 className="text-3xl font-bold mb-6">Movie Shop</h1>
      </div>
      <form className="mb-8" onSubmit={handleAddMovie}>
        <h2 className="text-lg font-bold mb-4">Add a Movie</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newMovie.title}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={newMovie.description}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="genre">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={newMovie.genre}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="image_url">
            Image URL
          </label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={newMovie.image_url}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="actor">
            Actor
          </label>
          <input
            type="text"
            id="actor"
            name="actor"
            value={newMovie.actor}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold"
        >
          Add Movie
        </button>
      </form>
      <div className="grid grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="border rounded shadow p-4">
            <img src={movie.image_url} alt={movie.title} className="mb-4" />
            <h2 className="text-lg font-bold">{movie.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{movie.genre}</p>
            <p className="text-sm">{movie.description}</p>
            <div className="flex mt-4">
              <button
                className="edit-button"
                onClick={() => handleUpdateMovie(movie)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteMovie(movie.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieShop;

