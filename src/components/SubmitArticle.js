import React, { Component } from "react"
import * as Yup from "yup"
import styled from "styled-components"
import AnimateHeight from "react-animate-height"
import { Formik, Form, Field } from "formik"
import { postArticle } from "sagas/stories"
import { feedSpatch, connect } from "sagas/utils"
import Tag from "components/Tag"
import { colors } from "styles"

const SubmitBody = styled.div`
	box-sizing: border-box;
	border: solid 2px ${colors.rose};
	background-color: ${colors.lightPurple};
	width: 100%;
`
const FormBody = styled.div`
	box-sizing: content-box;
	padding: 8px;
`
const FormButton = styled.div.attrs({
	className: "clickable"
})`
	color: ${colors.mintGreen};
	border-bottom: solid 2px ${colors.rose};
	padding: 10px;
	display: flex;
	justify-content: center;
	margin-top: -2px;
	background-color: ${colors.lighterPurple};
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
	font-size: 15px;
`
const FormField = styled(Field).attrs({
	autoComplete: "off"
})`
	width: ${({ width }) => width + "px" || "300px"};
	${({ error }) =>
		error
			? `
		border: solid 2px ${colors.red};
		margin: -2px;
		marign-left: 8px;
	`
			: `
		border: none;
		margin: none;
		marign-left: 10px;
	`} border-radius: 2px;
	height: 20px;
	font-size: 15px;
`
const ErrorText = styled.p`
	color: red;
`
const SuggestTagText = styled.p`
	margin-left: 90px;
	font-size: 15px;
	color: #bbb;
`
const TagList = styled.div`
	display: flex;
	margin-left: 90px;
`
function ErrorMessage(props) {
	if (props.error) {
		return <ErrorText>props.error</ErrorText>
	} else {
		return null
	}
}

const articleSchema = Yup.object().shape({
	link: Yup.string().required("Link is required"),
	headline: Yup.string().required("Headline is required"),
	time: Yup.date().required("Time/Date is required"),
	tags: Yup.string()
})

class SubmitArticle extends Component {
	render() {
		return (
			<SubmitBody>
				<FormButton onClick={this.props.onClick}>+ New Article</FormButton>
				<AnimateHeight
					duration={300}
					easing="ease-in-out"
					height={this.props.open ? "auto" : "0"}
				>
					<FormBody>
						<Formik
							validationSchema={articleSchema}
							onSubmit={(values, actions) => {
								// this.props.postArticle(values)
								console.log(values)
							}}
						>
							{({ errors, status, touched, isSubmitting }) => (
								<Form>
									<FormRow>
										<FieldLabel>Link</FieldLabel>
										<FormField type="text" name="link" error={errors.link} />
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
											width="108"
											type="text"
											name="tags"
											placeholder="New Tag"
										/>
									</FormRow>
									{this.props.tagsAvailable &&
										(this.props.tagList.length <= 0 ? (
											<SuggestTagText>Add Tags Below</SuggestTagText>
										) : (
											<TagList>
												{this.props.tagList.map(tag => (
													<Tag onClick={() => this.props.toggleTag(tag)} key={tag}>{tag}</Tag>
												))}
											</TagList>
										))}
									<button type="submit">Submit</button>
								</Form>
							)}
						</Formik>
					</FormBody>
				</AnimateHeight>
			</SubmitBody>
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
