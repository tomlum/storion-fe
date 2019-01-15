import React, { Component } from "react"
import { connect } from "react-redux"
import pt from "prop-types"
// import ArticleBlock from "../../components/ArticleBlock"
import { fetchStoryArticles } from "../../sagas/stories"
import { feedSpatch } from "../../sagas/utils"

class Story extends Component {
  static propTypes = {
    articles: pt.array,
    match: pt.object
  }

  componentDidMount() {
    // this.props.fetchStoryArticles(this.props.match.params.id)
  }

  render() {
    return (
      <div>
        <h1>
          Coming Soon
        </h1>
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
