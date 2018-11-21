import React, { Component } from "react"
import { connect } from "react-redux"
import pt from "prop-types"
import ArticleBlock from "../../components/ArticleBlock"
import { fetchStoryArticles } from "../../sagas/stories"
import { feedSpatch } from "../../sagas/utils"

class Story extends Component {
  static propTypes = {
    articles: pt.array,
    match: pt.object
  }

  componentDidMount() {
    this.props.fetchStoryArticles(this.props.match.params.id)
  }

  render() {
    return (
      <div>
        {this.props.articles &&
          this.props.articles.map(article => (
            <ArticleBlock article={article} />
          ))}
      </div>
    )
  }
}

const storeToProps = ({ articles }) => ({
  articles
})

const actionsToProps = feedSpatch({fetchStoryArticles})

export default connect(
  storeToProps,
  actionsToProps
)(Story)
