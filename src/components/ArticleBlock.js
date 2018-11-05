import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import pt from "prop-types"

const ArticleBody = styled.div`
	border: solid 1px cyan;
	padding: 5px;
`

export default function ArticleBlock({ article }) {
	return (
		<ArticleBody>
			<a href={article.link} target="_blank" rel="noopener">
				<h2>{article.headline}</h2>
			</a>
		</ArticleBody>
	)
}

ArticleBlock.propTypes = {
	story: pt.object
}
