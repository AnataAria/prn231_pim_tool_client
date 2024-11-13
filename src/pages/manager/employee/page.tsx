// src/pages/EmployeeTablePage.js

import React, { useEffect, useState } from 'react';
import { Table, Typography, Spin, message } from 'antd';
import { authenticationAxios } from '../../../services/baseService';

const { Title } = Typography;

const EmployeeTablePage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await authenticationAxios.get('/employees/search');
        setEmployees(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        message.error('Failed to load employee data');
      }
    };

    fetchEmployees();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Visa',
      dataIndex: 'visa',
      key: 'visa',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Birth Date',
      dataIndex: 'birthDay',
      key: 'birthDay',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
    },
  ];

  return (
    <div className="employee-table-page">
      <Title level={2} className="text-center">Employee List</Title>

      {loading ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <Table
          dataSource={employees}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
        />
      )}
    </div>
  );
};

export default EmployeeTablePage;
