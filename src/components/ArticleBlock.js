import React from "react"
import moment from "moment"
import styled from "styled-components"
import pt from "prop-types"
import Tag from "components/Tag"
import { colors } from "styles"

const Headline = styled.h2`
	color: #fff;
	margin: 0px;
	font-size: 20px;
	margin-bottom: 5px;
`
const Subtext = styled.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`
const ArticleBody = styled.div`
	border: solid 2px #8991d9;
	border-radius: 2px;
	padding: 10px;
	padding-right: 0px;
	margin-top: -1px;
	margin-bottom: -1px;
	font-family: Roboto;
`
const SubContent = styled.div`
	display: flex;
	justify-content: space-between;
	a {
		width: 100%;
		color: #bbb;
		text-decoration: none;
	}

	p {
		display: inline;
		color: #bbb;
		font-size: 13px;
	}

	i {
		display: inline;
		color: #bbb;
		font-size: 10px;
		margin-left: 5px;
	}
`
const Content = styled.div`
	flex-grow: 1;
	flex-shrink: 1;
	flex-basis: 100%;
	min-width: 0%;
	max-width: 100%;
`
const TagSpace = styled.div`
	flex-basis: 500px;
	flex-shrink: 5;
	min-width: 10px;
	max-width: 150px;
`
function trimURL(url) {
	if (url.startsWith("https://")) {
		url = url.slice(8)
	} else if (url.startsWith("http://")) {
		url = url.slice(7)
	}

	if (url.startsWith("www.")) {
		url = url.slice(4)
	}

	return url
}

export default function ArticleBlock({ article }) {
	return (
		<ArticleBody>
			<Headline>
				{article.headline}
				{article.headline}
			</Headline>
			<SubContent>
				<Content>
					<a
						style={{ width: "100%" }}
						href={article.link}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Subtext>
							<p>[ {moment(article.time).format("ll")} ]</p>
							<i>{trimURL(article.link)}</i>
						</Subtext>
					</a>
				</Content>
				<TagSpace>
					<Tag flush>I'M A TAG I'M A TAG I'M A TAG</Tag>
				</TagSpace>
			</SubContent>
		</ArticleBody>
	)
}

ArticleBlock.propTypes = {
	story: pt.object
}
