import React from "react";

const ProjectActions = props => {
  return (
    <div className="actions">
      <h3>Action</h3>
      <p>
        <b>Description: </b>
        {props.action.description}
      </p>
      <p>
        <b>Notes: </b> {props.action.notes}
      </p>
    </div>
  );
};

export default ProjectActions;
