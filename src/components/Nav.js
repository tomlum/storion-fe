import React, { Component } from "react"
import { Link } from "react-router-dom"
import auth0Client from "auth"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import { silentAuth } from "sagas/auth"
import { feedSpatch, connect } from "sagas/utils"
import { colors } from "styles"

const NavBody = styled.div`
	display: flex;
	border-bottom: solid 2px white;
`
const TitleBody = styled.div`
	display: flex;
`
const LeftSection = styled.div`
	flex: 1;
`
const RightSection = styled.div`
	flex: 1;
	text-align: right;
`
const Title = styled.h1`
	color: white;
	padding: 10px;
`
const NavButton = styled.div`
	display: flex;
	border: solid 2px white;
	border-bottom: 0px;
	margin-right: -1px;
	justify-content: center;
	flex-direction: column;
	justify-content: center;
	flex: 1;
	max-width: 200px;
	text-align: center;
	background-color: ${colors.lightBlue};
	height: ${({ selected }) => (selected ? "40px" : "30px")};
	margin-top: ${({ selected }) => (selected ? "0px" : "10px")};

	border-radius: 5px 5px 0px 0px;

	a {
		color: white;
		text-decoration: none;
	}
`

function NavTab(props) {
	return (
		<NavButton selected={props.path === props.route}>
			<Link to={props.path}>{props.name}</Link>
		</NavButton>
	)
}

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
		const route = this.props.history.location.pathname
		const user = this.props.user
		if (user) {
			return (
				<div>
					<TitleBody>
						<LeftSection>
							<Title>Storion</Title>
						</LeftSection>
						<RightSection>
							{user.null ? (
								<button onClick={auth0Client.signIn}>Sign In</button>
							) : (
								<button onClick={this.signOut}>Sign Out {user.name}</button>
							)}
						</RightSection>
					</TitleBody>
					<NavBody>
						<NavTab path="/river" name="River" route={route} />
						<NavTab path="/" name="Stories" route={route} />
						<NavTab path="/desk" name="Desk" route={route} />
					</NavBody>
				</div>
			)
		} else {
			return <div />
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
	)(Nav)
)
