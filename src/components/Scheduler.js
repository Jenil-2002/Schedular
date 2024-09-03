/* eslint-disable no-undef */
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { Draggable } from "@fullcalendar/interaction";
import interactionPlugin from "@fullcalendar/interaction";
import ExternalEvents from "./ExternalEvents";
import { Modal } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faCalendarAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import moment from "moment/moment";
import SnackbarsContext from "../context/SnackbarContext";
import { Dropdown } from "react-bootstrap";
import { event } from "jquery";
import SelectAllDropdown from "./Dropdown";
import DropdownMenu from "./Dropdown";
import BaseFilesContext from "../context/BaseFiles";

const Scheduler = () => {
  const {
    calendarRef,
    handleEventReceive,
    handleSaveEvent,
    handleDeleteEvent,
    handleSaveProject,
    setSelectedEvent,
    searchQuery,
    setSearchQuery,
    selectedResources,
    searchProject,
    setSearchProject,
    projects,
    resources,
    stateOptions,
    setPrevStartDate,
    setPrevEndDate,
    setPrevResourceID,
    handleClearModel,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setSelectedUser,
    newProject,
    setNewProject,
    selectedUser,
    modalType,
    setModalType,
    customStyles,
    selectedProject,
    setSelectedProject,
  } = useContext(BaseFilesContext);

  // const [filteredResources, setFilteredResources] = useState([]);
  // let filteredResources = null;

  useEffect(() => {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data-id");
        let status = eventEl.getAttribute("status");
        return {
          id: id,
          title: title,
          extendedProps: {
            status: status,
            modelevent: false,
            newEvent: true,
          },
          classNames: [`status-${status.replace(/\s+/g, "-")}`],
          newClasses: `status-${status.replace(/\s+/g, "-")}`,
        };
      },
    });
  }, []);

  // useEffect(() => {
  // If search query is empty, show all resources
  const selectedLabels = selectedResources.map((option) => option.title);
  const filteredResources = resources
    .filter((resource) =>
      selectedResources.length === 0
        ? true
        : selectedLabels.includes(resource.title)
    )
    .filter((resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  // );
  // }, [resources, searchQuery, selectedResources]);

  // console.log(filteredResources);

  const handleEventResize = (info) => {
    setSelectedEvent(info.event);
    handleEventReceive(null, info, false);
  };

  const handleEventDragStart = (info) => {
    setSelectedEvent(info.event);
    setPrevStartDate(info.event.start);
    setPrevEndDate(info.event.end);
    setPrevResourceID(info.event.getResources()[0].id);
  };

  const handleEventResizeStart = (info) => {
    setPrevStartDate(info.event.start);
    setPrevEndDate(info.event.end);
    setPrevResourceID(info.event.getResources()[0].id);
  };

  const handleDateClick = (info) => {
    setSelectedEvent(info.event);
    setSelectedUser([
      {
        value: info.resource.id || "",
        label: info.resource.title || "",
      },
    ]);

    setStartDate(info.date);
    setEndDate(info.date);

    setModalType("add_assignment");
    const modalElement = document.getElementById("eventModal");
    const modal = new Modal(modalElement);
    modal.show();
  };

  const handleEventDrop = (info) => {
    setSelectedEvent(info.event);
    handleEventReceive(null, info, false);
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setSelectedProject({
      value: info.event?.id || "",
      label: info.event?.title || "",
    });
    setSelectedUser([
      {
        value: info.event.getResources()[0]?.id || "",
        label: info.event.getResources()[0]?.title || "",
      },
    ]);

    const start = info.event.start;
    setStartDate(start);

    let end = info.event.end;
    if (end === null) {
      setEndDate(start);
    } else {
      end = moment(end).subtract(1, "days").toDate();
      setEndDate(end);
    }
    setModalType("edit_assignment");
    const modalElement = document.getElementById("eventModal");
    const modal = new Modal(modalElement);
    modal.show();
  };

  const handleProjectModel = () => {
    handleClearModel();
    setModalType("newProject");
  };

  const renderEventContent = (eventInfo) => {
    return eventInfo.event.title;
  };

  /*------------- Zoom In/Out -------------------*/
  const [slotMinWidth, setSlotMinWidth] = useState(90); // Initial slotMinWidth

  const handleZoomOut = () => {
    setSlotMinWidth((prev) => Math.max(prev - 20, 30)); // Decrease width, with a minimum of 20px
  };

  const handleZoomIn = () => {
    setSlotMinWidth((prev) => Math.min(prev + 20, 200)); // Increase width, with a maximum of 300px
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (modalType === "newProject") {
      handleSaveProject();
    } else {
      handleSaveEvent();
    }
  };

  return (
    <main className="main">
      <div className="main-content">
        <nav className="navbar navbar-top pb-0 justify-content-start">
          <div className="top-head">
            <Link className="navbar-brand p-0 flex-fill me-0" to="/">
              <img
                src="assets/images/logo.svg"
                alt="PMS"
                width="58"
                className="me-12"
              />
              <span>
                Resource
                <br /> Manager
              </span>
            </Link>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="btn btn-gradient"
                data-bs-toggle="modal"
                data-bs-target="#eventModal"
                onClick={handleProjectModel}
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                New Project
              </button>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-icons mb-0 flex-row align-items-center ms-auto">
            <div className="language-grp">
              <Link to="#">
                <img
                  src="assets/images/France.svg"
                  alt="Changer la langue en Français"
                  title="Changer la langue en Français"
                />
              </Link>
              <Link to="#">
                <img
                  src="assets/images/German.svg"
                  alt="Sprache auf Deutsch umstellen"
                  title="Sprache auf Deutsch umstellen"
                />
              </Link>
              <Link to="#">
                <img
                  src="assets/images/Arabic.svg"
                  alt="تغيير اللغة إلى العربية"
                  title="تغيير اللغة إلى العربية"
                />
              </Link>
            </div>
            <li className="nav-item">
              <button className="nav-link" onClick={handleZoomIn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M14.2939 12.5786H13.3905L13.0703 12.2699C14.2297 10.9251 14.8669 9.20834 14.8656 7.43282C14.8656 5.96275 14.4297 4.52569 13.613 3.30337C12.7963 2.08105 11.6354 1.12837 10.2772 0.565793C8.91907 0.0032205 7.42457 -0.143974 5.98275 0.142823C4.54092 0.42962 3.21652 1.13753 2.17702 2.17702C1.13753 3.21652 0.42962 4.54092 0.142823 5.98275C-0.143974 7.42457 0.0032205 8.91907 0.565793 10.2772C1.12837 11.6354 2.08105 12.7963 3.30337 13.613C4.52569 14.4297 5.96275 14.8656 7.43282 14.8656C9.27387 14.8656 10.9663 14.191 12.2699 13.0703L12.5786 13.3905V14.2939L18.2962 20L20 18.2962L14.2939 12.5786ZM7.43282 12.5786C4.58548 12.5786 2.28702 10.2802 2.28702 7.43282C2.28702 4.58548 4.58548 2.28702 7.43282 2.28702C10.2802 2.28702 12.5786 4.58548 12.5786 7.43282C12.5786 10.2802 10.2802 12.5786 7.43282 12.5786ZM8.00458 4.57404H6.86107V6.86107H4.57404V8.00458H6.86107V10.2916H8.00458V8.00458H10.2916V6.86107H8.00458V4.57404Z"
                    fill="#B8B8B8"
                  />
                </svg>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleZoomOut}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M14.2939 12.5786H13.3905L13.0703 12.2699C14.2297 10.9251 14.8669 9.20834 14.8656 7.43282C14.8656 5.96275 14.4297 4.52569 13.613 3.30337C12.7963 2.08105 11.6354 1.12837 10.2772 0.565793C8.91907 0.00322052 7.42457 -0.143974 5.98275 0.142823C4.54092 0.42962 3.21652 1.13753 2.17702 2.17702C1.13753 3.21652 0.42962 4.54092 0.142823 5.98275C-0.143974 7.42457 0.00322052 8.91907 0.565793 10.2772C1.12837 11.6354 2.08105 12.7963 3.30337 13.613C4.52569 14.4297 5.96275 14.8656 7.43282 14.8656C9.27387 14.8656 10.9663 14.191 12.2699 13.0703L12.5786 13.3905V14.2939L18.2962 20L20 18.2962L14.2939 12.5786ZM7.43282 12.5786C4.58548 12.5786 2.28702 10.2802 2.28702 7.43282C2.28702 4.58548 4.58548 2.28702 7.43282 2.28702C10.2802 2.28702 12.5786 4.58548 12.5786 7.43282C12.5786 10.2802 10.2802 12.5786 7.43282 12.5786ZM4.57404 6.86107H10.2916V8.00458H4.57404V6.86107Z"
                    fill="#B8B8B8"
                  />
                </svg>
              </button>
            </li>
            <li className="nav-item d-none">
              <Link to="#" className="nav-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M10.8 2.8V1.2C10.8 0.88174 10.9264 0.576516 11.1515 0.351472C11.3765 0.126428 11.6817 0 12 0C12.3183 0 12.6235 0.126428 12.8485 0.351472C13.0736 0.576516 13.2 0.88174 13.2 1.2V2.8C13.2 3.11826 13.0736 3.42348 12.8485 3.64853C12.6235 3.87357 12.3183 4 12 4C11.6817 4 11.3765 3.87357 11.1515 3.64853C10.9264 3.42348 10.8 3.11826 10.8 2.8ZM18.8 12C18.8 13.3449 18.4012 14.6596 17.654 15.7779C16.9068 16.8961 15.8448 17.7677 14.6022 18.2824C13.3597 18.7971 11.9925 18.9317 10.6734 18.6693C9.35431 18.407 8.14267 17.7593 7.19167 16.8083C6.24068 15.8573 5.59304 14.6457 5.33066 13.3266C5.06828 12.0075 5.20294 10.6403 5.71762 9.39775C6.2323 8.15522 7.10387 7.0932 8.22212 6.34601C9.34038 5.59881 10.6551 5.2 12 5.2C13.8029 5.20185 15.5314 5.91887 16.8063 7.19372C18.0811 8.46857 18.7981 10.1971 18.8 12ZM16.4 12C16.4 11.1298 16.1419 10.2791 15.6585 9.55549C15.175 8.83191 14.4878 8.26796 13.6838 7.93493C12.8798 7.6019 11.9951 7.51477 11.1416 7.68455C10.2881 7.85432 9.50408 8.27338 8.88873 8.88873C8.27338 9.50408 7.85432 10.2881 7.68455 11.1416C7.51477 11.9951 7.6019 12.8798 7.93493 13.6838C8.26796 14.4878 8.83191 15.175 9.55549 15.6585C10.2791 16.1419 11.1298 16.4 12 16.4C13.1665 16.3987 14.2849 15.9347 15.1098 15.1098C15.9347 14.2849 16.3987 13.1665 16.4 12ZM4.351 6.049C4.46262 6.16062 4.59514 6.24917 4.74098 6.30958C4.88683 6.36999 5.04314 6.40108 5.201 6.40108C5.35886 6.40108 5.51517 6.36999 5.66102 6.30958C5.80686 6.24917 5.93938 6.16062 6.051 6.049C6.16262 5.93738 6.25117 5.80486 6.31158 5.65902C6.37199 5.51317 6.40308 5.35686 6.40308 5.199C6.40308 5.04114 6.37199 4.88483 6.31158 4.73898C6.25117 4.59314 6.16262 4.46062 6.051 4.349L4.851 3.149C4.62557 2.92357 4.31981 2.79692 4.001 2.79692C3.68219 2.79692 3.37643 2.92357 3.151 3.149C2.92557 3.37443 2.79892 3.68019 2.79892 3.999C2.79892 4.31781 2.92557 4.62357 3.151 4.849L4.351 6.049ZM4.351 17.949L3.151 19.149C3.03938 19.2606 2.95083 19.3931 2.89042 19.539C2.83001 19.6848 2.79892 19.8411 2.79892 19.999C2.79892 20.1569 2.83001 20.3132 2.89042 20.459C2.95083 20.6049 3.03938 20.7374 3.151 20.849C3.37643 21.0744 3.68219 21.2011 4.001 21.2011C4.15886 21.2011 4.31517 21.17 4.46102 21.1096C4.60686 21.0492 4.73938 20.9606 4.851 20.849L6.051 19.649C6.27643 19.4236 6.40308 19.1178 6.40308 18.799C6.40308 18.4802 6.27643 18.1744 6.051 17.949C5.82557 17.7236 5.51981 17.5969 5.201 17.5969C4.88219 17.5969 4.57643 17.7236 4.351 17.949ZM18.8 6.4C18.9576 6.40012 19.1137 6.36919 19.2594 6.30896C19.4051 6.24874 19.5375 6.1604 19.649 6.049L20.849 4.849C20.9606 4.73738 21.0492 4.60486 21.1096 4.45902C21.17 4.31317 21.2011 4.15686 21.2011 3.999C21.2011 3.84114 21.17 3.68483 21.1096 3.53898C21.0492 3.39314 20.9606 3.26062 20.849 3.149C20.7374 3.03738 20.6049 2.94883 20.459 2.88842C20.3132 2.82801 20.1569 2.79692 19.999 2.79692C19.8411 2.79692 19.6848 2.82801 19.539 2.88842C19.3931 2.94883 19.2606 3.03738 19.149 3.149L17.949 4.349C17.7802 4.51684 17.6651 4.7311 17.6184 4.96453C17.5717 5.19796 17.5954 5.44001 17.6867 5.6599C17.7779 5.87978 17.9325 6.06756 18.1307 6.19935C18.329 6.33114 18.5619 6.40098 18.8 6.4ZM19.649 17.951C19.4236 17.7256 19.1178 17.5989 18.799 17.5989C18.4802 17.5989 18.1744 17.7256 17.949 17.951C17.7236 18.1764 17.5969 18.4822 17.5969 18.801C17.5969 19.1198 17.7236 19.4256 17.949 19.651L19.149 20.851C19.3744 21.0764 19.6802 21.2031 19.999 21.2031C20.3178 21.2031 20.6236 21.0764 20.849 20.851C21.0744 20.6256 21.2011 20.3198 21.2011 20.001C21.2011 19.6822 21.0744 19.3764 20.849 19.151L19.649 17.951ZM4 12C4 11.6817 3.87357 11.3765 3.64853 11.1515C3.42348 10.9264 3.11826 10.8 2.8 10.8H1.2C0.88174 10.8 0.576516 10.9264 0.351472 11.1515C0.126428 11.3765 0 11.6817 0 12C0 12.3183 0.126428 12.6235 0.351472 12.8485C0.576516 13.0736 0.88174 13.2 1.2 13.2H2.8C3.11826 13.2 3.42348 13.0736 3.64853 12.8485C3.87357 12.6235 4 12.3183 4 12ZM12 20C11.6817 20 11.3765 20.1264 11.1515 20.3515C10.9264 20.5765 10.8 20.8817 10.8 21.2V22.8C10.8 23.1183 10.9264 23.4235 11.1515 23.6485C11.3765 23.8736 11.6817 24 12 24C12.3183 24 12.6235 23.8736 12.8485 23.6485C13.0736 23.4235 13.2 23.1183 13.2 22.8V21.2C13.2 20.8817 13.0736 20.5765 12.8485 20.3515C12.6235 20.1264 12.3183 20 12 20ZM22.8 10.8H21.2C20.8817 10.8 20.5765 10.9264 20.3515 11.1515C20.1264 11.3765 20 11.6817 20 12C20 12.3183 20.1264 12.6235 20.3515 12.8485C20.5765 13.0736 20.8817 13.2 21.2 13.2H22.8C23.1183 13.2 23.4235 13.0736 23.6485 12.8485C23.8736 12.6235 24 12.3183 24 12C24 11.6817 23.8736 11.3765 23.6485 11.1515C23.4235 10.9264 23.1183 10.8 22.8 10.8Z"
                    fill="#B8B8B8"
                  />
                </svg>
              </Link>
            </li>
            <li className="nav-item rightSidenav-toggleIcon open">
              <button to="#" className="nav-link">
                <img
                  src="assets/images/right_panel_close.svg"
                  alt="Close Right Side"
                />
              </button>
            </li>
          </ul>
        </nav>

        <div className="content p-4 position-relative">
          <nav className="navbar p-0 search-navbar">
            <ul className="navbar-nav navbar-nav-icons flex-row align-items-center mb-0">
              <li className="nav-item">
                <div className="search-box">
                  <div className="position-relative">
                    <input
                      className="form-control search-input"
                      placeholder="Search Emp..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span className="search-box-icon text-primary-hover">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="23"
                        viewBox="0 0 22 23"
                        fill="none"
                      >
                        <circle
                          cx="10.681"
                          cy="10.681"
                          r="8.68097"
                          stroke="#B8B8B8"
                          strokeWidth="2.15971"
                        ></circle>
                        <path
                          d="M16.6198 17.5344L20.9994 21.9141"
                          stroke="#B8B8B8"
                          strokeWidth="2.15971"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </li>
              <DropdownMenu title="resourcesList" options={resources} />
            </ul>
          </nav>
          <div id="calendar-container">
            <div id="calendar">
              <FullCalendar
                ref={calendarRef}
                key={filteredResources.length}
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  resourceTimelinePlugin,
                  interactionPlugin,
                ]}
                initialView="resourceTimelineMonth" // Default view
                headerToolbar={{
                  left: "prev,title,next",
                  center: "",
                  right: "today,resourceTimelineWeek,resourceTimelineMonth",
                }}
                height="auto"
                resourceAreaWidth={300}
                slotMinWidth={slotMinWidth}
                editable={true}
                droppable={true}
                resources={filteredResources}
                eventResourceEditable={true}
                eventReceive={(info) => {
                  handleEventReceive(null, info, false);
                }}
                eventClick={handleEventClick}
                eventContent={renderEventContent}
                eventResize={handleEventResize}
                eventDrop={handleEventDrop}
                eventDragStart={handleEventDragStart}
                eventResizeStart={handleEventResizeStart}
                dateClick={handleDateClick}
                resourceAreaHeaderContent={""}
                resourceLabelContent={({ resource }) => (
                  <div className="d-flex align-items-center">
                    <div className="emp-avatar">
                      <img
                        src={resource.extendedProps.avatar}
                        alt="T"
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <h5 className="emp-name">{resource.title}</h5>
                      <p className="emp-email">
                        {resource.extendedProps.email}
                      </p>
                    </div>
                  </div>
                )}
                views={{
                  resourceTimelineDay: {
                    type: "resourceTimeline",
                    duration: { days: 1 },
                    slotDuration: { hours: 1 },
                    slotLabelContent: function (arg) {
                      const hour = arg.date.toLocaleString("en", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: false, // 24-hour format to avoid repeating AM/PM
                      });
                      const ampm = arg.date
                        .toLocaleString("en", {
                          hour: "numeric",
                          hour12: true,
                        })
                        .split(" ")[1]; // Extracts AM or PM

                      return {
                        html: `<div>${hour}<br />${ampm}</div>`,
                      };
                    },
                  },

                  resourceTimelineWeek: {
                    type: "resourceTimeline",
                    duration: { weeks: 1 },
                    slotDuration: { day: 1 },
                    slotLabelContent: function (arg) {
                      const weekday = arg.date.toLocaleDateString("en", {
                        weekday: "short",
                      });
                      const day = arg.date.toLocaleDateString("en", {
                        day: "2-digit",
                      });
                      const month = arg.date.toLocaleDateString("en", {
                        month: "2-digit",
                      });
                      return {
                        html: `<div>${weekday}<br /><span style="color:#B8B8B8">${day}/${month}</span></div>`,
                      };
                    },
                  },
                  resourceTimelineMonth: {
                    type: "resourceTimeline",
                    duration: { months: 1 },
                    slotLabelContent: function (arg) {
                      const weekday = arg.date.toLocaleDateString("en", {
                        weekday: "short",
                      });
                      const day = arg.date.toLocaleDateString("en", {
                        day: "2-digit",
                      });
                      return {
                        html: `<div>${weekday}<br /><span style="color:#B8B8B8">${day}</span></div>`,
                      };
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div id="menu" className="right-sidenav">
        {/*         <Link
          // to="javascript:void(0);"
          className="rightSidenav-toggleIcon open"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link> */}
        <nav className="navbar p-0">
          <ul className="navbar-nav navbar-nav-icons flex-row align-items-center justify-content-between w-100">
            <Dropdown className="nav-item">
              <Dropdown.Toggle id="navbarDropdownUser" className="nav-link">
                <div className="avatar me-10">
                  <img
                    src="assets/images/user-avatar.png"
                    alt="SA"
                    className="rounded-circle"
                  />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/">Set Status</Dropdown.Item>
                <Dropdown.Item href="/">Profile</Dropdown.Item>
                <Dropdown.Item href="/">View Account</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M18.0435 10.6614C17.8831 10.4789 17.7947 10.2443 17.7947 10.0014C17.7947 9.75845 17.8831 9.52385 18.0435 9.34136L19.3235 7.90136C19.4645 7.74403 19.5521 7.54606 19.5736 7.33587C19.5952 7.12567 19.5496 6.91405 19.4435 6.73136L17.4435 3.27136C17.3384 3.08888 17.1783 2.94424 16.9862 2.85805C16.7941 2.77186 16.5796 2.74852 16.3735 2.79136L14.4935 3.17136C14.2542 3.22079 14.0052 3.18095 13.7933 3.05936C13.5815 2.93777 13.4214 2.74284 13.3435 2.51136L12.7335 0.68136C12.6664 0.482739 12.5386 0.310225 12.3681 0.188202C12.1976 0.0661789 11.9931 0.000818796 11.7835 0.00135996H7.78345C7.56538 -0.0100221 7.34959 0.0502863 7.16902 0.173074C6.98845 0.295862 6.85303 0.474379 6.78345 0.68136L6.22345 2.51136C6.14545 2.74284 5.98542 2.93777 5.77356 3.05936C5.5617 3.18095 5.31267 3.22079 5.07345 3.17136L3.14345 2.79136C2.948 2.76374 2.74875 2.79458 2.5708 2.88C2.39285 2.96542 2.24415 3.10159 2.14345 3.27136L0.143451 6.73136C0.034611 6.91201 -0.0143269 7.12245 0.00363355 7.33258C0.021594 7.54272 0.105533 7.7418 0.243451 7.90136L1.51345 9.34136C1.67377 9.52385 1.76219 9.75845 1.76219 10.0014C1.76219 10.2443 1.67377 10.4789 1.51345 10.6614L0.243451 12.1014C0.105533 12.2609 0.021594 12.46 0.00363355 12.6701C-0.0143269 12.8803 0.034611 13.0907 0.143451 13.2714L2.14345 16.7314C2.24855 16.9138 2.40857 17.0585 2.6007 17.1447C2.79284 17.2309 3.00728 17.2542 3.21345 17.2114L5.09345 16.8314C5.33267 16.7819 5.5817 16.8218 5.79356 16.9434C6.00542 17.0649 6.16545 17.2599 6.24345 17.4914L6.85345 19.3214C6.92303 19.5283 7.05845 19.7069 7.23902 19.8296C7.41959 19.9524 7.63538 20.0127 7.85345 20.0014H11.8535C12.0631 20.0019 12.2676 19.9365 12.4381 19.8145C12.6086 19.6925 12.7364 19.52 12.8035 19.3214L13.4135 17.4914C13.4915 17.2599 13.6515 17.0649 13.8633 16.9434C14.0752 16.8218 14.3242 16.7819 14.5635 16.8314L16.4435 17.2114C16.6496 17.2542 16.8641 17.2309 17.0562 17.1447C17.2483 17.0585 17.4084 16.9138 17.5135 16.7314L19.5135 13.2714C19.6196 13.0887 19.6652 12.877 19.6436 12.6669C19.6221 12.4567 19.5345 12.2587 19.3935 12.1014L18.0435 10.6614ZM16.5535 12.0014L17.3535 12.9014L16.0735 15.1214L14.8935 14.8814C14.1732 14.7341 13.424 14.8565 12.788 15.2252C12.1521 15.5938 11.6736 16.1832 11.4435 16.8814L11.0635 18.0014H8.50345L8.14345 16.8614C7.91331 16.1632 7.43483 15.5738 6.79886 15.2052C6.16288 14.8365 5.41367 14.7141 4.69345 14.8614L3.51345 15.1014L2.21345 12.8914L3.01345 11.9914C3.50541 11.4413 3.77738 10.7293 3.77738 9.99136C3.77738 9.25343 3.50541 8.54138 3.01345 7.99136L2.21345 7.09136L3.49345 4.89136L4.67345 5.13136C5.39367 5.27858 6.14288 5.15624 6.77886 4.78756C7.41483 4.41888 7.89331 3.82952 8.12345 3.13136L8.50345 2.00136H11.0635L11.4435 3.14136C11.6736 3.83952 12.1521 4.42888 12.788 4.79756C13.424 5.16624 14.1732 5.28858 14.8935 5.14136L16.0735 4.90136L17.3535 7.12136L16.5535 8.02136C16.067 8.57012 15.7984 9.27804 15.7984 10.0114C15.7984 10.7447 16.067 11.4526 16.5535 12.0014ZM9.78345 6.00136C8.99233 6.00136 8.21897 6.23596 7.56117 6.67548C6.90337 7.11501 6.39068 7.73972 6.08793 8.47063C5.78518 9.20153 5.70597 10.0058 5.86031 10.7817C6.01465 11.5576 6.39561 12.2704 6.95502 12.8298C7.51443 13.3892 8.22717 13.7702 9.00309 13.9245C9.77901 14.0788 10.5833 13.9996 11.3142 13.6969C12.0451 13.3941 12.6698 12.8814 13.1093 12.2236C13.5489 11.5658 13.7835 10.7925 13.7835 10.0014C13.7835 8.94049 13.362 7.92308 12.6119 7.17293C11.8617 6.42279 10.8443 6.00136 9.78345 6.00136ZM9.78345 12.0014C9.38789 12.0014 9.00121 11.8841 8.67231 11.6643C8.34341 11.4445 8.08707 11.1322 7.93569 10.7667C7.78432 10.4013 7.74471 9.99914 7.82188 9.61118C7.89905 9.22322 8.08953 8.86685 8.36924 8.58715C8.64894 8.30744 9.00531 8.11696 9.39327 8.03979C9.78123 7.96262 10.1834 8.00223 10.5488 8.1536C10.9143 8.30498 11.2266 8.56132 11.4464 8.89022C11.6662 9.21912 11.7835 9.6058 11.7835 10.0014C11.7835 10.5318 11.5727 11.0405 11.1977 11.4156C10.8226 11.7906 10.3139 12.0014 9.78345 12.0014Z"
                    fill="#B8B8B8"
                  />
                </svg>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.22222 2.10526C3.66232 2.10526 3.12535 2.32707 2.72944 2.72188C2.33353 3.11669 2.11111 3.65218 2.11111 4.21053V12.6316C2.11111 13.1899 2.33353 13.7254 2.72944 14.1202C3.12535 14.515 3.66232 14.7368 4.22222 14.7368H6.33333C6.9163 14.7368 7.38889 15.2081 7.38889 15.7895V17.0882L11.068 14.8868C11.2321 14.7887 11.4198 14.7368 11.6111 14.7368H16.8889C17.4488 14.7368 17.9858 14.515 18.3817 14.1202C18.7776 13.7254 19 13.1899 19 12.6316V4.21053C19 3.65218 18.7776 3.11669 18.3817 2.72188C17.9858 2.32707 17.4488 2.10526 16.8889 2.10526H4.22222ZM1.23666 1.23323C2.02848 0.443608 3.10242 0 4.22222 0H16.8889C18.0087 0 19.0826 0.443608 19.8745 1.23323C20.6663 2.02286 21.1111 3.09383 21.1111 4.21053V12.6316C21.1111 13.7483 20.6663 14.8192 19.8745 15.6089C19.0826 16.3985 18.0087 16.8421 16.8889 16.8421H11.9035L6.87641 19.85C6.55032 20.0451 6.14419 20.0502 5.81326 19.8634C5.48234 19.6765 5.27778 19.3266 5.27778 18.9474V16.8421H4.22222C3.10242 16.8421 2.02848 16.3985 1.23666 15.6089C0.44484 14.8192 0 13.7483 0 12.6316V4.21053C0 3.09383 0.44484 2.02286 1.23666 1.23323ZM5.27778 6.31579C5.27778 5.73444 5.75037 5.26316 6.33333 5.26316H14.7778C15.3607 5.26316 15.8333 5.73444 15.8333 6.31579C15.8333 6.89714 15.3607 7.36842 14.7778 7.36842H6.33333C5.75037 7.36842 5.27778 6.89714 5.27778 6.31579ZM5.27778 10.5263C5.27778 9.94496 5.75037 9.47368 6.33333 9.47368H12.6667C13.2496 9.47368 13.7222 9.94496 13.7222 10.5263C13.7222 11.1077 13.2496 11.5789 12.6667 11.5789H6.33333C5.75037 11.5789 5.27778 11.1077 5.27778 10.5263Z"
                    fill="#B8B8B8"
                  />
                </svg>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 2.22222C3.46957 2.22222 2.96086 2.45635 2.58579 2.8731C2.21071 3.28984 2 3.85507 2 4.44444V15.5556C2 16.1449 2.21071 16.7102 2.58579 17.1269C2.96086 17.5437 3.46957 17.7778 4 17.7778H8C8.53043 17.7778 9.03914 17.5437 9.41421 17.1269C9.78929 16.7102 10 16.1449 10 15.5556V14.4444C10 13.8308 10.4477 13.3333 11 13.3333C11.5523 13.3333 12 13.8308 12 14.4444V15.5556C12 16.7343 11.5786 17.8648 10.8284 18.6983C10.0783 19.5317 9.06087 20 8 20H4C2.93913 20 1.92172 19.5317 1.17157 18.6983C0.421427 17.8648 0 16.7343 0 15.5556V4.44444C0 3.2657 0.421427 2.13524 1.17157 1.30175C1.92172 0.468253 2.93913 0 4 0H8C9.06087 0 10.0783 0.468253 10.8284 1.30175C11.5786 2.13524 12 3.26571 12 4.44444V5.55556C12 6.16921 11.5523 6.66667 11 6.66667C10.4477 6.66667 10 6.16921 10 5.55556V4.44444C10 3.85507 9.78929 3.28984 9.41421 2.8731C9.03914 2.45635 8.53043 2.22222 8 2.22222H4ZM14.2929 4.76988C14.6834 4.33597 15.3166 4.33597 15.7071 4.76988L19.7071 9.21433C20.0976 9.64824 20.0976 10.3518 19.7071 10.7857L15.7071 15.2301C15.3166 15.664 14.6834 15.664 14.2929 15.2301C13.9024 14.7962 13.9024 14.0927 14.2929 13.6588L16.5858 11.1111H5C4.44772 11.1111 4 10.6137 4 10C4 9.38635 4.44772 8.88889 5 8.88889H16.5858L14.2929 6.34123C13.9024 5.90731 13.9024 5.2038 14.2929 4.76988Z"
                    fill="#B8B8B8"
                  />
                </svg>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-icons flex-row align-items-center">
            <li className="nav-item">
              <div className="search-box">
                <div className="position-relative">
                  <input
                    className="form-control search-input"
                    type="search"
                    placeholder="Search Project"
                    value={searchProject}
                    onChange={(e) => setSearchProject(e.target.value)}
                  />
                  <span className="search-box-icon text-primary-hover">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="23"
                      viewBox="0 0 22 23"
                      fill="none"
                    >
                      <circle
                        cx="10.681"
                        cy="10.681"
                        r="8.68097"
                        stroke="#B8B8B8"
                        strokeWidth="2.15971"
                      />
                      <path
                        d="M16.6198 17.5344L20.9994 21.9141"
                        stroke="#B8B8B8"
                        strokeWidth="2.15971"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </li>
            <DropdownMenu title="statusList" options={stateOptions} />
          </ul>
        </nav>
        <ExternalEvents
          projects={projects}
          // selectedStatus={selectedStatus}
          // stateOptions={stateOptions}
        />
      </div>

      {/* Modal HTML */}
      <div id="eventModal" className="modal fade" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClearModel}
              >
                <span className="bi bi-x"></span>
              </button>
              <h4 className="modal-title">
                {modalType === "add_assignment"
                  ? "Add Assignment"
                  : modalType === "edit_assignment"
                  ? "Assignment Information"
                  : "Add Project"}
              </h4>
              <form id="eventForm" onSubmit={handleFormSubmit}>
                <div className="row g-3">
                  {modalType !== "newProject" ? (
                    <div className="col-md-12">
                      <label htmlFor="projectName" className="form-label">
                        Project:
                      </label>
                      <Select
                        id="projectName"
                        styles={customStyles}
                        className="basic-single"
                        classNamePrefix="select"
                        name="projectName"
                        options={projects.map((project) => ({
                          value: project.id,
                          label: project.label,
                          status: project.status,
                        }))}
                        value={selectedProject}
                        onChange={setSelectedProject}
                        required={true}
                      />
                    </div>
                  ) : (
                    <div className="col-md-12">
                      <label htmlFor="ownerName" className="form-label">
                        Project Name
                      </label>
                      <input
                        type="text"
                        id="projectName"
                        placeholder="Project Name"
                        className="form-control"
                        required={true}
                        value={newProject?.label}
                        onChange={(e) => {
                          setNewProject({
                            id: `${projects.length + 1}`,
                            label: e.target.value,
                          });
                        }} // Corrected the onChange handler
                      />
                    </div>
                  )}
                  {modalType === "newProject" && (
                    <>
                      <div className="col-md-12">
                        <label htmlFor="ownerName" className="form-label">
                          Owner Name
                        </label>
                        <input
                          type="text"
                          id="ownerName"
                          placeholder="Owner"
                          className="form-control"
                          required={true}
                          value={newProject?.ownerName}
                          onChange={(e) => {
                            setNewProject({
                              ...newProject,
                              ownerName: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="employee" className="form-label">
                          Project Manager
                        </label>
                        <Select
                          id="employee"
                          className="basic-single"
                          classNamePrefix="select"
                          name="employee"
                          styles={customStyles}
                          options={resources.map((user) => ({
                            value: user?.id,
                            label: user?.title,
                          }))}
                          value={newProject?.projectManager}
                          onChange={(selectedOptions) => {
                            setNewProject({
                              ...newProject,
                              projectManager: selectedOptions,
                            });
                          }}
                          required={true}
                        />
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="employee" className="form-label">
                          Project Members
                        </label>
                        <Select
                          id="employee"
                          className="basic-single"
                          classNamePrefix="select"
                          name="employee"
                          styles={customStyles}
                          options={resources.map((user) => ({
                            value: user?.id,
                            label: user?.title,
                          }))}
                          value={selectedUser}
                          onChange={(selectedOptions) => {
                            // Ensure selectedOptions is always an array
                            const selectedArray = Array.isArray(selectedOptions)
                              ? selectedOptions
                              : [selectedOptions];

                            setSelectedUser(selectedArray);
                            setNewProject({
                              ...newProject,
                              projectMembers: selectedArray,
                            });
                          }}
                          required={true}
                          isMulti={true}
                        />
                      </div>
                    </>
                  )}
                  {modalType !== "newProject" && (
                    <div className="col-md-12">
                      <label htmlFor="employee" className="form-label">
                        Employee:
                      </label>
                      <Select
                        id="employee"
                        className="basic-single"
                        classNamePrefix="select"
                        name="employee"
                        styles={customStyles}
                        options={resources.map((user) => ({
                          value: user?.id,
                          label: user?.title,
                        }))}
                        value={selectedUser}
                        onChange={(selectedOptions) => {
                          setSelectedUser(
                            Array.isArray(selectedOptions)
                              ? selectedOptions
                              : [selectedOptions]
                          );
                        }}
                        required={true}
                      />
                    </div>
                  )}
                  <div className="col-md-6">
                    <label htmlFor="startDate" className="form-label">
                      Start Date
                    </label>
                    <div className="input-group date">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                          setNewProject({
                            ...newProject,
                            start: date,
                          });
                        }}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="MM/dd/yyyy"
                        className="form-control"
                        id="startDate"
                        required={true}
                      />
                      <span className="input-group-text text-primary-hover">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="endDate" className="form-label">
                      End Date
                    </label>
                    <div className="input-group date">
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => {
                          setEndDate(date);
                          setNewProject({
                            ...newProject,
                            end: date,
                          });
                        }}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="MM/dd/yyyy"
                        className="form-control"
                        id="endDate"
                        required={true}
                      />
                      <span className="input-group-text text-primary-hover">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                    </div>
                  </div>
                  {modalType === "newProject" && (
                    <div className="col-md-12">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <Select
                        id="state"
                        className="basic-single"
                        classNamePrefix="select"
                        name="state"
                        styles={customStyles}
                        options={stateOptions}
                        required={true}
                        value={newProject?.status}
                        // onChange={setSelectedStatus}
                        onChange={(selectedOptions) => {
                          setNewProject({
                            ...newProject,
                            status: selectedOptions,
                          });
                        }}
                      />
                    </div>
                  )}
                  <div className="col-6">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 mt-2"
                      id="saveEvent"
                      data-bs-dismiss="modal"
                    >
                      Save
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100 mt-2"
                      id="deleteEvent"
                      onClick={handleDeleteEvent}
                      data-bs-dismiss="modal"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Scheduler;
