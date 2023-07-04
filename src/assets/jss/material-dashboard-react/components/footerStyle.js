import {
  defaultFont,
  container,
  primaryColor,
  grayColor,
} from "../../material-dashboard-react.js";

const footerStyle = {
  block: {
    color: "inherit",
    padding: "10px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
    ...defaultFont,
    fontWeight: "500",
    fontSize: "12px",
  },
  left: {
    float: "left!important",
    display: "block",
  },
  right: {
    padding: "10px 0",
    margin: "0",
    fontSize: "14px",
    float: "right!important",
  },
  footer: {
    bottom: "0",
    borderTop: "1px solid " + grayColor[11],
    padding: "0 0",
    ...defaultFont,
  },
  container,
  a: {
    color: "#BE332B",
    textDecoration: "none",
    backgroundColor: "transparent",
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0",
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto",
  },
  whatsIcon:{
    display: "inline-block",
    width: "35px",
  },
};
export default footerStyle;
