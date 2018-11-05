import React, { Component } from "react"
import { Route } from "react-router-dom"
import Home from "./pages/home"
import Story from "./pages/Story"


class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/story/:id" component={Story} />
        <Route exact path="/" component={Home} />
      </div>
    )
  }
}

export default App
