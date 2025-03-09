import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ProductList({ list }) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:900px)');

  const columns = [
    !isMobile && { field: 'id', headerName: 'Id', flex: 1, minWidth: 100 },
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
      minWidth: 120,
    },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    {
      field: 'products',
      headerName: 'Products',
      renderCell: (params) => (
        <IconButton component={Link} to={`/products/${params.row.id}`}>
          <VisibilityIcon fontSize={isMobile ? 'small' : 'medium'} />
        </IconButton>
      ),
      flex: 1,
      minWidth: 100,
    },
  ].filter(Boolean); 

  return (
    <Box sx={{ height: isMobile ? 300 : isTablet ? 350 : 400, width: '100%' }}>
      <DataGrid
        rows={list}
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
