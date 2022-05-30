import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {
  Grid,
  Paper,
  Box,
  Button,
  CircularProgress,
  Tabs,
  Tab,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  userInfo,
  processLogin,
  logout,
  fetchClientConfigSettings,
  fetchClientConfig,
} from "~/redux/actions/user";
import {
  keepSessionLive,
  checkSessionTimout,
  checkLoggedIn,
} from "~/redux/helpers/user";
import Header from "~/components/Header";
import LandingPage from "~/views/LandingPage";
import Payments from "~/views/Payments";
import PaymentPreference from "~/views/PaymentPreference";
import Redeem from "~/views/Redeem";
import Footer from "~/components/Footer";
import FAQs from "~/views/FAQs";
import Contact from "~/views/Contact";
import Support from "~/views/Support";
import { ErrorPage } from "~/views/Error/error";
import IdleTimer from "react-idle-timer";
import Thankyou from "~/views/Thankyou";
import "./App.scss";
import "./themes.scss";
import "typeface-roboto";
import Bankers from "./views/Bankers";
import Unauthorized from "./views/Unauthorized";
import SessionTimedOut from "./views/SessionTimedOut";
import Cookies from "universal-cookie";
//import { withRouter } from 'react-router'

const cookies = new Cookies(window.document.cookie);
const getQueryVar = (key) => {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) === key) {
      return decodeURIComponent(pair[1]);
    }
  }
};

const AuthRoute = ({
  info: info,
  component: Component,
  isLoggedIn,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? (
        <Box display="flex" justifyContent="center">
          <Grid item md={11} className="container">
            <Header {...props} info={info} isLoggedIn />
            <Box pt={cookies.get("client") !== "hd" ? 15 : 10 } style={{ minHeight: "76vh" }}>
              <Component {...props} />
            </Box>
            <Footer {...props} isLoggedIn />
          </Grid>
        </Box>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: 1000 * 5 * 12 * 10,
      isTimedOut: false,
      isLoading: true,
      metadata: { title: "Elan Financial Services | Banker Portal" },
      logout: false,
    };
    this.idleTimer = null;
    this.onAction = this._onAction.bind(this);
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.pingSession);
    clearInterval(this.pingKeepSessionLive);
  }

  componentDidMount() {
    //const { client } = props.user.info;
    var browserTitle = "";

    if (cookies.get("client") === "bmw") {
      browserTitle = "BMW Group Financial Services | Banker Portal";
    } else if (cookies.get("client") === "acg") {
      browserTitle = "ACG Card Services | Banker Portal";
    } else if (cookies.get("client") === "hd") {
      browserTitle = "Harley-Davidson Registration";
    } else {
      browserTitle = "Elan Financial Services | Banker Portal";
    }

    this.props.dispatch(userInfo()).then(() => {
      this.setState({
        isLoading: false,
        metadata: { title: browserTitle },
      });
      this.getClientConfig();

      this.props.dispatch(fetchClientConfigSettings()).then(() => {
        console.log("FETCH_BANKER_CONFIG_DATA", this.props);
        const { Value } = this.props.clientConfig.data;
        let body = document.body;
        body.classList.add(Value);
      });
    });

    //This will run in every 5 minutues to check token is valid or not
    this.pingSession = setInterval(() => {
      console.log("ping ");
      try {
        const checkSession = checkSessionTimout().then((response) => {
          console.log("check ping response", response);
          if (!response) {
            console.log("logout ping");
            this.props.history.push("/sessionOut");
            this.props.dispatch(logout());
          }
        });
      } catch (ex) {
        console.log("Exception ping");
        this.props.history.push("/sessionOut");
        this.props.dispatch(logout());
      }
    }, 270000);

    //This will update token in every 10 minutues case user is not idle, If user id idle then logout
    this.pingKeepSessionLive = setInterval(() => {
      console.log("keepSessionLive ");
      //If user idle for 10 minutues logout
      if (this.idleTimer && this.idleTimer.isIdle()) {
        console.log("keepSessionLive logout");
        this.props.history.push("/sessionOut");
        this.props.dispatch(logout());
      } else {
        try {
          const updatedSession = keepSessionLive().then((response) => {
            console.log("keepSessionLive response", response);
            if (!response) {
              console.log("logout keepSessionLive");
              this.props.history.push("/sessionOut");
              this.props.dispatch(logout());
            }
          });
        } catch (ex) {
          console.log("Exception keepSessionLive");
          this.props.history.push("/sessionOut");
          this.props.dispatch(logout());
        }
      }
    }, 600000);
  }

  getClientConfig = async () => {
    await this.props.dispatch(fetchClientConfig());
  };

  _onAction(e) {
    console.log("On action");
    //console.log('last active time', Date(this.idleTimer.getLastActiveTime()));
    //console.log('time remaining', this.idleTimer.getRemainingTime()/60000);
    //console.log('time elapsed', this.idleTimer.getElapsedTime()/60000);
    // console.log('id idle', this.idleTimer.isIdle());

    checkLoggedIn().then((response) => {
      console.log("use logged in", response);

      if ((!response || this.state.logout) && this.props.user.isLoggedIn) {
        this.setState({ logout: true });
        this.props.history.push("/sessionOut");
        this.props.dispatch(logout());
        return false;
      }

      this.setState({ logout: false });
    });
  }

  _onActive(e) {
    console.log("On active");
  }

  _onIdle(e) {
    console.log("On idle");
    this.setState({ logout: true });
    //this.props.history.push("/sessionOut");
    //this.props.dispatch(logout());
  }

  render() {
    const { isLoggedIn } = this.props.user;
    const { isLoading, metadata, logout } = this.state;
    const faviconUrl = cookies.get("client") && require(`~/assets/images/${cookies.get("client")}/favicon.png`) || "";
    //console.log("isLoggedIn ", isLoggedIn)
    if (isLoading) {
      return null;
    }
    return (
      <div className={""}>
        <BrowserRouter>
          <React.Fragment>
            <Helmet>
              
              {
                cookies.get("client") === "bmw" && <title>BMW Group Financial Services | Banker Portal</title>
              }
              {
                cookies.get("client") === "acg" && <title>ACG Card Services | Banker Portal</title>
              }
              {
                cookies.get("client") === "hd" && <title>Harley-Davidson Registration</title>
              }
              {
                cookies.get("client") === "elan" && <title>Elan Financial Services | Banker Portal</title>
              }
              
              {/* <title>{metadata.title}</title> */}
              <meta name="title" content={metadata.title} />
              <meta name="description" content={metadata.description} />
              <meta name="keywords" content={metadata.keywords} />
              <link rel="shortcut icon" type="image/png" href={faviconUrl} />
            </Helmet>
            <IdleTimer
              ref={(ref) => {
                this.idleTimer = ref;
              }}
              element={document}
              onActive={this.onActive}
              onIdle={this.onIdle}
              onAction={this.onAction}
              debounce={250}
              timeout={this.state.timeout}
            />
            <Switch>
              <Route exact path="/error" component={ErrorPage} />
              <Route
                exact
                path="/"
                component={(props) => {
                  //console.log(this)
                  if (isLoggedIn && cookies.get("client") == "hd") {
                    return <Redirect to="/manage-account" />;
                  }
                  // {
                  // 	isLoggedIn && cookies.get("client") !== "HD" ? <Redirect to='/redeem' /> : <Redirect to='/manage-account' />
                  // }
                  const searchString = props.location.search.substring(1);
                  const queryVars = searchString.split("&");
                  const status = getQueryVar("status");
                  console.log("accessToken => ", getQueryVar("accessToken"));
                  if (status === "success") {
                    this.props.dispatch(
                      processLogin({
                        accessToken: getQueryVar("accessToken"),
                        refreshToken: getQueryVar("refreshToken"),
                        portbu: getQueryVar("portbu"),
                        oeid: getQueryVar("oeid"),
                        am: getQueryVar("am"),
                        client: getQueryVar("client").toLowerCase(),
                        // client: getQueryVar("client") && getQueryVar("client").toLowerCase() === "bmw" ? "bmw" : "elan",
                        //portbu: 990006,
                        //oeid: 25006,
                      })
                    );
                    if (cookies.get("client") == "hd") {
                      return <Redirect to="/manage-account" />;
                    }
                    return <Redirect to="/redeem" />;
                  } else {
                    if (logout) {
                      console.log("session out");
                      return <Redirect to="/sessionOut" />;
                    } else {
                      console.log("unauthorized");
                      return <Unauthorized />;
                    }
                  }
                }}
              />
              <AuthRoute
                info={this.props.user.info.userInfo}
                isLoggedIn={isLoggedIn}
                exact
                path="/redeem"
                component={Redeem}
              />
              <AuthRoute
                info={this.props.user.info.userInfo}
                isLoggedIn={isLoggedIn}
                exact
                path="/payments"
                component={Payments}
              />
              <AuthRoute
                info={this.props.user.info.userInfo}
                isLoggedIn={isLoggedIn}
                exact
                path="/manage-account"
                component={PaymentPreference}
              />
              <AuthRoute
                info={this.props.user.info.userInfo}
                isLoggedIn={isLoggedIn}
                exact
                path="/faq"
                component={FAQs}
              />
              <AuthRoute
                info={this.props.user.info.userInfo}
                isLoggedIn={isLoggedIn}
                exact
                path="/contact"
                component={Contact}
              />
              <AuthRoute
                info={this.props.user.info.userInfo}
                isLoggedIn={isLoggedIn}
                path="/support"
                component={Support}
              />
              <AuthRoute
                info={this.props.user.info.userInfo}
                isLoggedIn={isLoggedIn}
                path="/bankers"
                component={Bankers}
              />
              <Route
                path="/sessionOut"
                render={(props) => (
                  <Box display="flex" justifyContent="center">
                    <Grid item md={11} className="container">
                      {/* <Header info={this.props.user.info.userInfo} {...props} isLoggedIn={false} /> */}
                      <Box pt={15} style={{ minHeight: "76vh" }}>
                        <SessionTimedOut {...props} />
                      </Box>
                      {/* <Footer {...props} isLoggedIn={false} /> */}
                    </Grid>
                  </Box>
                )}
              />
              <Route
                exact
                path="/logout"
                render={(props) => (
                  <Box display="flex" justifyContent="center">
                    <Grid item md={11} className="container">
                      <Header
                        info={this.props.user.info.userInfo}
                        {...props}
                        isLoggedIn={false}
                      />
                      <Box pt={15} style={{ minHeight: "76vh" }}>
                        <Thankyou {...props} />
                      </Box>
                      <Footer {...props} isLoggedIn={false} />
                    </Grid>
                  </Box>
                )}
              />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect((state) => ({ ...state.user, ...state.clientConfig }))(
  App
);
