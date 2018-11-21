import React, { Component } from "react"
import pt from "prop-types"
import ArticleBlock from "../../components/ArticleBlock"
import { fetchDeskArticles } from "../../sagas/stories"
import { feedSpatch, connect } from "../../sagas/utils"

class Desk extends Component {
  static propTypes = {
    articles: pt.array,
    match: pt.object
  }

  componentDidMount() {
    this.props.fetchDeskArticles(this.props.match.params.id)
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

const storeToProps = ({ desk: { articles } }) => ({
  articles
})

const actionsToProps = feedSpatch({fetchDeskArticles})

export default connect(
  storeToProps,
  actionsToProps
)(Desk)
