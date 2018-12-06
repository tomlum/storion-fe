import React, { Component } from "react"
import { Route } from "react-router-dom"
import Nav from "../components/Nav"
// Pages
import Home from "./home"
import Story from "./story"
import Desk from "./desk"
import Authenticating from "./authenticating"

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Nav />
        <Route exact path="/story/:id" component={Story} />
        <Route exact path="/desk" component={Desk} />
        <Route exact path="/authenticating" component={Authenticating} />
        <Route exact path="/" component={Home} />
      </React.Fragment>
    )
  }
}

export default App
