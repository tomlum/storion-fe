import React, { Component } from "react"
import { connect } from "react-redux"
import pt from "prop-types"
import styled from "styled-components"
// import StoryBlock from "../../components/StoryBlock"
import About from "pages/about"
import { fetchStories } from "../../sagas/stories"
import { feedSpatch } from "../../sagas/utils"
import { colors } from "styles"

const Text = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: center;
  font-size: 20px;
  color: ${colors.rose};
`

class Home extends Component {
  static propTypes = {
    stories: pt.array
  }

  componentDidMount() {
    if (!this.props.stories) {
      // this.props.fetchStories()
    }
  }

  render() {
    if (this.props.user && this.props.user.null) {
      return <About />
    } else {
      return (
        <div>
          {
            // this.props.stories &&
            // this.props.stories.map(story => <StoryBlock story={story} />)
          }
          <Text>Coming Soon</Text>
        </div>
      )
    }
  }
}

const storeToProps = ({ user }) => ({
  user
})

const actionsToProps = feedSpatch({
  // fetchStories
})

export default connect(
  storeToProps,
  actionsToProps
)(Home)
