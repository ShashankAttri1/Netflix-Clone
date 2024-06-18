import React, { useEffect, useState } from 'react';
import "./Home.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from "react-icons/ai";
import { BiPlay } from "react-icons/bi";
// https://api.themoviedb.org/3/movie/popular?api_key=d53938eb4eba1822064d4b9e5a29c833&language=en-US&page=1
// https://api.themoviedb.org/3/movie/upcoming?api_key=d53938eb4eba1822064d4b9e5a29c833&language=en-US&page=1
// https://api.themoviedb.org/3/movie/now_playing?api_key=d53938eb4eba1822064d4b9e5a29c833&language=en-US&page=1
// https://api.themoviedb.org/3/movie/top_rated?api_key=d53938eb4eba1822064d4b9e5a29c833&language=en-US&page=1

const apikey = "d53938eb4eba1822064d4b9e5a29c833"
const url = "https://api.themoviedb.org/3"
const imgUrl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming"
const popular ="popular"
const now_playing ="now_playing"
const top_rated ="top_rated"
// const genre ="genre"
const Card =({img})=>(
   <img className='card' src={img} alt="cover" />
)
const Row =({title,arr=[]})=>(
   <div className='row'>
    <h2>{title}</h2>
    <div>
      {
      arr.map((title,index)=>(
         <Card key={index} img={`${imgUrl}/${title.poster_path}`}/>
    
      ))
      }
    </div>
   </div>
)

const Home = () => {
   const [upcomingMovies, setupcomingMovies] = useState([]);
   const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
   const [popularMovies, setPopularMovies] = useState([]);
   const [topRatedMovies, setTopRatedMovies] = useState([]);
   const [genre, setGenre] = useState([]);
   useEffect(() => {
      const fetchUpcoming=async()=>{
       const{data:{results}}= await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}&page=4`)
       setupcomingMovies(results)
       console.log(upcomingMovies)
      };
      fetchUpcoming()
      const fetchPopular=async()=>{
         const{data:{results}}= await axios.get(`${url}/movie/${popular}?api_key=${apikey}`)
         setPopularMovies(results)
         console.log(popularMovies)
        };
        fetchPopular()
        const fetchNowPlaying=async()=>{
         const{data:{results}}= await axios.get(`${url}/movie/${now_playing}?api_key=${apikey}&page=5`)
         setNowPlayingMovies(results)
         console.log(nowPlayingMovies)
        };
        fetchNowPlaying()
        const fetchTopRated=async()=>{
         const{data:{results}}= await axios.get(`${url}/movie/${top_rated}?api_key=${apikey}`)
         setTopRatedMovies(results)
         console.log(topRatedMovies)
        };
        fetchTopRated()
        const getAllGenre=async()=>{
         const{data:{genres}}= await axios.get(`${url}/genre/movie/list?api_key=${apikey}&page=3`)
         setGenre(genres)
         console.log(genres)
        };
        getAllGenre()
   }, []);

  return (
   <section className="home">
    <div className="banner" style={{
      backgroundImage: popularMovies[3]? `url(${`${imgUrl}/${popularMovies[3].poster_path}`})`:"$bg: rgb(16, 15, 15)"
    }}>

     {popularMovies[3] && <h1>{popularMovies[3].original_title}</h1>}

     {popularMovies[3] && <p>{popularMovies[3].overview}</p>}
    <div className='button1'>
      <button><BiPlay/>Play</button>
     <button>My List<AiOutlinePlus/></button>
     </div>
         
    </div>
    <Row title={"Upcoming Movies"} arr={upcomingMovies}/>
    <Row title={"Now Playing"} arr={nowPlayingMovies}/>
    <Row title={"Popular Movies"} arr={popularMovies}/>
    <Row title={"Top Rated"} arr={topRatedMovies}/>

    <div className="genreBox">
      {genre.map((item)=>(
         <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
      ))}
    </div>


    
   
   </section>
  );
}  

export default Home;
