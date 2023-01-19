import React, { useState, useEffect } from 'react'
import './App.css'
import Posts from './components/Posts'
import Header from './components/Header'

function App() {

  return (
    <div className="App">
      <Header />
      <Posts />
    </div>
  )
}

export default App
