import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Frame from './components/Frame'

function App() {
  const [count, setCount] = useState(0)

  return (
   <Frame />
  )
}

export default App
