import { useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Cars from "./components/Cars"
import About from "./components/About"
import Pelanggan from "./components/Pelangggan"
import Transaksi from "./components/Transaksi"

function App() {
  const [page, setPage] = useState("home")

  return (
    <>
      <Navbar onNavigate={setPage} currentPage={page} />

      {page === "home" && <Hero onViewCars={() => setPage("cars")} />}
      {page === "cars" && <Cars />}
      {page === "pelanggan" && <Pelanggan />}
      {page === "transaksi" && <Transaksi />}
      {page === "about" && <About />}
    </>
  )
}

export default App
