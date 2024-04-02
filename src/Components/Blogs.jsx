import React, { useState, useEffect } from 'react';
import {Bars} from 'react-loader-spinner';
import Modal from 'react-modal'; 
import "../CSS/Blogs.css";

const apiKey = '499d99db6ce23991d21afde0deede0f1';
const baseUrl = 'https://api.themoviedb.org/3';

Modal.setAppElement('#root'); // Prevents screen readers from reading behind the modal

const Movies = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        setLoading(true);
        async function getData() {
            const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
            const movies = await response.json();
            if (movies.results) {
                setData(movies.results);
            }
            setLoading(false);
        }
        getData();
    }, []);

    const fetchTrailer = async (movieId) => {
        const response = await fetch(`${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`);
        const data = await response.json();
        if (data.results.length > 0) {
            const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
            if (trailer) setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        }
    };

    const handlePlayTrailer = (movieId) => {
        setSelectedMovie(movieId);
        fetchTrailer(movieId);
    };

    const closeModal = () => {
        setSelectedMovie(null);
        setTrailerUrl("");
    };

    return (
        <div>
            <h1>Popular Movies</h1>
            <div className='parentdiv'>
                {loading ? <div className='bars'><Bars/></div> :
                data.map((movie, index) => {
                    return (
                        <div className='childdiv' key={index}>
                            <h2>Movie Title: {movie.title}</h2>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{height:"250px",width:"200px"}}/>
                            <h3>Release Date: {movie.release_date}</h3>
                            <p>{movie.overview}</p>
                            <button onClick={() => handlePlayTrailer(movie.id)}>Play Trailer</button>
                            
                        </div>
                    );
                })}
            </div>
            {selectedMovie && (
                <Modal
                    isOpen={!!selectedMovie}
                    onRequestClose={closeModal}
                    contentLabel="Movie Trailer"
                    style={{
                        content: {
                            color: 'lightsteelblue',
                            width:"900px",
                            height:"380px",
                            marginLeft:"100px",
                            marginTop:"65px"
                        },
                    }}
                >
                    <iframe
                        src={trailerUrl}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title="video"
                        width="100%"
                        height="350px"
                    />
                    <button onClick={closeModal}>Close</button>
                </Modal>
            )}
        </div>
    );
}

export default Movies;
