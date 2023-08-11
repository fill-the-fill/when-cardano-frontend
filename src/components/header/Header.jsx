import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { colorDesign } from "../../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = colorDesign(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
