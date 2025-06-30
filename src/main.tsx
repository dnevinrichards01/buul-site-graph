import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Graph from './App.tsx'
import '../styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Graph />
  </StrictMode>,
)
