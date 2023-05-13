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
exports.ProjectStatisticsTile = exports.ProjectStats = void 0;
// import { getSampleEmployeeData, getSampleTaskData, getSampleProjectData } from "@/pages/analysis";
var react_1 = require("@tremor/react");
var react_2 = require("react");
var analysis_1 = require("@/pages/analysis");
// OVERVIEW: Calculates data for and creates the card containing a pie chart and bar graph
// Draws the elements to the screen
// Takes: data for the progress bar, pie chart and bar chart as input
function ProjectStats(props) {
    return (React.createElement("div", { className: "card flex flex-col shadow-md text-base-content bg-base-300 p-4 m-4 w-90% h-1/2" },
        React.createElement(react_1.Title, { className: "mb-2 text-2xl text-base-content" }, "Statistics"),
        React.createElement("progress", { className: "mb-2 progress progress-success", value: props.progressBarData, max: "100" }),
        React.createElement("div", { className: "flex flex-row" },
            React.createElement("div", { className: "w-1/2" },
                React.createElement(react_1.Title, { className: " mb-2 text-xl text-base-content" }, "Task data:"),
                React.createElement(react_1.DonutChart, { data: props.kanbanPieData, category: "value", index: "name", variant: "pie", colors: ["rose", "orange", "amber", "lime", "indigo"], style: { height: "300px" } })),
            React.createElement("div", { className: "w-1/2" },
                React.createElement(react_1.Title, { className: " mb-2 text-xl text-base-content" }, "Employee data:"),
                React.createElement(react_1.BarChart, { layout: "horizontal", data: props.taskBarData, index: "employee", categories: ["tasks"], showAnimation: true, showLegend: false, colors: [
                        "indigo",
                        "fuchsia",
                        "amber",
                        "yellow",
                        "teal",
                        "emerald",
                    ], style: { height: "300px" } })))));
}
exports.ProjectStats = ProjectStats;
// Gathers and formats data used to display the graphs on the card then creates the component
function ProjectStatisticsTile(props) {
    var _a = react_2.useState([]), finalKanbanPieData = _a[0], setKanbanPieData = _a[1];
    var _b = react_2.useState([]), finalTaskBarData = _b[0], setTaskBarData = _b[1];
    var _c = react_2.useState(), finalProgressBarData = _c[0], setProgressBarData = _c[1];
    var _d = react_2.useState([]), finalEmployeeNames = _d[0], setEmployeeNames = _d[1];
    react_2.useEffect(function () {
        fetchData();
    }, [props.currentEmployee, props.currentProject]);
    function fetchData() {
        return __awaiter(this, void 0, void 0, function () {
            var currentEmployee, currentProjectId, _a, employeeList, taskList, filteredEmployeeList, filteredTaskList, backlogTaskCount, toDoTaskCount, inProgTaskCount, reviewTaskCount, completedTaskCount, i, kanbanPieData, progressBarData, barChartData, employeeNames, i, j;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        currentEmployee = props.currentEmployee;
                        currentProjectId = props.currentProject;
                        return [4 /*yield*/, Promise.all([
                                analysis_1.getEmployeesByApi(),
                                analysis_1.getTasksByApi(),
                            ])];
                    case 1:
                        _a = _b.sent(), employeeList = _a[0], taskList = _a[1];
                        filteredEmployeeList = [];
                        filteredTaskList = [];
                        if (currentEmployee == "all") {
                            filteredEmployeeList = employeeList.data;
                        }
                        else {
                            filteredEmployeeList = employeeList.data.filter(function (employee) { return employee.id == currentEmployee; });
                        }
                        filteredTaskList = taskList.data.filter(function (task) {
                            return task.projectId == currentProjectId &&
                                (task.employeeId == currentEmployee || currentEmployee == "all");
                        });
                        backlogTaskCount = 0, toDoTaskCount = 0, inProgTaskCount = 0, reviewTaskCount = 0, completedTaskCount = 0;
                        for (i = 0; i <= filteredTaskList.length - 1; i++) {
                            switch (filteredTaskList[i].status) {
                                case "Backlog":
                                    backlogTaskCount++;
                                    break;
                                case "To-Do":
                                    toDoTaskCount++;
                                    break;
                                case "In Progress":
                                    inProgTaskCount++;
                                    break;
                                case "Review":
                                    reviewTaskCount++;
                                    break;
                                case "Completed":
                                    completedTaskCount++;
                                    break;
                            }
                        }
                        kanbanPieData = [
                            {
                                name: "Backlog",
                                value: backlogTaskCount
                            },
                            {
                                name: "To-Do",
                                value: toDoTaskCount
                            },
                            {
                                name: "In Progress",
                                value: inProgTaskCount
                            },
                            {
                                name: "Review",
                                value: reviewTaskCount
                            },
                            {
                                name: "Completed",
                                value: completedTaskCount
                            },
                        ];
                        progressBarData = (completedTaskCount / taskList.data.length) * 100;
                        barChartData = [];
                        employeeNames = [];
                        for (i = 0; i <= filteredEmployeeList.length - 1; i++) {
                            barChartData.push({
                                employee: filteredEmployeeList[i].username,
                                tasks: 0
                            });
                            employeeNames.push(filteredEmployeeList[i].username);
                            for (j = 0; j <= filteredTaskList.length - 1; j++) {
                                if (filteredEmployeeList[i].id == filteredTaskList[j].employeeId) {
                                    barChartData[i].tasks++;
                                }
                            }
                        }
                        // set states for data to be used  return ProjectStats component
                        setKanbanPieData(kanbanPieData);
                        setTaskBarData(barChartData);
                        setProgressBarData(progressBarData);
                        setEmployeeNames(employeeNames);
                        return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement(ProjectStats, { progressBarData: finalProgressBarData, kanbanPieData: finalKanbanPieData, taskBarData: finalTaskBarData, taskBarCategories: finalEmployeeNames }));
}
exports.ProjectStatisticsTile = ProjectStatisticsTile;
