import React, { useRef, useEffect } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Divider,
  Avatar,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import './style.scss';
const SearchBar = ({
  value,
  onChange,
  onFocus,
  onFocusRemove,
  suggestions = [],
  onSuggestionClick,
  showSuggestions = false,
  placeholder = "Search for products or categories...",
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onFocusRemove?.(); // only if provided
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onFocusRemove]);

  return (
    <Box position="relative" className="search-bar" ref={wrapperRef}>
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        variant="outlined"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: "999px",
            backgroundColor: isDark ? "#1e293b" : "#f8fafc",
            px: 1.5,
            '& fieldset': {
              borderColor: isDark ? "#334155" : "#d1d5db",
            },
            '&:hover fieldset': {
              borderColor: isDark ? "#475569" : "#9ca3af",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: isDark ? "#cbd5e1" : "#64748b" }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Suggestion Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
            mt: 1,
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
          }}
        >
          <List dense>
            {suggestions.slice(0, 5).map((item, index) => (
              <React.Fragment key={item._id}>
                <ListItem
                  button
                  onClick={() => onSuggestionClick(item)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: 2,
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: isDark ? "#334155" : "#f1f5f9",
                    },
                  }}
                >
                  <Avatar
                    src={item.imageUrl}
                    alt={item.name}
                    variant="rounded"
                    sx={{ width: 44, height: 44, mr: 2 }}
                  />
                  <Box>
                    <Typography fontWeight={600} fontSize={14}>
                      {item.name}
                    </Typography>
                    <Typography fontSize={12} color="text.secondary">
                      {item.type === 'category' ? 'Category' : 'Product'}
                    </Typography>
                  </Box>
                </ListItem>
                {index < suggestions.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;
