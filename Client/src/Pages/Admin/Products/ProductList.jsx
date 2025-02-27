import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom'; // Use react-router-dom Link

const columns = [
  { field: 'id', headerName: 'Id', width: 300 },
  {
    field: 'imageUrl',
    headerName: 'Icon',
    renderCell: (params) => (
      <img
        src={params.row.imageUrl}
        alt="Preview"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '1px solid #ccc',
        }}
      />
    ),
    width: 300,
  },
  { field: 'name', headerName: 'Name', width: 300 },
  {
    field: 'products',
    headerName: 'Products',
    renderCell: (params) => (
      <IconButton component={Link} to={`/products/${params.row.id}`}>
        <VisibilityIcon />
      </IconButton>
    ),
    width: 300,
  },
];

export default function ProductList({ list }) {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={list}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
