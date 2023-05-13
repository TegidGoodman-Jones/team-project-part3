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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ProjectSelectBar = void 0;
var react_1 = require("react");
var analysis_1 = require("@/pages/analysis");
// //OVERVIEW: Creates top bar containing two drop down menus to select employees and projects
// //Note: I think having an 'All Projects' option could turn out to be more trouble than it's worth.
// //Creates drop down menus
// //takes: an array of project names, an array of employee names
function ProjectSelectBar(props) {
    var projects = props.projects.slice(1, props.projects.length);
    var selected_project = props.projects[0];
    var projectOptions = projects
        ? projects.map(function (project) { return (react_1["default"].createElement("option", { className: "bg-base-200 text-base-content", value: project.id, key: project.id }, project.name)); })
        : [];
    var defaultValue = selected_project ? selected_project.id : '';
    if (props.projects.length !== 0) {
        projectOptions = __spreadArrays([
            react_1["default"].createElement("option", { className: "bg-base-200 text-base-content", value: defaultValue, key: defaultValue }, selected_project ? selected_project.name : 'Select project')
        ], projectOptions);
    }
    var employeeOptions = props.employees
        ? props.employees.map(function (employee) { return (react_1["default"].createElement("option", { className: "bg-base-200 text-base-content", value: employee.id, key: employee.id }, employee.username)); })
        : [];
    return (react_1["default"].createElement("div", { className: "w-full h-16 flex flex-row" },
        react_1["default"].createElement("div", { className: "flex flex-row items-center justify-between p-2 rounded-md space-x-2 m-2 w-full " },
            react_1["default"].createElement("select", { id: "projectSelect", className: "select w-64 bg-base-300 text-base-content hover:border-success hover:border-2", defaultValue: defaultValue },
                react_1["default"].createElement("option", { className: "bg-base-200 text-base-content", value: "", disabled: true }, projects.length ? 'Select project' : 'No projects available'),
                projectOptions),
            react_1["default"].createElement("select", { id: "employeeSelect", className: "select w-64 bg-base-300 text-base-content hover:border-success hover:border-2" },
                react_1["default"].createElement("option", { className: "bg-base-200 text-base-content", value: "", disabled: true }, "Select employee"),
                react_1["default"].createElement("option", { className: "bg-base-200 text-base-content", value: "all" }, "All"),
                employeeOptions))));
}
exports.ProjectSelectBar = ProjectSelectBar;
function ProjectSelectBarTile() {
    var _a = react_1.useState([]), projectArray = _a[0], setProjectArray = _a[1];
    var _b = react_1.useState([]), employeeArray = _b[0], setEmployeeArray = _b[1];
    react_1.useEffect(function () {
        fetchProjectAndEmployeeData();
    }, []);
    function fetchProjectAndEmployeeData() {
        return __awaiter(this, void 0, void 0, function () {
            var sampleProjectData, sampleEmployeeData, projects, employees, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, analysis_1.getProjectsByApi()];
                    case 1:
                        sampleProjectData = _a.sent();
                        return [4 /*yield*/, analysis_1.getEmployeesByApi()];
                    case 2:
                        sampleEmployeeData = _a.sent();
                        if (Array.isArray(sampleProjectData.data) && Array.isArray(sampleEmployeeData.data)) {
                            projects = sampleProjectData.data;
                            employees = sampleEmployeeData.data;
                            setProjectArray(projects);
                            setEmployeeArray(employees);
                        }
                        else {
                            console.error('Error fetching project and employee data: Data is not an array');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching project and employee data:', error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return react_1["default"].createElement(ProjectSelectBar, { projects: projectArray, employees: employeeArray });
}
exports["default"] = ProjectSelectBarTile;
