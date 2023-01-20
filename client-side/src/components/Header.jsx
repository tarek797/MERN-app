import React, { useEffect } from "react"
import { AppBar, Button, Input } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from "react"
import axios from "axios"
import Post from "./Post"

function Header() {
    const server = 'http://127.0.0.1:3000/target'
    const [searched, setSearched] = useState('')
    const [APIName, setAPIName] = useState('RandomDog')
    const [result, setResult] = useState({})
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setAPIName(searched)
    }

    useEffect(() => {
        axios.get(server, {params: {name: APIName}} )
            .then(res => {
                console.log(res.data)
                setResult(res.data)
            }
            )
            .catch(err => console.log(err))
    }, [APIName])

    return (
        <AppBar>
            <h1>API Posts</h1>
            <form onSubmit={handleSubmit}>
                <label>Search for an Api: </label>
                <Input type="text"
                    placeholder="type here!"
                    value={searched}
                    onChange={event => {
                        setSearched(event.target.value)
                    }} />
                <Button variant="contained" startIcon={<SearchIcon />}
                onClick={handleSubmit}></Button>
            </form>
        </AppBar>
    )
}

export default Header