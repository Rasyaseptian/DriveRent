import { useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Cars from "./components/Cars"
import About from "./components/About"

function App() {
  const [page, setPage] = useState("home")

  return (
    <>
      <Navbar onNavigate={setPage} currentPage={page} />

      {page === "home" && <Hero />}
      {page === "cars" && <Cars />}
      {page === "about" && <About />}
    </>
  )
}

export default App