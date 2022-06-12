import * as React from "react"
import { useNavigate } from "react-router-dom"
import { open } from "@tauri-apps/api/dialog"
import {
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react"

import { useStore } from "@/store"

type NewProjectModalProps = {
  isOpen?: boolean
  onClose: () => void
}

const OpenProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate()
  const addTab = useStore((state) => state.addTab)
  const isOpenAtStore = useStore((state) => state.modal.openProject)

  const handleOpen = React.useCallback(async () => {
    const path = await open({
      title: "Open Project",
      directory: true,
      multiple: false,
    })

    if (typeof path === "string") {
      const bulkOfPath = path.split("/")
      addTab({
        name: bulkOfPath[bulkOfPath.length - 1],
        rootDir: path,
        processType: "open",
      })
      navigate("projects")
    }
  }, [])

  return (
    <Modal isOpen={isOpen ?? isOpenAtStore} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Open Project</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Button onClick={handleOpen}>Open Project</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default React.memo(OpenProjectModal)
