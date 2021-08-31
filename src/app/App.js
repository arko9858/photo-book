import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SignIn from "../features/auth/SignIn";
// import SignUp from "../features/auth/SignUp";
import AlbumCollection from "../features/albumCollection/AlbumCollection";
import Album from "../features/album/Album";
import Layout from "../features/layout/Layout";

const Page404 = () => (
  <div style={{ textAlign: "center" }}>
    <h1>404 - Page not found</h1>
    <Link to="/">Return to home</Link>
  </div>
);

const AuthenticatedRoutes = () => (
  <Switch>
    <Route path="/" exact>
      <AlbumCollection />
    </Route>
    <Route path="/album/:albumId" exact>
      <Album />
    </Route>
    <Route path="*">
      <Page404 />
    </Route>
  </Switch>
);

const UnAuthenticatedRoutes = () => (
  <Switch>
    <Route path="/" exact>
      <SignIn />
    </Route>
    <Route path="*">
      <Redirect to="/" />
    </Route>
  </Switch>
);

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Layout>
      {isAuthenticated ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}
    </Layout>
  );
};

export default App;
