import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard.js";

export class ProjectList extends Component {
  state = {
    projects: []
  };

  componentDidMount = () => {
    axios
      .get("https://aa-lambdaprojects.herokuapp.com/api/projects")
      .then(res => {
        this.setState({ projects: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="project-list">
        {this.state.projects.map(project => (
          <ProjectDetails key={project.id} project={project} />
        ))}
      </div>
    );
  }
}

function ProjectDetails({ project }) {
  return (
    <Link to={`/projects/${project.id}`}>
      <ProjectCard project={project} />
    </Link>
  );
}

export default ProjectList;
