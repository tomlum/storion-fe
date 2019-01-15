import React from "react"
import styled, { keyframes } from "styled-components"
import { colors } from "styles"

const LoadingBody = styled.div`
  padding-top: 150px;
  display: flex;
  width: 70px;
  margin: auto;
  justify-content: space-between;
`
const BounceAnimation = keyframes`
  0% { margin-top: 0; }
  50% { margin-top: 10px }
  100% { margin-top: 0 }
`
const Dot = styled.div`
  background-color: ${colors.rose};
  border-radius: 4px;
  width: 10px;
  height: 10px;
  margin: 0px;

  /* Animation */
  animation: ${BounceAnimation} 0.7s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`
export default function Loading() {
  return (
    <LoadingBody>
      <Dot delay={0.1} />
      <Dot delay={0.3} />
      <Dot delay={0.5} />
    </LoadingBody>
  )
}