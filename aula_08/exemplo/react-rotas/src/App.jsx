import { Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import Produto from './pages/Produto'
import Menu from './components/Menu'

function App() {
  return (
    <div className="app">
      <Menu />

      <main className="app__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/produto/:id" element={<Produto />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
