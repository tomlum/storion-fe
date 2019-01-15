import React from "react"
import styled from "styled-components"
import { MiniTag } from "components/Tag"
import { string } from "utils"

const Headline = styled.h2`
	flex-grow: 1;
	flex-shrink: 1;
	color: #fff;
	margin: 0px;
	font-size: 17px;
	margin-bottom: 5px;
`
const HeadlineRow = styled.div`
	display: flex;
`
const Ellipsis = styled.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-size: 10px;
`
const Edit = styled.div.attrs({
	className: "edit clickable"
})`
	color: #bbb;
`
const ArticleBody = styled.div`
	border: solid 2px #8991d9;
	border-radius: 2px;
	padding: 10px;
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
		margin-right: 5px;
	}

	i {
		display: inline;
		color: #bbb;
		font-size: 10px;
	}
`
const SubText = styled.div`
	flex-basis: 100%;
	min-width: 0%;
	max-width: 100%;
`
const TagSpace = styled.div`
	flex-basis: 500px;
	flex-shrink: 5;
	flex-wrap: wrap;
	max-height: 35px;
	min-width: 20px;
	max-width: 150px;
	justify-content: flex-end;
	display: flex;
	margin-top: -10px;
	overflow: hidden;
`

const Anchor = styled.a.attrs({
	target: "_blank",
	rel: "noopener noreferrer"
})`
	width: 100%;
	text-decoration: none;
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

// <Edit onClick={onEdit}>Edit</Edit>
export default function ArticleBlock({ article, onEdit }) {
	return (
		<ArticleBody>
			<HeadlineRow>
				<Anchor href={article.link}>
					<Headline>
						{article.headline}
					</Headline>
				</Anchor>
				<TagSpace>
					{Object.keys(article.tags)
						.sort(string.compare)
						.map(tag => (
							<MiniTag key={tag}>{tag}</MiniTag>
						))}
				</TagSpace>
			</HeadlineRow>
			<SubContent>
				<SubText>
					<Anchor href={article.link}>
						<Ellipsis>
							{article.time.isValid() && <p>[ {article.time.format("ll")} ]</p>}
							<i>{trimURL(article.link)}</i>
						</Ellipsis>
					</Anchor>
				</SubText>
				<Edit onClick={onEdit}>Edit</Edit>
			</SubContent>
		</ArticleBody>
	)
}
