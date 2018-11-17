import React, { Component } from "react"
import { connect } from "react-redux"
import pt from "prop-types"
import StoryBlock from "../../components/StoryBlock"
import { fetchStories } from "../../sagas/stories"
import { feedSpatch } from "../../sagas/utils"

class Home extends Component {
  static propTypes = {
    stories: pt.array
  }

  componentDidMount() {
    this.props.fetchStories()
  }

  render() {
    return (
      <div>
        <u>
          <h1>Storion</h1>
        </u>
        {this.props.stories &&
          this.props.stories.map(story => <StoryBlock story={story} />)}
      </div>
    )
  }
}

const storeToProps = ({ stories }) => ({
  stories
})

const actionsToProps = feedSpatch({
  fetchStories
})

export default connect(
  storeToProps,
  actionsToProps
)(Home)
