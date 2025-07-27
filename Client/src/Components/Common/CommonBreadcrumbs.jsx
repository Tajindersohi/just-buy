import React from "react";
import { Breadcrumbs, Typography, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const CommonBreadcrumbs = ({ items }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {items.map((item, index) =>
        item.to ? (
          <MuiLink
            key={index}
            underline="hover"
            component={RouterLink}
            to={item.to}
            color="inherit"
          >
            {item.label}
          </MuiLink>
        ) : (
          <Typography textTransform={'capitalize'} key={index} color="text.primary" >
            {item.label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};

export default CommonBreadcrumbs;
