import React, { Component } from "react"
import { Route, withRouter } from "react-router-dom"
import { feedSpatch, connect } from "sagas/utils"
import { silentAuth } from "sagas/auth"
import Nav from "../components/Nav"
import Loading from "../components/Loading"

// Pages
import About from "./about"
import Home from "./home"
import Story from "./story"
import Desk from "./desk"
import Authenticating from "./authenticating"

const Blank = <div />

class App extends Component {
  componentDidMount() {
    this.props.silentAuth()
  }

  render() {
    if (this.props.user) {
      if (!this.props.user.null) {
        return (
          <React.Fragment>
            <Nav />
            <Route exact path="/story/:id" component={Story} />
            <Route exact path="/about" component={About} />
            <Route exact path="/authenticating" component={Authenticating} />
            <Route exact path="/feed" component={Home} />
            <Route exact path="/stories" component={Home} />
            <Route exact path="/" component={Desk} />
          </React.Fragment>
        )
      } else {
        return (
          <React.Fragment>
            <Nav />
            <Route exact path="/about" component={About} />
            <Route exact path="/authenticating" component={Authenticating} />
            <Route path="/" component={About} />
          </React.Fragment>
        )
      }
    } else {
      return <Loading />
    }
  }
}

const storeToProps = ({ user }) => ({
  user
})

const actionsToProps = feedSpatch({
  silentAuth
})

export default withRouter(
  connect(
    storeToProps,
    actionsToProps
  )(App)
)
