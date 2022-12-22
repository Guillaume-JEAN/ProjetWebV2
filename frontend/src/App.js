import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import background from "./background.jpg";

import AddCharacter from "./components/add-Character.component";
import Character from "./components/character.component";
import CharactersList from "./components/Characters-list.component";
import GetQuote from "./components/get-Quote.components";

class App extends Component {



  render() {
    return (
      <div style={{
        backgroundImage: `url(${background})`
      }}>

        <nav className="navbar navbar-expand navbar-dark bg-primary " >
          <Link to={"/Characters"} className="navbar-brand">
            Character generator
          </Link>
          <div className="navbar-nav mr-auto  p-2" >
            <li className="nav-item">
              <Link to={"/Characters"} className="nav-link">
                Characters List
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Character
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/quote"} className="nav-link">
                Quotes
              </Link>
            </li>

          </div>
        </nav>


        <div className="container mt-3" >
          <Routes>
            <Route path="/" element={<CharactersList/>} />
            <Route path="/Characters" element={<CharactersList/>} />
            <Route path="/add" element={<AddCharacter/>} />
            <Route path="/quote" element={<GetQuote/>} />
            <Route path="/Characters/:id" element={<Character/>} />

          </Routes>
        </div>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        </div>
    );
  }
}

export default App;
