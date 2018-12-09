import React, { PureComponent } from "react"
import styled from "styled-components"
import pt from "prop-types"
import { math } from "utils"

const height = 20
const lineThickness = 2

// position: relative;
// right: -11px;
// top: -11px;
// z-index: 10;

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
	margin-bottom: ${({ thickness, flush }) => (flush? 0 : 10)-thickness}px;

	svg {
		min-width: 10px;
		width: 10px;
		${({ thickness }) => `
			height: ${height + thickness * 2}px;
			margin-top: ${-thickness}px;
		`}
	}

`

const TagText = styled.div`
	color: hsl(${({ hue }) => hue}, 100%, 80%);
	display: flex;
	align-items: center;
	height: ${height}px;
	overflow: hidden;

	font-size: 13px;

	${({ hue, thickness }) =>
		`
		margin-top: ${-thickness}px;
		margin-left: ${-thickness/2}px;
		padding-left: ${5+thickness/2}px;
		padding-right: ${15-thickness/2}px;
		margin-right: ${-thickness/2}px;
		border: solid ${thickness}px hsl(${hue}, 100%, 80%);`} border-left: none;
	${({ flush }) => flush && "border-right: none;"};
`

export default class Tag extends PureComponent {
	static propTypes = {
		children: pt.node
	}

	getHue() {
		return (math.mod(this.props.children.slice(0).toLowerCase().charCodeAt(0), 30)/30)*(1000)
	}

	render() {
		const hue = this.getHue()
		const thickness = lineThickness + (this.props.active ? 3 : 0)
		return (
			<TagBody flush={this.props.flush} {...this.props} thickness={thickness}>
				<svg>
					<polyline
						points={`
							10, ${height + thickness*1.5}
							${thickness/2}, ${height + thickness*1.5}
							${10-thickness/2}, ${height / 2 + thickness}
							${thickness/2}, ${thickness/2}
							10, ${thickness/2}
							`}
						fill="none"
						stroke={`hsl(${hue}, 100%, 80%)`}
						strokeWidth={thickness}
					/>
				</svg>
				<TagText hue={hue} flush={this.props.flush} thickness={thickness}>
					<Ellipsis>{this.props.children}</Ellipsis>
				</TagText>
			</TagBody>
		)
	}
}
