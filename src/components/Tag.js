import React, { PureComponent } from "react"
import styled from "styled-components"
import pt from "prop-types"
import { color } from "utils"

const height = 20
const lineThickness = 2

const Ellipsis = styled.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-family: Roboto;
`
const TagBody = styled.div.attrs({
	className: "clickable"
})`
	display: flex;
	min-width: 10px;
	max-width: 150px;
	${({ flush }) => !flush && "margin: 5px;"};
	margin-bottom: ${({ thickness, flush }) => (flush ? 0 : 10) - thickness}px;
	${props =>
		props.articleActive && "opacity: 0.4;"} transition: opacity .1s ease-in-out;
	svg {
		min-width: 10px;
		width: 10px;
		${({ thickness }) => `
			height: ${height + thickness * 2}px;
			margin-top: ${-thickness}px;
		`};
	}

	animation-duration: 0.2s;
	animation-name: appear;
	@keyframes appear {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`

const TagText = styled.div`
	color: hsl(${({ hue }) => hue}, 100%, 80%);
	display: flex;
	justify-content: flex-end;
	flex-grow: 1;
	align-items: center;
	height: ${height}px;
	overflow: hidden;

	font-size: 13px;

	${({ hue, thickness }) =>
		`
		margin-top: ${-thickness}px;
		margin-left: ${-thickness / 2}px;
		padding-left: ${5 + thickness / 2}px;
		padding-right: ${15 - thickness / 2}px;
		margin-right: ${-thickness / 2}px;
		border: solid ${thickness}px hsl(${hue}, 100%, 80%);`} border-left: none;
	${({ flush }) => flush && "border-right: none;"};
`

export default class Tag extends PureComponent {
	static propTypes = {
		children: pt.node
	}

	constructor(props) {
		super(props)
		this.hue = color.charToHue(this.props.children)
	}

	render() {
		let thickness = lineThickness + (this.props.active ? 3 : 0)
		if (this.props.articleActive) {
			thickness = lineThickness - 1
		}
		return (
			<TagBody flush={this.props.flush} {...this.props} thickness={thickness}>
				<svg>
					<polyline
						points={`
							10, ${height + thickness * 1.5}
							${thickness / 2}, ${height + thickness * 1.5}
							${10 - thickness / 2}, ${height / 2 + thickness}
							${thickness / 2}, ${thickness / 2}
							10, ${thickness / 2}
							`}
						fill="none"
						stroke={`hsl(${this.hue}, 100%, 80%)`}
						strokeWidth={thickness}
					/>
				</svg>
				<TagText hue={this.hue} flush={this.props.flush} thickness={thickness}>
					<Ellipsis>{this.props.children}</Ellipsis>
				</TagText>
			</TagBody>
		)
	}
}

const Letter = styled.div`
	width: 20px;
	height: 25px;
	color: hsl(${({ hue }) => hue}, 100%, 80%);
	border: solid 2px hsl(${({ hue }) => hue}, 100%, 80%);
	border-top: none;
	border-bottom: none;
	text-align: center;
	box-sizing: border-box;
`
const MiniTagBody = styled.div.attrs({
	className: "clickable"
})`
	margin-left: 5px;
	svg {
		width: 20px;
		height: 20px;
	}
`

export class MiniTag extends PureComponent {
	constructor(props) {
		super(props)
		this.hue = color.charToHue(this.props.children)
	}

	render() {
		return (
			<MiniTagBody title={this.props.children}>
				<Letter hue={this.hue}>{this.props.children[0]}</Letter>
				<svg>
					<polyline
						points={
							`
							${lineThickness / 2}, 0
							${lineThickness / 2}, ${height/2}
							10, ${0}
							${20 - lineThickness / 2}, ${height/2}
							${20 - lineThickness / 2}, 0
							`
						}
						fill="none"
						stroke={`hsl(${this.hue}, 100%, 80%)`}
						strokeWidth={lineThickness}
					/>
				</svg>
			</MiniTagBody>
		)
	}
}
