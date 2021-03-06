import React, { Component } from "react"
import * as Yup from "yup"
import styled from "styled-components"
import moment from "moment"
import AnimateHeight from "react-animate-height"
import { Formik, Form, Field } from "formik"
import { postArticle } from "sagas/stories"
import { feedSpatch, connect } from "sagas/utils"
import Tag from "components/Tag"
import { Space } from "components/Space"
import { colors } from "styles"
import { array, string } from "utils"

const PlusIcon = (
	<svg
		style={{
			width: "20px",
			height: "20px"
		}}
	>
		<circle cx="10" cy="10" r="9" stroke={colors.rose} strokeWidth={2} />
		<line x1="10" y1="4" x2="10" y2="16" stroke={colors.rose} strokeWidth={2} />
		<line x1="4" y1="10" x2="16" y2="10" stroke={colors.rose} strokeWidth={2} />
	</svg>
)

const Body = styled.div`
	box-sizing: border-box;
	border: solid 2px ${colors.rose};
	background-color: ${colors.lightPurple};
	width: 100%;
`
const TopRow = styled.div`
	display: flex;
	border-bottom: solid 5px ${colors.rose};
	background-color: ${colors.rose};
`
const FormBody = styled.div`
	box-sizing: content-box;
	padding: 8px;
	padding-top: 20px;
	padding-bottom: 20px;
	box-shadow: inset 0px 0px 13px 4px #222;
`
const Search = styled.input`
	flex: 1;
	border: solid 2px ${colors.purple};
	border-radius: 3px;
	background-color: white;
	box-sizing: border-box;
	height: 35px;
	font-size: 15px;
	padding: 5px 10px;
`
const ShowFormButton = styled.div.attrs({
	className: "clickable"
})`
	width: 150px;
	box-sizing: border-box;
	color: ${colors.mintGreen};
	border-radius: 3px;
	padding: 5px;
	display: flex;
	justify-content: center;
	height: 35px;
	background-color: ${colors.lightPurple};
`
const FormRow = styled.div`
	display: flex;
	align-items: center;
	padding-left: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
`
const FormFields = styled.div`
	max-width: 500px;
	margin: auto;
`
const FieldLabel = styled.p`
	color: white;
	min-width: 90px;
	font-size: 15px;
`
const FormField = styled(Field).attrs({
	autoComplete: "off",
	onKeyPress: props => e => {
		if (e.key === "Enter") {
			e.preventDefault()
			props.nextref.current.select()
		}
	}
})`
	width: ${({ width }) => (width ? width + "px" : "100%")};
	min-width: 0px;
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
	resize: none;
	padding: 5px;
	outline: none;
	font-family: Noto Serif TC;
`
const DateFields = styled.div`
	color: white;
`
const ErrorText = styled.p`
	margin-left: 90px;
	color: ${colors.red};
`
const SuggestTagText = styled.p`
	margin-left: 100px;
	font-size: 15px;
	height: 35px;
	color: #bbb;
`
const TagList = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-left: 95px;
`

const OptionalDivider = styled.div`
	flex: 1;
	height: 3px;
	margin-top: 20px;
	margin-bottom: 20px;
	background-color: #bbb;
	opacity: 0.5;
`

function fillDate(n, length) {
	n = n.toString()
	while (n.length < length) {
		n = "0" + n
	}
	return n
}

function formatDate(year, month, day) {
	return `${fillDate(year, 4)}-${fillDate(month, 2)}-${fillDate(day, 2)}`
}

const articleSchema = Yup.object().shape({
	link: Yup.string().required(),
	headline: Yup.string().required(),
	year: Yup.mixed(),
	month: Yup.mixed(),
	day: Yup.mixed(),
	time: Yup.mixed(),
	validDate: Yup.mixed().test(
		"is-valid-date",
		"Invalid date.  If unsure, leave blank.",
		function() {
			if (!this.parent.month && !this.parent.day && !this.parent.year) {
				return true
			} else if (!this.parent.month || !this.parent.day || !this.parent.year) {
				return false
			} else {
				return moment(
					formatDate(this.parent.year, this.parent.month, this.parent.day),
					"YYYY-MM-DD",
					true
				).isValid()
			}
		}
	),
	newTag: Yup.string()
})

const SubmitButtonRow = styled.div`
	text-align: right;
	button {
		margin-left: 15px;
	}
`

class CheckEditedArticle extends Component {
	componentDidUpdate(prevProps) {
		if (!prevProps.open && this.props.open) {
			this.props.setValues({
				link: "",
				headline: "",
				day: "",
				month: "",
				year: ""
			})
		}
		if (
			this.props.article &&
			((!prevProps.article && this.props.article) ||
				prevProps.article.id !== this.props.article.id)
		) {
			this.props.linkRef.current.selectionEnd = 0
			this.props.setValues({
				...this.props.values,
				link: this.props.article.link,
				headline: this.props.article.headline,
				day:
					this.props.article.time.isValid && this.props.article.time.isValid()
						? this.props.article.time.format("DD")
						: "",
				month:
					this.props.article.time.isValid && this.props.article.time.isValid()
						? this.props.article.time.format("MM")
						: "",
				year:
					this.props.article.time.isValid && this.props.article.time.isValid()
						? this.props.article.time.format("YYYY")
						: ""
			})
			this.props.linkRef.current.focus()
		}
	}

	render() {
		return null
	}
}

class SubmitArticle extends Component {
	constructor(props) {
		super(props)
		this.state = {
			newHeadlineHeight: 30,
			newTagList: []
		}
		this.ref = {
			link: React.createRef(),
			headline: React.createRef(),
			month: React.createRef(),
			day: React.createRef(),
			year: React.createRef(),
			newTag: React.createRef()
		}
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.open && this.props.open) {
			this.ref.link.current.select()
		}
	}

	// add error for including `
	AddNewTag = (values, setFieldValue) => {
		if (
			!this.state.newTagList.includes(values.newTag) &&
			values.newTag.length > 0
		) {
			setFieldValue("newTag", "")
			this.setState({
				newTagList: [...this.state.newTagList, values.newTag]
			})
		}
	}

	render() {
		return (
			<Body>
				<TopRow>
					<ShowFormButton onClick={this.props.onClick}>
						{this.props.editedArticle ? "Edit Article" : "+ New Article"}
					</ShowFormButton>
					<Space w="8" />
					<Search
						placeholder={"Search"}
						value={this.props.searchString}
						onChange={this.props.searchType}
					/>
				</TopRow>
				<AnimateHeight
					duration={300}
					easing="ease-in-out"
					height={this.props.open ? "auto" : "0"}
				>
					<FormBody>
						<Formik
							validateOnChange={false}
							validateOnBlur={false}
							initialValues={{
								link: "",
								headline: "",
								year: "",
								month: "",
								day: "",
								time: "",
								validDate: "",
								newTag: ""
							}}
							validationSchema={articleSchema}
							onSubmit={(values, actions) => {
								values.tags = [
									...this.props.tagList,
									...this.state.newTagList
								].sort(string.compare)
								values.time =
									!values.month && !values.day && !values.year
										? null
										: formatDate(values.year, values.month, values.day)
								if (this.props.editedArticle && this.props.editedArticle.id) {
									values.id = this.props.editedArticle.id
								}
								this.props.postArticle(values)
							}}
						>
							{({ values, errors, setValues, setFieldValue }) => (
								<Form>
									<FormFields>
										<FormRow>
											<CheckEditedArticle
												open={this.props.open}
												article={this.props.editedArticle}
												values={values}
												setValues={setValues}
												linkRef={this.ref.link}
											/>
											<FieldLabel>Link *</FieldLabel>
											<FormField
												innerRef={this.ref.link}
												type="text"
												name="link"
												error={errors.link}
												nextref={this.ref.headline}
											/>
										</FormRow>
										<FormRow>
											<FieldLabel>Headline *</FieldLabel>
											<FormField
												innerRef={this.ref.headline}
												component="textarea"
												onChange={e => {
													setFieldValue("headline", e.target.value)
													this.setState({
														newHeadlineHeight: e.target.scrollHeight
													})
												}}
												type="text"
												name="headline"
												maxLength="200"
												style={{
													height: this.state.newHeadlineHeight - 10 + "px"
												}}
												error={errors.headline}
												nextref={this.ref.month}
											/>
										</FormRow>
										<OptionalDivider />
										<FormRow>
											<FieldLabel>Date</FieldLabel>
											<DateFields>
												<FormField
													innerRef={this.ref.month}
													placeholder="MM"
													type="text"
													name="month"
													width="29"
													maxLength="2"
													onClick={() => {
														setFieldValue("month", "")
													}}
													onChange={e => {
														setFieldValue("month", e.target.value)
														if (e.target.value.length >= 2) {
															this.ref.day.current.select()
														}
													}}
													nextref={this.ref.day}
													style={{ textAlign: "center" }}
													error={errors.month}
												/>
												{` / `}
												<FormField
													innerRef={this.ref.day}
													placeholder="DD"
													type="text"
													name="day"
													width="29"
													maxLength="2"
													onClick={() => {
														setFieldValue("day", "")
													}}
													onChange={e => {
														setFieldValue("day", e.target.value)
														if (e.target.value.length >= 2) {
															this.ref.year.current.select()
														}
													}}
													nextref={this.ref.year}
													style={{ textAlign: "center" }}
													error={errors.day}
												/>
												{` / `}
												<FormField
													innerRef={this.ref.year}
													placeholder="YYYY"
													type="text"
													name="year"
													width="42"
													maxLength="4"
													onClick={() => {
														setFieldValue("year", "")
													}}
													nextref={this.ref.newTag}
													style={{ textAlign: "center" }}
													error={errors.year}
												/>
											</DateFields>
											<button
												type="button"
												style={{ marginLeft: "10px" }}
												onClick={() => {
													const today = new Date()
													setValues({
														...values,
														month: today.getMonth() + 1,
														day: today.getDate(),
														year: today.getFullYear()
													})
												}}
											>
												Today
											</button>
										</FormRow>
										{errors.validDate && (
											<ErrorText>{errors.validDate}</ErrorText>
										)}
										<FormRow>
											<FieldLabel>Tags</FieldLabel>
											<FormField
												innerRef={this.ref.newTag}
												width="148"
												type="text"
												name="newTag"
												placeholder="New Tag"
												onKeyPress={e => {
													if (e.key === "Enter") {
														e.preventDefault()
														this.AddNewTag(values, setFieldValue)
													}
												}}
											/>
											<Space w="8" />
											{values.newTag &&
												values.newTag.length > 0 && (
													<div
														className="clickable"
														onClick={() => {
															this.AddNewTag(values, setFieldValue)
														}}
													>
														{PlusIcon}
													</div>
												)}
										</FormRow>
										{this.props.tagList.length <= 0 &&
										this.state.newTagList.length <= 0 ? (
											this.props.tagsAvailable && (
												<SuggestTagText>Add Tags Below</SuggestTagText>
											)
										) : (
											<TagList>
												{this.state.newTagList.map(tag => (
													<Tag
														onClick={() => {
															array.remove(this.state.newTagList, tag)
															this.setState({
																newTagList: this.state.newTagList
															})
														}}
														key={tag}
													>
														{tag}
													</Tag>
												))}
												{this.props.tagList.map(tag => (
													<Tag
														onClick={() => {
															this.props.toggleTag(tag)
														}}
														key={tag}
													>
														{tag}
													</Tag>
												))}
											</TagList>
										)}

										<SubmitButtonRow>
											{this.props.editedArticle && (
												<button type="button" onClick={this.props.onClick}>
													Cancel Edit
												</button>
											)}
											<button type="submit">
												{this.props.editedArticle
													? "Save Edit"
													: "Save To Desk"}
											</button>
										</SubmitButtonRow>
									</FormFields>
								</Form>
							)}
						</Formik>
					</FormBody>
				</AnimateHeight>
			</Body>
		)
	}
}

const actionsToProps = feedSpatch(
	{
		postArticle
	},
	{
		setStore: v => ({ desk: v })
	}
)

export default connect(
	null,
	actionsToProps
)(SubmitArticle)
