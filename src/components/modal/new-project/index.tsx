import * as React from "react"
import { useNavigate } from "react-router-dom"
import {
  List,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from "@chakra-ui/react"
import { open } from "@tauri-apps/api/shell"

import { useStore } from "@/store"

import Item from "./item"
import { LIST } from "./constants"

type NewProjectModalProps = {
  isOpen?: boolean
  onClose: () => void
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate()
  const isOpenAtStore = useStore((state) => state.modal.newProject)

  const handlers = React.useMemo(() => {
    return {
      locally: () => {
        navigate("/new-project/locally")
      },
      codesandbox: () => {
        open("https://react.new")
      },
    }
  }, [navigate])

  return (
    <Modal isOpen={isOpen ?? isOpenAtStore} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Project</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <List>
            {LIST.map((item) => (
              <Item
                key={item.title}
                {...item}
                handleClick={handlers[item.eventKey]}
              />
            ))}
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default React.memo(NewProjectModal)
