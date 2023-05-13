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
exports.getSampleEmployeeData = exports.getSampleProjectData = exports.getSampleTaskData = exports.getEmployeeTasksByApi = exports.getProjectByApi = exports.getEmployeesByApi = exports.getProjectsByApi = exports.getTasksByApi = void 0;
var Sidebar_1 = require("@/components/Sidebar");
var head_1 = require("next/head");
var router_1 = require("next/router");
var react_1 = require("react");
var jquery_1 = require("jquery");
var SidebarButton_1 = require("@/components/SidebarButton");
var react_cookie_1 = require("react-cookie");
var ProjectDetailsTile_1 = require("@/components/ProjectDetailsTile");
var ProjectSelectBar_1 = require("@/components/ProjectSelectBar");
var ProjectTaskBreakdownTile_1 = require("@/components/ProjectTaskBreakdownTile");
var ProjectStatisticsTile_1 = require("@/components/ProjectStatisticsTile");
var axios_1 = require("axios");
function data() {
    var _this = this;
    var _a = react_1.useState(), userId = _a[0], setUserId = _a[1];
    var _b = react_cookie_1.useCookies(["token"]), cookies = _b[0], setCookie = _b[1];
    var router = router_1.useRouter();
    var _c = react_1.useState([]), sampleProjectDataFull = _c[0], setSampleProjectDataFull = _c[1];
    react_1.useEffect(function () {
        var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getSampleProjectData()];
                    case 1:
                        data = _a.sent();
                        setSampleProjectDataFull(data);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    var _d = react_1.useState(1), currentProject = _d[0], setCurrentProject = _d[1];
    var _e = react_1.useState("All"), currentEmployee = _e[0], setCurrentEmployee = _e[1];
    react_1.useEffect(function () {
        var projectSelect = jquery_1["default"]("#projectSelect");
        projectSelect.on("change", function () {
            // handle project change
            // console.log("Project changed");
            // console.log($(this).val());
            var selectedProject = jquery_1["default"](this).val();
            if (selectedProject == undefined) {
                setCurrentProject(selectedProject); //  id for placeholder project
            }
            else {
                setCurrentProject(selectedProject);
            }
        });
        var employeeSelect = jquery_1["default"]("#employeeSelect");
        employeeSelect.on("change", function () {
            // handle employee change
            // console.log("Emp changed");
            // console.log($(this).val());
            var selectedEmployee = jquery_1["default"](this).val();
            if (selectedEmployee === undefined) {
                setCurrentEmployee("All");
            }
            else {
                setCurrentEmployee(selectedEmployee);
            }
        });
        setCurrentEmployee("all");
        // Cleanup event listeners when component unmounts
        return function () {
            projectSelect.off("change");
            employeeSelect.off("change");
        };
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(head_1["default"], null,
            React.createElement("title", null, "Make-It-All | Analysis"),
            React.createElement("meta", { name: "description", content: "Make it all analytics page" }),
            React.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
            React.createElement("link", { rel: "icon", href: "/transparent_logo.png" })),
        React.createElement(Sidebar_1["default"], null,
            React.createElement("div", { className: "flex h-screen" },
                React.createElement("div", { className: "flex lg:hidden flex-grow-0 h-full p-2" },
                    React.createElement(SidebarButton_1["default"], null)),
                React.createElement("div", { className: "flex flex-col w-full h-full bg-base-100" },
                    React.createElement(ProjectSelectBar_1["default"], null),
                    React.createElement("div", { className: " w-full h-full" },
                        React.createElement("div", { className: " w-full  max-h-72 flex flex-row" },
                            React.createElement(ProjectDetailsTile_1["default"], { currentProject: currentProject }),
                            React.createElement(ProjectTaskBreakdownTile_1.ProjectTaskBreakdown, { currentProject: currentProject, currentEmployee: currentEmployee })),
                        React.createElement(ProjectStatisticsTile_1.ProjectStatisticsTile, { currentProject: currentProject, currentEmployee: currentEmployee })))))));
}
exports["default"] = data;
//SAMPLE DATA
//Note: task data must be defined before project data so that task array can be included in project
// API CALL FUNCTIONS
//async function getTasksByApi() {
// return await axios.get(`http://localhost:3000/api/tasks/}`)
//const res = await axios.get(`/api/tasks/`);
//return res.data;
//}
/*
 NOTE FROM TEGID:
 You guys should probably look into using getServerSideProps() instead of useEffect() to fetch data from the API.
 Its generally just easier to use and you don't have to worry about useEffect() cuz it runs on the server.
 Here's the docs: https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
 If you want any help lmk
*/
//Gets all tasks
function getTasksByApi() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get("/api/tasks/")];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.data];
            }
        });
    });
}
exports.getTasksByApi = getTasksByApi;
//Gets all projects
function getProjectsByApi() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get("/api/projects/")];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.data];
                case 2: return [2 /*return*/, (_a.sent())];
            }
        });
    });
}
exports.getProjectsByApi = getProjectsByApi;
//Gets all employees
function getEmployeesByApi() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get("/api/users/")];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.data];
                case 2: return [2 /*return*/, (_a.sent())];
            }
        });
    });
}
exports.getEmployeesByApi = getEmployeesByApi;
//Gets project by projectId
function getProjectByApi(projectId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get("/api/projects/" + projectId)];
                case 1: return [2 /*return*/, (_a.sent())];
            }
        });
    });
}
exports.getProjectByApi = getProjectByApi;
//Gets employee by employeeId
function getEmployeeTasksByApi(userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get("/api/tasks/" + userId)];
                case 1: return [2 /*return*/, (_a.sent())];
            }
        });
    });
}
exports.getEmployeeTasksByApi = getEmployeeTasksByApi;
function getSampleTaskData() {
    return __awaiter(this, void 0, void 0, function () {
        var sampleTaskData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getTasksByApi()];
                case 1:
                    sampleTaskData = _a.sent();
                    return [2 /*return*/, getTasksByApi()];
            }
        });
    });
}
exports.getSampleTaskData = getSampleTaskData;
function getSampleProjectData() {
    return __awaiter(this, void 0, void 0, function () {
        var taskArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSampleTaskData()];
                case 1:
                    taskArray = _a.sent();
                    return [2 /*return*/, ([
                            {
                                id: 1,
                                name: 'Chat Bot',
                                description: 'Developing a chatbot for customer support',
                                deadline: '30/06/2023',
                                leaderId: 1,
                                tasks: taskArray
                            },
                            {
                                id: 2,
                                name: 'Social Media Management',
                                description: 'Develop Make-It-Alls brand using social media',
                                deadline: '15/09/2023',
                                leaderId: 2,
                                tasks: taskArray
                            }
                        ])];
            }
        });
    });
}
exports.getSampleProjectData = getSampleProjectData;
function getSampleEmployeeData() {
    return ([
        {
            id: 1,
            name: "Isaac"
        },
        {
            id: 2,
            name: "Wilfred Owen"
        },
        {
            id: 3,
            name: "Jordan Peele"
        }
    ]);
}
exports.getSampleEmployeeData = getSampleEmployeeData;
