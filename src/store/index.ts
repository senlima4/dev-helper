import create from "zustand"
import { immer } from "zustand/middleware/immer"

export type ModalKeys = "newProject" | "openProject"

export type TabType = {
  name: string
  rootDir: string
  processType: "new" | "open"
}

export type Screen = {
  rootDir: string | null
}

type Store = {
  modal: {
    newProject: boolean
    openProject: boolean
  }
  setModal: (key: ModalKeys, val: boolean) => void

  screen: Screen
  setScreen: (key: keyof Screen, val: any) => void
}

export const useStore = create(
  immer<Store>((set) => ({
    modal: {
      newProject: false,
      openProject: false,
    },
    setModal: (key, val) =>
      set((state) => {
        state.modal[key] = val
      }),

    screen: {
      rootDir: null,
    },
    setScreen: (key, val) =>
      set((state) => {
        state.screen[key] = val
      }),
  }))
)
