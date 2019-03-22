import React from "react";

const ProjectCard = props => {
  return (
    <div className="project-card">
      <h2>{props.project.name}</h2>
    </div>
  );
};

export default ProjectCard;
