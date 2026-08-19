import NavBar from "./components/NavBar"
import AppRouter from './router/AppRouter'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow-0 shrink-0 basis-auto">
        <NavBar />
      </div>

      <div className="grow-1 shrink-0 basis-auto overflow-auto">
        <AppRouter />
      </div>

      <div className="grow-0 shrink-0 basis-auto">
        <Footer />  
      </div>

    </div>
  )
}

export default App