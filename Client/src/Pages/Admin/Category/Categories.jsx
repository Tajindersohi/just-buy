import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ListItem } from '@mui/material';

const paginationModel = { page: 0, pageSize: 5 };

export default function Categories({allCategories}) {
  const navigate = useNavigate();
  const columns = [
    { field: 'id', headerName: 'ID', width: 230 },
    {
      field: 'imageUrl',
      headerName: 'Icon',
      width: 330,
      renderCell: (params) => (
        <>
        <img
        src={params.row.imageUrl}
        alt="Preview"
        style={{
          width: '40px',
          height: '40px',
          borderRadius:"50%", 
          objectFit: 'cover',
          border: '1px solid #ccc',
        }}
      />
        </>
      ),
    },
    { field: 'category', headerName: 'Name', width: 330 },
    {
      field: 'products',
      headerName: 'Products',
      width: 330,
      renderCell: (params) => (
        <IconButton onClick={()=> openCategory(params.id)}> 
              <VisibilityIcon />
        </IconButton>
      ),
    },
  ];
  const openCategory = (id) => {
    navigate(`:${id}`);
    // console.log("ididid",id)
  }
  console.log("allCategories",allCategories.Categories);
  return (
    // <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={allCategories.categories}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    // </Paper>
  );
}
