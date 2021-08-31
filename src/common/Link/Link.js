import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";

const LinkComponent = (props) => {
  return (
    <Link component={RouterLink} {...props}>
      {props.children}
    </Link>
  );
};

export default LinkComponent;
