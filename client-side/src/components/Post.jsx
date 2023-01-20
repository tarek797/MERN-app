import { Grid, Link, Box } from '@mui/material'
import React from 'react'

function Post(props) {
    return (

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} zeroMinWidth >
            <Box sx={{
                width: 250,
                height: 150,
                backgroundColor: 'primary.light',
                borderRadius: 10,
                padding:2,
                overflow: 'hidden'
            }}>
                <h1>{props.API}</h1>
                <h5>{props.Category}</h5>
                <p >{props.Description}</p>
                <Link href={props.Link}
                    underline='hover'
                    color='yellow'
                >{props.Link}</Link>
            </Box>
        </Grid>


    )
}

export default Post