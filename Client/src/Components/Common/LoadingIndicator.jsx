import React, { createContext, useContext, useState, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";

const LoadingContext = createContext();

export default function LoadingIndicatorProvider({ children }) {
  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    type: "circular", // Default type
    progress: 0, // Default progress (for determinate)
  });

  const showLoading = useCallback(({ loading = false, type = "circular", progress = 0 }) => {
    setLoadingState({ isLoading: loading, type, progress });
  }, []);

  return (
    <LoadingContext.Provider value={{ showLoading }}>
      {children}
      {loadingState.isLoading && (
        <Box
          height="100vh"
          width="100%"
          display="flex"
          // justifyContent="center"
          alignItems="center"
          position="fixed"
          top={0}
          left={0}
          // bgcolor="rgba(255, 255, 255, 0.8)"
          zIndex={1300}
          flexDirection="column"
        >
          {loadingState.type === "circular" ? (
            <CircularProgress size="3rem" />
          ) : (
            <Box width="100%">
              <LinearProgress
                sx={{
                  backgroundColor: "rgb(120, 153, 125) !important",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "rgb(12, 131, 32) !important",
                  },
                }}
                variant="determinate"
                value={loadingState.progress}
              />
            </Box>
          )}
        </Box>
      )}
    </LoadingContext.Provider>
  );
}

// Custom hook to use LoadingContext
export const useLoading = () => {
  const context = useContext(LoadingContext);
  return context;
};
