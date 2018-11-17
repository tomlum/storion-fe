import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import auth0 from "../Auth"
import axios from "axios"

class NewChain extends Component {
	constructor(props) {
		super(props)

		this.state = {
			// Public/Private
			// Title
			// Description
			// Finished
		}
	}

	async submit() {
		this.setState({
			disabled: true
		})

		await axios.post(
			"http://localhost:8081",
			{
				title: this.state.title,
				description: this.state.description
			},
			{
				headers: { Authorization: `Bearer ${auth0.getIdToken()}` }
			}
		)

		this.props.history.push("/")
	}

	render(){
		return(
			<div>
				<h1>
					New Chain
				</h1>
			</div>
		)
	}
}
