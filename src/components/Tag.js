import React, { PureComponent } from "react"
import styled from "styled-components"
import pt from "prop-types"
import { math } from "utils"

const height = 20
const thickness = 2

// position: relative;
// right: -11px;
// top: -11px;
// z-index: 10;

const Ellipsis = styled.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`
const TagBody = styled.div.attrs({
	className: "clickable"
})`
	display: flex;
	min-width: 10px;
	max-width: 150px;
	${({ flush }) => !flush && "margin: 5px;"};

	svg {
		min-width: 10px;
		width: 10px;
		height: ${height + thickness * 2}px;
	}
`

const TagText = styled.div`
	color: hsl(${({ hue }) => hue}, 100%, 80%);
	display: flex;
	align-items: center;
	height: ${height}px;
	overflow: hidden;
	padding-left: 5px;
	padding-right: 15px;

	border: solid ${thickness}px hsl(${({ hue }) => hue}, 100%, 80%);
	border-left: none;
	${({ flush }) => flush && "border-right: none;"};
`

export default class Tag extends PureComponent {
	static propTypes = {
		children: pt.node
	}

	getHue() {
		return math.mod(this.props.children.slice(-2).charCodeAt(0), 60)
	}

	render() {
		const hue = this.getHue()
		return (
			<TagBody flush={this.props.flush} {...this.props}>
				<svg>
					<polyline
						points={`
							10, ${height + thickness + 1}
							0, ${height + thickness + 1}
							10, ${height / 2}
							0,${thickness - 1}
							10,${thickness - 1}
							`}
						fill="none"
						stroke={`hsl(${hue}, 100%, 80%)`}
						strokeWidth={thickness}
					/>
				</svg>
				<TagText hue={hue} flush={this.props.flush}>
					<Ellipsis>{this.props.children}</Ellipsis>
				</TagText>
			</TagBody>
		)
	}
}
