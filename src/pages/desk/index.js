import React, { Component } from "react"
import AnimateHeight from "react-animate-height"
import { Formik, Form, Field } from "formik"
import pt from "prop-types"
import styled from "styled-components"
import { colors } from "styles"
import ArticleBlock from "../../components/ArticleBlock"
import { fetchDeskArticles } from "../../sagas/stories"
import { feedSpatch, connect } from "../../sagas/utils"
import SubmitArticle from "components/SubmitArticle"
import Tag from "components/Tag"

const arrowUp = (
  <svg
    style={{
      width: "20px",
      height: "10px"
    }}
  >
    <polyline
      points={`
                0, 0
                20, 0
                10, 10
              `}
      fill={colors.rose}
      strokeWidth={1}
    />
  </svg>
)
const arrowDown = (
  <svg
    style={{
      width: "20px",
      height: "10px"
    }}
  >
    <polyline
      points={`
                0, 10
                20, 10
                10, 0
              `}
      fill={colors.rose}
      strokeWidth={1}
    />
  </svg>
)

const Options = styled.div`
  display: flex;
  margin-bottom: 20px;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
`
const Row = styled.div`
  display: flex;
`
const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border: solid 2px ${colors.rose};
  overflow: hidden;
  padding: 5px;
  border-bottom: 0px;
  background-color: ${colors.lightPurple};
`
const SearchContainer = styled.div`
  flex: 1;
  background-color: ${colors.rose};
  border: solid 2px ${colors.rose};
`
const Search = styled.input`
  border: solid 2px ${colors.pink};
  border-radius: 3px;
  background-color: white;
  box-sizing: border-box;
  height: 30px;
  width: 100%;
  font-size: 15px;
  padding: 5px 10px;
`
const OpenTagListButton = styled.div.attrs({
  className: "clickable"
})`
  color: ${colors.rose};
  background-color: ${colors.pink};
  border: solid 2px ${colors.rose};
  border-radius: 0 0 3px 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
`

const NoResults = styled.h1`
  font-size: 20px;
  color: white;
  width: 100%;
  text-align: center;
`

class Desk extends Component {
  static propTypes = {
    articles: pt.array,
    match: pt.object
  }

  state = {
    searchString: "",
    tagsOpen: false,
    filteredTags: []
  }

  componentDidMount() {
    this.props.fetchDeskArticles(this.props.match.params.id)
  }

  searchType = e => {
    this.setState({ searchString: e.target.value })
  }

  toggleOpenTagList = () => {
    this.setState({ tagsOpen: !this.state.tagsOpen })
  }

  toggleFilter = tag => {
    if (this.state.filteredTags[tag]) {
      delete this.state.filteredTags[tag]
    } else {
      this.state.filteredTags[tag] = true
    }
    this.setState({ filteredTags: this.state.filteredTags })
  }

  relevantArticle = article => {
    let keys = Object.keys(this.state.filteredTags)
    for (let i = 0; i < keys.length; i++) {
      if (!article.tags[keys[i]]) {
        return false
      }
    }
    return true
  }

  usedTag = tag => {
    return this.state.filteredTags[tag]
  }

  render() {
    let originalLength = this.props.articles.length
    let articleArray = this.props.articles
    let noFilters = Object.keys(this.state.filteredTags) < 1
    if (articleArray) {
      if (!noFilters) {
        articleArray = articleArray.filter(
          article => noFilters || this.relevantArticle(article)
        )
      }
      if (this.state.searchString.length > 0) {
        articleArray = articleArray.filter(article =>
          article.headline.toLowerCase().includes(this.state.searchString)
        )
      }
      if (articleArray.length === 0 && articleArray.lenght !== originalLength) {
        articleArray = "no results"
      }
    }

    return (
      <div>
        <Options>
          <Column>
            <Row>
              <SubmitArticle />
            </Row>
            
              <SearchContainer>
                <Search
                  placeholder="Search"
                  value={this.state.searchString}
                  onChange={this.searchType}
                />
              </SearchContainer>
            <AnimateHeight
              duration={200}
              easing="ease-in-out"
              height={this.state.tagsOpen ? "auto" : 53}
            >
              <TagList open={this.state.tagsOpen}>
                {this.props.tags &&
                  this.props.tagList.map(tag => (
                    <Tag
                      key={tag}
                      active={this.usedTag(tag)}
                      onClick={() => this.toggleFilter(tag)}
                    >
                      {tag}
                    </Tag>
                  ))}
              </TagList>
            </AnimateHeight>
            <OpenTagListButton onClick={this.toggleOpenTagList}>
              {this.state.tagsOpen ? arrowDown : arrowUp}
            </OpenTagListButton>
          </Column>
        </Options>

        {articleArray === "no results" ? (
          <NoResults>No articles found with those search conditions</NoResults>
        ) : (
          articleArray.map(article => (
            <ArticleBlock key={article.id} article={article} />
          ))
        )}
      </div>
    )
  }
}

const storeToProps = ({ desk: { articles, tags, tagList } }) => ({
  articles,
  tags,
  tagList
})

const actionsToProps = feedSpatch({ fetchDeskArticles })

export default connect(
  storeToProps,
  actionsToProps
)(Desk)
