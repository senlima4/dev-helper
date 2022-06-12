import * as React from "react"
import { open } from "@tauri-apps/api/dialog"
import { Button } from "@chakra-ui/react"

import { useStore } from "@/store"

const EntryBtn: React.FC = () => {
  const setScreen = useStore((state) => state.setScreen)

  const handleClick = React.useCallback(async () => {
    const res = await open({
      directory: true,
      multiple: false,
      title: "Select a directory",
    })

    if (typeof res === "string") {
      setScreen("rootDir", res)
    }
  }, [])

  return (
    <Button type="button" onClick={handleClick}>
      Open Project
    </Button>
  )
}

export default React.memo(EntryBtn)
