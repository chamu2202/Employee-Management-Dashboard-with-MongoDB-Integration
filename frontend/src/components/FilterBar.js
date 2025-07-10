import React from 'react';
import { Input, Select, Button, Space, Card, Switch } from 'antd';
import { SearchOutlined, ClearOutlined, DownloadOutlined } from '@ant-design/icons';

const { Option } = Select;

const FilterBar = ({ filters, onFilterChange, onExport, onClearFilters }) => {
  const departments = ['Engineering', 'Marketing', 'HR', 'Finance', 'Sales', 'Operations'];

  return (
    <Card style={{ marginBottom: 16 }}>
      <Space wrap size="large">
        <Input
          placeholder="Search by name"
          prefix={<SearchOutlined />}
          value={filters.name}
          onChange={(e) => onFilterChange('name', e.target.value)}
          style={{ width: 200 }}
          allowClear
        />
        <Select
          placeholder="Select department"
          value={filters.department}
          onChange={(value) => onFilterChange('department', value)}
          style={{ width: 200 }}
          allowClear
        >
          {departments.map(dept => (
            <Option key={dept} value={dept}>{dept}</Option>
          ))}
        </Select>
        <span>
          Active:
          <Switch
            checked={filters.status}
            onChange={(checked) => onFilterChange('status', checked)}
          />
        </span>
        <Button icon={<ClearOutlined />} onClick={onClearFilters}>Clear</Button>
        <Button type="primary" icon={<DownloadOutlined />} onClick={onExport}>Export CSV</Button>
      </Space>
    </Card>
  );
};

export default FilterBar;
