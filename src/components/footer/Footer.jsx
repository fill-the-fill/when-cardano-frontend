import * as React from "react";
import { Typography, Box, useTheme, Container, Link } from "@mui/material";
import { colorDesign } from "../../theme";

export default function Footer() {
  const theme = useTheme();
  const colors = colorDesign(theme.palette.mode);
  return (
    <Box component="footer" backgroundColor={colors.primary[900]}>
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://cardanofoundation.org/">
            Cardano Foundation
          </Link>{" "}
          {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
}
