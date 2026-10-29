import { StrictMode } from 'react'
<<<<<<< HEAD
import ReactDOM from 'react-dom/client'
import App from './App'

const rootElement = document.getElementById('root')!

ReactDOM.createRoot(rootElement).render(
=======
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
>>>>>>> 1d988e9f7bbff61903111731526d201e44d9e8b4
  <StrictMode>
    <App />
  </StrictMode>
)
