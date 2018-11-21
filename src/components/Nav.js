import React, { Component } from "react"
import { Link } from "react-router-dom"
import auth0Client from "auth"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import { silentAuth } from "sagas/auth"
import { feedSpatch, connect } from "sagas/utils"

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
		const user = this.props.user
		return (
			<NavBody>
				{user && (
					<div>
						{user.null ? (
							<button onClick={auth0Client.signIn}>Sign In</button>
						) : (
							<button onClick={this.signOut}>Sign Out {user.name}</button>
						)}
						<Link to={`/`}>
							<button>Home</button>
						</Link>
						<Link to={`/desk`}>
							<button>Desk</button>
						</Link>
					</div>
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
