import * as React from "react"
import { FiArrowRight, FiCodesandbox } from "react-icons/fi"

export type Item = {
  icon: React.ReactNode
  title: string
  eventKey: "locally" | "codesandbox"
}

export const LIST: Item[] = [
  {
    eventKey: "locally",
    icon: <FiArrowRight />,
    title: "Create locally",
  },
  {
    eventKey: "codesandbox",
    icon: <FiCodesandbox />,
    title: "CodeSandbox",
  },
]
