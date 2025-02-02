import React, { Component } from "react";
import "./app.scss";
import { Content } from "carbon-components-react";
import TutorialHeader from "./components/TutorialHeader";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./content/LandingPage";
import RepoPage from "./content/RepoPage";
import Page from "./pages/Development";

class App extends Component {
  render() {
    return (
      <>
        <TutorialHeader />
        <Content>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/repos" component={RepoPage} />
            <Route path="/development" component={Page} />
          </Switch>
        </Content>
      </>
    );
  }
}

export default App;
