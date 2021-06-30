import React from "react";
import { useSelector } from "react-redux";

const Layout = (props) => {
  const authenticated = useSelector((state) => state.auth.authenticated);

  return (
    <div>
      <header>
        <p>authenticated: {authenticated.toString()}</p>
      </header>
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
