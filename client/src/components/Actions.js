import React, { Component } from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard.js";
import ProjectActions from "./ProjectActions.js";

export class Actions extends Component {
  state = {
    project: {},
    actions: []
  };

  componentDidMount = () => {
    console.log(this.props.match.params.id);
    this.fetchProject(this.props.match.params.id);
    this.fetchActions(this.props.match.params.id);
  };

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchProject(newProps.match.params.id);
      this.fetchActions(this.props.match.params.id);
    }
  }

  fetchProject = id => {
    axios.get(`http://localhost:5000/api/projects/${id}`).then(res => {
      console.log(res.data);
      this.setState({ project: res.data });
    });
  };

  fetchActions = id => {
    axios.get(`http://localhost:5000/api/projects/${id}/actions`).then(res => {
      console.log(res.data);
      this.setState({ actions: res.data });
    });
  };

  render() {
    if (!this.state.actions) {
      return <div>Loading project's information...</div>;
    }

    return (
      <div>
        <ProjectCard project={this.state.project} />
        {this.state.actions.map(action => (
          <ProjectActions key={action.id} action={action} />
        ))}
      </div>
    );
  }
}

export default Actions;
