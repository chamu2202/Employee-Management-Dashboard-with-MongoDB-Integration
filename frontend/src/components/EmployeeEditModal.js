import React from 'react';
import { Modal, Form, Input, InputNumber, Switch, Select, message } from 'antd';
import employeeAPI from '../services/api';

const { Option } = Select;

const EmployeeEditModal = ({ visible, onClose, employee, onUpdate }) => {
  const [form] = Form.useForm();

  // Populate form when editing existing employee
  React.useEffect(() => {
    if (employee) {
      form.setFieldsValue(employee);
    }
  }, [employee, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await employeeAPI.updateEmployee(employee._id, values);
      message.success('Employee updated successfully');
      onUpdate();         // Refresh list
      onClose();          // Close modal
    } catch (err) {
      console.error('Error updating employee:', err);
      message.error(err?.message || 'Failed to update employee');
    }
  };

  return (
    <Modal
      visible={visible}
      title="Edit Employee"
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
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>
        <Form.Item
          name="department"
          label="Department"
          rules={[{ required: true, message: 'Please select department' }]}
        >
          <Select>
            <Option value="Engineering">Engineering</Option>
            <Option value="Marketing">Marketing</Option>
            <Option value="HR">HR</Option>
            <Option value="Finance">Finance</Option>
            <Option value="Sales">Sales</Option>
            <Option value="Operations">Operations</Option>
          </Select>
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

export default EmployeeEditModal;
