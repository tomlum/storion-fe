import React, { Component } from "react"
import { connect } from "react-redux"
import pt from "prop-types"
import StoryBlock from "../../components/StoryBlock"
import { action } from "../../utils"

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

const storeToProps = ({ stories: { stories } }) => ({
  stories
})

const actionsToProps = dispatch => ({
  fetchStories: () => {
    dispatch(action("EFX_FETCH_STORIES_R"))
  }
})

export default connect(
  storeToProps,
  actionsToProps
)(Home)
