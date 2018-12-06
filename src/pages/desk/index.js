import React, { Component } from "react"
import AnimateHeight from "react-animate-height"
import pt from "prop-types"
import styled from "styled-components"
import ArticleBlock from "../../components/ArticleBlock"
import { fetchDeskArticles } from "../../sagas/stories"
import { feedSpatch, connect } from "../../sagas/utils"
import SubmitArticle from "components/SubmitArticle"
import Tag from "components/Tag"

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border: solid 2px #fff;
  overflow: hidden;
  padding: 5px;
`
const OpenTagListButton = styled.div.attrs({
  className: "clickable"
})`
  color: #000;
  background-color: white;
  text-align: center;
  height: 20px;
`

class Desk extends Component {
  static propTypes = {
    articles: pt.array,
    match: pt.object
  }

  state = {
    tagsOpen: false,
    filteredTags: []
  }

  componentDidMount() {
    this.props.fetchDeskArticles(this.props.match.params.id)
  }

  toggleOpenTagList = () => {
    this.setState({ tagsOpen: !this.state.tagsOpen })
  }

  toggleFilter = tag => {
    if(this.state.filteredTags[tag]){
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
    console.log(this.state.filteredTags)
    let articleArray = []
    let noFilters = Object.keys(this.state.filteredTags) < 1
    if (this.props.articles) {
      articleArray = this.props.articles.map(article => {
        if (
          noFilters ||
          this.relevantArticle(article)
        ) {
          return <ArticleBlock key={article.id} article={article} />
        } else {
          return null
        }
      })
    }

    return (
      <div>
        <SubmitArticle />
        <AnimateHeight
          duration={200}
          easing="ease-in-out"
          height={this.state.tagsOpen ? "auto" : 55}
        >
          <TagList open={this.state.tagsOpen}>
            {this.props.tags &&
              Object.keys(this.props.tags).map(tag => (
                <Tag
                  key = {tag}
                  active={this.usedTag(tag)}
                  onClick={() => this.toggleFilter(tag)}
                >
                  {tag}
                </Tag>
              ))}
          </TagList>
        </AnimateHeight>
        <OpenTagListButton onClick={this.toggleOpenTagList}>
          {this.state.tagsOpen ? "^" : "\\/"}
        </OpenTagListButton>
        {articleArray}
      </div>
    )
  }
}

const storeToProps = ({ desk: { articles, tags } }) => ({
  articles,
  tags
})

const actionsToProps = feedSpatch({ fetchDeskArticles })

export default connect(
  storeToProps,
  actionsToProps
)(Desk)
