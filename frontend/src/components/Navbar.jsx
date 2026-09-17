function Navbar({ currentPage, onNavigate }) {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button onClick={() => onNavigate("home")} className="text-xl font-bold text-gray-900">
          DriveRent
        </button>

        <div className="hidden items-center gap-6 text-sm text-gray-600 sm:flex">
          <button onClick={() => onNavigate("home")} className={currentPage === "home" ? "font-semibold text-gray-900" : "hover:text-gray-900"}>
            Home
          </button>
          <button onClick={() => onNavigate("cars")} className={currentPage === "cars" ? "font-semibold text-gray-900" : "hover:text-gray-900"}>
            Mobil
          </button>
          <button onClick={() => onNavigate("about")} className={currentPage === "about" ? "font-semibold text-gray-900" : "hover:text-gray-900"}>
            Tentang
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar