import * as React from "react"
import { BrowserRouter } from "react-router-dom"

import AppRoutes from "./app-routes"

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
