import React from "react";
import { Box, Typography, Card, CardMedia, CardContent, Grid } from "@mui/material";

const TrendingSections = ({ data }) => {
  return (
    <Box>
      {data.map((section, index) => (
        <Box key={index} mb={4}>
          <Grid container spacing={1}>
            {section.items.map((item, idx) => (
              <Grid item xs={6} sm={4} md={12} key={idx}>
                <Card sx={{ borderRadius: 2, cursor: "pointer", boxShadow: 1 }}>
                  <CardMedia
                    component="img"
                    height="250"
                    sx={{objectFit:'fill'}}
                    image={'/images/home-just-buy.jpg'}
                    alt={item.name}
                  />
                  {/* <CardContent>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </CardContent> */}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default TrendingSections;
