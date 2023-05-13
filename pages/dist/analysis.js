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
exports.getEmployeeTasksByApi = exports.getProjectByApi = exports.getEmployeesByApi = exports.getProjectsByApi = exports.getTasksByApi = void 0;
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
    var _a = react_1.useState(), userId = _a[0], setUserId = _a[1];
    var _b = react_cookie_1.useCookies(["token"]), cookies = _b[0], setCookie = _b[1];
    var router = router_1.useRouter();
    var _c = react_1.useState(1), currentProject = _c[0], setCurrentProject = _c[1];
    var _d = react_1.useState("All"), currentEmployee = _d[0], setCurrentEmployee = _d[1];
    react_1.useEffect(function () {
        // all the components listen to the state changes that are brought about by the selects changing
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
// export async function getSampleTaskData() {
//   const sampleTaskData = await getTasksByApi();
//   return getTasksByApi();
//   // return (
//   //   [
//   //     {
//   //       id: 1,
//   //       name: "Design Chat",
//   //       description: "Appearance of Chat Bot",
//   //       status: "Completed",
//   //       projectId: 1,
//   //       employeeId: 1
//   //     },
//   //     {
//   //       id: 2,
//   //       name: "Gauge Interest",
//   //       description: "Will affect how the bot responds",
//   //       status: "Completed",
//   //       projectId: 1,
//   //       employeeId: 3
//   //     },
//   //     {
//   //       id: 3,
//   //       name: "Write Welcome Messages",
//   //       description: "Friendly and inviting",
//   //       status: "Review",
//   //       projectId: 1,
//   //       employeeId: 1
//   //     },
//   //     {
//   //       id: 4,
//   //       name: "Design Conversation Flow",
//   //       description: "Flow and dialogue for the chatbot",
//   //       status: "In-Progress",
//   //       projectId: 1,
//   //       employeeId: 2
//   //     },
//   //     {
//   //       id: 5,
//   //       name: "Publish User Guide",
//   //       description: "Guide to using the chatbot",
//   //       status: "Backlog",
//   //       projectId: 1,
//   //       employeeId: 3
//   //     },
//   //     {
//   //       id: 6,
//   //       name: "Create Accounts",
//   //       description: "Social Media Accounts",
//   //       status: "Completed",
//   //       projectId: 2,
//   //       employeeId: 2
//   //     },
//   //     {
//   //       id: 7,
//   //       name: "Schedule Posts",
//   //       description: "Release in orderly fashion",
//   //       status: "In Progress",
//   //       projectId: 2,
//   //       employeeId: 1
//   //     },
//   //     {
//   //       id: 8,
//   //       name: "Don't Get Cancelled",
//   //       description: "Stay away from Twitter.com",
//   //       status: "To-Do",
//   //       projectId: 2,
//   //       employeeId: 3,
//   //     },
//   //     {
//   //       id: 9,
//   //       name: "Engage with Followers",
//   //       description: "If we have any",
//   //       status: "Backlog",
//   //       projectId: 2,
//   //       employeeId: 3
//   //     }
//   //   ]
//   // )
// }
// export async function getSampleProjectData() {
//   const taskArray = await getSampleTaskData()
//   return (
//     [
//       {
//         id: 1,
//         name: 'Chat Bot',
//         description: 'Developing a chatbot for customer support',
//         deadline: '30/06/2023',
//         leaderId: 1,
//         tasks: taskArray
//       },
//       {
//         id: 2,
//         name: 'Social Media Management',
//         description: 'Develop Make-It-Alls brand using social media',
//         deadline: '15/09/2023',
//         leaderId: 2,
//         tasks: taskArray
//       }
//     ]
//   )
// }
// export function getSampleEmployeeData() {
//   return (
//     [
//       {
//         id: 1,
//         name: "Isaac"
//       },
//       {
//         id: 2,
//         name: "Wilfred Owen"
//       },
//       {
//         id: 3,
//         name: "Jordan Peele"
//       }
//     ]
//   )
// }
