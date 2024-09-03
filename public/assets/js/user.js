/* Custom Scripts */

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

$(document).ready(function () {
  /*------------------------------------------------------*/
  // Right Collapsible Sidebar
  /*------------------------------------------------------*/
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
});

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
      $checkedAllEmployees.prop("checked", false).prop("indeterminate", false);
    } else if (inputs == inputs_checked) {
      $checkedAllEmployees.prop("checked", true).prop("indeterminate", false);
    } else {
      $checkedAllEmployees.prop("checked", true).prop("indeterminate", true);
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
