import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Grid, Grid2, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  // width:'100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  border: '5px solid #0c831f30',
  borderRadius:'10px', 
};


export default function CommonModal({open, handleClose, children, handleSubmit, header = "", buttonTitle="Submit"}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box width={'100%'}>
              <Box position="relative" display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h5"><b>{header}</b></Typography>
                {/* <IconButton 
                  onClick={handleClose} 
                  sx={{ position: 'absolute', right: 0 }}
                >
                  <CloseIcon />
                </IconButton> */}
              </Box>


            <Box my={4}>
                  {children}
            </Box>
            <Box display={'flex'} justifyContent={'center'} gap={4} mt={2} >
                <Button variant='contained' color='error' onClick={handleClose}>Close</Button>
                <Button variant='contained'onClick={handleSubmit}>{buttonTitle}</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}