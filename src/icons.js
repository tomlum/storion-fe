import React from "react"
import {colors} from "styles"

export const arrowDown = (
  <svg
    style={{
      width: "20px",
      height: "10px"
    }}
  >
    <polyline
      points={`
                0, 0
                20, 0
                10, 10
              `}
      fill={colors.rose}
      strokeWidth={1}
    />
  </svg>
)

export const arrowUp = (
  <svg
    style={{
      width: "20px",
      height: "10px"
    }}
  >
    <polyline
      points={`
                0, 10
                20, 10
                10, 0
              `}
      fill={colors.rose}
      strokeWidth={1}
    />
  </svg>
)
