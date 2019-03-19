import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import auth0Client from "auth"
import { Space } from "components/Space"
import { colors } from "styles"

const AboutBody = styled.div`
  color: ${colors.rose};
  max-width: 630px;
  margin: auto;
  padding: 0px 12px;
  padding-bottom: 100px;

  h1 {
    margin-top: 35px;
    padding-bottom: 10px;
    font-size: 25px;
  }

  h2 {
    margin-top: 20px;
    font-size: 20px;
    padding-bottom: 5px;
  }

  p {
    font-size: 17px;
    padding-top: 0px;
    text-indent: 20px;
  }

  br {
    line-height: 20px;
  }

  a {
    color: ${colors.pink};
    text-decoration: underline;
  }

  .login {
    color: ${colors.pink};
    text-decoration: underline;
  }

  img {
    padding: 20px;
  }
`
const P = styled.p`
  padding-left: ${({ indent }) => indent}px;
`

const Center = styled.div`
  margin-top: 17px;
  text-align: center;
`
// const Indent = styled.div`
//   margin-left: 15px;
// `

const DevBlock = styled.div`
  border-radius: 10px;
  padding: 20px;
  margin: 15px 0px;
  border: solid 2px
    ${({ status }) => {
      if (status === "green") {
        return colors.mintGreen
      } else if (status === "yellow") {
        return colors.yellow
      } else {
        return colors.rose
      }
    }};
  h3 {
    font-size: 20px;
    color: ${({ status }) => {
      if (status === "green") {
        return colors.mintGreen
      } else if (status === "yellow") {
        return colors.yellow
      } else {
        return colors.rose
      }
    }};
  }
`

class About extends Component {
  render() {
    return (
      <AboutBody>
        <Center>
          <h1>
            <u>The Way We Read News Is Broken</u>
          </h1>
        </Center>
        <h2>- Articles Don't Have Context</h2>
        <P indent={20}>
          In a news feed or front page, there's no time or space to explain the
          context of every article. This makes it hard to fully understand
          what's happening unless you've been actively keeping up for a while.
        </P>
        <h2>- Stories don't live past the front page</h2>
        <P indent={20}>
          Especially on social media, news stories feel more like shouts than
          records of events. We rarely revisit articles to really consider if
          they matter to the story at large. As well, the stories we care about
          aren't always on the front page, but we shouldn't forget about them
          when they're not in the spotlight.
        </P>
        <br />
        <p>
          As a result, news feeds are just a flow of ephemeral, isolated
          articles, which is valuable, but it's not <b>the story</b>.
        </p>

        <Center>
          <h1>
            <u>Enter Storion, Stage Left</u>
          </h1>
        </Center>
        <Space h={20} />
        <p>
          Storion's idea is pretty simple, no blockchain or machine learning
          necessary.
        </p>
        <h2>1.) Keep the articles that matter to you. </h2>
        <Center>
          <img src={`${process.env.PUBLIC_URL}/articles.png`} alt="" />
        </Center>
        <h2>2.) Group articles into stories.</h2>
        <Center>
          <img src={`${process.env.PUBLIC_URL}/stories.png`} alt="" />
        </Center>
        <h2>3.) Share and follow stories you care about.</h2>
        <Center>
          <img src={`${process.env.PUBLIC_URL}/share.png`} alt="" />
        </Center>
        <br />
        <p>
          So if I care a lot about the U.S. policies on climate change, I can
          follow a story my friend made. As they find more articles, they can
          add to the story, and I'll get updates. And if I want to explain to
          someone the full story of the U.S. policies on climate change, I can
          share my sources all in one place.
        </p>
        <Center>
          <h1>
            <u>Development Progress</u>
          </h1>
        </Center>
        <Space h={20} />
        <p>
          Storion is just made by me, Tom! So it's going to take a bit of time
          to fully implement everything and make it all ship shape. These are
          the main components of the project, and as they are complete you can
          log in and give them a go!
        </p>
        <DevBlock status={"green"}>
          <h3>Infrastructure - Complete!</h3>
          <p>
            This very website you're seeing, as well as Gmail sign in and
            authentication.
          </p>
        </DevBlock>
        <DevBlock status={"green"}>
          <h3>Desk - Complete!</h3>
          <p>The place to keep and tag articles you think are important.</p>
        </DevBlock>
        <DevBlock status={"yellow"}>
          <h3>Stories - In Progress</h3>
          <p>The place for linking together articles into shareable stories.</p>
        </DevBlock>
        <DevBlock status={"gray"}>
          <h3>Feed - To Do</h3>
          <p>
            A personalized news feed embedded in Storion, allowing you to use it
            as a one-stop-shop for articles and stories.
          </p>
        </DevBlock>
        <p>
          {`And that's the plan!  If you're curious you can`}{" "}
          <span onClick={() => auth0Client.signIn()} className="login clickable">
            log in
          </span>{" "}
          {`right now and give what's in development a shot!  If you have any questions, comments, updates, you
          can `}
          <a href="mailto:TomLumPerson@gmail.com" className="clickable">
            email me
          </a>
          {`, and I'm also on `}
          <a href="https://twitter.com/tomlumperson" className="clickable">
            twitter!
          </a>
        </p>
      </AboutBody>
    )
  }
}

const storeToProps = ({ user }) => ({
  user
})

export default connect(
  storeToProps,
  null
)(About)
