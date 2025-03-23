import React from 'react'
import CommonModal from './CommonModal'
import { Box } from '@mui/material'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import appTheme from '../../Assets/Theme';

const DeleteModal = ({open,handleClose,handleDelete,isLoading, children }) => {
  return (
    <CommonModal open={open} handleClose={handleClose} handleSubmit={handleDelete} header="Confirm Delete" buttonTitle="Delete" isDeleteModel={true} startIcon ={<DeleteIcon/>} loading={isLoading}>
        <Box my={2}>
            <Box display="flex" justifyContent="center">
            <WarningRoundedIcon sx={{ fontSize: 100,color:appTheme.colors.danger}} />
            </Box>
            {children}
        </Box>
  </CommonModal>
  )
}

export default DeleteModal
