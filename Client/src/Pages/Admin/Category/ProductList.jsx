import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'name', headerName: 'Name', width: 90 },
  { field: 'name', headerName: 'Name', width: 90 },
  {
    field: 'price',
    headerName: 'Price',
    width: 150,
    editable: true,
  },
  {
    field: 'discount',
    headerName: 'Discount',
    width: 150,
    editable: true,
  },
  {
    field: 'imageUrl',
    headerName: 'Image',
    // type: 'number',
    // width: 110,
    // editable: true,
  }
];


export default function ProductList({list}) {
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
        // checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
