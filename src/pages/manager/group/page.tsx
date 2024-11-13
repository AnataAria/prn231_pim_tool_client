import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import Title from 'antd/es/typography/Title';
import { authenticationAxios } from '../../../services/baseService';

const GroupTableView = () => {
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API or use local data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint if needed
        const response = await authenticationAxios.get('/groups');
        if (response.data.success) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Leader ID',
      dataIndex: 'leaderId',
      key: 'leaderId',
    },
    {
      title: 'Leader Name',
      dataIndex: 'leaderName',
      key: 'leaderName',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Group Table View</Title>
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id" 
        loading={loading} 
        pagination={false} 
        bordered 
      />
    </div>
  );
}

export default GroupTableView;