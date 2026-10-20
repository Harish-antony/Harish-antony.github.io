import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/fonts.css'
import './styles/global.css'
import './styles/nav.css'
import './styles/hero.css'
import './styles/sections.css'
import './styles/projects.css'
import './styles/art.css'
import './styles/cat.css'

// Marks that JS is running — entrance/scroll animations are gated behind this,
// so every element stays fully visible if the script ever fails to load.
document.documentElement.classList.add('js')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
