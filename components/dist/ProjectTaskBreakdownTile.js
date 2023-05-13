"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ProjectTaskBreakdown = exports.ProjectTaskBreakdownTile = void 0;
var react_1 = require("react");
var analysis_1 = require("@/pages/analysis");
var react_2 = require("@tremor/react");
// OVERVIEW: Creates scrollable list of employees with each of their designated tasks 
// Creates and displays the container with a card for each employee
// Takes: array of employee objects, array of task objects
function ProjectTaskBreakdownTile(props) {
    if (props.employeeList == null) {
        return React.createElement("div", null, "Loading...");
    }
    var employeeList = props.employeeList;
    var taskList = props.taskList;
    // Adds a tasks property to each employee object
    employeeList.forEach(function (employee) {
        employee.tasks = taskList.filter(function (task) { return employee.id === task.employeeId; });
    });
    var getStatusBadgeClass = function (status) {
        switch (status) {
            case 'Backlog':
                return 'bg-gray-400';
            case 'To-Do':
                return 'bg-blue-400';
            case 'In Progress':
                return 'bg-yellow-400';
            case 'Review':
                return 'bg-purple-400';
            case 'Completed':
                return 'bg-green-400';
            default:
                return 'bg-gray-400';
        }
    };
    var allTaskBreakdown = props.employeeList.map(function (employeeBreakdown) { return (React.createElement("div", { id: "employee-id", className: "card shadow-md p-4 bg-base-200", key: employeeBreakdown.id },
        React.createElement("h1", { id: "employee-name", className: "mb-2 text-base-content" }, employeeBreakdown.username),
        React.createElement("hr", null),
        React.createElement("div", { id: "employee-training", className: "form-control space-y-2 mt-2" }, employeeBreakdown.tasks.map(function (task) { return (React.createElement("label", { className: "label cursor-pointer p-0 flex items-center", key: task.id },
            React.createElement("span", { className: "label-text text-base-content" }, task.name),
            React.createElement("div", { className: "flex items-center ml-auto" },
                React.createElement("span", { className: "badge " + getStatusBadgeClass(task.status) }, task.status),
                React.createElement("input", { type: "checkbox", checked: task.status === 'Completed', readOnly: true, className: "checkbox checkbox-sm ml-2" })))); })))); });
    return (React.createElement("div", { className: "card flex flex-col shadow-md overflow-auto p-4 mx-4 w-1/2 bg-base-300 text-base-content" },
        React.createElement(react_2.Title, { className: "mb-2 text-2xl text-base-content" }, "Task details"),
        React.createElement("div", { className: "overflow-auto space-y-5" }, allTaskBreakdown)));
}
exports.ProjectTaskBreakdownTile = ProjectTaskBreakdownTile;
// Fetches data and passes into component
function ProjectTaskBreakdown(props) {
    var _a = react_1.useState([]), filteredEmployeeList = _a[0], setFilteredEmployeeList = _a[1];
    var _b = react_1.useState([]), filteredTaskList = _b[0], setFilteredTaskList = _b[1];
    react_1.useEffect(function () {
        fetchData();
    }, [props.currentEmployee, props.currentProject]);
    var currentEmployee = props.currentEmployee;
    var currentProjectId = props.currentProject;
    function fetchData() {
        return __awaiter(this, void 0, void 0, function () {
            var _a, projectList, employeeList, taskList, filteredEmployeeList_1, filteredTaskList_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            analysis_1.getProjectsByApi(),
                            analysis_1.getEmployeesByApi(),
                            analysis_1.getTasksByApi(),
                        ])];
                    case 1:
                        _a = _b.sent(), projectList = _a[0], employeeList = _a[1], taskList = _a[2];
                        if (projectList != null && employeeList != null && taskList != null) {
                            filteredEmployeeList_1 = [];
                            filteredTaskList_1 = [];
                            // filter employee list
                            if (currentEmployee == "all") {
                                filteredEmployeeList_1 = employeeList.data;
                            }
                            else {
                                filteredEmployeeList_1 = employeeList.data.filter(function (employee) { return employee.id == currentEmployee; });
                            }
                            // filter task list
                            filteredTaskList_1 = taskList.data.filter(function (task) {
                                return task.projectId == currentProjectId && (task.employeeId == currentEmployee || currentEmployee == "all");
                            });
                            // set states for data for component
                            setFilteredEmployeeList(filteredEmployeeList_1);
                            setFilteredTaskList(filteredTaskList_1);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement(ProjectTaskBreakdownTile, { employeeList: filteredEmployeeList, taskList: filteredTaskList }));
}
exports.ProjectTaskBreakdown = ProjectTaskBreakdown;
