import React, { useState } from 'react';
import { Box, Typography, Button, Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        setError('Only JPEG, JPG, and PNG files are allowed.');
        setOpenSnackbar(true);
        setSelectedImage(null);
        return;
      }

      setError('');
      setOpenSnackbar(false);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
      {!selectedImage && 
      <>
        <input
          accept="image/jpeg, image/jpg, image/png"
          type="file"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button variant="outlined" color='secondary' component="span" size='small'>
            Choose Image
          </Button>
        </label>
      </>}
      {selectedImage && (
        <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
          <img
            src={selectedImage}
            alt="Preview"
            style={{
              width: '70px',
              height: '70px',
              borderRadius:"50%", 
              objectFit: 'cover',
              border: '1px solid #ccc',
            }}
          />
            <IconButton onClick={handleRemoveImage} >
              <CloseIcon/>
            </IconButton>
        </Box>
      )}

      {error && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default ImageUploader;
