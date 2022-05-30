import React, { Component } from "react";
import { Box, withStyles } from "@material-ui/core";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

const cookies = new Cookies(window.document.cookie);
const styles = (theme) => ({
  link: {
    color: "#676767",
    fontSize: "11px",
    "&:last-child": {
      paddingLeft: "25px",
    },
  },
  copyRight: {
    color: "#676767",
    fontSize: "11px",
  },
  img: {
    paddingLeft: "5px",
  },
  hdFooter: {
      fontSize: '10px',
      textAlign: 'center',
      lineHeight: '18px',
  }
});

class FooterNav extends Component {
  render() {
    const { classes, isLoggedIn } = this.props;
    console.log("footer login", isLoggedIn);
    return (
      <>
        {cookies.get("client") !== "hd" ? (
          <Box display="flex">
            <Box flexGrow={1}>
              {isLoggedIn && (
                <Link to="/faq" className={classes.link}>
                  {" "}
                  FAQ
                </Link>
              )}
              {isLoggedIn && (
                <Link to="/contact" className={classes.link}>
                  {" "}
                  {cookies.get("client") !== "acg" ? "CONTACT" : null}
                </Link>
              )}
            </Box>
            <Box className={classes.copyRight}>
              {cookies.get("client") == "acg" && 
              <Box display="flex" alignItems="center">
                {" "}
                ©2022 ACG Card Services{" "}
                <img
                  src={require("~/assets/images/incedo-logo.jpg")}
                  className={classes.img}
                  alt=""
                />
                </Box> }
                {cookies.get("client") == "bmw" && 
                <Box display="flex" alignItems="center">
                  {" "}
                  ©2022 BMW Group Financial Services Powered by{" "}
                  <img
                    src={require("~/assets/images/incedo-logo.jpg")}
                    className={classes.img}
                    alt=""
                  />         
              </Box>
              }
              {cookies.get("client") == "elan" && 
                <Box display="flex" alignItems="center">
                  {" "}
                  ©2022 ELAN Financial Services Powered by{" "}
                  <img
                    src={require("~/assets/images/incedo-logo.jpg")}
                    className={classes.img}
                    alt=""
                  />         
              </Box>
              }
            </Box>
          </Box>
        ) : 
        <div className={classes.hdFooter}>
            <p>This Harley-Davidson® Visa® card is issued by U.S Bank National Association pursuant to a license from Visa U.S.A. Inc.<br/>

©H-D 2019. All rights reserved. Harley-Davidson, H-D, Harley and the Bar and Shield are among the trademarks to H-D U.S.A., LLC.<br/>

This site is supported by Google Chrome, Firefox, or Internet Explorer version 7 and above. If you are using and unsupported browser, this site may not display properly.
</p>
        </div>
        }
      </>
    );
  }
}

export default withStyles(styles)(FooterNav);
