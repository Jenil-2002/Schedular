/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import ExternalEvents from "./ExternalEvents";
import { Modal } from "bootstrap";
import "bootstrap-select/dist/css/bootstrap-select.min.css";
import "select2/dist/css/select2.min.css";
import "bootstrap-select/dist/js/bootstrap-select.min.js";
import "select2/dist/js/select2.min.js";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui.css";
import "jquery-ui-dist/jquery-ui.js"; // Ensure to install jquery-ui via npm
import { Link } from "react-router-dom";

const Scheduler = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Initialize bootstrap-select
    $(".selectpicker").selectpicker();

    // Initialize select2
    $(".select2").select2();

    $(".select2[multiple]")
      .select2({
        templateResult: function (data) {
          var $result = $(
            '<span className="multiple-select2-container">' + data.text + "</span>"
          );
          return $result;
        },
        templateSelection: function (data) {
          var $selection = $(
            '<span className="multiple-select2-container">' + data.text + "</span>"
          );
          return $selection;
        },
      })
      .on("select2:open", function (e) {
        $(".select2-container--open").addClass("multiple-select2-container");
      });

    // Initialize Select2 and datepicker on modal shown event
    $("#eventModal").on("shown.bs.modal", function () {
      $(this)
        .find(".select2")
        .select2({
          dropdownParent: $(this),
        });

      // Initialize datepicker
      $(this).find(".input-group.date input").datepicker({
        dateFormat: "yy-mm-dd",
      });
    });
  }, []);

  const [resources] = useState([
    { id: "1", title: "User 1" },
    { id: "2", title: "User 2" },
    { id: "3", title: "User 3" },
  ]);

  const handleEventReceive = (info) => {
    console.log("Event Received:", info.event);
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    const modalElement = document.getElementById("eventModal");
    const modal = new Modal(modalElement);
    modal.show();

    // Prepopulate the modal with event data
    document.getElementById("employee").value =
      info.event.extendedProps.employee || "";
    document.getElementById("projectName").value =
      info.event.extendedProps.project || "";
    document.getElementById("startDate").value = info.event.start
      .toISOString()
      .split("T")[0];
    document.getElementById("endDate").value =
      info.event.end?.toISOString().split("T")[0] || "";
  };

  const handleSaveEvent = () => {
    if (selectedEvent) {
      selectedEvent.setExtendedProp(
        "employee",
        document.getElementById("employee").value
      );
      selectedEvent.setExtendedProp(
        "project",
        document.getElementById("projectName").value
      );
      selectedEvent.setStart(document.getElementById("startDate").value);
      selectedEvent.setEnd(document.getElementById("endDate").value);
      setSelectedEvent(null); // Clear selected event after saving
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      selectedEvent.remove();
      setSelectedEvent(null); // Clear selected event after deleting
    }
  };

  return (
    <div className="scheduler-container">
      <ExternalEvents />
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          resourceTimelinePlugin,
          interactionPlugin,
        ]}
        initialView="resourceTimelineMonth" // Default view
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth",
        }}
        editable={true}
        droppable={true}
        resources={resources}
        eventReceive={handleEventReceive}
        eventClick={handleEventClick}
        views={{
          resourceTimelineDay: {
            type: "resourceTimeline",
            duration: { days: 1 },
            slotDuration: { hours: 1 },
            slotLabelFormat: {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            },
          },
          resourceTimelineWeek: {
            type: "resourceTimeline",
            duration: { weeks: 1 },
            slotDuration: { day: 1 },
            slotLabelFormat: [
              { weekday: "short" },
              { day: "2-digit", month: "2-digit" }, // Date in dd/MM format
            ],
          },
          resourceTimelineMonth: {
            type: "resourceTimeline",
            duration: { months: 1 },
            slotLabelFormat: [{ weekday: "short" }, { day: "2-digit" }],
          },
        }}
      />

      { /* Modal HTML */ }
      <div id="eventModal" className="modal fade" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span className="bi bi-x"></span>
              </button>
              <h4 className="modal-title">Edit Assignment</h4>
              <form id="eventForm">
                <div className="mb-20">
                  <label htmlFor="employee" className="form-label">
                    Employee
                  </label>
                  <select id="employee" className="select2 w-100">
                    <option value="Employee_1">Employee 1</option>
                    <option value="Employee_2">Employee 2</option>
                    <option value="Employee_3">Employee 3</option>
                    <option value="Employee_4">Employee 4</option>
                  </select>
                </div>
                <div className="mb-20">
                  <label htmlFor="projectName" className="form-label">
                    Project
                  </label>
                  <select id="projectName" className="select2 w-100" multiple>
                    <option value="Project1">Project1</option>
                    <option value="Project2">Project2</option>
                    <option value="Project3">Project3</option>
                    <option value="Project4">Project4</option>
                    <option value="Project5">Project5</option>
                    <option value="Project6">Project6</option>
                  </select>
                </div>
                <div className="mb-20">
                  <label htmlFor="startDate" className="form-label">
                    Start Date
                  </label>
                  <div className="input-group date">
                    <input
                      type="text"
                      className="form-control"
                      id="startDate"
                      placeholder="YYYY-MM-DD"
                    />
                    <span className="input-group-text text-primary-hover">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.66797 1.66602V4.16602"
                          stroke="#5F5F5F"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.332 1.66602V4.16602"
                          stroke="#5F5F5F"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.91797 7.57422H17.0846"
                          stroke="#5F5F5F"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.5 7.08268V14.166C17.5 16.666 16.25 18.3327 13.3333 18.3327H6.66667C3.75 18.3327 2.5 16.666 2.5 14.166V7.08268C2.5 4.58268 3.75 2.91602 6.66667 2.91602H13.3333C16.25 2.91602 17.5 4.58268 17.5 7.08268Z"
                          stroke="#5F5F5F"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.0801 11.4167H13.0875"
                          stroke="#5F5F5F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.0801 13.9167H13.0875"
                          stroke="#5F5F5F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.99803 11.4167H10.0055"
                          stroke="#5F5F5F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.99803 13.9167H10.0055"
                          stroke="#5F5F5F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.91209 11.4167H6.91957"
                          stroke="#5F5F5F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.91209 13.9167H6.91957"
                          stroke="#5F5F5F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="mb-20">
                  <label htmlFor="endDate" className="form-label">
                    End Date
                  </label>
                  <div className="input-group date">
                    <input
                      type="text"
                      className="form-control"
                      id="endDate"
                      placeholder="YYYY-MM-DD"
                    />
                    <span className="input-group-text text-primary-hover">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.66797 1.66602V4.16602"
                          stroke="#5F5F5F"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.332 1.66602V4.16602"
                          stroke="#5F5F5F"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.91797 7.57422H17.0846"
                          stroke="#5F5F5F"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.5 7.08268V14.166C17.5 16.666 16.25 18.3327 13.3333 18.3327H6.66667C3.75 18.3327 2.5 16.666 2.5 14.166V7.08268C2.5 4.58268 3.75 2.91602 6.66667 2.91602H13.3333C16.25 2.91602 17.5 4.58268 17.5 7.08268Z"
                          stroke="#5F5F5F"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.0801 11.4167H13.0875"
                          stroke="#5F5F5F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.0801 13.9167H13.0875"
                          stroke="#5F5F5F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.99803 11.4167H10.0055"
                          stroke="#5F5F5F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.99803 13.9167H10.0055"
                          stroke="#5F5F5F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.91209 11.4167H6.91957"
                          stroke="#5F5F5F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.91209 13.9167H6.91957"
                          stroke="#5F5F5F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100 mb-20"
                  id="saveEvent"
                  onClick={handleSaveEvent}
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  id="cancelEvent"
                  onClick={handleDeleteEvent}
                  data-bs-dismiss="modal"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>  
  );
};

export default Scheduler;
