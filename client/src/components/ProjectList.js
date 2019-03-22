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
      .get("http://localhost:5000/api/projects")
      .then(res => {
        console.log(res.data);
        this.setState({ projects: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
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
