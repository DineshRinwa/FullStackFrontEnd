import './App.css'

import { Signup } from './pages/Signup'
import { AppRoutes } from './routes/AppRoutes'
import { Navbar } from './routes/navbar'

function App() {

  return (
    <>
      <Navbar/>
      <AppRoutes/>
    </>
  )
}

export default App