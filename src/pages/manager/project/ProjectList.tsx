import React, { useEffect, useState } from "react";
import { Table, Space, Input, Select, Button } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import { authenticationAxios } from "../../../services/baseService";

// Define the structure of the project data
interface Project {
  projectNumber: string;
  name: string;
  status: string;
  customer: string;
  startDate: string;
}
const ProjectList: React.FC = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchForm, setSearchFormData] = useState({
    status: "",
    search: "",
  });
  const columns = [
    {
      title: "Number",
      dataIndex: "projectNumber",
      render: (text: string) => <Link to={`/projects/${text}`}>{text}</Link>,
    },
    {
      title: "Name",
      className: "column-money",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Customer",
      dataIndex: "customer",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "Delete",
      dataIndex: "projectNumber",
      key: "x",
      render: (id: string) => (
        <Button danger onClick={() => handleDelete(id)}>
          Delete
        </Button>
      ),
    },
  ];

  const handleDelete = async (id: string) => {
    try {
      const response = await authenticationAxios.delete(`/projects`, {
        params: { deleteId: id },
      })

      if (response.status === 200) {
        console.log("Project deleted successfully!");
        toast("Project deleted successfully!");
        fetchProjects();
      } else {
        toast("Failed to delete project.");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast("Error deleting project.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await authenticationAxios.get("/projects");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast("Error fetching projects.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your search functionality here if needed
    fetchProjects(); // Fetch projects after searching
  };

  const handleStatusChange = (value: string) => {
    setSearchFormData((prevData) => ({ ...prevData, status: value }));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Define row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Project[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
    },
    onSelect: (record: Project, selected: boolean, selectedRows: Project[]) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected: boolean, selectedRows: Project[], changeRows: Project[]) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  return (
    <>
      {!loading && (
        <div>
          <h1>Project List</h1>
          <form onSubmit={handleSubmit}>
            <Space>
              <Input
                type="text"
                placeholder="Project Number, Name or Custom Name"
                name="search"
                value={searchForm.search}
                onChange={handleChange}
              />
              <Select
                defaultValue="disabled"
                style={{ width: 120 }}
                options={[
                  { value: "NEW", label: "New" },
                  { value: "FIN", label: "Finished" },
                  { value: "INP", label: "In progress" },
                  { value: "PLA", label: "Planned" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
                value={searchForm.status}
                onChange={handleStatusChange}
              />
              <Button size='middle' type="primary" htmlType="submit">
                Search
              </Button>
            </Space>
          </form>

          <Table
            columns={columns}
            rowSelection={{
              ...rowSelection,
              checkStrictly,
            }}
            dataSource={data}
            rowKey="projectNumber" // Use a unique key for each row
          />
        </div>
      )}
    </>
  );
};

export default ProjectList;
