import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { Button } from "antd";
import { authenticationAxios } from "../../../services/baseService";

const ProjectPage = () => {
  const { projectId } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [groupOptions, setGroupOptions] = useState<{ value: number, label: string }[]>([]);
  const [groups, setGroups] = useState<{
    id: number,
    leaderId: number,
    leaderName: string,
    version: number
  }[]>([])
  const [formData, setFormData] = useState<{
    groupId: number,
    projectNumber: number,
    name: string,
    customer: string,
    status: string,
    startDate: string,
    endDate: string,
    version: number,
  }>({
    groupId: 1,
    projectNumber: 1,
    name: "",
    customer: "",
    status: "NEW",
    startDate: "",
    endDate: "",
    version: 1,
  });

  useEffect(() => {
    const fetchData = async() => {
      try {
        const { data } = await authenticationAxios.get('/groups');
        setGroupOptions(data.data?.map(item => {
          return { value: item.id, label: item.leaderName }
        }) ?? []);
      } catch (error) {
        setGroupOptions([{ value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" }]);
      }
      if (projectId) {
        try {
          const { data } = await authenticationAxios.get(`/projects/${projectId}`);
          setFormData({
            groupId: data.data.groupId || 1,
            projectNumber: data.data.projectNumber || 1,
            name: data.data.name || "",
            customer: data.data.customer || "",
            status: data.data.status || "NEW",
            startDate: data.data.startDate || "",
            endDate: data.data.endDate || "",
            version: data.data.version || 1,
          });
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
    fetchData();
    console.log(formData);
  }, [projectId]);

  const displayErrors = (message) => {
    message.split("\n").forEach((error) => toast.error(error));
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

    try {
      const { status } = !projectId ?  await authenticationAxios.post('/projects', {
        groupId: formData.groupId,
        name: formData.name,
        projectNumber: formData.projectNumber,
        customer: formData.customer,
        status: formData.status,
        startDate: formData.startDate,
        endDate: formData.endDate
      }): await authenticationAxios.put(`/projects/${projectId}`, {
        groupId: formData.groupId,
        name: formData.name,
        projectNumber: formData.projectNumber,
        customer: formData.customer,
        status: formData.status,
        startDate: formData.startDate,
        endDate: formData.endDate
      });

      if (status === 200 || status === 201) {
        toast.success(`Project ${projectId ? "updated" : "created"} successfully!`);
      }
    } catch (error) {
      const { message, errors } = error.response.data;
      toast.error(message);
      displayErrors(errors);
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
        <FormField
          label="Project number"
          id="project-number"
          name="projectNumber"
          value={formData.projectNumber?.toString()}
          onChange={handleChange}
          readOnly={!!projectId}
        />

        <FormField
          label="Project name"
          id="project-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <FormField
          label="Customer"
          id="customer"
          name="customer"
          value={formData.customer}
          onChange={handleChange}
          required
        />

        <FormSelect
          label="Group"
          id="groupId"
          name="groupId"
          value={formData.groupId}
          options={groupOptions}
          onChange={handleChange}
          required
        />

        <FormSelect
          label="Status"
          id="status"
          name="status"
          value={formData.status}
          options={[
            { value: "NEW", label: "New" },
            { value: "FIN", label: "Finished" },
            { value: "INP", label: "In progress" },
            { value: "PLA", label: "Planned" },
          ]}
          onChange={handleChange}
          required
        />

        <FormField
          label="Start date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          type="date"
          required
        />

        <FormField
          label="End date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          type="date"
        />

        <div className="flex space-x-4 mt-8">
          <Link to="/admin">
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

const FormField = ({
  label,
  id,
  name,
  value,
  onChange,
  type = "text",
  readOnly = false,
  required = false,
}: {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  readOnly?: boolean;
  required?: boolean;
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

const FormSelect = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  id: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; label: string }[];
  required?: boolean;
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);


export default ProjectPage;
