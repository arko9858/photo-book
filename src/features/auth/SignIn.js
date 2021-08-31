import React from "react";
import { Container, Box, Stack, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
// import { signInWithGoogleToken } from "./authSlice";
import { signInWithGoogleToken, signInWithLocal } from "./authSlice";
import SignInForm from "../../common/SignInForm/SignInForm";
import GoogleButton from "../../common/GoogleLoginButton/GoogleLoginButton";
import LoadingBackdrop from "../../common/LoadingBackdrop/LoadingBackdrop";

const SignIn = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const onFormSubmit = (username, password) => {
    dispatch(signInWithLocal({ username, password }));
  };

  const googleOnSuccess = async (res) => {
    const token = res.tokenId;
    dispatch(signInWithGoogleToken(token));
  };

  const googleOnFailure = async (res) => {
    // console.log(res);
    console.log("Google signin failed");
  };
  return (
    <Container
      maxWidth="xs"
      sx={{ display: "flex", justifyContent: "center", mt: 8 }}
    >
      <Stack spacing={2}>
        <SignInForm onFormSubmit={onFormSubmit} />
        <Typography align="center" color="GrayText">
          or
        </Typography>
        <Typography align="center" variant="h5" color="GrayText">
          Sign In
        </Typography>
        <Box>
          <GoogleButton
            googleOnSuccess={googleOnSuccess}
            googleOnFailure={googleOnFailure}
          />
        </Box>
      </Stack>
      <LoadingBackdrop open={loading} />
    </Container>
  );
};

export default SignIn;
