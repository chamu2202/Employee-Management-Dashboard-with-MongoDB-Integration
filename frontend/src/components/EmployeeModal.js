import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, message } from 'antd';

const { Option } = Select;

const EmployeeModal = ({ 
  visible, 
  onClose, 
  onSubmit, 
  employee, 
  loading 
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const departments = ['Engineering', 'Marketing', 'HR', 'Finance', 'Sales', 'Operations'];

  useEffect(() => {
    if (visible) {
      if (employee) {
        // Edit mode - populate form with existing data
        form.setFieldsValue({
          name: employee.name,
          department: employee.department,
          role: employee.role,
          salary: employee.salary,
          status: employee.status
        });
      } else {
        // Add mode - reset form
        form.resetFields();
      }
    }
  }, [visible, employee, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      
      await onSubmit(values);
      
      form.resetFields();
      onClose();
      message.success(`Employee ${employee ? 'updated' : 'created'} successfully!`);
    } catch (error) {
      console.error('Form validation failed:', error);
      message.error('Please fill in all required fields correctly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={employee ? 'Edit Employee' : 'Add New Employee'}
      open={visible}
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={submitting}
      okText={employee ? 'Update' : 'Create'}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please enter employee name' },
            { min: 2, message: 'Name must be at least 2 characters long' }
          ]}
        >
          <Input placeholder="Enter employee name" />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          rules={[{ required: true, message: 'Please select department' }]}
        >
          <Select placeholder="Select department">
            {departments.map(dept => (
              <Option key={dept} value={dept}>{dept}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please enter role' }]}
        >
          <Input placeholder="Enter role" />
        </Form.Item>

        <Form.Item
          label="Salary"
          name="salary"
          rules={[
            { required: true, message: 'Please enter salary' },
            { type: 'number', min: 0, message: 'Salary must be positive' }
          ]}
        >
          <InputNumber
            placeholder="Enter salary"
            style={{ width: '100%' }}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please select status' }]}
        >
          <Select placeholder="Select status">
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeeModal;