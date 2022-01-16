import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import HomePage from './pages/homepage'
import {TransactionProvider} from './context/TransactionContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <TransactionProvider>
    <HomePage />
    </TransactionProvider>
  )
}

export default App
