import React from 'react';
import netflixlogo from "../../netflixlogo.png";
import { Link } from 'react-router-dom';
import {ImSearch} from "react-icons/im";

const Header = () => {

  return (
    <nav className="header">
      <img src={netflixlogo} alt="logo" />
      <div>
        <Link to= "/tvshows">TV Shows</Link>
        <Link to= "/movies">Movies</Link>
        <Link to= "/recentlyadded">Recently Added</Link>
        <Link to= "/mylist">My List</Link>
      </div>
      <ImSearch/>
    </nav>
  );



}

export default Header;
