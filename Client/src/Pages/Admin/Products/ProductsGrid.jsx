import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useMediaQuery } from '@mui/material';

export default function ProductsGrid({ list = [] }) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:900px)');

  const columns = [
    !isMobile && {
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
      flex: 1,
      minWidth: 150,
    },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'discount',
      headerName: 'Discount',
      flex: 1,
      minWidth: 120,
    },
  ].filter(Boolean);

  const rows = list.map((item) => ({
    ...item,
    id: item._id, // Ensure `id` exists for DataGrid
  }));

  return (
    <Box sx={{ height: isMobile ? 300 : isTablet ? 350 : 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: isMobile ? 3 : isTablet ? 4 : 5,
            },
          },
        }}
        pageSizeOptions={isMobile ? [3, 5] : [5, 10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
