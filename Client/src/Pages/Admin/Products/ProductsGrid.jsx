import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
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
    field: 'price',
    headerName: 'Price',
    width: 220,
    editable: true,
  },
  {
    field: 'discount',
    headerName: 'Discount',
    width: 300,
    editable: true,
  },
];

export default function ProductsGrid({ list = [] }) {
  // Ensure `id` field exists for DataGrid
  const rows = list.map((item) => ({
    ...item,
    id: item._id, // MUI DataGrid requires `id`
  }));

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
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
