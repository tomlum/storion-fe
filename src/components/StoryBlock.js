import React from "react"
import { Link as RRDLink } from "react-router-dom"
import styled from "styled-components"
import pt from "prop-types"
import { colors } from "styles"

const StoryBody = styled.div`
	border: solid 1px ${colors.rose};
	padding: 5px 10px;
`

const StoryText = styled.div.attrs({
	className: "clickable",
})`
	color: ${colors.rose};
`

const Link = styled(RRDLink).attrs({
	className: "clickable",
	target: "_blank",
	rel: "noopener noreferrer"
})`
	text-decoration: none;
`

const StorySlider = styled.div`
	border: solid 1px ${colors.rose};
	margin: 5px;
	display: flex;
`

export default function StoryBlock({ story }) {
	return (
		<StoryBody>
			<Link to={`/story/${story.id}`}>
				<StoryText>
					<h2>{story.title}</h2>
					<p>{story.description}</p>
				</StoryText>
			</Link>
			<StorySlider>

			</StorySlider>
		</StoryBody>
	)
}

StoryBlock.propTypes = {
	story: pt.object
}
