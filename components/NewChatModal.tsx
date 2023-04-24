import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/router";

type Employee = {
  id: number;
  username: string;
  email: string;
};

const NewChatButton = (props: any): JSX.Element => {
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [suggestedEmployees, setSuggestedEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const router = useRouter();
  useEffect(() => {
    if (employeeSearch.length > 1) {
      const res = axios
        .get(
          `${process.env.NEXT_PUBLIC_HOST}/api/users/search/${employeeSearch}`
        )
        .then((res) => {
          let tempSuggestedEmployees = res.data.data;
          tempSuggestedEmployees = tempSuggestedEmployees.filter(
            (employee: any) => employee.id !== props.userId
          );
          setSuggestedEmployees(tempSuggestedEmployees);
        });
    } else {
      setSuggestedEmployees([]);
    }
  }, [employeeSearch]);

  const handleEmployeeSelect = (employee: any) => {
    const alreadySelected = selectedEmployees.find(
      (selectedEmployee) => selectedEmployee.id === employee.id
    );
    if (!alreadySelected) {
      setSelectedEmployees([...selectedEmployees, employee]);
    }
    setEmployeeSearch("");
    setSuggestedEmployees([]);
  };

  const handleCreateChat = async () => {
    let users = [...selectedEmployees];
    const payload = {
      users: users,
      userId: props.userId,
    };
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST}/api/chat`,
      payload
    );
    props.setModal(false);
    router.push(`/chat/${res.data.data.id}`);
  };

  return (
    <>
      <div
        className={
          props.modal
            ? "modal modal-open modal-bottom sm:modal-middle"
            : "hidden"
        }
      >
        <div className="modal-box flex flex-col space-y-2 bg-gray-300 text-black h-fit dark:text-white dark:bg-gray-800 justify-between">
          <div className="relative">
            <input
              type="text"
              id="employee-search"
              placeholder="Search employees..."
              className="input input-bordered w-full border-gray-600 bg-gray-600"
              onChange={(e) => {
                setEmployeeSearch(e.target.value);
              }}
              value={employeeSearch}
            />
            <div
              className={`relative bg-gray-600 rounded-b p-2 -mt-2 overflow-y-auto${
                suggestedEmployees.length > 0 ? "" : " hidden"
              }`}
            >
              {suggestedEmployees.map((employee: any) => {
                if (employee.id !== props.userId) {
                  return (
                    <div
                      className="flex justify-between bg-gray-600 hover:brightness-110 rounded p-3"
                      key={employee.id}
                      onClick={() => handleEmployeeSelect(employee)}
                    >
                      <span>{employee.username}</span>
                      <span className="text-gray-400">{employee.email}</span>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div>
            <div id="addedEmployees" className="flex flex-row flex-wrap mt-2">
              {selectedEmployees.map((employee) => {
                return (
                  <div
                    className="flex items-center bg-gray-600 rounded p-2 mr-2 mb-2 cursor-pointer hover:brightness-110"
                    key={employee.id}
                    onClick={() => {
                      setSelectedEmployees(
                        selectedEmployees.filter((e) => e.id !== employee.id)
                      );
                    }}
                  >
                    <span className="mr-1">{employee.username}</span>
                    <X size={18} />
                  </div>
                );
              })}
            </div>
            <div className="modal-action">
              <button id="createChatBtn" className="btn btn-success h-4" onClick={handleCreateChat}>
                Create chat
              </button>
              <button
                id="cancelBtn"
                className="btn h-4  bg-gray-200 border-gray-200 text-black dark:text-white dark:border-gray-600 dark:bg-gray-600 dark:hover:bg-gray-600 hover:bg-gray-200 "
                onClick={() => props.setModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewChatButton;
