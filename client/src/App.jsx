import {useState, createContext, useEffect} from 'react'
import {Routes, Route} from "react-router-dom"
import Register from './components/user/Register'
import Layout from './components/Layout'
import "./App.css"

export const Social = createContext()

export default function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  return (
    <Social.Provider value={{
      user,
      setUser,
      token,
      setToken
    }}>
    <main>
    <Routes>
      {
        token === null ?
        <Route element={<Layout />} >
      <Route element={<Register />} path='/' />
      </Route> 
      :
      <Route>
        
      </Route>
      }
    </Routes>
    </main>
    </Social.Provider>
  )
}
