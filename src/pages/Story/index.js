import React, { Component } from "react"
import { connect } from "react-redux"
import pt from "prop-types"
import ArticleBlock from "../../components/ArticleBlock"
import { action } from "../../utils"

class Story extends Component {
  static propTypes = {
    articles: pt.array,
    match: pt.object
  }

  componentDidMount() {
    this.props.fetchArticles(this.props.match.params.id)
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

const storeToProps = ({ stories: { articles } }) => ({
  articles
})

const actionsToProps = dispatch => ({
  fetchArticles: (id) => {
    dispatch(action("EFX_FETCH_ARTICLES_R", { id }))
  }
})

export default connect(
  storeToProps,
  actionsToProps
)(Story)
