import React, { useState } from "react";
import {
  Paper,
  Avatar,
  Typography,
  Box,
  TextField,
  // FormControlLabel,
  // Checkbox,
  Button,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import Link from "../Link/Link";

const SignInForm = ({ onFormSubmit }) => {
  // username
  const [username, setUsername] = useState("");

  const usernameOnChange = (e) => {
    setUsername(e.target.value);
  };

  // password
  const [password, setPassword] = useState("");

  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  // // remember me
  // const [rememberMe, setRememberMe] = useState(false);
  // const rememberMeOnChange = (e) => {
  //   setRememberMe(e.target.checked);
  // };

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(username, password);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        pt: 2,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          value={username}
          onChange={usernameOnChange}
          autoComplete="username"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={passwordOnChange}
          autoComplete="current-password"
        />
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={rememberMeOnChange}
              value="remember"
              color="primary"
            />
          }
          label="Remember me"
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Link to="/signup" variant="body2">
          {"Don't have an account? Sign Up"}
        </Link>
      </Box>
    </Paper>
  );
};

export default SignInForm;
