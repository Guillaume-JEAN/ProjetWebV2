import React, { Component } from "react";
import CharacterDataService from "../services/Character.service";
import { withRouter } from '../common/with-router';
import AddCharacter from "./add-Character.component";

class Character extends Component {
  constructor(props) {
    super(props);
    this.onChangename = this.onChangename.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getCharacter = this.getCharacter.bind(this);
    this.updateCharacter = this.updateCharacter.bind(this);
    this.deleteCharacter = this.deleteCharacter.bind(this);

    this.state = {
      currentCharacter: {
        id: null,
        name: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCharacter(this.props.router.params.id);
  }

  onChangename(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCharacter: {
          ...prevState.currentCharacter,
          name: name
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentCharacter: {
        ...prevState.currentCharacter,
        description: description
      }
    }));
  }

  getCharacter(id) {
    CharacterDataService.get(id)
      .then(response => {
        this.setState({
          currentCharacter: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentCharacter.id,
      name: this.state.currentCharacter.name,
      description: this.state.currentCharacter.description,
      published: status
    };

    CharacterDataService.update(this.state.currentCharacter.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentCharacter: {
            ...prevState.currentCharacter,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCharacter() {
    CharacterDataService.update(
      this.state.currentCharacter.id,
      this.state.currentCharacter
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Character was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCharacter() {    
    CharacterDataService.delete(this.state.currentCharacter.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/Characters');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCharacter } = this.state;

    return (
      <div>
        {currentCharacter ? (
          <div className="edit-form">
            <h4>Character</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentCharacter.name}
                  onChange={this.onChangename}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentCharacter.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentCharacter.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentCharacter.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCharacter}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCharacter}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Character...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Character);