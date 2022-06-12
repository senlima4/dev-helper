import * as React from "react"
import {
  Box,
  Flex,
  Text,
  List,
  ListItem,
  useBoolean,
  useToast,
  Button,
  Code,
} from "@chakra-ui/react"
import { readDir, readTextFile } from "@tauri-apps/api/fs"
import type { FileEntry } from "@tauri-apps/api/fs"

import { useStore } from "@/store"

const Folder: React.FC<FileEntry> = ({ path, name, children }) => {
  const [isOpen, setOpen] = useBoolean()
  const [data, setData] = React.useState<FileEntry[]>([])

  const handleOpen = async () => {
    if (!Array.isArray(children)) return
    const res = await readDir(path)
    setData(res)
  }

  React.useEffect(() => {
    if (isOpen) {
      handleOpen()
    }
  }, [isOpen])

  if (!name) return null

  return (
    <>
      <Text
        cursor="pointer"
        textDecoration={isOpen ? "underline" : "unset"}
        onClick={setOpen.toggle}>
        {name}
      </Text>
      {isOpen && (
        <List spacing={2}>
          {data.map((entry) => (
            <ListItem key={entry.path} ml={2}>
              {entry.children ? (
                <Folder {...entry} />
              ) : (
                <Text>{entry.name ?? "--"}</Text>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </>
  )
}

const ProjectScreen: React.FC = () => {
  const toast = useToast()
  const rootDir = useStore((state) => state.screen.rootDir)
  const [data, setData] = React.useState<FileEntry[]>([])
  const [pkgJson, setPkgJson] = React.useState<any>(null)

  const handlePackage = async () => {
    const entry = data.find((entry) => entry.name === "package.json")
    if (!entry) {
      toast({
        title: "No package.json found",
        description: "Please create a package.json file",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    const res = await readTextFile(entry.path)
    setPkgJson(JSON.parse(res))
  }

  React.useEffect(() => {
    const initFileEntry = async (path: string) => {
      const res = await readDir(path)
      setData(() => res)
    }

    if (rootDir) initFileEntry(rootDir)
  }, [rootDir])

  return (
    <Flex w="full" h="100vh">
      <Box flex="none" w="250px" borderRight="solid 1px black">
        <List spacing={2}>
          {data.map((entry) => (
            <ListItem key={entry.path} ml={2}>
              {entry.children ? (
                <Folder {...entry} />
              ) : (
                <Text>{entry.name ?? "--"}</Text>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
      <Box flex="auto" w="auto">
        <Button onClick={handlePackage}>check package.json</Button>
        {pkgJson &&
          Object.keys(pkgJson.scripts).map((key) => (
            <Text key={key}>
              {key}: {pkgJson.scripts[key]}
            </Text>
          ))}
      </Box>
    </Flex>
  )
}

export default React.memo(ProjectScreen)
