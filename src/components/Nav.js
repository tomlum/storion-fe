import React, { Component } from "react"
import { Link } from "react-router-dom"
import auth0Client from "auth"
import { withRouter } from "react-router-dom"
import OutsideClickHandler from "react-outside-click-handler"
import styled from "styled-components"
import { connect } from "sagas/utils"
import { colors } from "styles"
import { Space } from "components/Space"

const HeaderBody = styled.div`
	background-color: ${colors.purple};
`
const BlankNavBody = styled.div`
	border-bottom: solid 6px ${colors.rose};
`
const NavBody = styled.div`
	display: flex;
	height: 40px;
	align-items: flex-end;
	border-bottom: solid 6px ${colors.rose};
`
const TitleBody = styled.div`
	display: flex;
	align-items: center;
	padding-bottom: 10px;
`
const Logo = styled.img`
	height: 35px;
	padding: 10px;
	padding-bottom: 0px;
	margin-right: 0px;
`
const LeftSection = styled.div`
	flex: 1;
	display: flex;
`
const RightSection = styled.div`
	flex: 1;
	text-align: right;
	button {
		margin-top: 16px;
	}
`
const NavButton = styled.div`
	display: flex;
	border-bottom: 0px;
	margin-right: -1px;
	border: solid 1px ${colors.rose};
	border-bottom: solid ${({ selected }) => (selected ? "4px" : "0px")}
		${colors.rose};
	justify-content: center;
	flex-direction: column;
	justify-content: center;
	flex: 1;
	max-width: 150px;
	text-align: center;
	height: 30px;
	transition: border-bottom 0.1s ease-in-out;

	a {
		color: ${colors.rose};
		text-decoration: none;
	}
`

const TopTab = styled.h2.attrs({
	className: "clickable"
})`
	padding-top: 22px;
	font-size: 17px;
	padding-left: 5px;
	color: ${colors.rose};
`

const ContactGrowBody = styled.div`
	position: absolute;
	height: ${({ open }) => (open ? "70px" : "0px")};
	padding-top: 5px;
	transition: height 0.3s ease-in-out;
	overflow: hidden;
`
const ContactBody = styled.div`
	height: 100%;
	box-sizing: border-box;
	border: solid 1px ${colors.rose};
	background-color: ${colors.purple};
`
const ContactLink = styled.a.attrs({
	className: "clickable",
	target: "_blank",
	rel: "noopener noreferrer"
})`
	display: flex;
	align-items: center;
	box-sizing: border-box;
	height: 35px;
	padding: 4px 8px;
	border-bottom: solid 1px ${colors.rose};
	font-size: 17px;

	img {
		height: 15px;
		width: 15px;
		margin-right: 5px;
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
	state = {
		contactOpen: false
	}

	signOut = () => {
		auth0Client.signOut()
	}

	render() {
		const route = this.props.history.location.pathname
		const Contact = (
			<OutsideClickHandler
				onOutsideClick={() => {
					this.setState({ contactOpen: false })
				}}
			>
				<div
					onClick={() => {
						this.setState({ contactOpen: !this.state.contactOpen })
					}}
				>
					Contact
				</div>
				<ContactGrowBody open={this.state.contactOpen}>
					<ContactBody>
						<ContactLink href="mailto:TomLumPerson@gmail.com">
							<img src={`${process.env.PUBLIC_URL}/storionMail.png`} alt="" />
							Email
						</ContactLink>
						<ContactLink href="https://twitter.com/tomlumperson">
							<img src={`${process.env.PUBLIC_URL}/storionTwitter.png`} alt="" />
							Twitter
						</ContactLink>
					</ContactBody>
				</ContactGrowBody>
			</OutsideClickHandler>
		)
		if (this.props.user) {
			if (this.props.user.null) {
				return (
					<HeaderBody>
						<TitleBody>
							<LeftSection>
								<Link to={"/"}>
									<Logo src={`${process.env.PUBLIC_URL}/smallLogo.png`} />
								</Link>
								<TopTab>{Contact}</TopTab>
							</LeftSection>
							<RightSection>
								<button onClick={auth0Client.signIn}>Log In</button>
							</RightSection>
						</TitleBody>
						<BlankNavBody />
					</HeaderBody>
				)
			} else {
				return (
					<HeaderBody>
						<TitleBody>
							<LeftSection>
								<Link to={"/"}>
									<Logo src={`${process.env.PUBLIC_URL}/smallLogo.png`} />
								</Link>
								<TopTab>
									<Link to={"/about"} className="clickable">
										About
									</Link>
								</TopTab>
								<Space w={10}/>
								<TopTab>{Contact}</TopTab>
							</LeftSection>
							<RightSection>
								<button onClick={this.signOut}>Sign Out</button>
							</RightSection>
						</TitleBody>
						<NavBody>
							<NavTab path="/feed" name="Feed" route={route} />
							<NavTab path="/stories" name="Stories" route={route} />
							<NavTab path="/" name="Desk" route={route} />
						</NavBody>
					</HeaderBody>
				)
			}
		} else {
			return <div />
		}
	}
}

const storeToProps = ({ user }) => ({
	user
})

export default withRouter(
	connect(
		storeToProps,
		null
	)(Nav)
)
