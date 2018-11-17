import React, { Component } from "react"
import { connect } from "react-redux"
import auth0Client from "../auth"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import { silentAuth } from "../sagas/auth"
import { feedSpatch } from "../sagas/utils"

const NavBody = styled.div``

class Nav extends Component {
	static propTypes = {}

	componentDidMount() {
		if (this.props.location.pathname !== "/authenticating") {
			this.props.silentAuth()
		}
	}

	signOut = () => {
		auth0Client.signOut()
		this.props.history.replace("/")
	}

	render() {
		const profile = this.props.user
		console.log("profile > ", profile)
		return (
			<NavBody>
				{profile ? (
					<button onClick={this.signOut}>
						Sign Out {auth0Client.getProfile().name}
					</button>
				) : (
					<button onClick={auth0Client.signIn}>Sign In</button>
				)}
			</NavBody>
		)
	}
}

const storeToProps = ({ user }) => ({
	user
})

const actionsToProps = feedSpatch({
	silentAuth
})

export default connect(
	storeToProps,
	actionsToProps
)(withRouter(Nav))
