import { createMuiTheme } from '@material-ui/core/styles';
import amber from "@material-ui/core/colors/amber";
import lightGreen from "@material-ui/core/colors/lightGreen";

export default createMuiTheme({
  palette: {
    primary: {
      light: "#ffd149",
      main: amber[700],
      dark: "#c67100",
    },
    secondary: {
      light: "#aee571",
      main: lightGreen[600],
      dark: "#4b830d",
    },
  },
  typography: {
    useNextVariants: true,
  },
});
