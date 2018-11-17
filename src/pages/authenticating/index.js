import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import auth0 from "../../auth"

class Authenticating extends Component {
	async componentDidMount() {
		await auth0.handleAuthentication()
		this.props.history.replace("/")
	}

	render() {
		return <p>Loading...</p>
	}
}

export default withRouter(Authenticating)
