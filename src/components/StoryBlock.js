import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import pt from "prop-types"

const StoryBody = styled.div`
	border: solid 1px cyan;
	padding: 5px;
`

export default function StoryBlock({ story }) {
	return (
		<Link to={`/story/${story.id}`}>
			<StoryBody>
				<h2>{story.title}</h2>
				<p>{story.description}</p>
			</StoryBody>
		</Link>
	)
}

StoryBlock.propTypes = {
	story: pt.object
}
