import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ListItem } from '@mui/material';



const rows = [
  { id: 1, category: 'Snow' },
  { id: 2, category: 'Lannister' },
  { id: 3, category: 'Lannister' },
  { id: 4, category: 'Stark' },
  { id: 5, category: 'Targaryen' },
  { id: 6, category: 'Melisandre' },
  { id: 7, category: 'Clifford' },
  { id: 8, category: 'Frances' },
  { id: 9, category: 'Roxie' },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function Categories({allCategories}) {
  const navigate = useNavigate();
  const columns = [
    { field: 'id', headerName: 'ID', width: 230 },
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
