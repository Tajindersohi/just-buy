import React, { createContext, useContext, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import { useCallback } from 'react';

const LoadingContext = createContext();

export default function LoadingIndicatorProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = useCallback(({loading = false}) => {
    setIsLoading(loading);
  }, []);

  return (
    <LoadingContext.Provider showLoading={showLoading}>
      {children}
      {isLoading && (
        <Box
          height="100vh"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top={0}
          left={0}
          bgcolor="rgba(255, 255, 255, 0.8)" 
          zIndex={1300} 
        >
          <CircularProgress size="3rem" />
        </Box>
      )}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => {
  const context = useContext(LoadingContext);
  return context;
};
