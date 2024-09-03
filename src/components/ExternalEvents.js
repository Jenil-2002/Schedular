import React, { useContext, useEffect, useRef, useState } from "react";
import BaseFilesContext, { BaseFilesState } from "../context/BaseFiles";


const ExternalEvents = ({ projects }) => {
  const { searchProject, selectedProjects, setModalType, handleProject } = useContext(BaseFilesContext);

  const selectedLabels = selectedProjects.map((option) => option.label);
  const filteredProjects = projects
    .filter((project) =>
      selectedProjects.length === 0
        ? true
        : selectedLabels.includes(project.status)
    )
    .filter((project) =>
      project.label.toLowerCase().includes(searchProject.toLowerCase())
    );

  return (
    <div id="external-events">
      {filteredProjects.map((project) => (
        <div
          className="fc-event projectList"
          title={project.label}
          data-id={project.id}
          status={project.status}
          key={project.id}
          onClick={(e) => handleProject(project)}
        >
          {project.label}
        </div>
      ))}
    </div>
  );
};

export default ExternalEvents;
