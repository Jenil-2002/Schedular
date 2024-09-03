import React, { useContext, useEffect, useRef, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import BaseFilesContext, { BaseFilesState } from "../context/BaseFiles";

export default function DropdownMenu({ title, options }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectAllRef = useRef(null);

  const {selectedResources, setSelectedResources, selectedProjects, setSelectedProjects} = useContext(BaseFilesContext);
  

  const handleSelectAllResources = (e) => {
    if (e.target.checked) {
      console.log("first")
      setSelectedResources(options);
    } else {
      setSelectedResources([""]);
    }
  };
  const handleSelectAllProjects = (e) => {
    if (e.target.checked) {
      setSelectedProjects(options);
    } else {
      setSelectedProjects([""]);
    }
  };

  const handleOptionChangeInResources = (option) => {
    if (selectedResources.includes(option)) {
      setSelectedResources(selectedResources.filter((item) => item !== option));
    } else {
      setSelectedResources([...selectedResources, option]);
    }
  };

  const handleOptionChangeInProjects = (option) => {
    if (selectedProjects.includes(option)) {
      setSelectedProjects(selectedProjects.filter((item) => item !== option));
    } else {
      setSelectedProjects([...selectedProjects, option]);
    }
  };

  const isAllSelected = title === "resourcesList" ? (selectedResources.length === options.length) : (selectedProjects.length === options.length);
  const isIndeterminate = title === "resourcesList" ? (selectedResources.length > 1 && !isAllSelected) : (selectedProjects.length > 1 && !isAllSelected);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const toggleDropdown = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  /*-----------------------------------------------------*/
  return (
    <Dropdown
      show={dropdownOpen}
      onToggle={toggleDropdown}
      className="nav-item"
      align="end"
      id={`dropdown-${title}`}
    >
      <Dropdown.Toggle
        variant="success"
        onClick={toggleDropdown}
        className="nav-link filterDropdown"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="22"
          viewBox="0 0 21 22"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 1.74251C0 1.28037 0.184375 0.837155 0.512563 0.51037C0.840752 0.183586 1.28587 0 1.75 0H19.25C19.7141 0 20.1592 0.183586 20.4874 0.51037C20.8156 0.837155 21 1.28037 21 1.74251V4.16577C20.9999 4.78191 20.7539 5.37277 20.3163 5.80838L14 12.0977V20.722C14 20.9398 13.9441 21.154 13.8376 21.3443C13.7311 21.5346 13.5775 21.6946 13.3914 21.8091C13.2053 21.9237 12.9929 21.9889 12.7743 21.9987C12.5558 22.0085 12.3383 21.9625 12.1427 21.8651L7.80617 19.7067C7.56393 19.5861 7.36021 19.4007 7.21782 19.1713C7.07543 18.9419 7.00001 18.6776 7 18.4079V12.0977L0.683667 5.80838C0.246051 5.37277 0.000132154 4.78191 0 4.16577V1.74251ZM2.33333 2.32335V4.16577L8.82 10.6247C8.98269 10.7865 9.11176 10.9786 9.19984 11.1901C9.28792 11.4016 9.33328 11.6283 9.33333 11.8572V17.8689L11.6667 19.0306V11.8572C11.6667 11.3949 11.851 10.9511 12.18 10.6258L18.6667 4.16461V2.32335H2.33333Z"
            fill="#B8B8B8"
          />
        </svg>
      </Dropdown.Toggle>
      <Dropdown.Menu
        data-popper-placement="bottom-end"
        
      >
        <Dropdown.Item as="div" onClick={(e) => e.stopPropagation()}>
            <label
              htmlFor={`select-all-${title}`}
              className="form-check-label w-100"
            >
              <input
                type="checkbox"
                id={`select-all-${title}`}
                className="form-check-input"
                checked={isAllSelected}
                ref={selectAllRef}
                onChange={title === "resourcesList" ? handleSelectAllResources : handleSelectAllProjects}
              />
              Select All
            </label>
          </Dropdown.Item>
        {options.map((option, index) => (
          <Dropdown.Item
          as="div"
          key={index}
          onChange={() => title === "resourcesList" ? handleOptionChangeInResources(option) : handleOptionChangeInProjects(option)}
          onClick={(e) => e.stopPropagation()}
        >
          <label
            htmlFor={`option-${title}-${index}`}
            className="form-check-label w-100"
          >
            <input
              type="checkbox"
              id={`option-${title}-${index}`}
              className="form-check-input"
              checked={title === "resourcesList" ? selectedResources.includes(option) : selectedProjects.includes(option) }
              readOnly
            />
            {option.label}
          </label>
       </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
