import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, ThemeProvider, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import dataGridTheme from '../../../Components/Common/dataGridTheme';
import appTheme from '../../../Assets/Theme';
import CommonModal from '../../../Components/Common/CommonModal';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useState } from 'react';
import DeleteModal from '../../../Components/Common/DeleteModal';

export default function ProductList({ list }) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:900px)');
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const handleClose = (e) => {
    setOpenDelete(false);
  };

  const deleteCategory = () => {

  };

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
      field: 'action',
      headerName: 'Action',
      renderCell: (params) => (
      <>
        <IconButton component={Link} to={`/products/${params.row.id}`}>
          <VisibilityIcon  color='primary' fontSize={isMobile ? 'small' : 'medium'} sx={{color:appTheme.colors.primary}}/>
        </IconButton>
        <IconButton onClick={() => handleDelete(params.row._id)}> 
          <DeleteIcon color='error' fontSize={isMobile ? 'small' : 'medium'} />
        </IconButton>
      </>
      ),
      flex: 1,
      minWidth: 100,
    }
  ].filter(Boolean); 

  return (
    <Box sx={{ height: isMobile ? 300 : isTablet ? 350 : 400, width: '100%' }}>
      <ThemeProvider theme={dataGridTheme}>
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
      </ThemeProvider>
      <DeleteModal open={openDelete} handleClose={handleClose} handleSubmit={handleDelete}>
          <Box mt={2} textAlign="center">
          Are you sure you want to delete this subcategory along with all its associated products
          </Box>
      </DeleteModal>
    </Box>
  );
}
