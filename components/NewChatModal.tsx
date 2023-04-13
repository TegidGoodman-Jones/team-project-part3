import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import ReactDOM from "react-dom";

//need to edit modal to open to what the figure design shows

const NewChatButton = (props: any): JSX.Element => {
  function createChat(employeeIds: string[]) {
    // will need to link with db to create chat and know which user is logged in
    console.log("Create chat with employees: " + employeeIds);
  }

  function createEmpBadge(name: any, id: any) {
    // create badge for employee
    const badgeLabel = "employee-badge-" + id;

    return (
      <div id={badgeLabel} className="badge dark:bg-gray-700 dark:text-white">
        {name}
      </div>
    );
  }

  useEffect(() => {
    // use effect as it can only run once component is mounted

    // event listeners for buttons in modal
    const addEmployeeBtn = $("#addEmployeeBtn");
    addEmployeeBtn.on("click", () => {
      $("#error-message").addClass("hidden");
      addEmployee();
    });

    const createChatBtn = $("#createChatBtn");
    createChatBtn.on("click", () => {
      const added = $("#addedEmployees").children();
      const employeeIds: string[] = [];

      if (added.length > 0) {
        // if there are badge divs within the addedEmployees div, then carry on with creating the chat

        added.each((index, element) => {
          // the way the badges are added to the addedEmployees div is by react rendering surrounding div
          // so we have to get the first child of thi surrounding div
          let badge = $(element).children()[0];

          // the id of the badge is in the format "employee-badge-<id>"
          const id = badge.id.split("-")[2];
          employeeIds.push(id);
        });

        createChat(employeeIds);
        props.setModal(false);
      } else {
        const error = $("#error-message");
        $("#errorText").text("Please add at least one employee.");
        error.removeClass("hidden");
      }
    });

    const cancelChatBtn = $("#cancelBtn");
    cancelChatBtn.on("click", () => {
      props.setModal(false);
    });
  }, []);

  function addEmployee() {
    const employeeToAdd = $("#employeeToAdd").val();
    const employeeName = $("#employeeToAdd option:selected").text();
    const employeeId = $("#employeeToAdd option:selected").val();

    if (employeeName !== "") {
      // if the employee name of the option is not empty (I.E not the empty option),
      // then create the badge and add it to the addedEmployees div
      const containerDiv = $("<div/>");
      // VS seems to not like the way I am using the createEmpBadge function, but it works fine
      ReactDOM.render(
        createEmpBadge(employeeName, employeeId),
        containerDiv.get(0)
      );
      $("#addedEmployees").append(containerDiv);

      // remove the employee from the select option
      $("#employeeToAdd option:selected").remove();

      // add event listener to badge to remove it from the addedEmployees div if clicked and add it back to the select
      $("#employee-badge-" + employeeId).on("click", (e) => {
        // we have to get the parent of the badge as the badge is inside a div that is rendered by react remember
        $("#employee-badge-" + employeeId)
          .parent()
          .remove();

        $("#employeeToAdd").append(
          "<option value=" + employeeId + ">" + employeeName + "</option>"
        );

        // re-enable the add employee button and select as there will now be at least one employee to add
        // , might be enabled already but just in case
        $("#employeeToAdd").prop("disabled", false);
        $("#addEmployeeBtn").prop("disabled", false);
        $("#error-message").addClass("hidden");
      });
    } else {
      // if the employee name is empty, then disable the add employee button and select as no more employees can be added
      $("#employeeToAdd").prop("disabled", true);
      $("#addEmployeeBtn").prop("disabled", true);

      $("#errorText").text("No more employees to add.");
      $("#error-message").removeClass("hidden");
    }
  }

  return (
    <>
      <div
        className={
          props.modal
            ? "modal modal-open modal-bottom sm:modal-middle"
            : "hidden"
        }
      >
        <div className="modal-box flex flex-col space-y-2">
          <select
            id="employeeToAdd"
            className="select bg-gray-300 text-black dark:text-white dark:bg-gray-800 "
          >
            <option value="placeholder" disabled selected>
              Employee select
            </option>
          </select>
          <button id="addEmployeeBtn" className="btn">
            Add
          </button>
          <div
            id="addedEmployees"
            className="flex flex-row flex-wrap mt-10"
          ></div>
          <div className="modal-action">
            <div
              id="error-message"
              className="hidden alert alert-error shadow-lg"
            >
              <div className="h-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span id="errorText">No employee selected.</span>
              </div>
            </div>
            <button id="createChatBtn" className="btn h-4">
              Create chat
            </button>
            <button id="cancelBtn" className="btn h-4">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewChatButton;
