import React, { Component } from "react"
import styled from "styled-components"
import { withRouter } from "react-router-dom"
import { feedSpatch, connect } from "sagas/utils"
import { silentAuth } from "sagas/auth"
import Loading from "components/Loading"
import auth0 from "../../auth"

class Authenticating extends Component {
	async componentDidMount() {
		await auth0.handleAuthentication()
		await this.props.silentAuth()
		this.props.history.replace("/")
	}

	render() {
		return (
				<Loading />
		)
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
  )(Authenticating)
)
