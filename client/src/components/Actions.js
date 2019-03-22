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
    axios
      .get(`https://aa-lambdaprojects.herokuapp.com/api/projects/${id}`)
      .then(res => {
        this.setState({ project: res.data });
      });
  };

  fetchActions = id => {
    axios
      .get(`https://aa-lambdaprojects.herokuapp.com/api/projects/${id}/actions`)
      .then(res => {
        this.setState({ actions: res.data });
      });
  };

  render() {
    if (!this.state.actions) {
      return <div>Loading project's information...</div>;
    }

    return (
      <div className="project-actions">
        <ProjectCard project={this.state.project} />
        {this.state.actions.map(action => (
          <ProjectActions key={action.id} action={action} />
        ))}
      </div>
    );
  }
}

export default Actions;
