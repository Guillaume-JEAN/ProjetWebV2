import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCharacter from "./components/add-Character.component";
import Character from "./components/character.component";
import CharactersList from "./components/Characters-list.component";

class App extends Component {
  render() {
    return (
      <div>

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
          </div>
        </nav>


        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<CharactersList/>} />
            <Route path="/Characters" element={<CharactersList/>} />
            <Route path="/add" element={<AddCharacter/>} />
            <Route path="/Characters/:id" element={<Character/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;