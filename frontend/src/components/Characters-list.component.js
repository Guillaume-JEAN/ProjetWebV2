import React, { Component } from "react";
import CharacterDataService from "../services/Character.service";
import { Link } from "react-router-dom";

export default class CharactersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveCharacters = this.retrieveCharacters.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCharacter = this.setActiveCharacter.bind(this);
    this.removeAllCharacters = this.removeAllCharacters.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      Characters: [],
      currentCharacter: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveCharacters();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveCharacters() {
    CharacterDataService.getAll()
      .then(response => {
        this.setState({
          Characters: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCharacters();
    this.setState({
      currentCharacter: null,
      currentIndex: -1
    });
  }

  setActiveCharacter(Character, index) {
    this.setState({
      currentCharacter: Character,
      currentIndex: index
    });
  }

  removeAllCharacters() {
    CharacterDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentCharacter: null,
      currentIndex: -1
    });

    CharacterDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          Characters: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, Characters, currentCharacter, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 ">
          <h4>Characters List</h4>

          <ul className="list-group">
            {Characters &&
              Characters.map((Character, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCharacter(Character, index)}
                  key={index}
                >
                  {Character.Name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-primary"
            onClick={this.removeAllCharacters}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-8">
          {currentCharacter ? (
            <div>
              <h4>Character</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentCharacter.Name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentCharacter.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentCharacter.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/Characters/" + currentCharacter.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Character...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
