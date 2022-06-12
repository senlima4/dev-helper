import * as React from "react"
import { Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import NotFound from "./pages/not-found"

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default React.memo(AppRoutes)
