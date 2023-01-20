import React, { useEffect } from "react"
import { AppBar, Button, Input, Modal, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from "react"
import axios from "axios"
import Post from "./Post"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 10,
    p:4
};

function Header() {
    const server = 'http://127.0.0.1:3000/target'
    const [searched, setSearched] = useState('')
    const [APIName, setAPIName] = useState('')
    const [result, setResult] = useState({})

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        setAPIName(searched)
        handleOpen()
    }

    useEffect(() => {
        axios.get(server, { params: { name: APIName } })
            .then(res => { setResult(res.data) })
            .catch(err => console.log(err))
    }, [APIName])

    return (
        <AppBar >
            <h1>API db</h1>
            <form onSubmit={handleSubmit}>
                <label >Search for an Api: </label>
                <Input type="text"
                    placeholder="type here!"
                    value={searched}
                    onChange={event => {
                        setSearched(event.target.value)
                    }} />
                <Button variant="contained" startIcon={<SearchIcon />}
                    onClick={handleSubmit}></Button>
            </form>
            <Modal
                open={open}
                onClose={handleClose}
            >   
                <Box sx={style}>
                    {result ? <Post key={result._id} {...result} /> 
                            : <h1>No API Available with the given name</h1>}
                </Box>
            </Modal>
        </AppBar>
    )
}

export default Header