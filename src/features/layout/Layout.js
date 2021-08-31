import React, { Fragment } from "react";
import Header from "./Header/Header";
import { Box, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import lightTheme from "../../app/theme";

const Layout = (props) => {
  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={lightTheme}>
        <Box sx={{ bgcolor: "background.default" }}>
          <Header />
          <Box sx={{ minHeight: "100vh" }}>
            <main>{props.children}</main>
          </Box>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
};

export default Layout;
