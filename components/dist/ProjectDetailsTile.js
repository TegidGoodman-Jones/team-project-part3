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
exports.ProjectDetailsTile = void 0;
var react_1 = require("react");
var analysis_1 = require("@/pages/analysis");
var react_2 = require("@tremor/react");
function ProjectDetailsTile(props) {
    var formattedDeadline = new Date(props.deadline).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });
    return (react_1["default"].createElement("div", { id: "project-card", className: "card flex flex-col shadow-md p-4 mx-4 w-1/2 bg-base-300 text-base-content" },
        react_1["default"].createElement(react_2.Title, { className: "mb-2 text-2xl text-base-content" }, "Project details"),
        react_1["default"].createElement("div", { className: "flex flex-row justify-between" },
            react_1["default"].createElement("span", { className: "label-text text-base-content mb-0" }, "Title"),
            react_1["default"].createElement("span", { className: "label-text text-base-content mb-0" }, "Deadline")),
        react_1["default"].createElement(react_2.Title, { id: "project-card-title", className: "inline-flex flex-row justify-between mb-2" },
            props.name,
            react_1["default"].createElement("span", { className: "text-success" }, formattedDeadline)),
        react_1["default"].createElement("hr", null),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("span", { className: "label-text text-base-content mt-2 mb-0" }, "Description"),
        react_1["default"].createElement("p", { id: "project-card-desc mt-0" }, props.description),
        react_1["default"].createElement("span", { className: "label-text text-base-content mt-2 mb-0" }, "Leader"),
        react_1["default"].createElement("p", { id: "project-card-leader mt-0" }, props.leader)));
}
exports.ProjectDetailsTile = ProjectDetailsTile;
function ProjectDetailsProjectTile(props) {
    var _a = react_1.useState(null), projectData = _a[0], setProjectData = _a[1];
    var _b = react_1.useState('Team Led'), projectLeader = _b[0], setProjectLeader = _b[1];
    react_1.useEffect(function () {
        fetchProjectData();
    }, [props.currentProject]);
    var currentProject = props.currentProject;
    function fetchProjectData() {
        return __awaiter(this, void 0, void 0, function () {
            var projectResponse, allEmployeeData, leaderName, leaderId, leader;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, analysis_1.getProjectByApi(currentProject)];
                    case 1:
                        projectResponse = _a.sent();
                        return [4 /*yield*/, analysis_1.getEmployeesByApi()];
                    case 2:
                        allEmployeeData = _a.sent();
                        leaderId = projectResponse.data.leaderId;
                        if (Array.isArray(allEmployeeData.data)) {
                            leader = allEmployeeData.data.find(function (employee) { return employee.id === leaderId; });
                            if (leader) {
                                leaderName = leader.name;
                            }
                        }
                        setProjectData(projectResponse.data.data[0]);
                        setProjectLeader(leaderName);
                        return [2 /*return*/];
                }
            });
        });
    }
    if (projectData == null || projectData == undefined) {
        return react_1["default"].createElement("div", null, "Loading...");
    }
    return (react_1["default"].createElement(ProjectDetailsTile, { id: projectData.id, name: projectData.name, description: projectData.description, deadline: projectData.deadline, leader: projectLeader, tasks: projectData.tasks }));
}
exports["default"] = ProjectDetailsProjectTile;
