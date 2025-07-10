



import React, { useState, useMemo } from 'react';
import { Input, Select, Button, Table, Modal, Space, Switch, Card, Row, Col, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

function App() {
  const [employees, setEmployees] = useState([
    
  ]);
  
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    role: '',
    salary: '',
    status: 'Active'
  });
  
  // Filter state
  const [filters, setFilters] = useState({
    name: '',
    department: '',
    activeOnly: false
  });

  // Handle form submit (add new or edit existing)
  const handleSubmit = () => {
    // Validation
    if (!formData.name || !formData.department || !formData.role || !formData.salary) {
      message.error('Please fill in all required fields');
      return;
    }

    if (editingEmployee) {
      // Update existing employee
      setEmployees(prev =>
        prev.map(emp =>
          emp.id === editingEmployee.id ? { ...emp, ...formData, salary: Number(formData.salary) } : emp
        )
      );
      message.success('Employee updated successfully!');
      setEditingEmployee(null);
    } else {
      // Add new employee with unique ID
      const newEmployee = {
        id: employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1,
        ...formData,
        salary: Number(formData.salary)
      };
      setEmployees(prev => [...prev, newEmployee]);
      message.success('Employee added successfully!');
    }
    
    // Reset form
    setFormData({
      name: '',
      department: '',
      role: '',
      salary: '',
      status: 'Active'
    });
    setIsModalVisible(false);
  };

  // When clicking Edit
  const onEdit = (record) => {
    setEditingEmployee(record);
    setFormData({
      name: record.name,
      department: record.department,
      role: record.role,
      salary: record.salary.toString(),
      status: record.status
    });
    setIsModalVisible(true);
  };

  // When clicking Delete
  const onDelete = (id) => {
    Modal.confirm({
      title: 'Delete Employee',
      content: 'Are you sure you want to delete this employee? This action cannot be undone.',
      okText: 'Yes, Delete',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk: () => {
        setEmployees(prev => prev.filter(emp => emp.id !== id));
        message.success('Employee deleted successfully!');
      },
    });
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingEmployee(null);
    setFormData({
      name: '',
      department: '',
      role: '',
      salary: '',
      status: 'Active'
    });
  };

  // Handle add new employee
  const handleAddNew = () => {
    setEditingEmployee(null);
    setFormData({
      name: '',
      department: '',
      role: '',
      salary: '',
      status: 'Active'
    });
    setIsModalVisible(true);
  };

  // Filter employees based on current filters
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesName = employee.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesDepartment = !filters.department || employee.department === filters.department;
      const matchesStatus = !filters.activeOnly || employee.status === 'Active';
      
      return matchesName && matchesDepartment && matchesStatus;
    });
  }, [employees, filters]);

  // Define columns
  const columns = [
    { 
      title: 'ID', 
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      width: 60
    },
    { 
      title: 'Name', 
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <strong>{text}</strong>
    },
    { 
      title: 'Department', 
      dataIndex: 'department',
      sorter: (a, b) => a.department.localeCompare(b.department),
      filters: [
        { text: 'Engineering', value: 'Engineering' },
        { text: 'HR', value: 'HR' },
        { text: 'Marketing', value: 'Marketing' },
        { text: 'Finance', value: 'Finance' },
        { text: 'Sales', value: 'Sales' },
        { text: ' Operations', value: 'Operations' },
      ],
      onFilter: (value, record) => record.department === value
    },
    { 
      title: 'Role', 
      dataIndex: 'role',
      sorter: (a, b) => a.role.localeCompare(b.role)
    },
    { 
      title: 'Salary', 
      dataIndex: 'salary',
      sorter: (a, b) => a.salary - b.salary,
      render: (salary) => `$${salary.toLocaleString()}`
    },
    { 
      title: 'Status', 
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => (
        <span 
          style={{ 
            color: status === 'Active' ? '#52c41a' : '#ff4d4f',
            fontWeight: 'bold'
          }}
        >
          {status}
        </span>
      ),
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            size="small"
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>
          <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => onDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
      width: 120
    },
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h1 style={{ margin: 0 }}>Employee Management System</h1>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAddNew}
                size="large"
              >
                Add Employee
              </Button>
            </div>
          </Col>
          
          <Col span={24}>
            <Card title="Filters" size="small">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                  <Input
                    placeholder="Search by name"
                    prefix={<SearchOutlined />}
                    value={filters.name}
                    onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
                    allowClear
                  />
                </Col>
                <Col xs={24} sm={8}>
                  <Select
                    placeholder="Filter by department"
                    value={filters.department}
                    onChange={(value) => setFilters(prev => ({ ...prev, department: value || '' }))}
                    allowClear
                    style={{ width: '100%' }}
                  >
                    <Option value="Engineering">Engineering</Option>
                    <Option value="HR">HR</Option>
                    <Option value="Marketing">Marketing</Option>
                  </Select>
                </Col>
                <Col xs={24} sm={8}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>Active Only:</span>
                    <Switch
                      checked={filters.activeOnly}
                      onChange={(checked) => setFilters(prev => ({ ...prev, activeOnly: checked }))}
                    />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col span={24}>
            <Card title={`Employee List (${filteredEmployees.length} employees)`}>
              <Table
                dataSource={filteredEmployees}
                columns={columns}
                rowKey="id"
                pagination={{ 
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} employees`
                }}
                scroll={{ x: 800 }}
                size="small"
              />
            </Card>
          </Col>
        </Row>
      </Card>

      <Modal
        title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            {editingEmployee ? 'Update Employee' : 'Add Employee'}
          </Button>
        ]}
        width={500}
      >
        <div style={{ marginTop: '16px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              Full Name *
            </label>
            <Input
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              Department *
            </label>
            <Select
              placeholder="Select department"
              value={formData.department}
              onChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
              style={{ width: '100%' }}
            >
              <Option value="Engineering">Engineering</Option>
              <Option value="HR">HR</Option>
              <Option value="Marketing">Marketing</Option>
              <Option value="Finance">Finance</Option>
              <Option value="Sales">Sales</Option>
              <Option value="Operations">Operations</Option>
            </Select>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              Role/Position *
            </label>
            <Input
              placeholder="Enter role or position"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              Annual Salary *
            </label>
            <Input
              type="number"
              placeholder="Enter annual salary"
              prefix="$"
              value={formData.salary}
              onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              Employment Status *
            </label>
            <Select
              placeholder="Select status"
              value={formData.status}
              onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
              style={{ width: '100%' }}
            >
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
