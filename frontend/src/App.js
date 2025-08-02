import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Table, Button, Input, Select, Switch, Modal, Form } from 'antd';

const { Option } = Select;

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDeleteId, setShowDeleteId] = useState(null);
  const [form] = Form.useForm();

  const [filters, setFilters] = useState({ name: '', department: '', activeOnly: false });

  const API_URL = 'http://localhost:5000/api/employees';

  useEffect(() => { fetchEmployees(); }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API_URL);
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  const handleAddEdit = async (values) => {
    try {
      const data = {
        ...values,
        salary: Number(values.salary),
        status: values.status || 'Active'
      };
      if (editingEmployee) {
        await axios.put(`${API_URL}/${editingEmployee._id}`, data);
      } else {
        await axios.post(API_URL, data);
      }
      fetchEmployees();
      setIsModalVisible(false);
      setEditingEmployee(null);
      form.resetFields();
    } catch (err) {
      console.error(err);
      alert('Failed to save employee');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredData = useMemo(() => {
    return employees.filter(emp => {
      const matchName = emp.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchDept = !filters.department || emp.department === filters.department;
      const matchStatus = !filters.activeOnly || emp.status === 'Active';
      return matchName && matchDept && matchStatus;
    });
  }, [employees, filters]);

  const columns = [
    { title: 'ID', dataIndex: '_id', key: '_id', ellipsis: true },
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Salary', dataIndex: 'salary', key: 'salary', render: s => `$${s.toLocaleString()}` },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: status => <span style={{ color: status === 'Active' ? 'green' : 'red' }}>{status}</span>
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <>
          <Button type="primary" size="small" onClick={() => {
            setEditingEmployee(record);
            form.setFieldsValue(record);
            setIsModalVisible(true);
          }}>Edit</Button>{' '}
          <Button danger size="small" onClick={() => setShowDeleteId(record._id)}>Delete</Button>
        </>
      )
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Employee Management System</h1>
      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <Input placeholder="Search by name" value={filters.name}
          onChange={e => setFilters(f => ({ ...f, name: e.target.value }))} />
        <Select placeholder="Department" allowClear style={{ width: 150 }}
          value={filters.department || undefined}
          onChange={v => setFilters(f => ({ ...f, department: v || '' }))}>
          <Option value="Engineering">Engineering</Option>
          <Option value="Marketing">Marketing</Option>
          <Option value="HR">HR</Option>
          <Option value="Finance">Finance</Option>
          <Option value="Sales">Sales</Option>
          <Option value="Operations">Operations</Option>
        </Select>
        <span>Active Only: <Switch checked={filters.activeOnly}
          onChange={v => setFilters(f => ({ ...f, activeOnly: v }))} /></span>
        <Button type="primary" onClick={() => {
          setEditingEmployee(null);
          form.resetFields();
          form.setFieldsValue({ status: 'Active' });
          setIsModalVisible(true);
        }}>
          + Add Employee
        </Button>
      </div>

      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="_id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50'],
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} employees`
        }}
        rowSelection={{}}
      />

      <Modal
        title={editingEmployee ? 'Edit Employee' : 'Add Employee'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleAddEdit}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="department" label="Department" rules={[{ required: true }]}>
            <Select>
              <Option value="Engineering">Engineering</Option>
              <Option value="Marketing">Marketing</Option>
              <Option value="HR">HR</Option>
              <Option value="Finance">Finance</Option>
              <Option value="Sales">Sales</Option>
              <Option value="Operations">Operations</Option>
            </Select>
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="salary" label="Salary" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal open={!!showDeleteId}
        onCancel={() => setShowDeleteId(null)}
        onOk={() => { handleDelete(showDeleteId); setShowDeleteId(null); }}>
        <p>Are you sure you want to delete this employee?</p>
      </Modal>
    </div>
  );
}

export default App;
