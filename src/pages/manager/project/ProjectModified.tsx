import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { Button } from "antd";
import axios from "axios";

const ProjectPage = () => {
  const { projectId } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [groupid, setGroupid] = useState([
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
  ]);
  const [formData, setFormData] = useState({
    id: 1,
    groupId: 1,
    projectNumber: 1,
    name: "",
    customer: "",
    status: "NEW",
    startDate: "",
    endDate: "",
    version: 1,
    employeeVisa: [],
  });

  useEffect(() => {
    if (projectId) {
      const getData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:9090/api/v1/project?projectId=${projectId}`
          );
          setFormData(response.data);
        } catch (error) {
          toast.error(error.message);
        }
      };
      getData();
    }
  }, [projectId]);

  const throwsErrorToScreen = (message: string) => {
    const errorList = message.split("\n");
    errorList.forEach((error) => {
      toast(error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "employeeVisa" ? value.split(",") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = projectId
      ? "http://localhost:9090/api/v1/project"
      : "http://localhost:9090/api/v1/project/";

    const method = projectId ? "PUT" : "POST";

    try {
      const response = await axios({
        method,
        url,
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(`Project ${projectId ? "updated" : "created"} successfully!`);
      }
    } catch (error) {
      const errorRes = error.response.data;
      const errorMes = errorRes.message;
      toast.error(errorMes);
      throwsErrorToScreen(errorRes.errors);
      setRedirect(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        {projectId ? "Edit Project" : "New Project"}
      </h2>
      <div className="border-b border-gray-300 mb-4" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="project-number" className="block text-sm font-medium text-gray-700">
            Project number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="project-number"
            name="projectNumber"
            value={formData.projectNumber}
            onChange={handleChange}
            readOnly={!!projectId}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="project-name" className="block text-sm font-medium text-gray-700">
            Project name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="project-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
            Customer <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="customer"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="group" className="block text-sm font-medium text-gray-700">
            Group <span className="text-red-500">*</span>
          </label>
          <select
            id="groupId"
            name="groupId"
            value={formData.groupId}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            {groupid.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="member" className="block text-sm font-medium text-gray-700">
            Members
          </label>
          <input
            type="text"
            id="member"
            name="employeeVisa"
            value={formData.employeeVisa.join(",")}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="NEW">New</option>
            <option value="FIN">Finished</option>
            <option value="INP">In progress</option>
            <option value="PLA">Planned</option>
          </select>
        </div>

        <div>
          <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
            Start date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="start-date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mt-4">
            End date
          </label>
          <input
            type="date"
            id="end-date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex space-x-4 mt-8">
          <Link to="/">
            <Button>Cancel</Button>
          </Link>
          <Button type="primary" htmlType="submit">
            {projectId ? "Update" : "Create"}
          </Button>
        </div>
      </form>
      {redirect && <Link to="/" />}
    </div>
  );
};

export default ProjectPage;
