import React from "react";
import GoogleLogin from "react-google-login";
import { Button } from "@material-ui/core";
import GoogleIcon from "./GoogleIcon";

const CustomButton = (renderProps) => {
  return (
    <Button
      onClick={renderProps.onClick}
      disabled={renderProps.disabled}
      startIcon={<GoogleIcon />}
      variant="contained"
      sx={{
        py: "10px",
        fontSize: "1rem",
        width: "100%",
        bgcolor: "background.paper",
        color: "text.secondary",
        textDecoration: "none",
        textTransform: "none",
        ":hover": {
          bgcolor: "background.paper",
        },
      }}
    >
      Sign in With Google
    </Button>
  );
};

const GoogleLoginButton = ({ googleOnSuccess, googleOnFailure }) => {
  const clientId =
    "238120709707-h2vakpon9li8gtm2hge63sfm7b5n1rl3.apps.googleusercontent.com";

  return (
    <GoogleLogin
      clientId={clientId}
      render={(renderProps) => <CustomButton {...renderProps} />}
      buttonText="Login"
      onSuccess={googleOnSuccess}
      onFailure={googleOnFailure}
      cookiePolicy={"single_host_origin"}
      isSignedIn={false}
    />
  );
};

export default GoogleLoginButton;
