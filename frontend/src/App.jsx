import { useState } from "react"
import HomePage from "./pages/HomePage"
import AdminPage from "./pages/AdminPage"
import CustomerPage from "./pages/CustomerPage"

function App() {
  const [role, setRole] = useState(null)

  if (role === "admin") {
    return <AdminPage onBack={() => setRole(null)} />
  }

  if (role === "pelanggan") {
    return <CustomerPage onBack={() => setRole(null)} />
  }

  return <HomePage onSelectRole={setRole} />
}

export default App