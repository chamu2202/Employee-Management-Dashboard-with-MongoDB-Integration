import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Switch, message } from 'antd';
import employeeAPI from '../services/api';

const { Option } = Select;

const AddEmployeeModal = ({ visible, onClose, onAdd }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await employeeAPI.addEmployee(values);
      message.success('Employee added successfully');
      onAdd();    // refresh parent list/grid
      onClose();  // close modal
    } catch (err) {
      console.error('Error adding employee:', err);
      message.error(
        err?.response?.data?.message || err?.message || 'Failed to add employee'
      );
    }
  };

  return (
    <Modal
      open={visible}          // use `open` instead of deprecated `visible`
      title="Add Employee"
      onCancel={onClose}
      onOk={handleOk}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter employee name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="department"
          label="Department"
          rules={[{ required: true, message: 'Please select department' }]}
        >
          <Select placeholder="Select department">
            <Option value="Engineering">Engineering</Option>
            <Option value="Marketing">Marketing</Option>
            <Option value="HR">HR</Option>
            <Option value="Finance">Finance</Option>
            <Option value="Sales">Sales</Option>
            <Option value="Operations">Operations</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please enter role' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="salary"
          label="Salary"
          rules={[{ required: true, message: 'Please enter salary' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="status"
          label="Active"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEmployeeModal;
