import React, { Component } from "react";
import CharacterDataService from "../services/Character.service";

export default class AddCharacter extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveCharacter = this.saveCharacter.bind(this);
    this.newCharacter = this.newCharacter.bind(this);

    this.state = {
      id: null,
      Name: "",
      description: "", 
      published: false,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      Name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveCharacter() {
    var data = {
      Name: this.state.Name,
      description: this.state.description
    };

    CharacterDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          Name: response.data.Name,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCharacter() {
    this.setState({
      id: null,
      Name: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form ">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-primary" onClick={this.newCharacter}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group ">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                className="form-control"
                id="Name"
                required
                value={this.state.Name}
                onChange={this.onChangeName}
                name="Name"
                placeholder="enter your character's name"
              />
            </div>

            <div className="form-group">
              <label htmlFor=" description ">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
                placeholder="enter your character's description"
              />
            </div>

            <button onClick={this.saveCharacter} className="btn btn-primary">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
