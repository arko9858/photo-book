import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../auth/authSlice";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ExitToApp } from "@material-ui/icons";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signOut());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photo Book
          </Typography>
          {isAuthenticated && (
            <Button
              onClick={handleSignout}
              startIcon={<ExitToApp />}
              color="inherit"
            >
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
