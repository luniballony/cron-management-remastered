import NavBar from "./components/NavBar"
import AppRouter from './router/AppRouter'
import Footer from './components/Footer'

function App() {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />

      <div className="flex-1 overflow-auto">
        <AppRouter />
      </div>

      <Footer />
    </div>
  )
}

export default App