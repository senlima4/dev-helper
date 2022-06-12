import * as React from "react"
import { Box, Center } from "@chakra-ui/react"

import { useStore } from "@/store"

import EntryBtn from "@/domain/home/entry-btn"
import ProjectScreen from "@/domain/home/project-screen"

const Home: React.FC = () => {
  const rootDir = useStore((state) => state.screen.rootDir)

  if (!rootDir) {
    return (
      <Center w="full" h="100vh">
        <EntryBtn />
      </Center>
    )
  }

  return (
    <Box>
      <ProjectScreen />
    </Box>
  )
}

export default Home
