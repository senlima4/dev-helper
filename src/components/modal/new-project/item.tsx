import * as React from "react"
import { Text, Flex, Button, ListItem } from "@chakra-ui/react"

type ItemProps = {
  icon: React.ReactNode
  title: string
  handleClick: () => void
}

const Item: React.FC<ItemProps> = ({ icon, title, handleClick }) => {
  return (
    <ListItem mb={2}>
      <Button w="full" onClick={handleClick}>
        <Flex w="full" alignItems="center" justifyContent="space-between">
          <Text>{title}</Text>
          {icon}
        </Flex>
      </Button>
    </ListItem>
  )
}

export default React.memo(Item)
