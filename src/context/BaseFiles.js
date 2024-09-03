/* eslint-disable no-undef */
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import SnackbarsContext from "./SnackbarContext";
import moment from "moment";
import { Modal } from "bootstrap";
import { useLocation } from "react-router-dom";

const BaseFilesContext = createContext();

export const BaseFilesState = ({ children }) => {
  const calendarRef = useRef(null);
  const location = useLocation();
  const { showToast } = useContext(SnackbarsContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedResources, setSelectedResources] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [prevStartDate, setPrevStartDate] = useState(null);
  const [prevEndDate, setPrevEndDate] = useState(null);
  const [prevResourceID, setPrevResourceID] = useState(null);
  const [allDefIds, setAllDefIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchProject, setSearchProject] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedUser, setSelectedUser] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [newProject, setNewProject] = useState({
    id: "",
    label: "",
    ownerName: "",
    projectManager: "",
    projectMembers: [],
    start: "",
    end: "",
    status: "",
  });
  const [modalData, setModalData] = useState({
    projectId: "",
    projectName: "",
    ownerName: "",
    projectManager: "",
    projectMembers: [],
    start: "",
    end: "",
  });

  const [resources] = useState([
    {
      id: 1,
      label: "Alice Johnson",
      title: "Alice Johnson",
      email: "alice.johnson@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 2,
      label: "Bob Smith",
      title: "Bob Smith",
      email: "bob.smith@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 3,
      label: "Charlie Davis",
      title: "Charlie Davis",
      email: "charlie.davis@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 4,
      label: "Diana Evans",
      title: "Diana Evans",
      email: "diana.evans@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 5,
      label: "Edward Wilson",
      title: "Edward Wilson",
      email: "edward.wilson@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 6,
      label: "Fiona Martinez",
      title: "Fiona Martinez",
      email: "fiona.martinez@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 7,
      label: "George Taylor",
      title: "George Taylor",
      email: "george.taylor@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 8,
      label: "Hannah Moore",
      title: "Hannah Moore",
      email: "hannah.moore@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 9,
      label: "Ian Anderson",
      title: "Ian Anderson",
      email: "ian.anderson@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 10,
      label: "Jessica White",
      title: "Jessica White",
      email: "jessica.white@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 11,
      label: "Kevin Brown",
      title: "Kevin Brown",
      email: "kevin.brown@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 12,
      label: "Laura Green",
      title: "Laura Green",
      email: "laura.green@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 13,
      label: "Michael Harris",
      title: "Michael Harris",
      email: "michael.harris@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 14,
      label: "Natalie Clark",
      title: "Natalie Clark",
      email: "natalie.clark@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 15,
      label: "Oscar Lewis",
      title: "Oscar Lewis",
      email: "oscar.lewis@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 16,
      label: "Paula Hall",
      title: "Paula Hall",
      email: "paula.hall@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 17,
      label: "Quinn Allen",
      title: "Quinn Allen",
      email: "quinn.allen@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 18,
      label: "Rachel King",
      title: "Rachel King",
      email: "rachel.king@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 19,
      label: "Samuel Wright",
      title: "Samuel Wright",
      email: "samuel.wright@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 20,
      label: "Tina Scott",
      title: "Tina Scott",
      email: "tina.scott@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 21,
      label: "Ulysses Walker",
      title: "Ulysses Walker",
      email: "ulysses.walker@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 22,
      label: "Vera Lewis",
      title: "Vera Lewis",
      email: "vera.lewis@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 23,
      label: "William Turner",
      title: "William Turner",
      email: "william.turner@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 24,
      label: "Xena Roberts",
      title: "Xena Roberts",
      email: "xena.roberts@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 25,
      label: "Yvonne Baker",
      title: "Yvonne Baker",
      email: "yvonne.baker@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 26,
      label: "Zachary Adams",
      title: "Zachary Adams",
      email: "zachary.adams@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 27,
      label: "Ava Johnson",
      title: "Ava Johnson",
      email: "ava.johnson@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 28,
      label: "Ben Cooper",
      title: "Ben Cooper",
      email: "ben.cooper@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 29,
      label: "Chloe Martinez",
      title: "Chloe Martinez",
      email: "chloe.martinez@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
    {
      id: 30,
      label: "Daniel Parker",
      title: "Daniel Parker",
      email: "daniel.parker@example.com",
      avatar: "assets/images/emp-avatar.png",
    },
  ]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      label: "Website Redesign",
      ownerName: "Alice Johnson",
      projectManager: "Alice Johnson",
      projectMembers: ["Bob Smith", "Charlie Davis"],
      start: new Date("2024-08-01T00:00:00+05:30"),
      end: new Date("2024-08-15T00:00:00+05:30"),
      status: "In Progress",
    },
    {
      id: 2,
      label: "Mobile App Development",
      ownerName: "Bob Smith",
      projectManager: "Diana Evans",
      projectMembers: ["Edward Wilson", "Fiona Martinez"],
      start: new Date("2024-08-05T00:00:00+05:30"),
      end: new Date("2024-09-10T00:00:00+05:30"),
      status: "In Testing",
    },
    {
      id: 3,
      label: "CRM Integration",
      ownerName: "Charlie Davis",
      projectManager: "George Taylor",
      projectMembers: ["Hannah Moore", "Ian Anderson"],
      start: new Date("2024-08-10T00:00:00+05:30"),
      end: new Date("2024-09-20T00:00:00+05:30"),
      status: "In Estimation",
    },
    {
      id: 4,
      label: "Cloud Migration",
      ownerName: "Diana Evans",
      projectManager: "Jessica White",
      projectMembers: ["Kevin Brown", "Laura Green"],
      start: new Date("2024-08-15T00:00:00+05:30"),
      end: new Date("2024-10-01T00:00:00+05:30"),
      status: "In Production",
    },
    {
      id: 5,
      label: "Database Optimization",
      ownerName: "Edward Wilson",
      projectManager: "Michael Harris",
      projectMembers: ["Natalie Clark", "Oscar Lewis"],
      start: new Date("2024-08-20T00:00:00+05:30"),
      end: new Date("2024-09-30T00:00:00+05:30"),
      status: "Closed",
    },
    {
      id: 6,
      label: "Cybersecurity Audit",
      ownerName: "Fiona Martinez",
      projectManager: "Paula Hall",
      projectMembers: ["Quinn Allen", "Rachel King"],
      start: new Date("2024-08-25T00:00:00+05:30"),
      end: new Date("2024-09-15T00:00:00+05:30"),
      status: "Ordered",
    },
  ]);

  const [stateOptions] = useState([
    { value: "in-estimation", label: "In Estimation" },
    { value: "ordered", label: "Ordered" },
    { value: "in-progress", label: "In Progress" },
    { value: "in-testing", label: "In Testing" },
    { value: "in-production", label: "In Production" },
    { value: "closed", label: "Closed" },
  ]);

  const handleEventReceive = (currentEvent, info, modelevent) => {
    const calendarApi = calendarRef.current.getApi();
    const eventResourceId = modelevent
      ? info.event.resourceId
      : info.event.getResources()[0]?.id || info.event.extendedProps.resourceId;
    // console.log(info.event);
    let eventStartDate = moment(info.event.start).format("YYYY-MM-DD");
    eventStartDate = moment(eventStartDate);
    let eventEndDate = info.event.extendedProps?.modelevent
      ? moment(info.event.end).format("YYYY-MM-DD")
      : moment(info.event.end).subtract(1, "days").format("YYYY-MM-DD");
    // Use start date if end date is not defined
    eventEndDate = info.event.end === null ? null : moment(eventEndDate);
    const eventProjectId = info.event.id;
    const eventDefId = modelevent ? info.event.defId : info.event._def.defId;
    // Check for duplicate assignments
    const existingEvents = calendarApi.getEvents();
    // console.log(existingEvents);
    const isDuplicate = existingEvents.some((event, index) => {
      const existingEventDefId = event._def.defId;
      // Updating Def Id State
      if (!allDefIds.includes(existingEventDefId)) {
        setAllDefIds((allDefIds) => [...allDefIds, existingEventDefId]);
      }
      let existingEventStartDate = moment(event.start).format("YYYY-MM-DD");
      existingEventStartDate = moment(existingEventStartDate);

      let existingEventEndDate = event.extendedProps?.modelevent
        ? moment(event.end).format("YYYY-MM-DD")
        : moment(event.end).subtract(1, "days").format("YYYY-MM-DD");
      // Use start date if end date is not defined
      existingEventEndDate =
        event.end === null ? null : moment(existingEventEndDate);
      // let existingEventEndDate = event.end
      //   ? moment(event.end).subtract(1, "days").format("YYYY-MM-DD")
      //   : null;
      //   // console.log("firstexistingEventEndDate-> ", existingEventEndDate)
      // existingEventEndDate = existingEventEndDate === null ? null : moment(existingEventEndDate);
      const existingEventProjectId = event.id;
      const existingEventResourceId = event.getResources()[0]?.id;
      // console.log("existingEventDefId-> ", existingEventDefId);
      // console.log("eventDefId-> ", eventDefId);
      // console.log("existingEventProjectId-> ", existingEventProjectId);
      // console.log("eventProjectId-> ", eventProjectId);
      // console.log("eventStartDate-> ", eventStartDate);
      // console.log("eventEndDate-> ", eventEndDate);
      // console.log("existingEventStartDate-> ", existingEventStartDate);
      // console.log("existingEventEndDate-> ", existingEventEndDate);
      if (existingEventDefId !== eventDefId) {
        if (
          existingEventResourceId === eventResourceId &&
          existingEventProjectId === eventProjectId
        ) {
          if (
            eventStartDate.format() === existingEventStartDate.format() &&
            !existingEventEndDate &&
            !eventEndDate
          ) {
            // console.log("first");
            return true;
          }
          /* eventStartDate.isBetween(
            existingEventStartDate,
            existingEventEndDate,
            null,
            "[]"
          ) */
          //  console.log(new Date(eventStartDate))
          //  console.log((new Date(existingEventStartDate)))
          //  console.log(existingEventStartDate <= eventStartDate)
          // console.log(eventStartDate.isSameOrAfter(existingEventStartDate) && eventStartDate.isSameOrBefore(existingEventEndDate))
          /* console.log(eventEndDate)
        console.log(!eventEndDate && ((eventStartDate.isSameOrAfter(existingEventStartDate) && eventStartDate.isSameOrBefore(existingEventEndDate)) || eventStartDate.isBetween(
          existingEventStartDate,
          existingEventEndDate,
          null,
          "[]"
        ))) */
          if (
            !eventEndDate &&
            ((eventStartDate.isSameOrAfter(existingEventStartDate) &&
              eventStartDate.isSameOrBefore(existingEventEndDate)) ||
              eventStartDate.isBetween(
                existingEventStartDate,
                existingEventEndDate,
                null,
                "[]"
              ))
          ) {
            return true;
          }
          // console.log("eventStartDate-> ", eventStartDate);
          // console.log("eventEndDate-> ", eventEndDate);
          // console.log("existingEventStartDate-> ", existingEventStartDate);
          // console.log("existingEventEndDate-> ", existingEventEndDate);
          /* console.log(
            existingEventStartDate.isBetween(
              eventStartDate,
              eventEndDate,
              undefined,
              "[]"
            )
          ); */
          // console.log(existingEventStartDate > eventStartDate)
          // console.log(moment(existingEventStartDate).format());
          // console.log(eventStartDate)
          // console.log(eventEndDate)
          // console.log(existingEventStartDate)
          // console.log(existingEventEndDate)
          // console.log((eventStartDate.isSameOrAfter(existingEventStartDate) && eventStartDate.isSameOrBefore(existingEventEndDate)));
          /* console.log((eventStartDate.isBetween(
            existingEventStartDate,
            existingEventEndDate
          )) && (eventEndDate.isBetween(
            existingEventStartDate,
            existingEventEndDate
          ))); */
          /* (eventStartDate.isBetween(
            existingEventStartDate,
            existingEventEndDate
          )) && (eventEndDate.isBetween(
            existingEventStartDate,
            existingEventEndDate
          )) */
          if (eventEndDate) {
            // console.log("eventStartDate ", eventStartDate);
            // console.log("eventEndDate ", eventEndDate);
            // console.log(
            //   (eventStartDate.isSameOrAfter(existingEventStartDate) &&
            //     eventStartDate.isSameOrBefore(existingEventEndDate)) ||
            //     (eventEndDate.isSameOrAfter(existingEventStartDate) &&
            //       eventEndDate.isSameOrBefore(existingEventEndDate))
            // );
            if (
              (eventStartDate.isSameOrAfter(existingEventStartDate) &&
                eventStartDate.isSameOrBefore(existingEventEndDate)) ||
              (eventEndDate.isSameOrAfter(existingEventStartDate) &&
                eventEndDate.isSameOrBefore(existingEventEndDate)) ||
              existingEventStartDate.isBetween(
                eventStartDate,
                eventEndDate,
                null,
                "[]"
              )
            ) {
              return true;
            }
          }
          if (!existingEventEndDate) {
            // console.log("eventStartDate ", eventStartDate);
            // console.log("eventEndDate ", eventEndDate);
            // console.log("existingEventStartDate ", existingEventStartDate);
            // console.log("existingEventEndDate ", existingEventEndDate);
            // // console.log(((eventStartDate.isSameOrAfter(existingEventStartDate) && eventStartDate.isSameOrBefore(existingEventEndDate)) || (eventEndDate.isSameOrAfter(existingEventStartDate) && eventEndDate.isSameOrBefore(existingEventEndDate))));
            // console.log(
            //   existingEventStartDate.isSameOrAfter(eventStartDate) &&
            //     existingEventStartDate.isSameOrBefore(eventEndDate)
            // );
            if (
              (existingEventStartDate.isSameOrAfter(eventStartDate) &&
                existingEventStartDate.isSameOrBefore(eventEndDate)) ||
              // ||
              // (existingEventStartDate.isSameOrAfter(eventStartDate) && existingEventStartDate.isSameOrBefore(eventEndDate))
              existingEventStartDate.isBetween(
                eventStartDate,
                eventEndDate,
                null,
                "[]"
              )
            ) {
              return true;
            }
          }
        }
      }
    });

    // console.log('allDefIds ',allDefIds)
    console.log("isDuplicate - ", isDuplicate);
    if (isDuplicate) {
      if (modelevent) {
        currentEvent.remove();
        handleClearModel();
      }
      if (!modelevent) {
        info.event.setStart(prevStartDate);
        info.event.setEnd(prevEndDate);
        info.event.setResources([prevResourceID]);
      } else if (!modelevent && !allDefIds.includes(eventDefId)) {
        info.event.remove();
      }

      handleClearModel();
      showToast(
        "error",
        "An event with the same project and date range already exists for this resource."
      );
    } else {
      console.log("Event Received:", info.event);
    }
    handleClearModel();
  };

  const handleSaveProject = () => {
    console.log(newProject?.projectManager?.label);
    // Create a new project object
    const addProject = {
      ...newProject,
      projectManager: newProject?.projectManager?.label,
      status: newProject?.status?.label,
    };

    // Update the projects state with the new project
    setProjects([...projects, addProject]);
    handleSaveEvent();
  };

  const handleProject = (project) => {
    const calendarApi = calendarRef.current.getApi();
    const allEvent = calendarApi.getEvents();
    var resourceIds = new Set();
    allEvent.forEach((event) => {
      if (event.id === project.id.toString()) {
        resourceIds.add(event.getResources()[0].title);
      }
    });
    const resourceArray = Array.from(resourceIds);
    console.log(resourceArray.length === 0 && true);
    setModalData({
      projectId: project.id,
      projectName: project.label,
      ownerName: project.ownerName,
      projectManager: project.projectManager,
      projectMembers: resourceArray,
      start: moment(project.start).format("YYYY-MM-DD"),
      end: moment(project.end).format("YYYY-MM-DD"),
    });
    setModalType("project");
    const modalElement = document.getElementById("projectModal");
    const modal = new Modal(modalElement);
    modal.show();
  };

  const handleDeleteProject = () => {
    const updatedProjects = projects.filter((project) => {
      return project.id !== modalData.projectId;
    });
    const calendarApi = calendarRef.current.getApi();
    const allEvents = calendarApi.getEvents();

    allEvents.forEach((event) => {
      if (event.id === modalData.projectId.toString()) {
        event.remove();
      }
    });
    setProjects(updatedProjects);
    handleClearModel();
  };

  const handleSaveEvent = () => {
    const calendarApi = calendarRef.current.getApi();
    let end = moment(endDate).add(1, "days").toDate();
    // .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ [(India Standard Time)]");
    console.log("startDate->", startDate);
    console.log("endDate->", endDate);
    console.log("end->", end);
    if (selectedEvent) {
      console.log(selectedUser);
      selectedEvent.setExtendedProp(
        "employee",
        document.getElementById("employee").value
      );
      selectedEvent.setExtendedProp(
        "project",
        document.getElementById("projectName").value
      );
      selectedEvent.setStart(startDate);

      // console.log(end);
      selectedEvent.setEnd(end);
      // selectedEvent.setEnd(document.getElementById("endDate").value);
      selectedEvent.setResources([selectedUser[0]?.value]);
    } else {
      console.log(selectedUser);
      selectedUser.map((user, index) => {
        calendarApi.addEvent({
          id: selectedProject ? selectedProject?.value : newProject.id,
          resourceId: selectedUser[index]?.value,
          title: selectedProject ? selectedProject.label : newProject.label,
          start: startDate,
          end: startDate === endDate ? null : end,
          extendedProps: {
            status: selectedProject
              ? selectedProject.status
              : newProject?.status?.label,
            resourceId: selectedUser[index]?.value,
            modelevent: true,
            newEvent: true,
          },
          classNames: [
            `status-${
              selectedProject
                ? selectedProject.status?.replace(/\s+/g, "-")
                : newProject?.status?.label?.replace(/\s+/g, "-")
            }`,
          ],
          newClasses: `status-${
            selectedProject
              ? selectedProject.status?.replace(/\s+/g, "-")
              : newProject?.status?.label?.replace(/\s+/g, "-")
          }`,
        });
      });
      handleClearModel();
    }

    if (!newProject) {
      // Get the event data using the event's id
      const allEvent = calendarApi.getEvents();
      console.log(allEvent);
      const event = allEvent[allEvent.length - 1];
      const modelevent = {
        id: selectedProject ? selectedProject?.value.toString() : newProject.id,
        defId: event._def.defId,
        start: moment(startDate),
        end: startDate === endDate ? null : end,
        resourceId: selectedUser[0].value,
        modelevent: true,
      };
      const nestedEvent = { event: modelevent };

      // const modelevent = true;
      handleEventReceive(event, nestedEvent, true);
    }
    handleClearModel();
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      selectedEvent.remove();
      setSelectedProject(null); // Clear selected event after deleting
      setSelectedUser(null);
      setSelectedEvent(null); // Clear selected event after deleting
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleClearModel = () => {
    setSelectedProject(null);
    setSelectedUser(null);
    setSelectedEvent(null);
    setStartDate(null);
    setEndDate(null);
    setPrevStartDate(null);
    setPrevEndDate(null);
    setPrevResourceID(null);
    setModalData(null);
    setNewProject({
      id: "",
      label: "",
      ownerName: "",
      projectManager: "",
      projectMembers: [],
      start: "",
      end: "",
      status: "",
    });
  };
  const customStyles = {
    option: (provided, state) => ({
      padding: "16px 40px",
      borderRadius: "3px",
      color: state.isFocused || state.isSelected ? "#fff" : "#737373", // text color for normal state
      backgroundColor:
        state.isFocused || state.isSelected ? "#252525" : "#313131",
    }),
  };

  useEffect(() => {
    $(".rightSidenav-toggleIcon").on("click", function () {
      if ($(this).hasClass("open")) {
        $(this).removeClass("open");
        $(".right-sidenav").css("right", "-340px");
        $(".main-content").css("margin-right", "0px");
        $(this).css(
          "right",
          "325px"
        ); /* Adjust the position of the toggle icon */
      } else {
        $(this).addClass("open");
        $(".right-sidenav").css("right", "0px");
        $(".main-content").css("margin-right", "340px");
        $(this).css(
          "right",
          "315px"
        ); /* Adjust the position of the toggle icon */
      }
    });

    var topHeight = $(".sidenav .top-head").outerHeight();
    $(".sidenav .scrollbar").css("height", "calc(100vh - " + topHeight + "px)");
    $(".sidenav .scrollbar").css(
      "max-height",
      "calc(100vh - " + topHeight + "px)"
    );

    $(document).ready(function () {
      // Selectors for the first dropdown (Employees)
      let $checkedAllEmployees = $("#employeeCheckAll"),
        $checkedItemsEmployees = $("[name='employeeCheck']"),
        $employeeLabels = $("[name='employeeCheck']").next(".form-check-label");

      // Selectors for the second dropdown (States)
      let $checkedAllStates = $("#stateCheckAll"),
        $checkedItemsStates = $("[name='stateCheck']"),
        $stateLabels = $("[name='stateCheck']").next(".form-check-label");

      // Employee dropdown
      $checkedAllEmployees.on("change", function () {
        var isChecked = $(this).prop("checked");
        $checkedItemsEmployees.prop("checked", isChecked);
      });

      $checkedItemsEmployees.add($employeeLabels).on("click", function (e) {
        e.stopPropagation(); // Prevents the dropdown from closing
        let inputs = $checkedItemsEmployees.length;
        let inputs_checked = $checkedItemsEmployees.filter(":checked").length;

        if (inputs_checked <= 0) {
          $checkedAllEmployees
            .prop("checked", false)
            .prop("indeterminate", false);
        } else if (inputs == inputs_checked) {
          $checkedAllEmployees
            .prop("checked", true)
            .prop("indeterminate", false);
        } else {
          $checkedAllEmployees
            .prop("checked", true)
            .prop("indeterminate", true);
        }
      });

      // State dropdown
      $checkedAllStates.on("change", function () {
        var isChecked = $(this).prop("checked");
        $checkedItemsStates.prop("checked", isChecked);
      });

      $checkedItemsStates.add($stateLabels).on("click", function (e) {
        e.stopPropagation(); // Prevents the dropdown from closing
        let inputs = $checkedItemsStates.length;
        let inputs_checked = $checkedItemsStates.filter(":checked").length;

        if (inputs_checked <= 0) {
          $checkedAllStates.prop("checked", false).prop("indeterminate", false);
        } else if (inputs == inputs_checked) {
          $checkedAllStates.prop("checked", true).prop("indeterminate", false);
        } else {
          $checkedAllStates.prop("checked", true).prop("indeterminate", true);
        }
      });
    });

    /*------------------------------------------------------*/
    // Password field toggle eye
    /*------------------------------------------------------*/

    $(".toggle-password").click(function () {
      $(this).find("#eye").toggleClass("d-none");
      $(this).find("#eye-off").toggleClass("d-none");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
  }, [location.pathname]);

  return (
    <>
      {/* project modal */}
      <div id="projectModal" className="modal fade" tabIndex="-1" role="dialog">
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
              <h4 className="modal-title">Project Information</h4>
              <form id="eventForm">
                <div className="row g-3">
                  <div className="col-md-12">
                    <p>
                      <b>Project Name: </b>
                      {modalData?.projectName}
                    </p>
                  </div>
                  <div className="col-md-12">
                    <p>
                      <b> Owner Name: </b>
                      {modalData?.ownerName}
                    </p>
                  </div>
                  <div className="col-md-12">
                    <p>
                      <b> Project Manager: </b>
                      {modalData?.projectManager}
                    </p>
                  </div>
                  <div className="col-md-12">
                    <p>
                      <b> Project Members: </b>
                      {modalData?.projectMembers.map((member, index) => (
                        <span key={index}>
                          {member}
                          {index < modalData.projectMembers.length - 1
                            ? ", "
                            : ""}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="col-md-12">
                    <p>
                      <b>Start Date: </b>
                      {modalData?.start}
                    </p>
                  </div>
                  <div className="col-md-12">
                    <p>
                      <b>End Date: </b>
                      {modalData?.end}
                    </p>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-primary w-100 mt-2"
                      id="cancelEvent"
                      onClick={handleClearModel}
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100 mt-2"
                      id="deleteEvent"
                      onClick={handleDeleteProject}
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
      <BaseFilesContext.Provider
        value={{
          calendarRef,
          handleEventReceive,
          handleSaveEvent,
          handleDeleteEvent,
          handleSaveProject,
          handleProject,
          handleClearModel,
          selectedEvent,
          setSelectedEvent,
          selectedResources,
          setSelectedResources,
          selectedProjects,
          setSelectedProjects,
          searchQuery,
          setSearchQuery,
          searchProject,
          setSearchProject,
          projects,
          setProjects,
          resources,
          stateOptions,
          setPrevStartDate,
          setPrevEndDate,
          setPrevResourceID,
          customStyles,
          selectedProject,
          setSelectedProject,
          selectedUser,
          setSelectedUser,
          startDate,
          setStartDate,
          endDate,
          setEndDate,
          newProject,
          setNewProject,
          modalType,
          setModalType,
        }}
      >
        {children}
      </BaseFilesContext.Provider>
    </>
  );
};

export default BaseFilesContext;
