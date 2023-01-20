import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Post from './Post';
import { Grid } from '@mui/material';

function Posts() {
    const server = 'http://127.0.0.1:3000'
    const [posts, setposts] = useState([])

    useEffect(() => {
        axios.get(server)
            .then(res => {
                setposts(res.data)
            }
            )
            .catch(err => console.log(err))
    }, [])

    const listItems = posts.map(item => <Post key={item._id} {...item} />)

    return (
            <Grid container 
             rowSpacing={6} 
             columnSpacing={{ xs: 2, sm: 4, md: 6 }}
             justify = "center"
             mt={4}
              >
                {listItems}
            </Grid>

    )
}

export default Posts