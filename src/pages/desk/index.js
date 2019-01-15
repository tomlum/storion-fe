import React, { Component } from "react"
import AnimateHeight from "react-animate-height"
import pt from "prop-types"
import styled from "styled-components"
import { colors } from "styles"
import ArticleBlock from "../../components/ArticleBlock"
import { fetchDeskArticles } from "../../sagas/stories"
import { feedSpatch, connect } from "../../sagas/utils"
import SubmitArticle from "components/SubmitArticle"
import Tag from "components/Tag"
import Loading from "components/Loading"
import {arrowUp, arrowDown} from "icons"

const noResults = "no results"

const Options = styled.div`
  display: flex;
  margin-bottom: 20px;
  border: solid 3px ${colors.rose};
  border-top: none;
  border-radius: 0 0 7px 7px;
`
const Col = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`
const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-evenly;
  border: solid 2px ${colors.rose};
  overflow: hidden;
  padding: 5px;
  border-bottom: 0px;
  min-height: 53px;
  background-color: ${colors.lightPurple};
  box-shadow: inset 0px 0px 13px 4px #222;
`
const OpenTagListButton = styled.div.attrs({
  className: "clickable"
})`
  color: ${colors.rose};
  background-color: ${colors.lightPurple};
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

function articleCompare(a, b) {
  return b.createdTime - a.createdTime
}

class Desk extends Component {
  static propTypes = {
    articles: pt.array,
    match: pt.object
  }

  componentDidMount() {
    if (!this.props.articles) {
      this.props.fetchDeskArticles(this.props.match.params.id)
    }
  }

  toggleOpenTagList = () => {
    this.props.setStore({ tagsOpen: !this.props.desk.tagsOpen })
  }

  toggleOpenNewArticle = () => {
    if(this.props.desk.editedArticle){
      this.props.setStore({editedArticle: null})
    }
      this.props.setStore({
        newArticleOpen: !this.props.desk.newArticleOpen,
        newArticleTags: this.props.desk.newArticleOpen ? [] : this.props.desk.newArticleTags
      })
  }

  toggleTag = tag => {
    if (!this.props.desk.newArticleOpen) {
      if (tag === "") {
        if (this.props.desk.filteredTags[""]) {
          this.props.desk.filteredTags = {}
        } else {
          this.props.desk.filteredTags = { "": true }
        }
      } else {
        if (this.props.desk.filteredTags[tag]) {
          delete this.props.desk.filteredTags[tag]
        } else {
          this.props.desk.filteredTags[tag] = true
        }
        // Clear the No Tags tag
        if (this.props.desk.filteredTags[""]) {
          delete this.props.desk.filteredTags[""]
        }
      }
      this.props.setStore({ filteredTags: this.props.desk.filteredTags })
    } else {
      if (tag === "") {
        this.props.setStore({ newArticleTags: {} })
      } else {
        if (this.props.desk.newArticleTags[tag]) {
          delete this.props.desk.newArticleTags[tag]
        } else {
          this.props.desk.newArticleTags[tag] = true
        }
        this.props.setStore({ newArticleTags: this.props.desk.newArticleTags })
      }
    }
  }

  relevantArticle = article => {
    if (this.props.desk.filteredTags[""]) {
      return article.tags[""]
    }
    let keys = Object.keys(this.props.desk.filteredTags)
    for (let i = 0; i < keys.length; i++) {
      if (!article.tags[keys[i]]) {
        return false
      }
    }
    return true
  }

  usedTag = tag => {
    return this.props.desk.filteredTags[tag]
  }
  newArticleUsedTag = tag => {
    return this.props.desk.newArticleTags[tag]
  }

  editArticle = article => {
    this.props.setStore({
      editedArticle: article,
      newArticleOpen: true
    })
  }

  cancelEdit = () => {
    this.props.setStore({
      editedArticle: null
    })
  }

  render() {
    let articleArray = this.props.articles
    if (articleArray) {
      let noArticles = articleArray.length === 0
      articleArray.sort(articleCompare)
      let noFilters = Object.values(this.props.desk.filteredTags) < 1
      if (!noFilters) {
        articleArray = articleArray.filter(
          article => noFilters || this.relevantArticle(article)
        )
      }
      if (this.props.searchString.length > 0) {
        articleArray = articleArray.filter(article =>
          article.headline.toLowerCase().includes(this.props.searchString)
        )
      }
      if (!noArticles && articleArray.length === 0) {
        articleArray = noResults
      }

      if (this.props.tagList) {
        return (
          <div>
            <Options>
              <Col>
                <SubmitArticle
                  searchString={this.props.searchString}
                  searchType={this.props.searchType}
                  editedArticle={this.props.desk.editedArticle}
                  open={this.props.desk.newArticleOpen || noArticles}
                  onClick={this.toggleOpenNewArticle}
                  tagList={Object.keys(this.props.desk.newArticleTags).sort()}
                  tagsAvailable={Object.keys(this.props.tagList).length > 0}
                  toggleTag={this.toggleTag}
                />
                {this.props.tagList.length > 0 && (
                  <React.Fragment>
                    <AnimateHeight
                      duration={200}
                      easing="ease-in-out"
                      height={this.props.desk.tagsOpen ? "auto" : 53}
                    >
                      <TagList open={this.props.desk.tagsOpen}>
                        <Tag
                          key={""}
                          active={this.usedTag("")}
                          articleActive={this.newArticleUsedTag("")}
                          onClick={() => this.toggleTag("")}
                        >
                          No Tags
                        </Tag>
                        {this.props.tags &&
                          this.props.tagList.map(tag => (
                            <Tag
                              key={tag}
                              active={this.usedTag(tag)}
                              articleActive={this.newArticleUsedTag(tag)}
                              onClick={() => this.toggleTag(tag)}
                            >
                              {tag}
                            </Tag>
                          ))}
                      </TagList>
                    </AnimateHeight>
                    <OpenTagListButton onClick={this.toggleOpenTagList}>
                      {this.props.desk.tagsOpen ? arrowUp : arrowDown}
                    </OpenTagListButton>
                  </React.Fragment>
                )}
              </Col>
            </Options>

            {articleArray === noResults ? (
              <NoResults>
                No articles found with those search conditions
              </NoResults>
            ) : (
              articleArray.map(article => (
                <ArticleBlock
                  onEdit={() => {
                    this.editArticle(article)
                    this.props.setStore({ newArticleTags: article.tags })
                  }}
                  edited={article.id === this.props.desk.editedArticle}
                  key={article.id}
                  article={article}
                />
              ))
            )}
          </div>
        )
      }
    } else {
      return <Loading />
    }
  }
}

const storeToProps = ({ desk }) => ({
  articles: desk.articles,
  tags: desk.tags,
  tagList: desk.tagList,
  searchString: desk.searchString || "",
  desk
})

const actionsToProps = feedSpatch(
  { fetchDeskArticles },
  {
    searchType: e => ({ desk: { searchString: e.target.value } }),
    setStore: v => ({ desk: v })
  }
)

export default connect(
  storeToProps,
  actionsToProps
)(Desk)
