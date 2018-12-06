import React, { Component } from "react"
import styled from "styled-components"
import AnimateHeight from "react-animate-height"
import { Formik, Form, Field } from "formik"
import { postArticle } from "sagas/stories"
import { feedSpatch, connect } from "sagas/utils"
import Tag from "components/Tag"
import { colors } from "styles"

const FormBody = styled.div`
	box-sizing: content-box;
	padding: 8px;
`
const FormButton = styled.div.attrs({
	className: "clickable"
})`
	color: ${colors.mintGreen};
	padding: 10px;
	display: flex;
	justify-content: center;
	background-color: ${colors.lightBlue};
	border: solid 2px white;
`
const FormRow = styled.div`
	display: flex;
	align-items: center;
	padding-left: 10px;
	margin-bottom: 8px;
`
const FieldLabel = styled.p`
	color: white;
	width: 80px;
`
const FormField = styled(Field).attrs({
	autoComplete: "off"
})`
	width: ${({ width }) => width + "px" || "300px"};
	height: 20px;
	margin-left: 10px;
	font-size: 17px;
`

class SubmitArticle extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false
		}
	}

	toggleOpen = () => {
		this.setState({ open: !this.state.open })
	}

	componentDidMount() {}

	render() {
		return (
			<div>
				<FormButton onClick={this.toggleOpen}>Add Article +</FormButton>
				<AnimateHeight
					duration={200}
					easing="ease-in-out"
					height={this.state.open ? "auto" : "0"}
				>
					<FormBody>
						<Formik
							initialValues={{}}
							onSubmit={(values, actions) => {
								console.log(values)
							}}
							render={({ errors, status, touched, isSubmitting }) => (
								<Form>
									<FormRow>
										<FieldLabel>Link</FieldLabel>
										<FormField type="text" name="link" />
									</FormRow>
									<FormRow>
										<FieldLabel>Headline</FieldLabel>
										<FormField type="text" name="headline" />
									</FormRow>
									<FormRow>
										<FieldLabel>Time</FieldLabel>
										<FormField type="text" name="time" />
									</FormRow>
									<FormRow>
										<FieldLabel>Tags</FieldLabel>
										<FormField
											width="100"
											type="text"
											name="tags"
											placeholder="New Tag"
										/>
										<Tag>Bla!</Tag>
									</FormRow>
									<button>Submit</button>
								</Form>
							)}
						/>
					</FormBody>
				</AnimateHeight>
			</div>
		)
	}
}

const actionsToProps = feedSpatch({
	postArticle
})

export default connect(
	null,
	actionsToProps
)(SubmitArticle)
