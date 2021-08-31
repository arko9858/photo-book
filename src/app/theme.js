import { blue,amber } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";

const lightTheme = createTheme({
  palette: {
    primary: { main: blue["700"] },
    secondary: { main: amber["400"] },
    background: {
      default: "#fafafa"
    },
  },
});

export default lightTheme;
