import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button, Popconfirm, Space } from 'antd';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const EmployeeGrid = ({ employees, loading, onDelete, onBulkDelete, onEdit }) => {
  const columnDefs = [
    { headerName: 'Name', field: 'name', flex: 1 },
    { headerName: 'Department', field: 'department', flex: 1 },
    { headerName: 'Role', field: 'role', flex: 1 },
    { headerName: 'Salary', field: 'salary', flex: 1 },
    { headerName: 'Status', field: 'status', flex: 1, valueFormatter: (params) => (params.value ? 'Active' : 'Inactive') },
    {
      headerName: 'Actions',
      field: 'actions',
      flex: 1,
      cellRendererFramework: (params) => (
        <Space>
          <Button
            type="link"
            onClick={() => onEdit(params.data)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this employee?"
            onConfirm={() => onDelete(params.data._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <AgGridReact
        rowData={employees}
        columnDefs={columnDefs}
        pagination
        domLayout="autoHeight"
        loadingOverlayComponentParams={{ loadingMessage: 'Loading employees...' }}
        overlayLoadingTemplate={
          '<span class="ag-overlay-loading-center">Loading...</span>'
        }
        overlayNoRowsTemplate={
          '<span class="ag-overlay-loading-center">No employees found</span>'
        }
      />
    </div>
  );
};

export default EmployeeGrid;
