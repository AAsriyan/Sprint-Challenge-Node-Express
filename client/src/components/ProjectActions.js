import React from "react";

const ProjectActions = props => {
  return (
    <div>
      <p>{props.action.notes}</p>
      <p>{props.action.description}</p>
    </div>
  );
};

export default ProjectActions;
