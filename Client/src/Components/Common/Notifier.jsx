import React, { createContext, useContext, useState, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import { Alert } from '@mui/material';

const NotifierContext = createContext();

export const NotifierProvider = ({ children }) => {
  const [notifier, setNotifier] = useState({
    open: false,
    message: '',
    type: 'success',
    duration: 2000,
    dir: 'left',
    isClosable: true
  });

  const showNotifier = useCallback(({ type = 'success', msg, dir = 'left' , isClosable = true, duration = 2000 }) => {
    setNotifier({ open: true, message: msg, type, duration, dir: dir, isClosable: isClosable });
  }, []);

  const handleClose = () => {
    setNotifier((prev) => ({ ...prev, open: false }));
  };

  return (
    <NotifierContext.Provider value={{ showNotifier }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: notifier.dir }}
        open={notifier.open}
        onClose={handleClose}
        TransitionComponent={Fade}
        autoHideDuration={notifier.duration}
      >
        <Alert
          onClose= { notifier.isClosable ? handleClose : notifier.isClosable}
          severity={notifier.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notifier.message}
        </Alert>
      </Snackbar>
    </NotifierContext.Provider>
  );
};

export const useNotifier = () => {
  return useContext(NotifierContext);
};
